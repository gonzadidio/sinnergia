"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types/database";
import Link from "next/link";

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" ref={ref} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm text-brand-cyan-400 font-medium tracking-wider uppercase"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl font-display font-bold text-white"
            >
              Proyectos{" "}
              <span className="text-gradient">Destacados</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
            >
              Ver todos los proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i }}
              className="group"
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500">
                  {/* Image placeholder */}
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/50 via-brand-cyan-900/30 to-brand-magenta-900/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-display font-bold text-white/10">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <span className="inline-flex items-center gap-2 text-sm text-white">
                        Ver proyecto <ExternalLink className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="gradient">{project.category}</Badge>
                      {project.client && (
                        <span className="text-xs text-gray-500">{project.client.name}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-semibold text-white group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                    {project.results_text && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm font-semibold text-brand-cyan-400">
                          {project.results_text}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
