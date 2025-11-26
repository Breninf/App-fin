import { db } from "./db";

export interface DBUser {
  id: number;
  email: string;
  password: string;
  name: string;
}

/**
 * Registra usuário
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<void> {
  await db.runAsync(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
}

/**
 * Login
 */
export async function loginUser(
  email: string,
  password: string
): Promise<DBUser> {
  const row = await db.getFirstAsync(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (!row) {
    throw new Error("Email ou senha inválidos");
  }

  const r = row as Record<string, any>;

  const user: DBUser = {
    id: Number(r.id),
    email: String(r.email),
    password: String(r.password),
    name: String(r.name),
  };

  return user;
}

// src/auth/authService.ts

// ... (existing DBUser interface and registerUser/loginUser functions)

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  user_id: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
}

/**
 * Adiciona uma nova transação (receita ou despesa)
 */
export async function addTransaction(
  userId: number,
  type: TransactionType,
  description: string,
  amount: number
): Promise<void> {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  await db.runAsync(
    "INSERT INTO transactions (user_id, type, description, amount, date) VALUES (?, ?, ?, ?, ?)",
    [userId, type, description, amount, date]
  );
}

/**
 * Busca o histórico de transações do usuário no mês atual.
 */
export async function fetchMonthlyTransactions(
  userId: number
): Promise<Transaction[]> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Mês é 0-indexado
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  
  // Filtra por ano e mês (ex: 2025-11-%)
  const startDate = `${year}-${monthStr}-01`;
  const endDate = `${year}-${monthStr}-31`;

  const rows = await db.getAllAsync(
    "SELECT * FROM transactions WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date DESC",
    [userId, startDate, endDate]
  );

  return rows.map((row: any) => ({
    id: Number(row.id),
    user_id: Number(row.user_id),
    type: row.type as TransactionType,
    description: String(row.description),
    amount: Number(row.amount),
    date: String(row.date),
  }));
}