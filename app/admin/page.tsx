import { createServerClient } from "@/lib/supabase-server";
import { FolderOpen, Users, FileText, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboard() {
  const supabase = createServerClient();

  const [
    { count: projectsCount },
    { count: postsCount },
    { count: messagesCount },
    { count: teamCount },
    { data: recentMessages },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("team_members").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Proyectos", value: projectsCount || 0, icon: FolderOpen, href: "/admin/projects", color: "text-brand-purple-400 bg-brand-purple-500/20" },
    { label: "Posts Publicados", value: postsCount || 0, icon: FileText, href: "/admin/blog", color: "text-brand-cyan-400 bg-brand-cyan-500/20" },
    { label: "Mensajes Nuevos", value: messagesCount || 0, icon: MessageSquare, href: "/admin/messages", color: "text-brand-magenta-400 bg-brand-magenta-500/20" },
    { label: "Equipo", value: teamCount || 0, icon: Users, href: "/admin/team", color: "text-green-400 bg-green-500/20" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido al panel de administracion de Sinnergia</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-purple-500/20 text-brand-purple-400 text-sm font-medium hover:bg-brand-purple-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo Proyecto
        </Link>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-cyan-500/20 text-brand-cyan-400 text-sm font-medium hover:bg-brand-cyan-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo Post
        </Link>
      </div>

      {/* Recent Messages */}
      <div>
        <h2 className="text-lg font-display font-semibold text-white mb-4">Mensajes recientes</h2>
        <div className="glass rounded-2xl overflow-hidden">
          {recentMessages && recentMessages.length > 0 ? (
            <div className="divide-y divide-white/5">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-white font-medium text-sm">{msg.name}</p>
                      {msg.status === "new" && (
                        <span className="w-2 h-2 rounded-full bg-brand-cyan-400" />
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{msg.email}</p>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-1">{msg.message}</p>
                  </div>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">No hay mensajes nuevos</div>
          )}
        </div>
      </div>
    </div>
  );
}
