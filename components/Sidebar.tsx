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
          transition-all duration-300 rounded-lg text-sm flex items-center
          h-11 overflow-hidden
          ${collapsed ? "w-11 justify-center" : "w-full px-3 gap-3 justify-start"}
          ${active ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}
        `}
      >
        <Icon className="h-5 w-5 shrink-0" /> {/* Sem transição de cor */}
        <span
          className={`transition-opacity duration-300 ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className={`
        h-screen flex flex-col
        border-r border-gray-200 bg-white
        transition-all duration-300 overflow-hidden
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Top */}
      <div
        className={`flex items-center p-4 ${collapsed ? "justify-center" : "justify-end"}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-gray-900 transition-colors duration-300"
          aria-label="Abrir ou recolher menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Itens superiores */}
      <nav
        className={`px-2 space-y-1 flex flex-col transition-all duration-300 ${
          collapsed ? "items-center" : "items-start"
        }`}
      >
        {navItem("/historico", "Histórico", History)}
        {navItem("/notificacoes", "Notificações", Bell)}
      </nav>

      {/* Divider */}
      <div className="my-4 flex justify-center">
        <div className="w-4/5 border-t border-gray-100 transition-all duration-300" />
      </div>

      {/* Grupo: Solicitações */}
      <span
        className={`px-4 text-xs font-semibold text-gray-400 uppercase transition-opacity duration-300 ${
          collapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
        }`}
      >
        Solicitações
      </span>

      <nav
        className={`mt-2 px-2 space-y-1 flex flex-col transition-all duration-300 ${
          collapsed ? "items-center" : "items-start"
        }`}
      >
        {navItem("/pendentes", "Pendentes", Hourglass)}
        {navItem("/em-andamento", "Em andamento", Loader)}
        {navItem("/concluidas", "Concluídas", CheckCircle)}
      </nav>

      {/* Rodapé */}
      <div className="mt-auto p-4 transition-all duration-300">
        <div
          className={`flex items-center gap-3 ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-black" />
          <span
            className={`transition-opacity duration-300 ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
            }`}
          >
            Jane Doe
          </span>
        </div>
      </div>
    </aside>
  );
}