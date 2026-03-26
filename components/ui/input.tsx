"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = "text", id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none text-gray-400",
              focused || props.value
                ? "top-2 text-xs text-brand-purple-400"
                : "top-1/2 -translate-y-1/2 text-sm"
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 transition-all duration-200",
            "focus:outline-none focus:border-brand-purple-500/50 focus:ring-1 focus:ring-brand-purple-500/25",
            label ? "pt-6 pb-2 px-4" : "py-3 px-4",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/25",
            className
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
