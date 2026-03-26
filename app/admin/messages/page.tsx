"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { updateMessageStatus, deleteMessage } from "@/app/admin/actions";
import type { ContactSubmission } from "@/types/database";

const statusColors: Record<string, string> = {
  new: "bg-brand-cyan-500/20 text-brand-cyan-400",
  read: "bg-gray-500/20 text-gray-400",
  replied: "bg-green-500/20 text-green-400",
  archived: "bg-yellow-500/20 text-yellow-400",
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [viewing, setViewing] = useState<ContactSubmission | null>(null);
  const [deleteModal, setDeleteModal] = useState<ContactSubmission | null>(null);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setMessages(data || []);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleView(msg: ContactSubmission) {
    setViewing(msg);
    if (msg.status === "new") {
      await updateMessageStatus(msg.id, "read");
      loadData();
    }
  }

  async function handleStatusChange(id: string, status: string) {
    await updateMessageStatus(id, status);
    loadData();
    if (viewing?.id === id) setViewing({ ...viewing!, status: status as ContactSubmission["status"] });
  }

  async function handleDelete() {
    if (!deleteModal) return;
    await deleteMessage(deleteModal.id);
    setDeleteModal(null);
    loadData();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Mensajes</h1>
        <p className="text-gray-500 text-sm mt-1">Mensajes recibidos del formulario de contacto</p>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No hay mensajes</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-white text-sm">{msg.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${statusColors[msg.status]}`}>
                      {msg.status}
                    </span>
                    {msg.status === "new" && <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-pulse" />}
                  </div>
                  <p className="text-xs text-gray-500">{msg.email} {msg.phone && `| ${msg.phone}`}</p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{msg.message}</p>
                  <p className="text-xs text-gray-600 mt-2">{formatDate(msg.created_at)}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => handleView(msg)} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" aria-label="Ver">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteModal(msg)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors" aria-label="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewing} onClose={() => setViewing(null)} title="Mensaje" size="lg">
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Nombre</p>
                <p className="text-white">{viewing.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-white">{viewing.email}</p>
              </div>
              {viewing.phone && (
                <div>
                  <p className="text-xs text-gray-500">Telefono</p>
                  <p className="text-white">{viewing.phone}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-500">Fecha</p>
                <p className="text-white">{formatDate(viewing.created_at)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Mensaje</p>
              <p className="text-gray-300 leading-relaxed bg-white/5 rounded-xl p-4">{viewing.message}</p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-white/10">
              <span className="text-xs text-gray-500 mr-2">Estado:</span>
              {["new", "read", "replied", "archived"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(viewing.id, s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    viewing.status === s ? statusColors[s] : "bg-white/5 text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteModal} onClose={() => setDeleteModal(null)} title="Eliminar Mensaje" size="sm">
        <p className="text-gray-400 mb-6">Estas seguro de eliminar este mensaje?</p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(null)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </div>
      </Modal>
    </div>
  );
}
