// src/app/historico/page.tsx
import { requests } from "@/data/requests";

export default function HistoricoPage() {
  const historyRequests = requests
    .filter((req) => req.status === "Concluída" && req.completedAt)
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
      {historyRequests.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhuma solicitação concluída.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {historyRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl border border-gray-200 p-4 w-full"
            >
              {/* Categoria */}
              <span
                className={`inline-block text-xs font-semibold text-white px-2 py-1 rounded ${request.color}`}
              >
                {request.category}
              </span>

              {/* Título */}
              <h2 className="mt-3 text-sm font-medium text-gray-900">
                {request.title}
              </h2>

              {/* Nível */}
              <p className="mt-1 text-xs text-gray-500">{request.level}</p>

              {/* Data */}
              <p className="mt-4 text-xs text-gray-400">
                Concluído em{" "}
                {new Date(request.completedAt!).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}