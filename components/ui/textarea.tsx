"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="relative w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm text-gray-400 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 transition-all duration-200 min-h-[120px] resize-y",
            "focus:outline-none focus:border-brand-purple-500/50 focus:ring-1 focus:ring-brand-purple-500/25",
            "py-3 px-4",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/25",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export { Textarea };
