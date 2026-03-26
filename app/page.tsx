import { createServerClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CustomCursor } from "@/components/animations/custom-cursor";
import { MarqueeBand } from "@/components/animations/marquee";
import { mockServices, mockProjects, mockTeam, mockTestimonials, mockPosts } from "@/lib/mock-data";

export default async function Home() {
  const supabase = createServerClient();

  const [
    { data: services },
    { data: projects },
    { data: team },
    { data: testimonials },
    { data: posts },
  ] = await Promise.all([
    supabase.from("services").select("*").order("order"),
    supabase
      .from("projects")
      .select("*, client:clients(*)")
      .eq("featured", true)
      .order("order"),
    supabase.from("team_members").select("*").order("order"),
    supabase.from("testimonials").select("*, client:clients(*)"),
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3),
  ]);

  return (
    <main className="bg-[#050505] min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <MarqueeBand />
      <Services services={services?.length ? services : mockServices} />
      <Portfolio projects={projects?.length ? projects : mockProjects} />
      <About team={team?.length ? team : mockTeam} />
      <Testimonials testimonials={testimonials?.length ? testimonials : mockTestimonials} />
      <BlogPreview posts={posts?.length ? posts : mockPosts} />
      <Contact />
      <Footer />
    </main>
  );
}
