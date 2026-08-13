import React from 'react';
import { ShieldCheck, Star, CheckCircle, CreditCard, Sparkles } from 'lucide-react';

export const SocialProofBar = () => {
  const brands = [
    { name: 'Apple', tag: 'Distribuidor Autorizado' },
    { name: 'Samsung', tag: 'Línea Galaxy & Neo QLED' },
    { name: 'Xiaomi', tag: 'Smartphones & Smart Home' },
    { name: 'JBL', tag: 'Audio High-End' },
    { name: 'Sony', tag: 'PlayStation & Bravia' },
    { name: 'LG', tag: 'OLED & NanoCell 4K' }
  ];

  const paymentMethods = [
    { name: 'Cashea', isCashea: true },
    { name: 'Pago Móvil (Tasa BCV)' },
    { name: 'Zelle' },
    { name: 'Banesco Panamá' },
    { name: 'Binance USDT' },
    { name: 'Efectivo USD' }
  ];

  return (
    <section className="bg-white border-y border-slate-200 py-6 md:py-8 select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        
        {/* Top Row: Trust Metrics + Official Tech Brands */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          
          {/* Customer Reviews Rating Pill */}
          <div className="flex items-center gap-3.5 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shrink-0">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Cliente M Store" />
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Cliente M Store" />
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="Cliente M Store" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                +2k
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-900 ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold">
                +2,500 clientes satisfechos en toda Venezuela
              </p>
            </div>
          </div>

          {/* Brands Badges Grid */}
          <div className="flex-1 flex items-center justify-center lg:justify-end gap-3 sm:gap-6 flex-wrap">
            {brands.map((b, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-black text-slate-800 tracking-tight">{b.name}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Row: Payment Methods Ticker */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-extrabold text-slate-800">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span>Métodos de Pago Aceptados:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            {paymentMethods.map((pm, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                  pm.isCashea
                    ? 'bg-[#FFE600] text-black border-amber-400 font-black'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {pm.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
