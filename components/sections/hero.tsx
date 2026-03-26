"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { GradientBlob } from "@/components/animations/gradient-blob";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { AnimatedCounter } from "@/components/animations/animated-counter";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <GradientBlob color="purple" className="top-1/4 -left-20" size="w-[600px] h-[600px]" />
        <GradientBlob color="cyan" className="bottom-1/4 -right-20" size="w-[500px] h-[500px]" delay={2} />
        <GradientBlob color="magenta" className="top-1/2 left-1/2 -translate-x-1/2" size="w-[400px] h-[400px]" delay={4} />
      </div>

      {/* Content */}
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan-400 animate-pulse" />
          <span className="text-sm text-gray-300">Agencia de Marketing Digital</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-display font-bold leading-[0.9] tracking-tight"
        >
          <span className="block text-[clamp(3rem,10vw,10rem)] text-gradient-animated">
            SINNERGIA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Transformamos marcas con estrategias digitales que{" "}
          <span className="text-white font-medium">generan resultados reales</span>.
          Creatividad, datos y tecnologia en perfecta sinergia.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <MagneticButton>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-brand text-white font-medium text-base hover:shadow-lg hover:shadow-brand-purple-500/25 transition-all duration-300"
            >
              Ver Nuestro Trabajo
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-base hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              Hablemos
            </a>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto"
        >
          <AnimatedCounter target={150} suffix="+" label="Proyectos" />
          <AnimatedCounter target={98} suffix="%" label="Satisfacción" />
          <AnimatedCounter target={50} suffix="+" label="Clientes" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
