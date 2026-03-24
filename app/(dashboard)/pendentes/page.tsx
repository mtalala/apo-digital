// src/app/pendentes/page.tsx
import RequestCard from "@/components/RequestCard";
import { requests } from "@/data/requests";

export default function PendentesPage() {
  const pendingRequests = requests.filter(
    (request) => request.status === "Pendente"
  );

  return (
    <section className="p-0 sm:px-4 sm:py-4">
      {/* Título */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pendentes</h1>
        <p className="text-gray-500">
          {pendingRequests.length} Solicitações Pendentes
        </p>
      </header>

      {pendingRequests.length === 0 ? (
        <p className="text-gray-400">Nenhuma solicitação pendente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </section>
  );
}