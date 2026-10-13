import React, { useState } from 'react';
import { X, ShieldCheck, Cookie, FileText, Lock, CheckCircle2 } from 'lucide-react';

export type LegalTab = 'privacy' | 'cookies' | 'terms';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
  onOpenCookieSettings?: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
  onOpenCookieSettings,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  React.useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col bg-[#080c14]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white">
                Centro de Privacidad, Cookies y Protección de Datos
              </h2>
              <p className="text-xs text-slate-400">
                Cumplimiento con la Ley Orgánica de Protección de Datos Personales (LOPDP - Ecuador)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar ventana legal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-rose-500 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4 text-rose-400" />
            <span>Política de Privacidad (LOPDP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'cookies'
                ? 'border-cyan-400 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cookie className="w-4 h-4 text-cyan-400" />
            <span>Política de Cookies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-emerald-400 text-white bg-slate-900/90'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Términos y Condiciones</span>
          </button>
        </div>

        {/* Scrollable Legal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">
                    Garantía de Confidencialidad y Protección de Datos en Ecuador
                  </strong>
                  En <strong>El Perchero Sublimados</strong> respetamos tu privacidad y protegemos tus datos personales y diseños conforme a la <strong>Ley Orgánica de Protección de Datos Personales (LOPDP) de la República del Ecuador</strong>.
                </div>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. Responsable del Tratamiento de Datos</h3>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li><strong>Nombre Comercial:</strong> El Perchero Sublimados - Taller de Personalización</li>
                  <li><strong>País / Jurisdicción:</strong> República del Ecuador</li>
                  <li><strong>Teléfono / WhatsApp Oficial:</strong> 0990260253 (+593 99 026 0253)</li>
                  <li><strong>Correo Electrónico de Contacto:</strong> contacto@elperchero.com</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">2. Datos Personales que Recopilamos</h3>
                <p>
                  Únicamente solicitamos y tratamos los datos estrictamente necesarios cuando el usuario llena voluntariamente nuestro formulario de cotización, sube un archivo o nos contacta por WhatsApp:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong>Datos de identificación y contacto:</strong> Nombre completo, número de teléfono/WhatsApp y correo electrónico (opcional).</li>
                  <li><strong>Datos comerciales del pedido:</strong> Producto seleccionado, cantidad en docenas y especificaciones técnicas de personalización.</li>
                  <li><strong>Archivos gráficos e imágenes:</strong> Logotipos, fotografías, bocetos o diseños subidos por el cliente para elaborar la vista previa digital (mockup) y estampado.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. Finalidad del Tratamiento y Base Legal</h3>
                <p>
                  Con base en el <strong>consentimiento libre, específico, informado e inequívoco</strong> del titular (Art. 7 y 8 de la LOPDP), sus datos serán utilizados exclusivamente para:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li>Elaborar y enviar el presupuesto formal de los productos personalizados solicitados.</li>
                  <li>Diseñar y enviar la maqueta digital (vista previa) con el logotipo o arte suministrado por el cliente.</li>
                  <li>Coordinar la producción, facturación y envío de los pedidos dentro del Ecuador.</li>
                  <li>Enviar novedades o catálogos únicamente si el usuario se suscribió expresamente al boletín.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">4. Confidencialidad de Logotipos, Fotos y Diseños del Cliente</h3>
                <p>
                  Todos los logotipos, marcas, fotografías personales o artes enviadas por el cliente son de <strong>exclusiva propiedad intelectual del cliente</strong>. <strong>El Perchero Sublimados</strong> se compromete a utilizar dichos archivos únicamente para la elaboración del mockup y la producción autorizada por el titular, prohibiendo su venta, cesión o reproducción para terceros sin autorización.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">5. No Transferencia ni Venta de Datos a Terceros</h3>
                <p>
                  No vendemos, alquilamos ni cedemos bases de datos personales a terceros. Los datos solo podrán compartirse con empresas de transporte/courier (como Servientrega o transporte encomienda) en la medida indispensable para entregar el pedido físico en la dirección indicada por el cliente.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">6. Derechos del Titular (Derechos ARCO+ en Ecuador)</h3>
                <p>
                  De acuerdo con la LOPDP, usted tiene derecho a solicitar en cualquier momento y de forma gratuita el <strong>Acceso, Rectificación y Actualización, Eliminación, Oposición, Portabilidad y Suspensión del tratamiento</strong> de sus datos personales, así como a revocar su consentimiento, escribiendo directamente a <strong>contacto@elperchero.com</strong> o a nuestro WhatsApp <strong>0990260253</strong>.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-5">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. ¿Qué son las Cookies y el Almacenamiento Local?</h3>
                <p>
                  Las cookies y tecnologías similares (como <code>localStorage</code> del navegador) son pequeños archivos de texto que se almacenan en su dispositivo (computador o teléfono móvil) cuando visita nuestro sitio web para recordar sus preferencias y garantizar que las funciones interactivas operen sin errores.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-base font-bold text-white">2. Tipos de Cookies que Utilizamos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm">Cookies Técnicas y Necesarias</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Siempre Activas
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Indispensables para recordar tu decisión sobre el aviso de privacidad, mantener temporalmente el producto preseleccionado en el cotizador y procesar tus solicitudes de forma segura.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs sm:text-sm">Cookies de Preferencias y CRM</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        Opcionales
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Permiten guardar localmente el historial de cotizaciones enviadas desde tu navegador y sincronizar solicitudes de atención al cliente para brindarte respuestas más rápidas.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. ¿Cómo Administrar o Desactivar las Cookies?</h3>
                <p>
                  Puedes aceptar todas las cookies, aceptar únicamente las necesarias o cambiar tu configuración en cualquier momento desde nuestro banner de cookies o haciendo clic en el botón inferior.
                </p>
                {onOpenCookieSettings && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCookieSettings();
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center gap-2"
                    >
                      <Cookie className="w-4 h-4" />
                      <span>Modificar mis preferencias de Cookies ahora</span>
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-5">
              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">1. Condiciones Comerciales y Precios al Por Mayor</h3>
                <p>
                  Todos los precios publicados en nuestro sitio web están expresados en <strong>Dólares de los Estados Unidos de América ($ USD)</strong>, moneda de curso legal en el Ecuador. Las tarifas mayoristas aplican a partir de <strong>una docena (12 unidades)</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong>Gorras personalizadas:</strong> Desde $5.00 USD al por mayor a partir de la docena.</li>
                  <li><strong>Camisetas personalizadas:</strong> Desde $10.00 USD al por mayor a partir de la docena.</li>
                  <li><strong>Hoodies personalizados:</strong> Desde $15.00 USD al por mayor a partir de la docena.</li>
                  <li><strong>Tazas personalizadas:</strong> Desde $3.50 USD al por mayor a partir de la docena.</li>
                  <li><strong>Termos metálicos:</strong> Desde $10.00 USD al por mayor a partir de la docena.</li>
                  <li><strong>Artículos de sublimación corporativa:</strong> Cotización por interno según volumen y especificaciones del kit (a partir de la docena).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">2. Aprobación Previa de Diseño (Mockup Digital)</h3>
                <p>
                  Antes de iniciar la producción en nuestras prensas térmicas, <strong>El Perchero Sublimados</strong> enviará al cliente una vista previa digital (mockup) para su revisión y aprobación. Una vez aprobado el diseño, tallas y cantidades por el cliente, el pedido entra a producción en firme.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-white">3. Garantía de Calidad</h3>
                <p>
                  Garantizamos la fidelidad cromática y durabilidad del estampado por sublimación. En caso de presentarse algún defecto técnico de impresión o confección atribuible a nuestro taller, realizaremos la reposición de la pieza afectada sin costo adicional para el cliente.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 border-t border-slate-800 bg-slate-900/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Última actualización: Octubre 2026 • El Perchero Sublimados (Ecuador)
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 transition-all"
          >
            Entendido y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
