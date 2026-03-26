"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  items?: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

const defaultItems = [
  "MARKETING DIGITAL",
  "BRANDING",
  "DESARROLLO WEB",
  "REDES SOCIALES",
  "SEO & SEM",
  "DISEÑO UI/UX",
  "ESTRATEGIA DIGITAL",
  "CONTENIDO CREATIVO",
  "E-COMMERCE",
  "ANALÍTICA DE DATOS",
];

export function Marquee({
  items = defaultItems,
  speed = 30,
  separator = "✦",
  className = "",
  reverse = false,
}: MarqueeProps) {
  const content = items.map((item) => `${item} ${separator} `).join("");
  const repeated = `${content}${content}`;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="text-[clamp(1.5rem,4vw,4rem)] font-display font-bold text-white/[0.03] select-none">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <section className="relative py-12 -rotate-1 scale-105 overflow-hidden">
      {/* Gradient border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan-500/30 to-transparent" />

      <Marquee speed={35} />
      <Marquee
        speed={40}
        reverse
        items={[
          "CREATIVIDAD",
          "INNOVACIÓN",
          "RESULTADOS",
          "ESTRATEGIA",
          "PERFORMANCE",
          "GROWTH",
          "DATA-DRIVEN",
          "ROI",
        ]}
      />
    </section>
  );
}
