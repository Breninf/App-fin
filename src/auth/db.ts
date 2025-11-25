import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

// Abre o banco de dados de forma síncrona
export const db: SQLiteDatabase = openDatabaseSync("appfin.db");

// Inicializa a tabela de usuários
export function initDB() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
}
