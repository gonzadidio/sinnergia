import { createServerClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PortfolioGrid } from "./portfolio-grid";
import { mockProjects } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Conoce nuestros proyectos y casos de exito. Resultados reales para marcas reales.",
};

export default async function PortfolioPage() {
  const supabase = createServerClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*, client:clients(*)")
    .order("order");

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-brand-purple-400 font-medium tracking-wider uppercase">
              Portfolio
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white">
              Nuestro <span className="text-gradient">Trabajo</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl text-lg">
              Cada proyecto es una historia de transformacion. Descubre como hemos ayudado a nuestros clientes a crecer.
            </p>
          </div>
          <PortfolioGrid projects={projects?.length ? projects : mockProjects} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
