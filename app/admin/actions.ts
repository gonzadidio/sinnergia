"use server";

import { createServerClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

// ============ PROJECTS ============

export async function createProject(data: {
  title: string;
  slug: string;
  description: string;
  client_id: string | null;
  category: string;
  images: string[];
  results_text: string | null;
  featured: boolean;
  order: number;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("projects").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function updateProject(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("projects").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

// ============ CLIENTS ============

export async function createClientAction(data: {
  name: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("clients").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function updateClient(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("clients").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

export async function deleteClient(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/clients");
  revalidatePath("/");
  return { success: true };
}

// ============ SERVICES ============

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("services").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

export async function updateService(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("services").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/services");
  revalidatePath("/");
  return { success: true };
}

// ============ TEAM ============

export async function createTeamMember(data: {
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  social_links: Record<string, string>;
  order: number;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("team_members").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}

export async function updateTeamMember(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("team_members").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/team");
  revalidatePath("/");
  return { success: true };
}

// ============ TESTIMONIALS ============

export async function createTestimonial(data: {
  client_id: string | null;
  quote: string;
  author_name: string;
  author_role: string;
  rating: number;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("testimonials").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("testimonials").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

// ============ BLOG ============

export async function createBlogPost(data: {
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  published: boolean;
  reading_time: number;
}) {
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}

export async function updateBlogPost(id: string, data: Record<string, unknown>) {
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/");
  return { success: true };
}

// ============ MESSAGES ============

export async function updateMessageStatus(id: string, status: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = createServerClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/messages");
  return { success: true };
}

// ============ SITE CONFIG ============

export async function updateSiteConfig(key: string, value: string) {
  const supabase = createServerClient();
  const { error } = await supabase
    .from("site_config")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) return { error: error.message };
  revalidatePath("/admin/settings");
  revalidatePath("/");
  return { success: true };
}
