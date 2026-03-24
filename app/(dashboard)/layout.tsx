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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar lateral */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Área principal */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300
          ml-0 md:ml-${collapsed ? "20" : "64"} // Tailwind: w-20 ou w-64 da Sidebar
        `}
      >
        <Topbar />

        <main className="flex-1 p-6 relative bg-gray-50 transition-all duration-300">
          {children}
          {showFab && <NewRequestFab />}
        </main>
      </div>
    </div>
  );
}