"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus } from "lucide-react";
import { generateSlug } from "@/lib/utils";
import { createProject, updateProject, deleteProject } from "@/app/admin/actions";
import type { Project, Client } from "@/types/database";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Project | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", description: "", client_id: "",
    category: "general", images: [] as string[], results_text: "",
    featured: false, order: 0,
  });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("projects").select("*, client:clients(*)").order("order"),
      supabase.from("clients").select("*"),
    ]);
    setProjects(p || []);
    setClients(c || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ title: "", slug: "", description: "", client_id: "", category: "general", images: [], results_text: "", featured: false, order: 0 });
    setModalOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm({
      title: p.title, slug: p.slug, description: p.description,
      client_id: p.client_id || "", category: p.category,
      images: p.images || [], results_text: p.results_text || "",
      featured: p.featured, order: p.order,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = { ...form, client_id: form.client_id || null, results_text: form.results_text || null };
    if (editing) {
      await updateProject(editing.id, data);
    } else {
      await createProject(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteProject(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "title", label: "Titulo", sortable: true },
    { key: "category", label: "Categoria", sortable: true },
    { key: "featured", label: "Destacado", render: (p: Project) => p.featured ? "Si" : "No" },
    { key: "order", label: "Orden", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Proyectos</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona el portfolio de la agencia</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Proyecto</Button>
      </div>

      <DataTable
        data={projects}
        columns={columns}
        onEdit={(p) => openEdit(p as Project)}
        onDelete={(p) => setDeleteModal(p as Project)}
        searchKey="title"
      />

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Proyecto" : "Nuevo Proyecto"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Titulo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : generateSlug(e.target.value) })} required />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          <Textarea label="Descripcion" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Cliente</label>
              <select value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-3 px-4 focus:outline-none focus:border-brand-purple-500/50">
                <option value="">Sin cliente</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Input label="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <Input label="Resultados" value={form.results_text} onChange={(e) => setForm({ ...form, results_text: e.target.value })} placeholder="+250% engagement" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Orden" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded" id="featured" />
              <label htmlFor="featured" className="text-sm text-gray-300">Destacado</label>
            </div>
          </div>
          <ImageUpload value={form.images[0] || ""} onChange={(url) => setForm({ ...form, images: url ? [url] : [] })} folder="projects" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Proyecto" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar &quot;{deleteModal?.title}&quot;? Esta accion no se puede deshacer.</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
