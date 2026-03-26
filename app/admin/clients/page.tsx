"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus } from "lucide-react";
import { createClientAction, updateClient, deleteClient } from "@/app/admin/actions";
import type { Client } from "@/types/database";

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Client | null>(null);
  const [editing, setEditing] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", logo_url: "", website: "", industry: "" });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
    setClients(data || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ name: "", logo_url: "", website: "", industry: "" });
    setModalOpen(true);
  }

  function openEdit(c: Client) {
    setEditing(c);
    setForm({ name: c.name, logo_url: c.logo_url || "", website: c.website || "", industry: c.industry || "" });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = { name: form.name, logo_url: form.logo_url || null, website: form.website || null, industry: form.industry || null };
    if (editing) {
      await updateClient(editing.id, data);
    } else {
      await createClientAction(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteClient(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "name", label: "Nombre", sortable: true },
    { key: "industry", label: "Industria", sortable: true },
    { key: "website", label: "Web" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Clientes</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los clientes de la agencia</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Cliente</Button>
      </div>

      <DataTable data={clients} columns={columns} onEdit={(c) => openEdit(c as Client)} onDelete={(c) => setDeleteModal(c as Client)} searchKey="name" />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Cliente" : "Nuevo Cliente"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Industria" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          <Input label="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <ImageUpload value={form.logo_url} onChange={(url) => setForm({ ...form, logo_url: url })} folder="clients" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Cliente" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar &quot;{deleteModal?.name}&quot;?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
