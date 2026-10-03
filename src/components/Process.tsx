import React, { useState } from 'react';
import { UploadCloud, Laptop, Truck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';

export const Process: React.FC<{ onQuoteClick: () => void }> = ({ onQuoteClick }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const icons = [UploadCloud, Laptop, Truck];

  return (
    <section id="proceso" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/60 border-y border-slate-900">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-rose-500/30 text-xs font-bold text-rose-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Experiencia Ágil & Transparente</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            ¿Cómo Trabajamos en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400">
              El Perchero?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            De tu idea o boceto al producto terminado en tus manos en solo 3 sencillos pasos. Sin tecnicismos aburridos y con asesoría continua en cada etapa.
          </p>
        </div>

        {/* 3 Steps Sequential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-rose-500/40 via-purple-500/40 to-cyan-500/40 -translate-y-12 -z-0" />

          {PROCESS_STEPS.map((step, idx) => {
            const IconComponent = icons[idx];
            const isActive = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`relative cursor-pointer glass-card rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between z-10 ${
                  isActive
                    ? 'border-rose-500 shadow-xl shadow-rose-500/15 scale-[1.02]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 opacity-80">
                      {step.number}
                    </span>
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-gradient-to-br from-rose-500 to-cyan-500 text-white shadow-lg'
                          : 'bg-slate-900 border border-slate-700 text-cyan-400'
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-3">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {step.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {step.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Indicator Bar */}
                <div className="pt-6">
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-cyan-400 w-full'
                      : 'bg-slate-800 w-1/3'
                  }`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Workshop In-Action Spotlight & Guarantee */}
        <div className="mt-16 glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 border border-slate-800 shadow-xl">
              <img
                src="/images/workshop.jpg"
                alt="Prensa térmica de sublimación en taller de El Perchero"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Prensa de alta presión neumática y tintas industriales</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Compromiso de Cero Sorpresas</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                No producimos una sola prenda hasta que no apruebes tu diseño digital
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Sabemos lo importante que es tu imagen. Por eso preparamos una maqueta digital para que corrobores tamaño del estampado, posición exacta en la prenda o producto y balance de colores. ¡Solo cuando nos das el 'OK', iniciamos prensas!
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onQuoteClick}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
                >
                  <span>Iniciar con el Paso 1: Enviar mi idea</span>
                </button>
                <div className="flex items-center gap-3 text-xs text-slate-400 px-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Respuesta promedio en menos de 30 minutos</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
