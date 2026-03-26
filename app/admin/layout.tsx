import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <AdminSidebar />
      <div className="lg:ml-64">
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
