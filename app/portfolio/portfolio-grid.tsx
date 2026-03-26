"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/database";
import Link from "next/link";

interface PortfolioGridProps {
  projects: Project[];
}

const categories = ["todos", "branding", "desarrollo", "marketing", "general"];

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [active, setActive] = useState("todos");

  const filtered = active === "todos"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              active === cat
                ? "bg-gradient-brand text-white"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            layout
          >
            <Link href={`/portfolio/${project.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/50 via-brand-cyan-900/30 to-brand-magenta-900/50 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-white/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="inline-flex items-center gap-2 text-sm text-white">
                      Ver proyecto <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <Badge variant="gradient" className="mb-3">{project.category}</Badge>
                  <h3 className="text-lg font-display font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">{project.description}</p>
                  {project.results_text && (
                    <p className="mt-3 text-sm font-semibold text-brand-cyan-400">{project.results_text}</p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
