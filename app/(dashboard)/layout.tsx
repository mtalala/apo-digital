// src/app/(dashboard)/layout.tsx
import NewRequestFab from "@/components/NewRequestFab";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <main className="flex-1 bg-gray-50 overflow-x-hidden">
        {children}
      </main>
      <NewRequestFab />
    </div>
  );
}