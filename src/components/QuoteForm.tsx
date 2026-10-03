import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  X, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadToApify } from '../services/apifyService';
import type { QuoteFormData } from '../types';

interface QuoteFormProps {
  selectedProduct?: string;
  onClearSelectedProduct?: () => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  selectedProduct = '',
  onClearSelectedProduct,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    productType: selectedProduct || 'Camisetas & Joggers (Streetwear)',
    quantity: '1-10 unidades (Personal / Muestra)',
    specifications: '',
    hasFile: false,
    fileName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Update product if prop changes
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, productType: selectedProduct }));
    }
  }, [selectedProduct]);

  const productOptions = [
    'Camisetas & Joggers (Streetwear y Alta Pinta)',
    'Gorras Personalizadas (Trucker / Snapback)',
    'Tazas Creativas & Termos Metálicos',
    'Artículos de Sublimación Corporativa / Merch',
    'Paquete Mixto / Múltiples Productos',
    'Otro producto personalizado'
  ];

  const quantityOptions = [
    '1 - 10 unidades (Uso personal / Muestra / Regalo)',
    '11 - 50 unidades (Pequeña escala / Lanzamiento de marca)',
    '51 - 200 unidades (Evento / Dotación de equipo)',
    '+200 unidades (Gran volumen / Distribución al por mayor)'
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        hasFile: true,
        fileName: file.name,
      }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      hasFile: false,
      fileName: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor ingresa tu nombre y número de WhatsApp para poder contactarte.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    sendLeadToApify({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      productType: formData.productType,
      quantity: formData.quantity,
      specifications: formData.specifications,
      source: 'landing_page_el_perchero',
      createdAt: new Date().toISOString(),
    }).then((res) => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#f43f5e', '#f59e0b', '#8b5cf6'],
      });

      if (!res.success && res.error) {
        console.warn('Detalle de sincronización Apify:', res.error);
      }
    }).catch((err) => {
      console.error(err);
      setIsSubmitting(false);
      setIsSubmitted(true);
    });
  };

  // WhatsApp instant generator
  const handleWhatsAppDirect = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Por favor escribe tu nombre y teléfono antes de abrir WhatsApp.');
      return;
    }

    const message = `¡Hola El Perchero Sublimados! 👋 Mi nombre es ${formData.fullName}.
Quisiera cotizar:
📌 Producto: ${formData.productType}
📦 Cantidad: ${formData.quantity}
💬 Detalles: ${formData.specifications || 'Deseo asesoría para personalizar mi diseño'}
${formData.hasFile ? `📁 Adjuntaré mi archivo: ${formData.fileName}` : ''}

Quedo atento a su respuesta. ¡Gracias!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573001234567?text=${encoded}`, '_blank');
  };

  return (
    <section id="cotizar" className="py-20 md:py-28 relative scroll-mt-20">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-rose-500/30 text-xs font-bold text-rose-300 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Cotizador Rápido & Sin Compromiso</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Solicita Tu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-cyan-400">
              Cotización Personalizada
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Dinos qué tienes en mente. Te enviamos presupuesto formal y tu primera <strong>maqueta digital gratuita</strong> en tiempo récord.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative">
          
          {selectedProduct && onClearSelectedProduct && (
            <div className="mb-6 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs text-cyan-200">
              <span className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Producto pre-seleccionado: <strong>{selectedProduct}</strong>
              </span>
              <button
                type="button"
                onClick={onClearSelectedProduct}
                className="text-xs text-slate-400 hover:text-white underline font-medium"
              >
                Cambiar selección
              </button>
            </div>
          )}

          {isSubmitted ? (
            <div className="text-center py-12 px-4 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  ¡Solicitud Enviada con Éxito!
                </h3>
                <p className="text-slate-300 text-sm">
                  Gracias <strong className="text-white">{formData.fullName}</strong>. Un diseñador de <strong>El Perchero Sublimados</strong> está revisando tus datos y te contactará a tu WhatsApp o correo en menos de 30 minutos.
                </p>
              </div>

              {/* Summary box */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs text-slate-300 space-y-2">
                <p><strong>Producto:</strong> {formData.productType}</p>
                <p><strong>Cantidad:</strong> {formData.quantity}</p>
                <p><strong>Contacto:</strong> {formData.phone} / {formData.email || 'WhatsApp'}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chatear ahora mismo por WhatsApp</span>
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700"
                >
                  Hacer otra cotización
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Grid 1: Name and WhatsApp */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Tu Nombre Completo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Ej. Andrés Gómez"
                    required
                    autoComplete="name"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    WhatsApp o Teléfono <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. +57 300 123 4567"
                    required
                    autoComplete="tel"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              {/* Grid 2: Email and Product Line */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Correo Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="andres@ejemplo.com"
                    autoComplete="email"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="productType" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Producto a Personalizar <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="productType"
                    name="productType"
                    value={formData.productType}
                    onChange={handleInputChange}
                    className="w-full min-h-[48px] px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all cursor-pointer"
                  >
                    {productOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity selector */}
              <div>
                <label htmlFor="quantity" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Cantidad Aproximada <span className="text-rose-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quantityOptions.map((qOpt) => (
                    <label
                      key={qOpt}
                      className={`flex items-center p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        formData.quantity === qOpt
                          ? 'bg-rose-500/15 border-rose-500 text-white font-semibold shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <input
                        type="radio"
                        name="quantity"
                        value={qOpt}
                        checked={formData.quantity === qOpt}
                        onChange={handleInputChange}
                        className="mr-2.5 accent-rose-500"
                      />
                      <span>{qOpt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specifications / Idea details */}
              <div>
                <label htmlFor="specifications" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Cuéntanos tu idea, colores o detalles especiales
                </label>
                <textarea
                  id="specifications"
                  name="specifications"
                  rows={3}
                  value={formData.specifications}
                  onChange={handleInputChange}
                  placeholder="Ej. Quiero 30 camisetas oversize negras con un estampado full color en la espalda y logo pequeño en el pecho..."
                  className="w-full p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                />
              </div>

              {/* Simulated File Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Adjunta tu logo o boceto (Opcional)
                </label>
                
                {formData.hasFile ? (
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-cyan-400" />
                      <span className="font-semibold">{formData.fileName}</span>
                      <span className="text-slate-400">(Listo para adjuntar)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Eliminar archivo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all group">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.pdf,.ai,.psd,.svg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <UploadCloud className="w-7 h-7 text-slate-400 group-hover:text-cyan-400 transition-colors mb-2" />
                    <span className="text-xs text-slate-300 font-semibold text-center">
                      Haz clic aquí para subir tu archivo o arrástralo
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1">
                      PNG, JPG, PDF, AI, SVG (Máx. 25MB)
                    </span>
                  </label>
                )}
              </div>

              {/* Trust & Guarantee Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Maqueta digital previa sin costo de compromiso</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>Respuesta récord en &lt; 30 min hábiles</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-rose-500 via-rose-600 to-fuchsia-600 hover:from-rose-600 hover:to-cyan-600 shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  {isSubmitting ? (
                    <span>Procesando solicitud...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Solicitar Cotización Inmediata</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-1/3 py-4 px-4 rounded-xl font-semibold text-sm text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
                  title="Enviar datos directo por WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar x WhatsApp</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
