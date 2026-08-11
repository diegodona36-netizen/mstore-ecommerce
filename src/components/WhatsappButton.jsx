import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsappButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const text = userMsg.trim() || 'Hola M Store, quisiera información sobre los smartphones y accesorios disponibles.';
    const url = `https://wa.me/5215555555555?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Floating Chat Box Popup */}
      {isOpen && (
        <div className="mb-4 w-72 sm:w-80 glass-modal rounded-3xl p-5 border border-[#00E5FF]/40 shadow-2xl animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF] flex items-center justify-center text-[#00E5FF]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-black animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-space">Asesor M Store VIP</h4>
                <p className="text-[10px] text-emerald-400 font-medium">En línea ahora • Respuesta inmediata</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble */}
          <div className="my-4 p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-xs text-slate-300 leading-relaxed">
            👋 ¡Hola! Bienvenido a <strong>M Store</strong>. ¿Buscas algún smartphone o accesorio en particular? Te asesoramos en tiempo real.
          </div>

          {/* Form */}
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta..."
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-black p-2 rounded-xl transition-all shadow-[0_0_10px_#10B981]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300 transform hover:scale-110"
        aria-label="Abrir Chat de WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00E5FF] rounded-full flex items-center justify-center text-[9px] font-black text-black ring-2 ring-black">
          1
        </span>
        <MessageCircle className="w-7 h-7 fill-black" />
      </button>

    </div>
  );
};
