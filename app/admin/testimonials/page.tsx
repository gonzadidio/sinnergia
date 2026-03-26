"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/app/admin/actions";
import type { Testimonial, Client } from "@/types/database";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Testimonial | null>(null);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ client_id: "", quote: "", author_name: "", author_role: "", rating: 5 });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const [{ data: t }, { data: c }] = await Promise.all([
      supabase.from("testimonials").select("*, client:clients(*)").order("created_at", { ascending: false }),
      supabase.from("clients").select("*"),
    ]);
    setTestimonials(t || []);
    setClients(c || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ client_id: "", quote: "", author_name: "", author_role: "", rating: 5 });
    setModalOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setForm({ client_id: t.client_id || "", quote: t.quote, author_name: t.author_name, author_role: t.author_role, rating: t.rating });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = { ...form, client_id: form.client_id || null };
    if (editing) {
      await updateTestimonial(editing.id, data);
    } else {
      await createTestimonial(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteTestimonial(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "author_name", label: "Autor", sortable: true },
    { key: "author_role", label: "Rol" },
    { key: "rating", label: "Rating", render: (t: Testimonial) => `${"★".repeat(t.rating)}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Testimonios</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los testimonios de clientes</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Testimonio</Button>
      </div>

      <DataTable data={testimonials} columns={columns} onEdit={(t) => openEdit(t as Testimonial)} onDelete={(t) => setDeleteModal(t as Testimonial)} searchKey="author_name" />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Testimonio" : "Nuevo Testimonio"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea label="Cita" value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nombre del autor" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} required />
            <Input label="Rol del autor" value={form.author_role} onChange={(e) => setForm({ ...form, author_role: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Cliente</label>
              <select value={form.client_id} onChange={(e) => setForm({ ...form, client_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-3 px-4 focus:outline-none focus:border-brand-purple-500/50">
                <option value="">Sin cliente</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Rating</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-3 px-4 focus:outline-none focus:border-brand-purple-500/50">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} estrellas</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Testimonio" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar este testimonio?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
