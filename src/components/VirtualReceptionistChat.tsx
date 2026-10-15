import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Minimize2,
  Bot
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionButton?: {
    label: string;
    url?: string;
    actionType?: 'whatsapp' | 'quote_form';
    whatsappText?: string;
  };
  chips?: string[];
}

interface VirtualReceptionistChatProps {
  onOpenQuoteForm?: () => void;
}

export const VirtualReceptionistChat: React.FC<VirtualReceptionistChatProps> = ({ onOpenQuoteForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: Message = {
    id: 'msg-init-1',
    sender: 'bot',
    text: '¡Hola! 👋 Te doy la bienvenida a El Perchero Sublimados. Soy tu recepcionista virtual.\n\n¿En qué te puedo asesorar hoy? Recuerda que manejamos precios especiales al por mayor a partir de 1 docena (12 unidades).',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    chips: [
      '🏷️ Precios al por mayor',
      '📦 ¿Cuál es el pedido mínimo?',
      '🧢 Gorras ($5 c/u)',
      '👕 Camisetas ($10) & Hoodies ($15)',
      '☕ Tazas ($3.50) & Termos ($10)',
      '🏢 Sublimación Corporativa',
      '💬 Hablar con asesor por WhatsApp',
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Wholesale Prices
    if (input.includes('precio') || input.includes('por mayor') || input.includes('cuanto') || input.includes('costo') || input.includes('tarifa')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '📋 *Lista de Precios al por Mayor (a partir de la docena - USD Ecuador):*\n\n' +
          '• 🧢 *Gorras Personalizadas:* $5.00 c/u (desde 1 docena)\n' +
          '• 👕 *Camisetas de Alta Pinta:* desde $10.00 c/u\n' +
          '• 🧥 *Hoodies & Buzos:* desde $15.00 c/u\n' +
          '• ☕ *Tazas Cerámica HD:* desde $3.50 c/u\n' +
          '• 🍶 *Termos Metálicos:* desde $10.00 c/u\n' +
          '• 🏢 *Merch Corporativo:* Precio según volumen por interno.\n\n' +
          '⚡ Todos los precios aplican a partir de 1 docena (12 unidades). ¿Deseas armar tu pedido o maqueta previa?',
        timestamp: time,
        actionButton: {
          label: '📲 Enviar este pedido a WhatsApp (0990260253)',
          actionType: 'whatsapp',
          whatsappText: '¡Hola El Perchero! 👋 Vi la lista de precios al por mayor y deseo cotizar un pedido desde 1 docena.',
        },
        chips: ['🧢 Gorras ($5)', '👕 Camisetas ($10)', '☕ Tazas ($3.50)', '📝 Llenar Formulario de Cotización'],
      };
    }

    // 2. Minimum Order / Dozen
    if (input.includes('minimo') || input.includes('docena') || input.includes('cantidad') || input.includes('unidades')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '📦 *Pedido Mínimo y Descuentos al por Mayor:*\n\n' +
          '• Para acceder al precio por mayor, la cantidad mínima es de **1 docena (12 unidades)**.\n' +
          '• Puedes combinar tallas (S, M, L, XL) dentro de tu pedido de camisetas o hoodies.\n' +
          '• Para producciones mayores (5 a 10 docenas o pedidos corporativos masivos) te ofrecemos descuentos adicionales escalonados y muestra física previa.',
        timestamp: time,
        actionButton: {
          label: '💬 Consultar cantidades especiales por WhatsApp',
          actionType: 'whatsapp',
          whatsappText: 'Hola El Perchero! Quisiera consultar disponibilidad y precios para un pedido por docenas.',
        },
        chips: ['🏷️ Precios al por mayor', '👕 Camisetas ($10)', '💬 Hablar con un asesor'],
      };
    }

    // 3. Caps (Gorras)
    if (input.includes('gorra') || input.includes('cap') || input.includes('trucker')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '🧢 *Gorras Personalizadas El Perchero:*\n\n' +
          '• **Precio por mayor:** $5.00 c/u (desde 1 docena = 12 unidades = $60 total).\n' +
          '• Modelos: Trucker con malla transpirable, gorras clásicas, vicera plana y snapback.\n' +
          '• Personalización: Parche sublimado HD, vinil reflectivo o bordado textil.\n' +
          '• Incluye diseño digital previo sin costo de compromiso.',
        timestamp: time,
        actionButton: {
          label: '🧢 Cotizar Gorras en WhatsApp ($5 x docena)',
          actionType: 'whatsapp',
          whatsappText: '¡Hola! Me interesan las Gorras Personalizadas a $5.00 al por mayor desde la docena. Quisiera ver modelos y enviar mi logo.',
        },
        chips: ['👕 Camisetas ($10)', '☕ Tazas ($3.50)', '📝 Llenar Formulario'],
      };
    }

    // 4. T-Shirts & Hoodies
    if (input.includes('camiseta') || input.includes('hoodie') || input.includes('buzo') || input.includes('streetwear') || input.includes('ropa')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '👕 *Prendas Streetwear & Confección:*\n\n' +
          '• **Camisetas personalizadas:** Desde $10.00 c/u al por mayor (desde 1 docena).\n' +
          '• **Hoodies afelpados:** Desde $15.00 c/u al por mayor.\n' +
          '• Algodón premium y telas de alto gramaje para marcas de ropa, promociones o eventos.\n' +
          '• Estampado: Sublimación HD, DTF textil de alta definición y vinil termo-transferible.',
        timestamp: time,
        actionButton: {
          label: '👕 Cotizar Camisetas/Hoodies por WhatsApp',
          actionType: 'whatsapp',
          whatsappText: '¡Hola! Quisiera cotizar Camisetas ($10) / Hoodies ($15) al por mayor para mi proyecto o marca.',
        },
        chips: ['🧢 Gorras ($5)', '📦 Pedido mínimo', '📝 Llenar Formulario'],
      };
    }

    // 5. Mugs & Tumblers (Tazas y Termos)
    if (input.includes('taza') || input.includes('termo') || input.includes('vaso') || input.includes('mug')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '☕ *Tazas & Termos Sublimados:*\n\n' +
          '• **Tazas de cerámica blanca:** Desde $3.50 c/u al por mayor (desde la docena).\n' +
          '• **Termos y botellas metálicas:** Desde $10.00 c/u al por mayor.\n' +
          '• Acabado brillante, resistente al microondas y lavavajillas. Excelente para regalos corporativos o recuerdos de eventos.',
        timestamp: time,
        actionButton: {
          label: '☕ Cotizar Tazas o Termos por WhatsApp',
          actionType: 'whatsapp',
          whatsappText: '¡Hola! Deseo cotizar Tazas ($3.50) o Termos ($10) al por mayor desde 1 docena.',
        },
        chips: ['🏷️ Precios al por mayor', '🏢 Sublimación Corporativa', '💬 Hablar con asesor'],
      };
    }

    // 6. Corporate Merch
    if (input.includes('corporativ') || input.includes('empresa') || input.includes('instituc') || input.includes('evento')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '🏢 *Sublimación & Merch Corporativo:*\n\n' +
          'Diseñamos welcome kits, lanyards, libretas, termos grabados y uniformes empresariales.\n' +
          '• **Precio:** Cotización por interno según el volumen y combinación de artículos.\n' +
          '• Facturación electrónica autorizada por el SRI.\n' +
          '• Despachos a todo el Ecuador con garantía de puntualidad.',
        timestamp: time,
        actionButton: {
          label: '🏢 Solicitar Propuesta Corporativa x WhatsApp',
          actionType: 'whatsapp',
          whatsappText: '¡Hola! Requiero cotización formal para un pedido corporativo institucional.',
        },
        chips: ['🏷️ Precios al por mayor', '📝 Abrir Formulario', '💬 Hablar con asesor'],
      };
    }

    // 7. Human Contact / WhatsApp
    if (input.includes('whatsapp') || input.includes('contacto') || input.includes('hablar') || input.includes('humano') || input.includes('asesor') || input.includes('telefono')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '📞 *Contacto Directo con Nuestro Taller:*\n\n' +
          '• **WhatsApp Directo:** 0990260253 (+593 99 026 0253)\n' +
          '• **Horario:** Lunes a Sábado de 8:00 AM a 6:30 PM.\n' +
          '• **Ubicación:** El Perchero Taller de Personalización, Ecuador.\n\n' +
          '¡Haz clic abajo para chatear inmediatamente con nuestro equipo de diseño!',
        timestamp: time,
        actionButton: {
          label: '💬 Abrir Chat de WhatsApp con Asesor',
          actionType: 'whatsapp',
          whatsappText: '¡Hola El Perchero! 👋 Quisiera atención directa para cotizar un pedido personalizado.',
        },
        chips: ['🏷️ Precios al por mayor', '📝 Llenar Formulario'],
      };
    }

    // 8. Open Quote Form
    if (input.includes('formulario') || input.includes('cotizar') || input.includes('cotizacion') || input.includes('subir logo') || input.includes('diseno')) {
      return {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: '📝 Puedes solicitar tu cotización formal y adjuntar tu logo directamente en nuestro formulario interactivo en esta misma página.\n\n¡Al llenar tus datos, se sincronizará automáticamente con nuestro sistema de taller!',
        timestamp: time,
        actionButton: {
          label: '📝 Ir al Formulario de Cotización',
          actionType: 'quote_form',
        },
        chips: ['🏷️ Precios al por mayor', '💬 Hablar con asesor por WhatsApp'],
      };
    }

    // Default Fallback
    return {
      id: 'bot-' + Date.now(),
      sender: 'bot',
      text: 'Con mucho gusto te asesoro. En **El Perchero Sublimados** trabajamos todo tipo de personalización textil y publicitaria al por mayor (desde la docena).\n\n¿Deseas consultar precios de algún producto en específico o chatear directamente por WhatsApp con nuestro diseñador?',
      timestamp: time,
      actionButton: {
        label: '📲 Chatear con Diseñador en WhatsApp (0990260253)',
        actionType: 'whatsapp',
        whatsappText: `¡Hola El Perchero! Quisiera consultar sobre: ${userInput}`,
      },
      chips: [
        '🏷️ Precios al por mayor',
        '📦 ¿Cuál es el pedido mínimo?',
        '🧢 Gorras ($5 c/u)',
        '👕 Camisetas ($10) & Hoodies ($15)',
        '💬 Hablar con asesor',
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (msg: Message) => {
    if (!msg.actionButton) return;

    if (msg.actionButton.actionType === 'quote_form') {
      setIsOpen(false);
      if (onOpenQuoteForm) {
        onOpenQuoteForm();
      } else {
        const el = document.getElementById('cotizar');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (msg.actionButton.actionType === 'whatsapp') {
      const text = encodeURIComponent(msg.actionButton.whatsappText || '¡Hola El Perchero Sublimados! Quisiera cotizar.');
      window.open(`https://wa.me/593990260253?text=${text}`, '_blank');
    }
  };

  return (
    <>
      {/* Floating Receptionist Button in bottom right */}
      <aside aria-label="Asistente virtual y recepción" className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2.5 py-2 px-3.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-white border border-rose-500/40 shadow-2xl shadow-black/80 backdrop-blur-md text-xs font-semibold transition-all hover:scale-105 active:scale-95 group animate-fadeIn"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-slate-200">
              ¿Dudas sobre docenas o precios? <strong>Pregúntame aquí</strong>
            </span>
          </button>
        )}

        {/* Floating Circle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-rose-500/30 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-400/40 ${
            isOpen
              ? 'bg-slate-900 text-slate-300 border border-slate-700'
              : 'bg-gradient-to-tr from-rose-600 via-fuchsia-600 to-cyan-500 text-white'
          }`}
          aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual de El Perchero'}
          title="Recepcionista Virtual - El Perchero Sublimados"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <div className="relative">
                <MessageCircle className="w-7 h-7" />
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
                )}
              </div>
            </>
          )}
        </button>
      </aside>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] max-h-[80vh] h-[560px] flex flex-col rounded-3xl bg-[#090d16] border border-slate-700/80 shadow-2xl shadow-black/90 backdrop-blur-2xl overflow-hidden animate-fadeIn"
          role="dialog"
          aria-label="Chat con Recepcionista Virtual"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-cyan-500 p-[2px] flex-shrink-0">
                <img
                  src="images/logo_1.jpg"
                  alt="Avatar Asistente"
                  className="w-full h-full object-cover rounded-full bg-[#0b0f19]"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#090d16]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1">
                    <span>Percherito</span>
                    <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  </h3>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/70 px-1.5 py-0.2 rounded border border-emerald-500/30">
                    En línea
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Recepcionista Virtual • El Perchero
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://wa.me/593990260253?text=Hola%20El%20Perchero!%20Vengo%20desde%20la%20p%C3%A1gina%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-emerald-400 hover:bg-slate-800 transition-colors"
                title="Abrir WhatsApp directo (0990260253)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimizar chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="px-3.5 py-1.5 bg-rose-950/30 border-b border-rose-500/20 text-[11px] text-rose-300 flex items-center justify-between">
            <span>⚡ Precios por mayor desde 1 docena (Ecuador)</span>
            <span className="text-[10px] text-slate-400">WS: 0990260253</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white rounded-br-xs shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-xs shadow-lg'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Optional Action Button */}
                {msg.actionButton && (
                  <button
                    type="button"
                    onClick={() => handleActionClick(msg)}
                    className="mt-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{msg.actionButton.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Optional Chips / Quick Prompts */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-[95%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(chip)}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 transition-all flex items-center gap-1 active:scale-95"
                      >
                        <span>{chip}</span>
                        <ChevronRight className="w-3 h-3 text-cyan-500" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-500 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-2xl w-fit border border-slate-800">
                <Bot className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span className="text-[11px]">Percherito está respondiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregúntame sobre precios, docenas, etc..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-cyan-500 hover:from-rose-600 hover:to-cyan-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-rose-500/20"
              aria-label="Enviar mensaje al recepcionista"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
