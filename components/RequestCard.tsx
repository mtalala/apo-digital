"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import type { Apo } from "@/types/apo";

import { getApoVisualStatus } from "@/domain/apoVisualStatus";
import { getApoVisualStatusLabel } from "@/domain/apoVisualStatusLabel";
import { getApoVisualStatusColor } from "@/domain/apoVisualStatusColor";

import { APO_DECORATIVE_COLORS } from "@/data/apoDecorativeColors";

interface Props {
  apo?: Apo;
}

/**
 * Gera um índice determinístico a partir do id da APO
 */
function getDecorativeColorByApoId(id: string): string {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % APO_DECORATIVE_COLORS.length;
  return APO_DECORATIVE_COLORS[index];
}

export default function RequestCard({ apo }: Props) {
  const router = useRouter();
  const { user } = useUser();

  // 🔒 Blindagem total
  if (!user || !apo) return null;

  const visualStatus = getApoVisualStatus(apo.status);
  const statusLabel = getApoVisualStatusLabel(visualStatus);
  const statusColor = getApoVisualStatusColor(visualStatus);
  const decorativeColor = getDecorativeColorByApoId(apo.id);

  const mainActivityLabel =
    apo.activities.length > 0
      ? apo.activities[0].label
      : "Atividade não informada";

  return (
    <div
      onClick={() => router.push(`/apos/${apo.id}`)}
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Barra decorativa com status */}
      <div
        className="flex h-12 items-center justify-end px-4"
        style={{ backgroundColor: decorativeColor }}
      >
        <span
          className={`text-xs font-medium px-3 py-0.5 rounded-full text-white ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5 space-y-2">
        <span className="inline-block rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500">
          APO
        </span>

        {/* 🔹 ATIVIDADE (em vez do código) */}
        <h3 className="font-semibold leading-snug text-gray-900">
          {mainActivityLabel}
        </h3>

        <p className="text-sm text-gray-500">
          {apo.nome} — {apo.program}
        </p>
      </div>
    </div>
  );
}