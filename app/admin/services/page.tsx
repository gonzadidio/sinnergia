"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { createService, updateService, deleteService } from "@/app/admin/actions";
import type { Service } from "@/types/database";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<Service | null>(null);
  const [editing, setEditing] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", icon: "zap", features: [""], order: 0 });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("services").select("*").order("order");
    setServices(data || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ title: "", description: "", icon: "zap", features: [""], order: 0 });
    setModalOpen(true);
  }

  function openEdit(s: Service) {
    setEditing(s);
    setForm({ title: s.title, description: s.description, icon: s.icon, features: s.features.length > 0 ? s.features : [""], order: s.order });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = { ...form, features: form.features.filter(Boolean) };
    if (editing) {
      await updateService(editing.id, data);
    } else {
      await createService(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteService(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "title", label: "Titulo", sortable: true },
    { key: "icon", label: "Icono" },
    { key: "order", label: "Orden", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Servicios</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los servicios que ofrece la agencia</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Servicio</Button>
      </div>

      <DataTable data={services} columns={columns} onEdit={(s) => openEdit(s as Service)} onDelete={(s) => setDeleteModal(s as Service)} searchKey="title" />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Servicio" : "Nuevo Servicio"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Titulo" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Textarea label="Descripcion" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Icono</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl text-white py-3 px-4 focus:outline-none focus:border-brand-purple-500/50">
                {["megaphone", "palette", "code", "share", "bar", "camera", "zap", "trending", "globe", "pen", "layout", "mail"].map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <Input label="Orden" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Caracteristicas</label>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  value={f}
                  onChange={(e) => {
                    const newF = [...form.features];
                    newF[i] = e.target.value;
                    setForm({ ...form, features: newF });
                  }}
                  placeholder={`Caracteristica ${i + 1}`}
                />
                {form.features.length > 1 && (
                  <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, j) => j !== i) })} className="p-2 text-gray-500 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ""] })} className="text-sm text-brand-purple-400 hover:text-brand-purple-300">
              + Agregar caracteristica
            </button>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Servicio" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar &quot;{deleteModal?.title}&quot;?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
