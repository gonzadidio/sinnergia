import { createServerClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { BlogGrid } from "./blog-grid";
import { mockPosts } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articulos, guias y tendencias de marketing digital, branding, SEO y mas.",
};

export default async function BlogPage() {
  const supabase = createServerClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-sm text-brand-purple-400 font-medium tracking-wider uppercase">Blog</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-display font-bold text-white">
              Insights & <span className="text-gradient">Tendencias</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-xl text-lg">
              Ideas, estrategias y conocimiento para llevar tu marca al siguiente nivel.
            </p>
          </div>
          <BlogGrid posts={posts?.length ? posts : mockPosts} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
