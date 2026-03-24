// src/app/pendentes/page.tsx
import RequestCard from "@/components/RequestCard";
import { requests } from "@/data/requests";

export default function PendentesPage() {
  const pendingRequests = requests.filter(
    (request) => request.status === "Pendente"
  );

  return (
    <section className="p-4">
      {/* Título */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Pendentes</h1>
        <p className="text-gray-500">
          {pendingRequests.length} Solicitações Pendentes
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {pendingRequests.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </section>
  );
}