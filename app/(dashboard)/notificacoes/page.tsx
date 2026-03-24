// src/app/notificacoes/page.tsx
"use client";

import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { notifications as mockNotifications } from "@/data/notifications";
import { timeAgo } from "@/utils/timeAgo";
import { Notification } from "@/types/notification";

export default function NotificacoesPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );

    // Futuro:
    // POST /api/notifications/:id/read
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );

    // Futuro:
    // POST /api/notifications/read-all
  };

  const getMessage = (role: Notification["role"]) =>
    role === "Aluno"
      ? "Você recebeu uma atualização na sua solicitação"
      : "Você recebeu uma solicitação de aprovação";

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <main className="flex-1 p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Notificações
          </h1>
          <p className="text-sm text-gray-500">
            Acompanhe as atualizações das suas solicitações
          </p>
        </div>

        {hasUnread && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 text-sm text-red-600 hover:underline"
          >
            <CheckCheck className="w-4 h-4" />
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="relative flex items-start bg-white border border-gray-200 rounded-lg p-4"
          >
            {/* Stroke esquerda */}
            <div
              className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${n.requestColor}`}
            />

            {/* Conteúdo */}
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {getMessage(n.role)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {timeAgo(n.createdAt)} • {n.topic}
              </p>
            </div>

            {/* Ações */}
            {!n.read && (
              <div className="ml-4 flex flex-col items-end gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Marcar como lido
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}