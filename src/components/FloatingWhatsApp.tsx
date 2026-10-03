import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Contacto rápido" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip speech bubble on desktop */}
      <div className="hidden sm:flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-900/90 text-white border border-emerald-500/30 shadow-xl backdrop-blur-md text-xs font-semibold animate-pulse">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>¿Dudas con tu diseño? ¡Escríbenos!</span>
      </div>

      {/* Button */}
      <a
        href="https://wa.me/573001234567?text=Hola%20El%20Perchero%20Sublimados!%20Me%20interesa%20personalizar%20un%20producto"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Contactar a El Perchero Sublimados por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      </a>
    </aside>
  );
};
