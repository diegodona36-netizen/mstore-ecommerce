import React from 'react';
import { Truck, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

export const TopAnnouncementBar = () => {
  return (
    <div className="bg-[#090D16] text-slate-300 text-[11px] sm:text-xs font-semibold py-2 px-4 border-b border-white/5 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left / Center Value Props */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1 w-full sm:w-auto">
          
          {/* Envío Gratis */}
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Envío Gratis a Todo el País</span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          {/* Cashea Promo */}
          <div className="flex items-center gap-1.5 text-slate-200">
            <span className="bg-[#FFE600] text-black px-1.5 py-0.5 rounded-[4px] font-black uppercase tracking-wider text-[9px] border border-amber-400 shadow-xs">
              CASHEA
            </span>
            <span>¡Compra hoy y paga en cuotas!</span>
          </div>

          <span className="hidden md:inline text-white/20">|</span>

          {/* Garantía */}
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Garantía Oficial M Store</span>
          </div>
        </div>

        {/* Right Info / Direct WhatsApp */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-400">
          <a
            href="https://wa.me/584121234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Atención WhatsApp 24/7</span>
          </a>
          <span className="text-white/20">|</span>
          <span className="font-bold text-slate-300">Tasa Oficial BCV</span>
        </div>

      </div>
    </div>
  );
};
