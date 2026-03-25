// src/app/historico/page.tsx
import Link from "next/link";
import { apos } from "@/data/apos";

export default function HistoricoPage() {
  const completedApos = apos
    .filter(
      (apo) =>
        (apo.status === "APROVADA" || apo.status === "REJEITADA") &&
        apo.completedAt
    )
    .sort(
      (a, b) =>
        new Date(b.completedAt!).getTime() -
        new Date(a.completedAt!).getTime()
    );

  return (
    <main className="flex-1 px-2 sm:px-4 py-2 sm:py-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold text-gray-900">Histórico</h1>
      </div>

      {/* Grid */}
      {completedApos.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhuma APO concluída.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {completedApos.map((apo) => (
            <Link key={apo.id} href={`/apos/${apo.id}`} className="group">
              <article className="bg-white rounded-xl border border-gray-200 p-4 w-full transition hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {/* Código da APO */}
                <span className="inline-block text-xs font-semibold text-gray-600">
                  {apo.codigoApo}
                </span>

                {/* Nome do aluno */}
                <h2 className="mt-2 text-sm font-medium text-gray-900 group-hover:underline">
                  {apo.nome}
                </h2>

                {/* Programa / Semestre */}
                <p className="mt-1 text-xs text-gray-500">
                  {apo.program} — {apo.semestre}
                </p>

                {/* Status final */}
                <p
                  className={`mt-2 text-xs font-semibold ${
                    apo.status === "APROVADA"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {apo.status === "APROVADA" ? "Aprovada" : "Rejeitada"}
                </p>

                {/* Data */}
                <p className="mt-4 text-xs text-gray-400">
                  Concluída em{" "}
                  {new Date(apo.completedAt!).toLocaleDateString("pt-BR")}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}