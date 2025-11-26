// src/screens/Home/hooks/useHomeData.ts
import { useState, useEffect } from 'react';
import { fetchMonthlyTransactions, Transaction } from "../../../auth/authService"; // Importação atualizada
import { useAuth } from "../../../auth/authContext";
import { useIsFocused } from '@react-navigation/native'; // Necessário para recarregar ao voltar para a tela

export default function useHomeData() {
  const { user } = useAuth();
  const isFocused = useIsFocused(); // Hook para detectar foco
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const fetchedTransactions = await fetchMonthlyTransactions(user.id);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que a tela Home recebe foco
  useEffect(() => {
    if (isFocused) {
        loadTransactions();
    }
  }, [user, isFocused]);

  // Recalcular saldos
  const totalIncomes = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncomes - totalExpenses;

  return {
    balance,
    incomes: totalIncomes,
    expenses: totalExpenses,
    transactions, // Retornar transações para o histórico
    loading,
  };
}
