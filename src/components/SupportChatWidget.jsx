import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCheck, Sparkles } from 'lucide-react';

export const SupportChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnreadCount(0);
  };

  const handleWhatsAppDirect = () => {
    window.open(
      'https://wa.me/584120000000?text=Hola%20M%20Store!%20Deseo%20informaci%C3%B3n%20y%20asesor%C3%ADa%20VIP%20sobre%20sus%20electrodom%C3%A9sticos.',
      '_blank'
    );
  };

  const handleSendToWhatsApp = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      window.open(
        'https://wa.me/584120000000?text=Hola%20M%20Store!%20Deseo%20informaci%C3%B3n%20y%20asesor%C3%ADa%20personalizada.',
        '_blank'
      );
      return;
    }
    const encodedText = encodeURIComponent(`Hola M Store! Tengo la siguiente consulta: "${message.trim()}"`);
    window.open(`https://wa.me/584120000000?text=${encodedText}`, '_blank');
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-inter text-left flex flex-col items-end gap-3">

      {/* POPUP CARD CHAT WIDGET */}
      {isOpen && (
        <div className="mb-1 w-80 sm:w-96 rounded-3xl bg-[#0A0E17]/95 border border-[#00E5FF]/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 space-y-4 animate-fadeIn">

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/50 text-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0A0E17] shadow-[0_0_8px_#34d399]"></span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold font-space text-white flex items-center gap-1.5">
                  <span>Asesor M Store VIP</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                </h4>
                <p className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <span>• En línea ahora</span>
                  <span className="text-slate-400 font-normal">| Respuesta inmediata</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat de soporte"
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#00E5FF] min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <p className="text-xs text-slate-200 leading-relaxed">
              👋 <strong className="text-white font-space">¡Hola! Bienvenido a M Store.</strong> ¿Buscas algún electrodoméstico, Smart TV, nevera, cocina o smartphone? Te asesoramos en tiempo real por WhatsApp.
            </p>
            <div className="flex justify-end text-[10px] text-slate-400 gap-1 items-center font-mono">
              <span>Ahora</span>
              <CheckCheck className="w-3 h-3 text-[#00E5FF]" />
            </div>
          </div>

          {/* Input & Send */}
          <form onSubmit={handleSendToWhatsApp} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu consulta..."
              aria-label="Escribe tu mensaje para WhatsApp"
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-400 outline-none font-inter min-h-[44px]"
            />
            <button
              type="submit"
              aria-label="Enviar consulta por WhatsApp"
              className="p-3.5 rounded-2xl bg-[#00E5FF] hover:bg-[#33ebff] text-black shadow-[0_0_20px_#00E5FF] hover:scale-105 active:scale-95 transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Send className="w-4 h-4 fill-black" />
            </button>
          </form>

        </div>
      )}

      {/* ROW: Botón WhatsApp verde + Botón chat azul */}
      <div className="flex items-center gap-3">

        {/* BOTÓN FLOTANTE WHATSAPP VIP (VERDE INDEPENDIENTE) */}
        <button
          onClick={handleWhatsAppDirect}
          aria-label="Contactar directamente por WhatsApp VIP"
          title="WhatsApp VIP M Store"
          className="relative p-4 rounded-full text-white shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white transition-all flex items-center justify-center cursor-pointer min-w-[56px] min-h-[56px]"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* BOTÓN CHAT ASESOR VIP (CYAN) */}
        <button
          onClick={handleOpen}
          aria-label="Abrir Asesor de Soporte M Store VIP"
          title="Asesor M Store VIP en vivo"
          className="relative p-4 rounded-full bg-[#00E5FF] text-black shadow-[0_0_35px_#00E5FF] hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white transition-all flex items-center justify-center cursor-pointer group min-w-[56px] min-h-[56px]"
        >
          <MessageSquare className="w-6 h-6 fill-black group-hover:scale-110 transition-transform" />
          {unreadCount > 0 && !isOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0A0E17] text-[#00E5FF] border-2 border-[#00E5FF] font-extrabold text-[10px] flex items-center justify-center font-space shadow-[0_0_10px_#00E5FF] animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>

      </div>
    </div>
  );
};
