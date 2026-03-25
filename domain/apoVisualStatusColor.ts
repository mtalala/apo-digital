// src/domain/apoVisualStatusColor.ts
import type { ApoVisualStatus } from "./apoVisualStatus";

export function getApoVisualStatusColor(
  status: ApoVisualStatus
): string {
  switch (status) {
    case "PENDENTE":
      return "bg-red-600";

    case "EM_ANDAMENTO":
      return "bg-yellow-600";

    case "CONCLUIDA":
      return "bg-green-600";
  }
}