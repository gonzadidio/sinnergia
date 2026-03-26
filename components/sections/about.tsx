"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ExternalLink } from "lucide-react";
import type { TeamMember } from "@/types/database";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Globe, twitter: Globe, instagram: Globe, github: Globe, default: ExternalLink,
};

interface AboutProps {
  team: TeamMember[];
}

export function About({ team }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nosotros" ref={ref} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-sm text-brand-magenta-400 font-medium tracking-wider uppercase"
            >
              Nosotros
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl md:text-5xl font-display font-bold text-white"
            >
              El equipo detras de{" "}
              <span className="text-gradient">la magia</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-gray-400 leading-relaxed text-lg">
              Somos un equipo multidisciplinario apasionado por la creatividad y los datos.
              Combinamos estrategia, diseño y tecnologia para crear experiencias digitales
              que transforman marcas y generan resultados extraordinarios.
            </p>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2">
                {/* Photo */}
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-900/60 via-gray-900 to-brand-cyan-900/60 group-hover:from-brand-purple-800/40 group-hover:to-brand-cyan-800/40 transition-all duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-display font-bold text-white/5 group-hover:text-white/10 transition-all duration-500">
                      {member.name.charAt(0)}
                    </span>
                  </div>

                  {/* Social links overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-center gap-3">
                      {Object.entries(member.social_links || {}).map(([platform, url]) => {
                        const Icon = socialIcons[platform];
                        if (!Icon) return null;
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg glass text-white/80 hover:text-white transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-brand-purple-400 mt-1">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
