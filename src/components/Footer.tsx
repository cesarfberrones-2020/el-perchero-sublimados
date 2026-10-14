import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Check, 
  Sparkles, 
  Heart,
  ShieldCheck 
} from 'lucide-react';

import type { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
  onOpenCookieSettings?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenCookieSettings, onOpenAdmin }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="contacto" className="bg-[#05080e] border-t border-slate-800 text-slate-400 text-sm relative overflow-hidden">
      {/* Decorative gradient glow on bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-rose-500/5 blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand Info & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-cyan-500 to-emerald-400 p-[2px] overflow-hidden shadow-lg shadow-cyan-500/20 flex-shrink-0">
                <img
                  src="images/logo_2.png"
                  alt="Logo El Perchero Sublimados"
                  className="w-full h-full object-cover rounded-[14px] bg-[#080c14]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl text-white leading-tight">
                  EL PERCHERO{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-cyan-400 block text-sm uppercase tracking-wider">
                    Sublimados
                  </span>
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Taller de Personalización
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Taller de diseño y personalización de alta fidelidad. Expertos en prendas streetwear, gorras trucker, tazas premium y merchandising corporativo para marcas, eventos y empresas.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 flex items-center justify-center transition-all"
                aria-label="Instagram de El Perchero Sublimados"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center transition-all"
                aria-label="Facebook de El Perchero Sublimados"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/593990260253?text=Hola%20El%20Perchero%20Sublimados!%20Quisiera%20informaci%C3%B3n%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-center transition-all"
                aria-label="WhatsApp de El Perchero Sublimados: 0990260253"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Líneas & Catálogo
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#productos" className="hover:text-cyan-300 transition-colors">
                  Gorras Personalizadas ($5.00)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-cyan-300 transition-colors">
                  Camisetas ($10) & Hoodies ($15)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-cyan-300 transition-colors">
                  Tazas ($3.50) & Termos ($10)
                </a>
              </li>
              <li>
                <a href="#productos" className="hover:text-cyan-300 transition-colors">
                  Merch Corporativo (Por interno)
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-cyan-300 transition-colors">
                  Paquetes Mixtos
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional & Contact (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contacto & Taller
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>El Perchero - Taller de Personalización (@el_perchero_personalizados)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a
                  href="https://wa.me/593990260253?text=Hola%20El%20Perchero%20Sublimados!%20Quisiera%20cotizar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-semibold transition-colors"
                >
                  WhatsApp: 0990260253 (+593 99 026 0253)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>contacto@elperchero.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Lunes a Sábado: 8:00 AM – 6:30 PM (Atención continua)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Club Creativo (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Ofertas & Catálogo 2026</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Suscríbete para recibir muestrarios digitales exclusivos, descuentos de temporada y tips para cuidar tus prendas.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>¡Suscrito con éxito! Pronto recibirás novedades.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                    aria-label="Suscribirse al boletín"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  Cero spam. Tus datos están protegidos bajo la LOPDP del Ecuador.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar with Legal & Privacy Links */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} <strong>El Perchero Sublimados</strong> (Ecuador). Todos los derechos reservados.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('privacy')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline-offset-4 hover:underline transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Privacidad & LOPDP</span>
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('cookies')}
              className="hover:text-cyan-400 underline-offset-4 hover:underline transition-colors"
            >
              Política de Cookies
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className="hover:text-cyan-400 underline-offset-4 hover:underline transition-colors"
            >
              Términos de Servicio
            </button>
            <span className="text-slate-700">•</span>
            <button
              type="button"
              onClick={() => onOpenCookieSettings && onOpenCookieSettings()}
              className="text-amber-400 hover:text-amber-300 underline-offset-4 hover:underline transition-colors flex items-center gap-1 font-semibold"
            >
              <span>🍪 Gestionar Cookies</span>
            </button>
            {onOpenAdmin && (
              <>
                <span className="text-slate-700">•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors flex items-center gap-1"
                >
                  <span>Panel Admin</span>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>en Ecuador</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
