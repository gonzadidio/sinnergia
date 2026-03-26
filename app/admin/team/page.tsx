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
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/app/admin/actions";
import type { TeamMember } from "@/types/database";

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<TeamMember | null>(null);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", role: "", bio: "", photo_url: "",
    linkedin: "", twitter: "", instagram: "", github: "",
    order: 0,
  });

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("team_members").select("*").order("order");
    setTeam(data || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  function openNew() {
    setEditing(null);
    setForm({ name: "", role: "", bio: "", photo_url: "", linkedin: "", twitter: "", instagram: "", github: "", order: 0 });
    setModalOpen(true);
  }

  function openEdit(m: TeamMember) {
    setEditing(m);
    const links = m.social_links || {};
    setForm({
      name: m.name, role: m.role, bio: m.bio || "", photo_url: m.photo_url || "",
      linkedin: links.linkedin || "", twitter: links.twitter || "",
      instagram: links.instagram || "", github: links.github || "",
      order: m.order,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const social_links: Record<string, string> = {};
    if (form.linkedin) social_links.linkedin = form.linkedin;
    if (form.twitter) social_links.twitter = form.twitter;
    if (form.instagram) social_links.instagram = form.instagram;
    if (form.github) social_links.github = form.github;

    const data = {
      name: form.name, role: form.role, bio: form.bio || null,
      photo_url: form.photo_url || null, social_links, order: form.order,
    };

    if (editing) {
      await updateTeamMember(editing.id, data);
    } else {
      await createTeamMember(data);
    }
    setModalOpen(false);
    setLoading(false);
    loadData();
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteTeamMember(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  const columns = [
    { key: "name", label: "Nombre", sortable: true },
    { key: "role", label: "Rol", sortable: true },
    { key: "order", label: "Orden", sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Equipo</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona los miembros del equipo</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4" /> Nuevo Miembro</Button>
      </div>

      <DataTable data={team} columns={columns} onEdit={(m) => openEdit(m as TeamMember)} onDelete={(m) => setDeleteModal(m as TeamMember)} searchKey="name" />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar Miembro" : "Nuevo Miembro"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Rol" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </div>
          <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <ImageUpload value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} folder="team" />
          <Input label="Orden" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="LinkedIn URL" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            <Input label="Twitter URL" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
            <Input label="Instagram URL" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
            <Input label="GitHub URL" value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={loading}>{editing ? "Guardar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Miembro" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar a &quot;{deleteModal?.name}&quot;?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
