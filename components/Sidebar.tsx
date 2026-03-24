// src/components/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hourglass,
  Loader,
  CheckCircle,
  History,
  Bell,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItem = (
    href: string,
    label: string,
    Icon: React.ElementType
  ) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`
          flex items-center px-3 py-2 rounded-lg text-sm transition
          ${collapsed ? "justify-center" : "gap-3"}
          ${active ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}
        `}
      >
        <Icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={`
        h-screen flex flex-col
        border-r border-gray-200 bg-white
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Top */}
      <div className="flex items-center justify-end p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-900"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Itens superiores */}
      <nav className="px-2 space-y-1">
        {navItem("/historico", "Histórico", History)}
        {navItem("/notificacoes", "Notificações", Bell)}
      </nav>

      {/* Divider */}
      <div className="my-4 flex justify-center">
        <div className="w-4/5 border-t border-gray-100" />
        </div>

      {/* Grupo: Solicitações */}
      {!collapsed && (
        <span className="px-4 text-xs font-semibold text-gray-400 uppercase">
          Solicitações
        </span>
      )}

      <nav className="mt-2 px-2 space-y-1">
        {navItem("/pendentes", "Pendentes", Hourglass)}
        {navItem("/em-andamento", "Em andamento", Loader)}
        {navItem("/concluidas", "Concluídas", CheckCircle)}
      </nav>

      {/* Rodapé */}
      <div className="mt-auto p-4">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-black" />
          {!collapsed && <span className="text-sm">Jane Doe</span>}
        </div>
      </div>
    </aside>
  );
}