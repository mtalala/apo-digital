// src/components/RequestCard.tsx
import { Request } from "@/data/requests";

interface Props {
  request: Request;
}

export default function RequestCard({ request }: Props) {
  const statusColor =
    request.status === "Concluída"
      ? "bg-green-600"
      : request.status === "Em andamento"
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header colorido */}
      <div className={`h-10 ${request.color} relative`}>
        <span
          className={`
            absolute right-3 top-2
            text-xs font-medium
            px-3 py-0.5 rounded-full text-white
            ${statusColor}
          `}
        >
          {request.status}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-5 space-y-2">
        <span className="text-xs text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 inline-block">
          {request.category}
        </span>

        <h3 className="font-semibold text-gray-900 leading-snug">
          {request.title}
        </h3>

        <p className="text-sm text-gray-500">{request.level}</p>
      </div>
    </div>
  );
}