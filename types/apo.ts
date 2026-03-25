// src/types/apo.ts
import type { ApoStatus } from "@/domain/apoStatus";
import type { Role } from "./user";

export interface ApoApproval {
  userId: string;
  role: Role;
  approved: boolean;
}

export interface Apo {
  id: string;
  codigoApo: string;
  nome: string;
  matricula: string;
  program: string;
  semestre: string;
  orientador: string;
  coordenador: string;

  status: ApoStatus;

  activities: {
    label: string;
    points: number;
  }[];

  totalPoints: number;

  files: {
    name: string;
    url: string;
  }[];

  approvals: ApoApproval[];

  requiredCommissionApprovals: number;
}