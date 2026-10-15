import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Check, 
  Send, 
  Sparkles, 
  Layers, 
  Package, 
  FileCheck, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export interface WhatsAppQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
}

interface ProductOption {
  id: string;
  name: string;
  icon: string;
  priceTag: string;
  category: string;
}

const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: 'chompas',
    name: 'Chompas & Hoodies',
    icon: '🧥',
    priceTag: 'Desde $15.00 x mayor',
    category: 'Textil Afelpado',
  },
  {
    id: 'tazas',
    name: 'Tazas Cerámicas & Mugs',
    icon: '☕',
    priceTag: 'Desde $3.50 x mayor',
    category: 'Cerámica HD',
  },
  {
    id: 'vasos',
    name: 'Vasos Térmicos & Termos',
    icon: '🍶',
    priceTag: 'Desde $8.00 / $10.00',
    category: 'Acero Inoxidable',
  },
  {
    id: 'gorras',
    name: 'Gorras Personalizadas',
    icon: '🧢',
    priceTag: '$5.00 x mayor (desde 12)',
    category: 'Headwear Urbano',
  },
  {
    id: 'camisetas',
    name: 'Camisetas Streetwear',
    icon: '👕',
    priceTag: 'Desde $10.00 x mayor',
    category: 'Algodón / Poliéster HD',
  },
  {
    id: 'corporativo',
    name: 'Merch Corporativo & Lanyards',
    icon: '🏢',
    priceTag: 'Precio según volumen',
    category: 'Packs Empresariales',
  },
  {
    id: 'combo',
    name: 'Paquete Mixto / Varios Productos',
    icon: '📦',
    priceTag: 'Cotización Integral',
    category: 'Combinado Especial',
  },
];

const QUANTITY_OPTIONS = [
  { label: '1 Docena (12 uds - Mínimo por mayor)', value: '1 docena (12 unidades)' },
  { label: '2 a 4 Docenas (24 a 48 uds)', value: '2 a 4 docenas (24 a 48 unidades)' },
  { label: '5 a 10 Docenas (60 a 120 uds)', value: '5 a 10 docenas (60 a 120 unidades)' },
  { label: 'Más de 10 Docenas (Gran Volumen)', value: 'Más de 10 docenas (+120 unidades)' },
  { label: 'Muestra Individual (1 a 6 uds)', value: 'Muestra previa (1 a 6 unidades)' },
];

const DESIGN_OPTIONS = [
  { label: '✅ Sí, tengo el archivo listo (PNG, PDF, AI, JPG)', value: 'Archivo de logo o diseño listo' },
  { label: '💡 Tengo una idea y necesito apoyo con el diseño', value: 'Necesito asesoría para maquetar el diseño' },
  { label: '🔍 Deseo ver muestras y catálogo de colores', value: 'Quiero ver catálogo y opciones de color' },
];

