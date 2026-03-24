// src/app/(dashboard)/concluidas/page.tsx
import RequestCard from "@/components/RequestCard";
import { requests } from "@/data/requests";

export default function ConcluidasPage() {
  const completed = requests.filter(
    (r) => r.status === "Concluída"
  );

  return (
    <section className="p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Concluídas</h1>
        <p className="text-gray-500">
          {completed.length} Solicitações concluídas
        </p>
      </header>

      {completed.length === 0 ? (
        <p className="text-gray-400">Nenhuma solicitação concluída.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {completed.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </section>
  );
}