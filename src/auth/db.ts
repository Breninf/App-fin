import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

// Abre o banco de dados de forma síncrona
export const db: SQLiteDatabase = openDatabaseSync("appfin.db");

// Inicializa a tabela de usuários e a NOVA tabela de transações
export function initDB() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
    -- NOVA TABELA: transactions
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL, -- 'income' ou 'expense'
      description TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL, -- formato YYYY-MM-DD
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}