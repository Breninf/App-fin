// src/screens/home/hooks/useHomeData.ts
export default function useHomeData() {
  // Por enquanto dados mockados
  const balance = 1250.75;
  const incomes = 3500.00;
  const expenses = 2250.25;

  return { balance, incomes, expenses };
}
