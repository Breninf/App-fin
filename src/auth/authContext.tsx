import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initDB } from "./db";
import { loginUser, registerUser } from "./authService";

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB();
    restoreLogin();
  }, []);

  async function restoreLogin() {
    const savedUser = await AsyncStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }

  async function login(email: string, password: string) {
    const loggedUser = await loginUser(email, password);

    const formattedUser: User = {
      id: loggedUser.id,
      email: loggedUser.email,
      name: loggedUser.name,
    };

    await AsyncStorage.setItem("user", JSON.stringify(formattedUser));
    setUser(formattedUser);
  }

  async function register(name: string, email: string, password: string) {
    await registerUser(name, email, password);
  }

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
