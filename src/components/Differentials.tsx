import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Clock, 
  BadgePercent, 
  ShieldCheck, 
  Zap, 
  Check, 
  X,
  Award
} from 'lucide-react';
import { DIFFERENTIALS } from '../data/content';

export const Differentials: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-400" />,
    Clock: <Clock className="w-6 h-6 text-amber-400" />,
    BadgePercent: <BadgePercent className="w-6 h-6 text-emerald-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-purple-400" />,
    Zap: <Zap className="w-6 h-6 text-rose-400" />
  };

  const comparisonData = [
    {
      feature: 'Tacto y Sensación en la Prenda',
      sublimation: 'Tacto Cero: la tinta se funde en la fibra, es transpirable y ligera',
      traditional: 'Sensación acartonada / plástico pegado que genera sudor'
    },
    {
      feature: 'Durabilidad al Lavar',
      sublimation: 'Eterna: no se cuartea, no se decolora y no se desprende jamás',
      traditional: 'Se descascara, se quiebra o se borra tras pocas lavadas'
    },
    {
      feature: 'Riqueza de Colores & Degradados',
      sublimation: 'Ilimitados: degradados perfectos, fotos HD y colores Pantone vivos',
      traditional: 'Limitado a 1 o 2 colores planos por costo de matrices'
    },
    {
      feature: 'Flexibilidad de Pedidos',
      sublimation: 'Desde 1 unidad exclusiva hasta producciones masivas x mayor',
      traditional: 'Exigen mínimos altos por costo de planchas y moldes'
    },
    {
      feature: 'Tiempo de Entrega',
      sublimation: '24 a 48 horas con pruebas digitales inmediatas',
      traditional: 'Procesos lentos de secado y revelado de pantallas'
    }
  ];

  return (
    <section id="diferenciales" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Nuestra Propuesta de Valor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            ¿Por Qué Elegir{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400">
              El Perchero Sublimados?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Combinamos artesanía textil, maquinaria de última generación y un enfoque obsesivo en el servicio para que tu experiencia sea impecable de principio a fin.
          </p>
        </div>

        {/* 6 Key Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {DIFFERENTIALS.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {iconMap[item.icon]}
                </div>
                {item.stat && (
                  <div className="text-right">
                    <span className="block text-lg font-extrabold font-heading text-white">
                      {item.stat}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      {item.statLabel}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Educational Comparison: Sublimación HD vs Métodos Tradicionales */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-8">
            <h3 className="text-2xl font-bold text-white">
              ¿Por qué nuestra Sublimación supera a los estampados convencionales?
            </h3>
            <p className="text-sm text-slate-300">
              Conoce la diferencia técnica que garantiza prendas y accesorios de alta gama.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider">
                  <th className="py-4 px-4 font-bold text-slate-400">Característica Clave</th>
                  <th className="py-4 px-4 font-bold text-cyan-400 bg-cyan-950/20 rounded-t-xl">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      El Perchero Sublimados HD
                    </span>
                  </th>
                  <th className="py-4 px-4 font-bold text-slate-400">
                    Estampados Tradicionales / Vinilos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-slate-200 bg-cyan-950/10 font-medium">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{row.sublimation}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
