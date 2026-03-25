// src/data/apos.ts
import type { Apo } from "@/types/apo";

export const apos: Apo[] = [
  {
    id: "1",
    codigoApo: "APO-2024-001",
    nome: "Aluno Teste",
    matricula: "123456",
    program: "Ciência da Computação",
    semestre: "2024.1",
    orientador: "Prof. João",
    coordenador: "Profa. Maria",

    status: "PENDENTE_ORIENTADOR",

    activities: [
      { label: "Iniciação científica", points: 40 },
      { label: "Monitoria", points: 20 },
    ],

    totalPoints: 60,

    files: [
      { name: "relatorio.pdf", url: "#" },
    ],

    approvals: [],

    requiredCommissionApprovals: 3,
  },
];