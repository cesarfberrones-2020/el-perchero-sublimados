import React, { useState, useRef } from 'react';
import { UploadCloud, Laptop, Truck, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, FileText, X, Image as ImageIcon } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';

interface ProcessProps {
  onQuoteClick: () => void;
  onFileUploaded?: (fileData: { fileName: string; previewUrl: string }) => void;
}

export const Process: React.FC<ProcessProps> = ({ onQuoteClick, onFileUploaded }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const icons = [UploadCloud, Laptop, Truck];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);

      let url = '';
      if (file.type.startsWith('image/')) {
        url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl('');
      }

      if (onFileUploaded) {
        onFileUploaded({ fileName: file.name, previewUrl: url });
      }
      setActiveStep(0);
    }
  };

  const clearUploadedFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFileName('');
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileUploaded) {
      onFileUploaded({ fileName: '', previewUrl: '' });
    }
  };

  const triggerFileSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <section id="proceso" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-950/60 border-y border-slate-900">
      {/* Hidden File Input for Step 01 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.pdf,.ai,.psd"
        onChange={handleFileChange}
        className="hidden"
      />

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
            De tu idea o boceto al producto terminado en tus manos en solo 3 sencillos pasos. ¡Sube tu logo o foto directamente en el <strong>Paso 01</strong>!
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
                    <button
                      type="button"
                      onClick={(e) => {
                        if (idx === 0) {
                          triggerFileSelect(e);
                        } else {
                          setActiveStep(idx);
                        }
                      }}
                      title={idx === 0 ? 'Haz clic para subir tu logo, foto o diseño' : step.title}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-br from-rose-500 to-cyan-500 text-white shadow-lg hover:scale-105'
                          : 'bg-slate-900 border border-slate-700 text-cyan-400 hover:border-cyan-400 hover:scale-105'
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </button>
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
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Interactive Upload Box inside Step 01 */}
                  {idx === 0 && (
                    <div className="mb-5" onClick={(e) => e.stopPropagation()}>
                      {uploadedFileName ? (
                        <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/50 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              {previewUrl ? (
                                <img
                                  src={previewUrl}
                                  alt="Vista previa de tu diseño"
                                  className="w-12 h-12 rounded-lg object-contain bg-slate-950 border border-slate-700 flex-shrink-0"
                                />
                              ) : (
                                <FileText className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">
                                  {uploadedFileName}
                                </p>
                                <p className="text-[11px] text-emerald-400 font-medium">
                                  ✓ Archivo cargado con éxito
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={clearUploadedFile}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Cambiar archivo"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-2 pt-1">
                            <button
                              type="button"
                              onClick={onQuoteClick}
                              className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-md flex items-center justify-center gap-1.5 transition-all"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Cotizar con este diseño</span>
                            </button>
                            <a
                              href={`https://wa.me/593990260253?text=${encodeURIComponent(
                                `¡Hola El Perchero Sublimados! 👋 Ya cargué mi diseño (${uploadedFileName}) en la web y quiero cotizar al por mayor.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Enviar por WhatsApp (0990260253)</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={triggerFileSelect}
                            className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-cyan-500/50 hover:border-rose-400 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all group shadow-inner"
                          >
                            <div className="flex items-center gap-2 text-cyan-300 group-hover:text-rose-300">
                              <UploadCloud className="w-5 h-5 animate-bounce" />
                              <span>Haz clic aquí para subir tu Logo, Foto o Diseño</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-normal">
                              Soporta PNG, JPG, PDF, AI, SVG o fotos desde tu celular/PC
                            </span>
                          </button>

                          <a
                            href="https://wa.me/593990260253?text=Hola%20El%20Perchero%20Sublimados!%20Quiero%20enviarles%20mi%20logo%20o%20idea%20para%20cotizar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/30 flex items-center justify-center gap-1.5 transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>O envíalo directo al WhatsApp: 0990260253</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Preview inside Step 02 if user uploaded an image */}
                  {idx === 1 && previewUrl && (
                    <div className="mb-5 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 flex items-center gap-3">
                      <img
                        src={previewUrl}
                        alt="Tu diseño en vista previa"
                        className="w-14 h-14 rounded-xl object-contain bg-slate-950 border border-slate-700 p-1 flex-shrink-0"
                      />
                      <div className="text-xs">
                        <p className="font-bold text-cyan-300 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Vista Previa Detectada</span>
                        </p>
                        <p className="text-slate-300 text-[11px] mt-0.5">
                          Tu archivo <strong>{uploadedFileName}</strong> está listo para montaje digital.
                        </p>
                      </div>
                    </div>
                  )}

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
                src="images/workshop.jpg"
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
                  type="button"
                  onClick={triggerFileSelect}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Subir mi Logo / Diseño Ahora</span>
                </button>
                <a
                  href="https://wa.me/593990260253?text=Hola%20El%20Perchero%20Sublimados!%20Quiero%20enviar%20mi%20dise%C3%B1o%20para%20cotizar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-bold text-sm text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp: 0990260253</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
