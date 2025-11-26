// src/screens/Chart/hooks/useChartData.ts
import useHomeData from "../../Home/hooks/useHomeData";
import { Transaction } from "../../../auth/authService";

interface ChartDataItem {
  value: number;
  label: string;
  color: string;
  text: string;
}

// Cores para as fatias do gráfico (garantindo consistência)
const INCOME_COLORS = ['#388E3C', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9'];
const EXPENSE_COLORS = ['#D32F2F', '#E57373', '#EF9A9A', '#FFCDD2', '#FFEBEE'];

/**
 * Processa as transações para o formato de gráfico de pizza.
 * Agrupa as transações por descrição e calcula o total.
 */
const aggregateTransactions = (transactions: Transaction[], type: 'income' | 'expense'): ChartDataItem[] => {
  const filtered = transactions.filter(t => t.type === type);
  
  if (filtered.length === 0) {
    return [];
  }

  // 1. Agrupa e Soma por Descrição (Categoria)
  const grouped = filtered.reduce<Record<string, number>>((acc, t) => {
    const description = t.description.toUpperCase();
    // Usamos Math.round para evitar problemas de precisão do float
    acc[description] = Math.round(((acc[description] || 0) + t.amount) * 100) / 100;
    return acc;
  }, {});

  // 2. Converte para o formato do Chart
  const isIncome = type === 'income';
  const colorsArray = isIncome ? INCOME_COLORS : EXPENSE_COLORS;
  let colorIndex = 0;

  // Calcula o total para as porcentagens
  const totalAmount = Object.values(grouped).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(grouped)
    .sort(([, amountA], [, amountB]) => amountB - amountA) // Ordena por valor (maior primeiro)
    .map(([description, amount]) => {
      // Atribui uma cor e avança o índice (usa módulo para reciclar cores)
      const color = colorsArray[colorIndex % colorsArray.length];
      colorIndex++;
      
      const percentage = (amount / totalAmount) * 100;
      
      return {
        value: amount,
        label: description,
        color: color,
        text: `${percentage.toFixed(0)}%`, // Texto opcional para dentro da fatia
      };
    });
};


export default function useChartData() {
  const { transactions, loading } = useHomeData();

  const incomeChartData = aggregateTransactions(transactions, 'income');
  const expenseChartData = aggregateTransactions(transactions, 'expense');

  return {
    loading,
    incomeChartData,
    expenseChartData,
  };
}