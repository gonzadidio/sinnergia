"use client";

import React, { useCallback, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket = "public-assets",
  folder = "uploads",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setUploading(true);
      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fileName);

        onChange(publicUrl);
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
      }
    },
    [bucket, folder, onChange]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      uploadFile(file);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/10">
          <img src={value} alt="Preview" className="w-full h-48 object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label
          className={cn(
            "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
            dragOver
              ? "border-brand-purple-500 bg-brand-purple-500/10"
              : "border-white/20 hover:border-white/40 bg-white/5"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <div className="w-8 h-8 border-2 border-brand-purple-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Subiendo...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              {dragOver ? (
                <ImageIcon className="w-8 h-8 text-brand-purple-400" />
              ) : (
                <Upload className="w-8 h-8" />
              )}
              <span className="text-sm">
                {dragOver ? "Soltar imagen aqui" : "Click o arrastra una imagen"}
              </span>
            </div>
          )}
        </label>
      )}
    </div>
  );
}
