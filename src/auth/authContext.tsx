import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDB } from "./db";
import { loginUser, registerUser, addTransaction as addTransactionService, TransactionType } from "./authService";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>; 
  logout: () => Promise<void>;
  addTransaction: (type: TransactionType, description: string, amount: number) => Promise<void>; 
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Inicializa o DB e tenta restaurar o login ao montar
  useEffect(() => {
    initDB();
    restoreLogin();
  }, []);

  // 2. Tenta carregar o usuário de AsyncStorage
  const restoreLogin = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      if (userJSON) {
        setUser(JSON.parse(userJSON));
      }
    } catch (e) {
      console.error("Failed to restore login:", e);
    } finally {
      setLoading(false);
    }
  };
  
  // 3. Função de Login
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const loggedUser = await loginUser(email, password);
      // Certifique-se de que o objeto a ser armazenado só tenha os campos necessários
      const userToStore: User = { id: loggedUser.id, email: loggedUser.email, name: loggedUser.name };
      setUser(userToStore);
      await AsyncStorage.setItem("@user", JSON.stringify(userToStore));
    } catch (error) {
      alert("Credenciais inválidas ou erro ao conectar.");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // 4. Função de Registro
  async function register(name: string, email: string, password: string) {
    try {
      await registerUser(name, email, password);
      // Após o registro bem-sucedido, pode-se logar ou apenas direcionar para a tela de Login.
    } catch (error) {
      alert("Erro ao registrar. O email pode já estar em uso.");
      throw error;
    }
  }

  // 5. Função de Logout
  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem("@user");
  }

  // 6. Função de Adicionar Transação (Adicionada na resposta anterior)
  async function addTransaction(
    type: TransactionType,
    description: string,
    amount: number
  ) {
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    await addTransactionService(user.id, type, description, amount); 
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, addTransaction }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}