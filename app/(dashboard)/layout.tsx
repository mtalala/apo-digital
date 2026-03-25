"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import NewRequestFab from "@/components/NewRequestFab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Ocultar botão apenas na página de /solicitacoes
  const showFab = pathname !== "/solicitacoes";

  // Largura da sidebar em px (desktop)
  const sidebarWidth = collapsed ? 60 : 256; // 5rem ou 16rem

  return (
    <div className="flex min-h-screen">
      {/* Sidebar lateral */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Container que ajusta Topbar e Main */}
      <div
        className="flex flex-1 flex-col transition-all duration-300 ml-0 md:ml-[var(--sidebar-width)]"
        style={{ "--sidebar-width": `${sidebarWidth}px` } as React.CSSProperties}
      >
        {/* Topbar ajustada */}
        <Topbar sidebarWidth={sidebarWidth} />

        {/* Conteúdo principal */}
        <main className="flex-1 pt-20 p-6 relative bg-gray-50 transition-all duration-300">
          {children}
          {showFab && <NewRequestFab />}
        </main>
      </div>
    </div>
  );
}