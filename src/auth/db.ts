import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";

// Abrir DB de forma síncrona
export const db: SQLiteDatabase = openDatabaseSync("appfin.db");

export function initDB() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);
}
