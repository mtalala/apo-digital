"use client";

import { useEffect, useState } from "react";

import RequestCard from "@/components/RequestCard";
import RequestCardSkeleton from "@/components/RequestCardSkeleton";

import { apos } from "@/data/apos";
import { getApoVisualStatus } from "@/domain/apoVisualStatus";

export default function EmAndamentoPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulação de loading (remove quando virar API)
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const emAndamento = apos.filter(
    (apo) => getApoVisualStatus(apo.status) === "EM_ANDAMENTO"
  );

  return (
    <section className="p-0 sm:px-4 sm:py-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Em andamento</h1>
        <p className="text-gray-500">
          {emAndamento.length} APOs em andamento
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <RequestCardSkeleton key={i} />
          ))}
        </div>
      ) : emAndamento.length === 0 ? (
        <p className="text-gray-400">Nenhuma APO em andamento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {emAndamento.map((apo) => (
            <RequestCard key={apo.id} apo={apo} />
          ))}
        </div>
      )}
    </section>
  );
}