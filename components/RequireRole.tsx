// src/components/RequireRole.tsx
import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";
import { Role } from "@/types/user";

interface AuthProps {
  roles: Role[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RequireRole({ roles, children, fallback = <p>Acesso negado</p> }: AuthProps) {
  const { user } = useUser();

  if (!user || !roles.includes(user.role)) return <>{fallback}</>;

  return <>{children}</>;
}