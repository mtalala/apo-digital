// src/domain/apoStatusColor.ts
import type { ApoStatus } from "./apoStatus";

export function getApoStatusColor(status: ApoStatus): string {
  switch (status) {
    case "APROVADA":
      return "bg-green-600";
    case "REJEITADA":
      return "bg-red-600";
    case "PENDENTE_ORIENTADOR":
    case "PENDENTE_COMISSAO":
    case "PENDENTE_COORDENACAO":
      return "bg-yellow-600";
    default:
      return "bg-gray-400";
  }
}