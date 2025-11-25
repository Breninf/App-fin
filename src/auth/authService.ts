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
