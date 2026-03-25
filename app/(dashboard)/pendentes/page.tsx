// src/app/(dashboard)/pendentes/page.tsx
import RequestCard from "@/components/RequestCard";
import { apos } from "@/data/apos";
import { getApoVisualStatus } from "@/domain/apoVisualStatus";

export default function PendentesPage() {
  const pendentes = apos.filter(
    (apo) => getApoVisualStatus(apo.status) === "PENDENTE"
  );

  return (
    <section className="p-0 sm:px-4 sm:py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Pendentes</h1>
        <p className="text-gray-500">
          {pendentes.length} APOs pendentes
        </p>
      </header>

      {pendentes.length === 0 ? (
        <p className="text-gray-400">
          Nenhuma APO pendente.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendentes.map((apo) => (
            <RequestCard key={apo.id} apo={apo} />
          ))}
        </div>
      )}
    </section>
  );
}