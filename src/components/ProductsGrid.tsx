import React, { useState } from 'react';
import { Eye, Sparkles, ArrowRight, Check, Layers } from 'lucide-react';
import { PRODUCTS } from '../data/content';
import type { ProductItem } from '../types';

interface ProductsGridProps {
  onSelectProduct: (product: ProductItem) => void;
  onQuickQuote: (productName: string) => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({
  onSelectProduct,
  onQuickQuote,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'Todos los Productos' },
    { id: 'streetwear', label: 'Camisetas & Joggers' },
    { id: 'caps', label: 'Gorras Urbanas' },
    { id: 'mugs', label: 'Tazas & Termos' },
    { id: 'corporate', label: 'Merch Corporativo' },
  ];

  const filteredProducts = activeFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section id="productos" className="py-20 md:py-28 relative scroll-mt-20">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>Catálogo Destacado & Líneas Principales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Nuestras Colecciones de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-cyan-400">
              Personalización Premium
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Cada línea está pensada para ofrecer máxima resistencia, estética impecable y fidelidad cromática. Selecciona tu favorita para ver detalles o cotizar al instante.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow-lg shadow-rose-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Main Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group glass-card rounded-3xl overflow-hidden border border-slate-800/80 hover:border-slate-700/80 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl shadow-black/40"
            >
              {/* Product Media Header */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Badge tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-lg shadow-rose-500/40">
                      {product.badge}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {product.tag}
                  </span>
                </div>

                {/* Quick View Button overlay */}
                <button
                  onClick={() => onSelectProduct(product)}
                  className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5 shadow-md opacity-90 group-hover:opacity-100 transition-opacity"
                  title="Ver especificaciones completas"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Vista Rápida</span>
                </button>
              </div>

              {/* Product Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {product.categoryLabel}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {product.shortDesc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 pt-2">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Meta & CTAs */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {product.minQuantity}
                    </span>
                    <span className="text-rose-400 font-bold">
                      {product.priceNote.split('/')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors text-center"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => onQuickQuote(product.name)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Cotizar Ahora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Catalog Banner CTA */}
        <div id="catalogo" className="mt-16 rounded-3xl p-8 bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              ¿Tienes un proyecto especial o necesitas un paquete mixto?
            </h4>
            <p className="text-sm text-slate-300 max-w-xl">
              Combinamos gorras, camisetas y artículos promocionales para lanzamientos, uniformes de staff o eventos masivos con tarifa corporativa unificada.
            </p>
          </div>
          <button
            onClick={() => onQuickQuote('Paquete Mixto / Proyecto Especial')}
            className="flex-shrink-0 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-cyan-400 hover:scale-105 transition-all shadow-lg shadow-rose-500/20"
          >
            Solicitar Paquete Especial
          </button>
        </div>

      </div>
    </section>
  );
};
