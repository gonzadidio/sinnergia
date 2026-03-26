import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase-server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sinnergia.com";

  const [{ data: projects }, { data: posts }] = await Promise.all([
    supabase.from("projects").select("slug, created_at"),
    supabase.from("blog_posts").select("slug, created_at").eq("published", true),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const projectPages: MetadataRoute.Sitemap = (projects || []).map((p: { slug: string; created_at: string }) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = (posts || []).map((p: { slug: string; created_at: string }) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
