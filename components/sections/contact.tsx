"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/actions/contact";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email invalido"),
  phone: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    try {
      setError("");
      const result = await submitContact(data);
      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Hubo un error al enviar el mensaje. Intenta de nuevo.");
    }
  }

  return (
    <section id="contacto" ref={ref} className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-sm text-brand-magenta-400 font-medium tracking-wider uppercase"
          >
            Contacto
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl md:text-5xl font-display font-bold text-white"
          >
            Empecemos a{" "}
            <span className="text-gradient">trabajar juntos</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center glass rounded-2xl p-16 text-center"
              >
                <CheckCircle className="w-16 h-16 text-brand-cyan-400 mb-6" />
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  Mensaje enviado
                </h3>
                <p className="text-gray-400">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label="Nombre"
                    {...register("name")}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </div>
                <Input
                  label="Telefono (opcional)"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
                <Textarea
                  label="Mensaje"
                  placeholder="Contanos sobre tu proyecto..."
                  {...register("message")}
                  error={errors.message?.message}
                />
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                <Button type="submit" size="lg" loading={isSubmitting} className="w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  Enviar Mensaje
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8 space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-purple-500/20">
                  <Mail className="w-5 h-5 text-brand-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium mt-1">hola@sinnergia.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-cyan-500/20">
                  <Phone className="w-5 h-5 text-brand-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telefono</p>
                  <p className="text-white font-medium mt-1">+54 11 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-magenta-500/20">
                  <MapPin className="w-5 h-5 text-brand-magenta-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ubicacion</p>
                  <p className="text-white font-medium mt-1">Buenos Aires, Argentina</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-3">Horario de atencion</p>
                <p className="text-white text-sm">Lunes a Viernes: 9:00 - 18:00</p>
                <p className="text-gray-500 text-sm mt-1">Respondemos en menos de 24hs</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
