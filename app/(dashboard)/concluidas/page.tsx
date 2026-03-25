// src/app/(dashboard)/concluidas/page.tsx
import RequestCard from "@/components/RequestCard";
import { apos } from "@/data/apos";
import { getApoVisualStatus } from "@/domain/apoVisualStatus";

export default function ConcluidasPage() {
  const concluidas = apos.filter(
    (apo) =>
      getApoVisualStatus(apo.status) === "CONCLUIDA"
  );

  return (
    <section className="p-0 sm:px-4 sm:py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Concluídas</h1>
        <p className="text-gray-500">
          {concluidas.length} APOs concluídas
        </p>
      </header>

      {concluidas.length === 0 ? (
        <p className="text-gray-400">
          Nenhuma APO concluída.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {concluidas.map((apo) => (
            <RequestCard key={apo.id} apo={apo} />
          ))}
        </div>
      )}
    </section>
  );
}