"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DEV_USERS } from "@/mocks/users";
import type { Role, User } from "@/types/user";

interface UserContextData {
  user: User | null;
  role: Role | null;
  setUserById: (id: string) => void;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Usuário inicial em modo DEV (altere aqui para simular)
  const [user, setUser] = useState<User | null>(DEV_USERS[0]); // aluno por padrão

  const setUserById = (id: string) => {
    const found = DEV_USERS.find((u) => u.id === id) || null;
    setUser(found);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        setUserById,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}