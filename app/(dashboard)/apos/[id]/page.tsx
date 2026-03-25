"use client";

import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { getApoById, approveApo, rejectApo } from "@/services/apoService";
import { canApproveApo } from "@/domain/apoRules";
import { getApoStatusLabel } from "@/domain/apoStatusLabel";
import { getApoStatusColor } from "@/domain/apoStatusColor";

export default function ApoViewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  // ⚠️ Normalização obrigatória no App Router
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <p className="p-6">ID inválido.</p>;
  }

  const apo = getApoById(id);

  if (!apo) {
    return <p className="p-6">APO não encontrada.</p>;
  }

  const allowedToApprove = canApproveApo(apo, user);

  const handleApprove = () => {
    approveApo(apo.id, user.id, user.role);
    router.refresh();
  };

  const handleReject = () => {
    rejectApo(apo.id);
    router.refresh();
  };

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          APO {apo.codigoApo}
        </h1>

        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${getApoStatusColor(
            apo.status
          )}`}
        >
          {getApoStatusLabel(apo.status)}
        </span>
      </header>

      {/* Dados principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Aluno" value={apo.nome} />
        <Field label="Matrícula" value={apo.matricula} />
        <Field label="Programa" value={apo.program} />
        <Field label="Semestre" value={apo.semestre} />
        <Field label="Orientador" value={apo.orientador} />
        <Field label="Coordenador" value={apo.coordenador} />
      </div>

      {/* Atividades */}
      <div>
        <h2 className="font-semibold mb-2">Atividades</h2>
        <ul className="list-disc pl-6">
          {apo.activities.map((a, i) => (
            <li key={i}>
              {a.label} — {a.points} pts
            </li>
          ))}
        </ul>
        <p className="mt-2 font-medium">
          Total: {apo.totalPoints} pts
        </p>
      </div>

      {/* Arquivos */}
      <div>
        <h2 className="font-semibold mb-2">Arquivos</h2>
        <ul className="list-disc pl-6">
          {apo.files.map((f, i) => (
            <li key={i}>
              <a href={f.url} className="text-blue-600 underline">
                {f.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Ações */}
      {allowedToApprove && (
        <div className="flex gap-4 pt-4">
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Aprovar
          </button>

          <button
            onClick={handleReject}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Rejeitar
          </button>
        </div>
      )}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}