import { FileText } from "lucide-react";
import { Program, Coordenador, Activity } from "@/types/types";

interface ApoDetailsProps {
  data: {
    programName: string;
    matricula: string;
    nome: string;
    orientador: string;
    coordenadorName: string;
    semestre: string;
    codigoApo: string;
    activities: { label: string; points: number }[];
    files: { name: string }[];
  };
}

export function ApoDetails({ data }: ApoDetailsProps) {
  const totalPoints = data.activities.reduce(
    (acc, a) => acc + a.points,
    0
  );

  return (
    <div className="space-y-6">
      {/* Dados gerais */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Programa" value={data.programName} />
        <Field label="Matrícula" value={data.matricula} />
        <Field label="Nome" value={data.nome} />
        <Field label="Orientador" value={data.orientador} />
        <Field label="Coordenador" value={data.coordenadorName} />
        <Field label="Semestre" value={data.semestre} />
        <Field label="Código da APO" value={data.codigoApo} />
      </section>

      {/* Atividades */}
      <section>
        <h2 className="font-semibold mb-2">Atividades desenvolvidas</h2>
        <div className="border rounded p-4 bg-gray-50 space-y-1">
          {data.activities.map((a, i) => (
            <p key={i} className="text-sm">
              • {a.label} ({a.points} pts)
            </p>
          ))}
        </div>
        <p className="mt-2 font-medium">
          Total de pontos: {totalPoints}
        </p>
      </section>

      {/* Arquivos */}
      <section>
        <h2 className="font-semibold mb-2">Arquivos anexados</h2>
        <div className="space-y-2">
          {data.files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border rounded p-2 bg-white"
            >
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{file.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}