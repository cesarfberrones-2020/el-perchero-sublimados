import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Star, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onExploreClick }) => {
  return (
    <section className="relative pt-6 pb-20 md:py-24 overflow-hidden bg-radial-gradient">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-24 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & Conversion Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 shadow-sm text-xs font-semibold text-rose-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>Taller Creativo de Sublimación Premium</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-300">Streetwear & Merchandising</span>
            </div>

            {/* Main Title of High Impact */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Personalización con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400">
                Sublimación HD
              </span>{' '}
              que da vida a tus ideas sin límites.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transformamos prendas urbanas, gorras, tazas y artículos corporativos en piezas memorables de <strong>alta calidad y máxima exclusividad</strong>. Colores intensos de larga duración para tu <strong>marca personal, regalos únicos o dotación empresarial</strong>.
            </p>

            {/* Check highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Colores que no se caen</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Muestra digital gratis</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Precios x mayor desde la docena</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onQuoteClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 hover:from-rose-600 hover:to-cyan-600 shadow-xl shadow-rose-500/30 hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <Sparkles className="w-5 h-5 text-rose-200 group-hover:rotate-12 transition-transform" />
                <span>Cotiza tu diseño ahora</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-base text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>

            {/* Trust and Social Proof Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Cliente" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Cliente" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Cliente" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    <strong className="text-white">4.9/5</strong> de satisfacción (+500 clientes)
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>
                  <strong className="text-white block text-sm leading-tight">+15,000</strong>
                  Prendas estampadas
                </span>
              </div>

              <div className="h-8 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>
                  <strong className="text-white block text-sm leading-tight">100%</strong>
                  Garantía de color
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Product Showcase with Floating Interactive Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glowing Frame Border */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-rose-500/40 via-purple-500/20 to-cyan-500/40 shadow-2xl shadow-rose-500/20">
                <div className="relative rounded-[22px] overflow-hidden bg-slate-950">
                  <img
                    src="images/hero.jpg"
                    alt="Colección de productos sublimados El Perchero - Gorra, camiseta en perchero y tumbler"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 aspect-[16/10] sm:aspect-square"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-60" />

                  {/* Bottom caption in image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-rose-400" />
                        Acabado Profesional Ultra HD
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Tintas de penetración molecular continua
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Garantía 100%
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 px-3.5 py-2.5 rounded-2xl glass-panel shadow-xl shadow-black/50 border border-cyan-500/30 flex items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  HD
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Tintas Premium</p>
                  <p className="text-[10px] text-cyan-300">No se borran al lavar</p>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-5 -left-2 sm:-left-6 px-4 py-2.5 rounded-2xl glass-panel shadow-xl shadow-black/50 border border-rose-500/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">Streetwear & Merch</p>
                  <p className="text-[10px] text-slate-400">Corte urbano y corporativo</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
