import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-display font-bold text-gradient">
              Sinnergia
            </Link>
            <p className="mt-4 text-gray-400 text-sm max-w-md leading-relaxed">
              Transformamos marcas con estrategias digitales que generan resultados reales.
              Somos tu partner en innovacion digital.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-brand-purple-400 hover:bg-white/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-brand-cyan-400 hover:bg-white/10 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-brand-magenta-400 hover:bg-white/10 transition-all duration-200"
                aria-label="Twitter"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Navegacion</h4>
            <ul className="space-y-3">
              {["Servicios", "Portfolio", "Nosotros", "Blog", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>hola@sinnergia.com</li>
              <li>+54 11 1234-5678</li>
              <li>Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Sinnergia. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Crafted with passion & code
          </p>
        </div>
      </div>
    </footer>
  );
}
