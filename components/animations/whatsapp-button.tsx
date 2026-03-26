"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  phoneNumber = "5491112345678",
  message = "Hola! Me interesa conocer más sobre sus servicios.",
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Show tooltip after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="relative glass-strong rounded-2xl px-4 py-3 max-w-[220px] mb-2"
          >
            <button
              onClick={() => {
                setDismissed(true);
                setShowTooltip(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-gray-300">
              ¿Necesitás ayuda? <span className="text-white font-medium">Escribinos!</span>
            </p>
            {/* Arrow */}
            <div className="absolute right-0 bottom-4 translate-x-1 w-2 h-2 rotate-45 glass-strong" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
          <MessageCircle className="w-6 h-6 text-white fill-white" />
        </div>
      </motion.a>
    </div>
  );
}
