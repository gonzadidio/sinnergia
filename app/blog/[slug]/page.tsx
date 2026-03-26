import { createServerClient } from "@/lib/supabase-server";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { mockPosts } from "@/lib/mock-data";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .single();

  if (post) {
    return { title: post.title, description: post.excerpt || undefined };
  }

  const mock = mockPosts.find((p) => p.slug === params.slug);
  if (mock) {
    return { title: mock.title, description: mock.excerpt || undefined };
  }

  return { title: "Articulo no encontrado" };
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerClient();

  const { data: dbPost } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  const post = dbPost || mockPosts.find((p) => p.slug === params.slug);

  if (!post) notFound();

  // Related posts
  const { data: dbRelated } = await supabase
    .from("blog_posts")
    .select("title, slug, category, reading_time")
    .eq("published", true)
    .eq("category", post.category)
    .neq("slug", params.slug)
    .limit(3);

  const related = dbRelated?.length
    ? dbRelated
    : mockPosts
        .filter((p) => p.category === post.category && p.slug !== params.slug)
        .map((p) => ({ title: p.title, slug: p.slug, category: p.category, reading_time: p.reading_time }));

  return (
    <main className="bg-[#050505] min-h-screen">
      <Navbar />

      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <Badge variant="gradient" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.reading_time} min de lectura
            </span>
          </div>

          {/* Cover */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mt-10 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/50 via-brand-cyan-900/30 to-brand-magenta-900/50" />
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-brand-purple-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related */}
          {related && related.length > 0 && (
            <div className="mt-20 pt-10 border-t border-white/10">
              <h3 className="text-xl font-display font-bold text-white mb-8">Articulos relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="glass rounded-xl p-5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Badge variant="default" className="mb-3">{r.category}</Badge>
                    <h4 className="font-medium text-white group-hover:text-gradient transition-all line-clamp-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-2">{r.reading_time} min</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
