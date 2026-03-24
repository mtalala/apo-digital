import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import NewRequestFab from "@/components/NewRequestFab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar lateral */}
      <Sidebar />

      {/* Área principal */}
      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-6 relative bg-gray-50">
          {children}
          <NewRequestFab />
        </main>
      </div>
    </div>
  );
}