export const WhatsAppQuoteModal: React.FC<WhatsAppQuoteModalProps> = ({
  isOpen,
  onClose,
  initialProduct = '',
}) => {
  // Selected products (multi-select allowed)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(() => {
    if (!initialProduct) return ['Chompas & Hoodies'];
    // Match with initial product
    const matched = PRODUCT_OPTIONS.find((p) =>
      initialProduct.toLowerCase().includes(p.id) || p.name.toLowerCase().includes(initialProduct.toLowerCase())
    );
    return [matched ? matched.name : initialProduct];
  });

  const [selectedQuantity, setSelectedQuantity] = useState<string>(QUANTITY_OPTIONS[0].value);
  const [selectedDesignStatus, setSelectedDesignStatus] = useState<string>(DESIGN_OPTIONS[0].value);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  if (!isOpen) return null;

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productName)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((p) => p !== productName);
      } else {
        return [...prev, productName];
      }
    });
  };

  // Generate structured WhatsApp copy
  const generateMessage = (): string => {
    const productsList = selectedProducts.join(', ');
    let msg = `¡Hola El Perchero Sublimados! 👋\n`;
    msg += `Vengo desde su página web y deseo cotizar:\n\n`;
    msg += `• 🛍️ *Producto(s):* ${productsList}\n`;
    msg += `• 📦 *Cantidad requerida:* ${selectedQuantity}\n`;
    msg += `• 🎨 *Estado del diseño:* ${selectedDesignStatus}\n`;

    if (additionalNotes.trim()) {
      msg += `• 📝 *Detalles o especificaciones:* ${additionalNotes.trim()}\n`;
    }

    msg += `\n¿Me podrían brindar información sobre tiempos de entrega y proforma? ¡Muchas gracias!`;
    return msg;
  };

  const handleSendToWhatsApp = () => {
    const rawMessage = generateMessage();
    const encoded = encodeURIComponent(rawMessage);
    const waUrl = `https://wa.me/593990260253?text=${encoded}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  const handleSendQuickDefault = () => {
    const quickMsg = encodeURIComponent(
      '¡Hola El Perchero Sublimados! 👋 Quisiera información general sobre personalizar productos al por mayor.'
    );
    window.open(`https://wa.me/593990260253?text=${quickMsg}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
    >
      <div
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col bg-[#070d16]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border-b border-emerald-500/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="whatsapp-modal-title" className="text-base sm:text-lg font-bold text-white">
                  Cotizador Express por WhatsApp
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Oficial: 0990260253
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Selecciona lo que deseas sublimar y armaremos tu mensaje formal listo para enviar.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            aria-label="Cerrar configurador de WhatsApp"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          
          {/* Step 1: Select Products (The primary user need!) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>1. ¿Qué producto(s) deseas sublimar? (Puedes elegir varios):</span>
              </label>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {selectedProducts.length} seleccionado(s)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {PRODUCT_OPTIONS.map((prod) => {
                const isSelected = selectedProducts.includes(prod.name);
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => toggleProduct(prod.name)}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-950/60 to-slate-900 border-emerald-400/80 shadow-md shadow-emerald-500/10 scale-[1.01]'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0 mt-0.5">{prod.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-white text-xs truncate">
                          {prod.name}
                        </h4>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-emerald-300 font-medium mt-0.5">
                        {prod.priceTag}
                      </p>
                      <span className="text-[9px] text-slate-400 block truncate">
                        {prod.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quantity Tier */}
          <div className="space-y-2">
            <label className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>2. ¿Qué volumen o cantidad aproximada necesitas?</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {QUANTITY_OPTIONS.map((qty, idx) => {
                const isSelected = selectedQuantity === qty.value;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedQuantity(qty.value)}
                    className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="truncate">{qty.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Design Status */}
          <div className="space-y-2">
            <label className="font-bold text-white flex items-center gap-1.5 text-xs sm:text-sm">
              <FileCheck className="w-4 h-4 text-rose-400" />
              <span>3. ¿Cuentas con el diseño o logotipo listo?</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DESIGN_OPTIONS.map((des, idx) => {
                const isSelected = selectedDesignStatus === des.value;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDesignStatus(des.value)}
                    className={`px-3 py-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-rose-950/40 border-rose-400 text-rose-200'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="truncate">{des.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 4: Optional Notes / Details */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300 flex items-center gap-1.5">
              <span>4. Algún detalle adicional (colores, tallas, fecha estimada):</span>
              <span className="text-[10px] text-slate-500 font-normal">(Opcional)</span>
            </label>
            <input
              type="text"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Ej: Deseo colores negro y blanco, entrega para la próxima semana en Quito o Guayaquil."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Live Structured Message Preview */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vista Previa del Mensaje que se enviará a WhatsApp:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">Formato Automático HD</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#091b17] border border-emerald-600/40 shadow-inner space-y-1.5 font-sans">
              <div className="flex items-center gap-2 pb-2 border-b border-emerald-800/40">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-emerald-300">
                  El Perchero Sublimados • Chat Oficial (+593 99 026 0253)
                </span>
              </div>
              <pre className="text-[11px] text-emerald-100 whitespace-pre-wrap leading-relaxed font-sans">
                {generateMessage()}
              </pre>
            </div>
          </div>

          {/* Value Props Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Respuesta estimada: &lt; 5 minutos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Maqueta digital 3D previa sin costo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>Precios por mayor desde 1 docena</span>
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSendQuickDefault}
            className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 transition-colors"
          >
            O enviar consulta rápida sin especificar opciones
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSendToWhatsApp}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 hover:from-emerald-300 hover:to-teal-300 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Enviar a WhatsApp (0990260253)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
