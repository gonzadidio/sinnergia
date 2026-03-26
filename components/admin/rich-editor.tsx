"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function RichEditor({ value, onChange, className, placeholder }: RichEditorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1 p-2 border-b border-white/10 bg-white/5 rounded-t-xl">
        <ToolbarButton onClick={() => wrapSelection("b")} title="Negrita">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => wrapSelection("i")} title="Cursiva">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => wrapSelection("h2")} title="Titulo">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => wrapSelection("h3")} title="Subtitulo">
          H3
        </ToolbarButton>
      </div>
      <textarea
        id="rich-editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Escribe tu contenido en HTML..."}
        className="w-full min-h-[300px] bg-white/5 border border-white/10 border-t-0 rounded-b-xl text-white placeholder-gray-500 p-4 text-sm font-mono focus:outline-none focus:border-brand-purple-500/50 resize-y"
      />
      {value && (
        <div className="mt-4">
          <p className="text-xs text-gray-500 mb-2">Vista previa:</p>
          <div
            className="prose prose-invert prose-sm max-w-none p-4 bg-white/5 rounded-xl border border-white/10"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-2.5 py-1.5 text-xs text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
    >
      {children}
    </button>
  );
}

function wrapSelection(tag: string) {
  const textarea = document.getElementById("rich-editor-textarea") as HTMLTextAreaElement;
  if (!textarea) return;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  const wrapped = `<${tag}>${selected}</${tag}>`;
  const newValue = before + wrapped + after;
  textarea.value = newValue;
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}
