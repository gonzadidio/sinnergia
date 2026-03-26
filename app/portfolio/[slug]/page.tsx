import { createServerClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProjects } from "@/lib/mock-data";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", params.slug)
    .single();

  if (project) {
    return { title: project.title, description: project.description };
  }

  const mock = mockProjects.find((p) => p.slug === params.slug);
  if (mock) {
    return { title: mock.title, description: mock.description };
  }

  return { title: "Proyecto no encontrado" };
}

export default async function ProjectPage({ params }: Props) {
  const supabase = createServerClient();

  const { data: dbProject } = await supabase
    .from("projects")
    .select("*, client:clients(*)")
    .eq("slug", params.slug)
    .single();

  const project = dbProject || mockProjects.find((p) => p.slug === params.slug);

  if (!project) notFound();

  // Get adjacent projects for navigation
  const { data: dbAllProjects } = await supabase
    .from("projects")
    .select("slug, title")
    .order("order");

  const allProjects = dbAllProjects?.length ? dbAllProjects : mockProjects.map((p) => ({ slug: p.slug, title: p.title }));

  const currentIndex = allProjects?.findIndex((p: { slug: string }) => p.slug === params.slug) ?? -1;
  const prevProject = currentIndex > 0 ? allProjects?.[currentIndex - 1] : null;
  const nextProject = currentIndex < (allProjects?.length ?? 0) - 1 ? allProjects?.[currentIndex + 1] : null;

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-950/20 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al portfolio
          </Link>

          <Badge variant="gradient" className="mb-4">{project.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
            {project.title}
          </h1>
          {project.client && (
            <p className="text-lg text-gray-400">
              Cliente: <span className="text-white">{project.client.name}</span>
            </p>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="px-6 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-[50vh] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/50 via-brand-cyan-900/30 to-brand-magenta-900/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-display font-bold text-white/5">{project.title.charAt(0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-display font-bold text-white mb-4">Sobre el proyecto</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
            </div>
            <div className="space-y-6">
              {project.results_text && (
                <div className="glass rounded-2xl p-6">
                  <p className="text-sm text-gray-400 mb-2">Resultados</p>
                  <p className="text-2xl font-display font-bold text-gradient">{project.results_text}</p>
                </div>
              )}
              <div className="glass rounded-2xl p-6">
                <p className="text-sm text-gray-400 mb-2">Categoria</p>
                <p className="text-white font-medium">{project.category}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.slug}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-gray-500">Anterior</p>
                  <p className="font-medium">{prevProject.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.slug}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-right group"
              >
                <div>
                  <p className="text-xs text-gray-500">Siguiente</p>
                  <p className="font-medium">{nextProject.title}</p>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
