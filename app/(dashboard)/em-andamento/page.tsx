// src/app/(dashboard)/em-andamento/page.tsx
import RequestCard from "@/components/RequestCard";
import { requests } from "@/data/requests";

export default function EmAndamentoPage() {
  const inProgress = requests.filter((r) => r.status === "Em andamento");

  return (
    <section className="p-0 sm:px-4 sm:py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Em andamento</h1>
        <p className="text-gray-500">
          {inProgress.length} Solicitações em andamento
        </p>
      </header>

      {inProgress.length === 0 ? (
        <p className="text-gray-400">Nenhuma solicitação em andamento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {inProgress.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </section>
  );
}