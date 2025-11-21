// src/auth/authService.ts
import { db } from "./db";

export interface DBUser {
  id: number;
  email: string;
  password: string;
}

/**
 * Registra usuário (lança erro se o INSERT falhar, p.ex. UNIQUE constraint)
 */
export async function registerUser(email: string, password: string): Promise<void> {
  await db.runAsync(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );
}

/**
 * Faz login: retorna um objeto DBUser garantido (faz checagens em runtime).
 * Lança Error se usuário não encontrado.
 */
export async function loginUser(email: string, password: string): Promise<DBUser> {
  const row = await db.getFirstAsync(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password]
  );

  // validação em runtime - protege contra retornos inesperados do DB
  if (!row || typeof row !== "object") {
    throw new Error("Email ou senha inválidos");
  }

  // cast seguro: usamos (row as any) para acessar campos dinâmicos vindos do DB,
  // mas validamos a existência antes de montar o objeto final.
  const r = row as any;

  const id = r.id ?? r.ID ?? r._id; // tenta algumas variações caso existam
  const emailVal = r.email ?? r.Email ?? r.email_address;
  const passwordVal = r.password ?? r.pass ?? r.senha ?? "";

  if (id == null || emailVal == null) {
    throw new Error("Email ou senha inválidos");
  }

  const user: DBUser = {
    id: Number(id),
    email: String(emailVal),
    password: String(passwordVal),
  };

  return user;
}
