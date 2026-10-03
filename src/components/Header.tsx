import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onQuoteClick: () => void;
  onApifyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onQuoteClick, onApifyClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Productos', href: '#productos' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: '¿Cómo Trabajamos?', href: '#proceso' },
    { name: 'Por qué elegirnos', href: '#diferenciales' },
    { name: 'Preguntas', href: '#faq' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-cyan-950 border-b border-rose-500/20 text-xs text-slate-300 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
            Promoción
          </span>
          <span>
            ⚡ <strong>Descuentos por volumen</strong> para marcas & empresas | Muestra digital 3D <strong>sin costo</strong>
          </span>
        </div>
      </div>

      {/* Main sticky navigation header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
            : 'bg-transparent py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
              aria-label="El Perchero Sublimados - Inicio"
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-rose-500/20">
                <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
                  {/* Stylized hanger SVG icon */}
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4c1.1 0 2 .9 2 2 0 .8-.5 1.5-1.2 1.8L12 8" />
                    <path d="M12 8L3 14c-.6.4-.3 1.3.4 1.3h17.2c.7 0 1-.9.4-1.3L12 8z" />
                    <circle cx="8" cy="17" r="1" fill="#06b6d4" />
                    <circle cx="12" cy="17" r="1" fill="#f43f5e" />
                    <circle cx="16" cy="17" r="1" fill="#f59e0b" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  El Perchero
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 text-sm font-semibold uppercase tracking-wider">
                    Sublimados
                  </span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium -mt-1 tracking-wide">
                  Taller de Personalización & Merch
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={onApifyClick}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-2 rounded-lg border border-cyan-500/30 transition-all shadow-sm"
                title="Configuración y Estado de Apify"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Apify API</span>
              </button>

              <a
                href="https://wa.me/573001234567?text=Hola%20El%20Perchero%20Sublimados!%20Quisiera%20asesoría%20sobre%20personalización"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-2 rounded-lg border border-emerald-500/20 transition-all"
                title="Atención directa por WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Asesoría en línea</span>
              </a>

              <button
                onClick={onQuoteClick}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-r from-rose-500 via-fuchsia-600 to-cyan-400 hover:from-rose-600 hover:to-cyan-500 text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#080c14]/40 group-hover:bg-transparent rounded-[10px] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-rose-300 group-hover:text-white animate-spin-slow" />
                  <span>Cotiza tu diseño</span>
                </span>
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={onApifyClick}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
              >
                Apify
              </button>
              <button
                onClick={onQuoteClick}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-rose-500 to-cyan-500 text-white shadow-sm"
              >
                Cotizar
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="tap-target p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuoteClick();
                }}
                className="w-full py-3 px-4 rounded-xl text-center font-bold text-white bg-gradient-to-r from-rose-500 via-fuchsia-600 to-cyan-500 shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cotiza tu diseño ahora</span>
              </button>

              <a
                href="https://wa.me/573001234567?text=Hola%20El%20Perchero%20Sublimados!%20Quisiera%20cotizar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Directo (+57 300 123 4567)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
