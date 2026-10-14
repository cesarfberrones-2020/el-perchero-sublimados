import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onQuoteClick?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
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
            {/* Logo Oficial (Imagen 1) */}
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded-lg p-1"
              aria-label="El Perchero Sublimados - Inicio"
            >
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-rose-500 via-purple-600 to-cyan-500 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-rose-500/20 overflow-hidden flex-shrink-0">
                <img
                  src="images/logo_1.jpg"
                  alt="Logo El Perchero Sublimados"
                  className="w-full h-full object-cover rounded-full bg-[#0b0f19]"
                />
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
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-700/80 transition-all shadow-sm group"
                  title="Acceso al Panel de Administración y Base de Datos"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  <span>Panel Admin</span>
                </button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center gap-2">
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="px-2.5 py-1.5 text-xs font-bold rounded-lg bg-slate-900 border border-slate-700 text-cyan-300"
                  title="Admin"
                >
                  Admin
                </button>
              )}
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

            {onOpenAdmin && (
              <div className="pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-center font-semibold text-xs text-slate-300 bg-slate-900 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Panel de Administración (Admin)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
