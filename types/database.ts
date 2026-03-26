export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client_id: string | null;
  category: string;
  images: string[];
  results_text: string | null;
  featured: boolean;
  order: number;
  created_at: string;
  client?: Client;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website: string | null;
  industry: string | null;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  social_links: Record<string, string>;
  order: number;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_id: string | null;
  quote: string;
  author_name: string;
  author_role: string;
  rating: number;
  created_at: string;
  client?: Client;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  category: string;
  published: boolean;
  reading_time: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export interface SiteConfig {
  id: string;
  key: string;
  value: string;
}

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "client">;
        Update: Partial<Omit<Project, "id" | "created_at" | "client">>;
      };
      clients: {
        Row: Client;
        Insert: Omit<Client, "id" | "created_at">;
        Update: Partial<Omit<Client, "id" | "created_at">>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, "id" | "created_at">;
        Update: Partial<Omit<Service, "id" | "created_at">>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, "id" | "created_at">;
        Update: Partial<Omit<TeamMember, "id" | "created_at">>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "client">;
        Update: Partial<Omit<Testimonial, "id" | "created_at" | "client">>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, "id" | "created_at">;
        Update: Partial<Omit<BlogPost, "id" | "created_at">>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, "id" | "created_at">;
        Update: Partial<Omit<ContactSubmission, "id" | "created_at">>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Omit<SiteConfig, "id">;
        Update: Partial<Omit<SiteConfig, "id">>;
      };
    };
  };
};
