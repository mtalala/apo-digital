"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Hourglass,
  Loader,
  CheckCircle,
  History,
  Bell,
  Columns,
  X,
} from "lucide-react";

interface User {
  name: string;
  avatar: string; // URL da imagem
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  // Placeholder para simular carregamento da API
  useEffect(() => {
    // futuramente substituir por fetch('/api/user')
    setTimeout(() => {
      setUser({
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?img=32",
      });
    }, 500);
  }, []);

  const navItem = (href: string, label: string, Icon: React.ElementType) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        onClick={() => {
          if (window.innerWidth < 768) {
            setCollapsed(true);
          }
        }}
        className={`
          flex items-center overflow-hidden rounded-lg
          h-16 md:h-11
          ${collapsed ? "justify-center w-11" : "justify-start w-full px-3 gap-3"}
          ${active ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"}
          transition-all duration-300
        `}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span
          className={`transition-opacity duration-300 text-sm ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Botão hamburger fixo no mobile */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 text-black hover:text-gray-900 transition-colors duration-300 md:hidden"
        aria-label={collapsed ? "Abrir menu" : "Fechar menu"}
      >
        {collapsed ? <Columns className="w-8 h-8" strokeWidth={1} /> : <X className="w-8 h-8" strokeWidth={1} />}
      </button>

    <aside
  className={`
    fixed top-0 left-0 h-screen flex flex-col
    border-r border-gray-200 bg-white
    z-40
    transition-all duration-300 transform
    w-full                 /* mobile: ocupa 100% */
    ${collapsed ? "-translate-x-full md:w-15" : "translate-x-0 md:w-64"}
    md:translate-x-0       /* desktop: nunca some */
  `}
  style={{
    paddingTop: "env(safe-area-inset-top)",
  }}
>
        {/* Top */}
        <div
          className={`flex items-center p-4 ${
            collapsed ? "justify-center" : "justify-end"
          }`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-gray-900 transition-colors duration-300 hidden md:block"
            aria-label="Abrir ou recolher menu"
          >
            <Columns className="w-5 h-5" strokeWidth={1} />
          </button>
        </div>

        {/* Itens superiores */}
        <nav
          className={`px-2 space-y-1 flex flex-col mt-20 md:mt-0 ${
            collapsed ? "items-center" : "items-start"
          } transition-all duration-300`}
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
          className={`mt-2 px-2 space-y-1 flex flex-col ${
            collapsed ? "items-center" : "items-start"
          } transition-all duration-300`}
        >
          {navItem("/pendentes", "Pendentes", Hourglass)}
          {navItem("/em-andamento", "Em andamento", Loader)}
          {navItem("/concluidas", "Concluídas", CheckCircle)}
        </nav>

       {/* Rodapé com usuário */}
        {user && (
        <div className="mt-auto transition-all duration-300">
            <div
            className={`flex items-center gap-3 ${
                collapsed ? "justify-center" : "justify-start"
            }`}
            style={{
                paddingBottom: "calc(env(safe-area-inset-bottom) + 30px)", 
                paddingLeft: "calc(env(safe-area-inset-left) + 30px)",
                paddingRight: "calc(env(safe-area-inset-right) + 30px)",
            }}
            >
            <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
                />
            </div>
            <span
                className={`transition-opacity duration-300 text-sm ${
                collapsed ? "opacity-0 w-0" : "opacity-100 w-full"
                }`}
            >
                {user.name}
            </span>
            </div>
        </div>
        )}
      </aside>
    </>
  );
}