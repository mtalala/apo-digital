"use client";

import { useState } from "react";
import { CheckCheck, Eye } from "lucide-react";
import { notifications as mockNotifications } from "@/data/notifications";
import { timeAgo } from "@/utils/timeAgo";
import { Notification } from "@/types/notification";

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getMessage = (role: Notification["role"]) =>
    role === "Aluno"
      ? "Você recebeu uma atualização na sua solicitação"
      : "Você recebeu uma solicitação de aprovação";

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <>
      {/* BOTÃO FIXO: totalmente desacoplado, sempre no canto superior direito */}
      {hasUnread && (
        <button
          onClick={markAllAsRead}
          aria-label="Marcar todas como lidas"
          className="fixed top-24 right-6 z-30 p-2 text-red-600 hover:text-red-700 rounded-full transition-colors duration-300"
        >
          <CheckCheck className="w-6 h-6" />
        </button>
      )}

      {/* CONTEÚDO PRINCIPAL */}
     <main className="flex-1 px-2 sm:px-6 py-2 sm:py-4 max-w-4xl flex flex-col mx-auto">
        {/* Wrapper com space-y entre header e lista */}
        <div className="flex flex-col space-y-4">
            {/* Header */}
            <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notificações</h1>
            <p className="text-sm text-gray-500">
                Acompanhe as atualizações das suas solicitações
            </p>
            </div>

            {/* Lista de notificações */}
            <div className="flex flex-col space-y-3 overflow-y-auto pb-10">
            {notifications.map((n) => (
                <div
                key={n.id}
                className="relative flex items-start bg-white border border-gray-200 rounded-lg p-4 w-full"
                >
                {/* Stroke esquerda */}
                <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${n.requestColor}`}
                />

                {/* Conteúdo */}
                <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold text-gray-900">{getMessage(n.role)}</p>
                    <p className="mt-1 text-xs text-gray-500">
                    {timeAgo(n.createdAt)} • {n.topic}
                    </p>
                </div>

                {/* Ações mobile: ícone olho + pontinho de não lido */}
                {!n.read && (
                    <div className="ml-4 flex flex-col items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <button
                        onClick={() => markAsRead(n.id)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        aria-label="Marcar como lido"
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        </main>
    </>
  );
}