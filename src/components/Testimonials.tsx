import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-24 relative bg-slate-950/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>Casos de Éxito & Opiniones Reales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Lo que dicen quienes confían en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              El Perchero
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Desde fundadores de marcas de ropa urbana hasta gerentes de mercadeo corporativo.
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between relative group hover:border-slate-700 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800 group-hover:text-rose-500/20 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-200 leading-relaxed italic">
                  "{t.comment}"
                </p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  <CheckCircle2 className="w-3 h-3 text-rose-400" />
                  <span>{t.productPurchased}</span>
                </div>
              </div>

              {/* Author */}
              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-500/30"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {t.clientName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.role}, <strong className="text-slate-300">{t.companyOrBrand}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
