// src/services/userService.ts
import { User, Role } from "@/types/user";
import { DEV_USERS } from "@/mocks/users";

let currentUser: User | null = null;

/**
 * Inicializa o usuário atual.
 * Em dev, usa mock.
 * Em produção, buscar da API real.
 */
export async function initUser() {
  if (process.env.NODE_ENV === "development") {
    currentUser = DEV_USERS[1]; // usuário dev inicial
  } else {
    try {
      const res = await fetch("/api/me"); // endpoint de login real
      if (!res.ok) throw new Error("Usuário não encontrado");
      currentUser = await res.json();
    } catch {
      currentUser = null;
    }
  }
}

/** Retorna o usuário atual */
export function getUser(): User | null {
  return currentUser;
}

/** Atualiza usuário (dev ou produção) */
export function setUser(user: User) {
  currentUser = user;
}

/** Muda o papel do usuário (apenas dev) */
export function switchRole(role: Role) {
  if (process.env.NODE_ENV === "development") {
    currentUser = DEV_USERS.find((u) => u.role === role) || DEV_USERS[0];
  }
}