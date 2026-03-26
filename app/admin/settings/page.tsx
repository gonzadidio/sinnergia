"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, CheckCircle } from "lucide-react";
import { updateSiteConfig } from "@/app/admin/actions";

const configFields = [
  { key: "site_name", label: "Nombre del sitio", group: "General" },
  { key: "tagline", label: "Tagline / Slogan", group: "General" },
  { key: "contact_email", label: "Email de contacto", group: "Contacto" },
  { key: "contact_phone", label: "Telefono", group: "Contacto" },
  { key: "address", label: "Direccion", group: "Contacto" },
  { key: "instagram", label: "Instagram URL", group: "Redes Sociales" },
  { key: "linkedin", label: "LinkedIn URL", group: "Redes Sociales" },
  { key: "twitter", label: "Twitter/X URL", group: "Redes Sociales" },
];

export default function AdminSettings() {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.from("site_config").select("*");
    const map: Record<string, string> = {};
    data?.forEach((item) => { map[item.key] = item.value; });
    setConfig(map);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleSave() {
    setSaving(true);
    for (const field of configFields) {
      if (config[field.key] !== undefined) {
        await updateSiteConfig(field.key, config[field.key]);
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const groups = Array.from(new Set(configFields.map((f) => f.group)));

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Configuracion</h1>
        <p className="text-gray-500 text-sm mt-1">Configuracion general del sitio</p>
      </div>

      {groups.map((group) => (
        <div key={group} className="glass rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-display font-semibold text-white">{group}</h2>
          {configFields
            .filter((f) => f.group === group)
            .map((field) => (
              <Input
                key={field.key}
                label={field.label}
                value={config[field.key] || ""}
                onChange={(e) => setConfig({ ...config, [field.key]: e.target.value })}
              />
            ))}
        </div>
      ))}

      <div className="flex items-center gap-4">
        <Button onClick={handleSave} loading={saving}>
          <Save className="w-4 h-4" />
          Guardar Cambios
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            Guardado
          </span>
        )}
      </div>
    </div>
  );
}
