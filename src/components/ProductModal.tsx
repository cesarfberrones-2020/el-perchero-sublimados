import React from 'react';
import { X, Check, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import type { ProductItem } from '../types';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onSelectForQuote: (productName: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSelectForQuote,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
          aria-label="Cerrar modal de producto"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Image Preview with Badge */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Product Meta */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {product.categoryLabel}
                </span>
                <h2 id="modal-title" className="text-2xl font-bold text-white mt-1">
                  {product.name}
                </h2>
                <p className="text-sm font-semibold text-rose-400 mt-1">
                  {product.priceNote}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.fullDesc}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Pedido Mínimo & Escala:</span>
                </div>
                <p>{product.minQuantity}</p>
                <p className="text-slate-400 pt-1">
                  <strong>Ideal para:</strong> {product.popularFor}
                </p>
              </div>

              {product.colorsAvailable && (
                <div>
                  <p className="text-xs font-bold text-slate-300 mb-2">
                    Variantes & Tonos Populares:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colorsAvailable.map((color) => (
                      <span
                        key={color}
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-800/90 text-slate-200 border border-slate-700/60"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Features */}
          <div className="border-t border-slate-800/80 pt-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Especificaciones & Ventajas Técnicas:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70"
                >
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de color y prueba digital previa</span>
            </div>

            <button
              onClick={() => {
                onSelectForQuote(product.name);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Cotizar {product.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
