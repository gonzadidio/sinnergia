"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBlobProps {
  color?: "purple" | "cyan" | "magenta";
  size?: string;
  className?: string;
  delay?: number;
}

const colorMap = {
  purple: "bg-brand-purple-500/30",
  cyan: "bg-brand-cyan-500/30",
  magenta: "bg-brand-magenta-500/30",
};

export function GradientBlob({
  color = "purple",
  size = "w-[500px] h-[500px]",
  className,
  delay = 0,
}: GradientBlobProps) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full filter blur-[100px] pointer-events-none",
        colorMap[color],
        size,
        className
      )}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -50, 20, -30, 0],
        scale: [1, 1.1, 0.9, 1.05, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
