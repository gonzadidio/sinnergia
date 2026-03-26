"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Megaphone, Palette, Code, Share2, BarChart3, Camera, Zap,
  TrendingUp, Globe, PenTool, Layout, Mail,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types/database";

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  megaphone: Megaphone, palette: Palette, code: Code, share: Share2,
  bar: BarChart3, camera: Camera, zap: Zap, trending: TrendingUp,
  globe: Globe, pen: PenTool, layout: Layout, mail: Mail,
};

interface ServicesProps {
  services: Service[];
}

export function Services({ services }: ServicesProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" ref={ref} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-sm text-brand-purple-400 font-medium tracking-wider uppercase"
          >
            Lo que hacemos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl font-display font-bold text-white"
          >
            Nuestros{" "}
            <span className="text-gradient">Servicios</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconComponents[service.icon] || Zap;
            const isLarge = i === 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i }}
                className={isLarge ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Card tilt glow className="p-8 h-full group hover:border-brand-purple-500/20 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-brand bg-opacity-20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <Badge key={feature} variant="default">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
