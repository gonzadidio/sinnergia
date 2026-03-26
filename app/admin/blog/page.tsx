"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichEditor } from "@/components/admin/rich-editor";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus } from "lucide-react";
import { generateSlug, estimateReadingTime } from "@/lib/utils";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/admin/actions";
import type { BlogPost } from "@/types/database";

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<BlogPost | null>(null);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "",
    cover_image: "", category: "general", published: false,
  });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ title: "", slug: "", content: "", excerpt: "", cover_image: "", category: "general", published: false });
    setModalOpen(true);
  }

  function openEdit(p: BlogPost) {
    setEditing(p);
    setForm({
      title: p.title, slug: p.slug, content: p.content,
      excerpt: p.excerpt || "", cover_image: p.cover_image || "",
      category: p.category, published: p.published,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...form,
      excerpt: form.excerpt || null,
      cover_image: form.cover_image || null,
      reading_time: estimateReadingTime(form.content),
    };
    if (editing) {
      await updateBlogPost(editing.id, data);
    } else {
      await createBlogPost(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteBlogPost(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "title", label: "Titulo", sortable: true },
    { key: "category", label: "Categoria", sortable: true },
    { key: "published", label: "Estado", render: (p: BlogPost) => (
      <span className={`px-2 py-1 rounded-full text-xs ${p.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
        {p.published ? "Publicado" : "Borrador"}
      </span>
    )},
    { key: "reading_time", label: "Lectura", render: (p: BlogPost) => `${p.reading_time} min` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona las publicaciones del blog</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Post</Button>
      </div>

      <DataTable data={posts} columns={columns} onEdit={(p) => openEdit(p as BlogPost)} onDelete={(p) => setDeleteModal(p as BlogPost)} searchKey="title" />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Post" : "Nuevo Post"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Input label="Titulo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : generateSlug(e.target.value) })} required />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          <Textarea label="Extracto" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded" id="published" />
              <label htmlFor="published" className="text-sm text-gray-300">Publicado</label>
            </div>
          </div>
          <ImageUpload value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} folder="blog" />
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contenido</label>
            <RichEditor value={form.content} onChange={(val) => setForm({ ...form, content: val })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Post" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar &quot;{deleteModal?.title}&quot;?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
