"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import NewRequestFab from "@/components/NewRequestFab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar lateral */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Área principal */}
      <div
        className="flex flex-1 flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? "5rem" : "16rem" }} // Ajusta conforme w-20 ou w-64 da Sidebar
      >
        <Topbar />

        <main className="flex-1 p-6 relative bg-gray-50 transition-all duration-300">
          {children}
          <NewRequestFab />
        </main>
      </div>
    </div>
  );
}