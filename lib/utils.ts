import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import slugifyLib from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
}

export function generateSlug(title: string) {
  return slugifyLib(title, { lower: true, strict: true });
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-assets/${path}`;
}

export function estimateReadingTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export const iconMap: Record<string, string> = {
  megaphone: "Megaphone",
  palette: "Palette",
  globe: "Globe",
  trending: "TrendingUp",
  code: "Code",
  camera: "Camera",
  mail: "Mail",
  share: "Share2",
  bar: "BarChart3",
  pen: "PenTool",
  layout: "Layout",
  zap: "Zap",
};
