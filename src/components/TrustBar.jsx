import React from 'react';
import { Truck, ShieldCheck, CreditCard, MessageCircle } from 'lucide-react';

export const TrustBar = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Envío Gratis Nacional',
      desc: 'Zoom, MRW y Tealca asegurado',
      accent: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Oficial 1 Año',
      desc: 'Respaldo y soporte técnico directo',
      accent: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: CreditCard,
      title: 'Paga con Cashea',
      desc: 'Lleva hoy y paga en cuotas 0% interés',
      accent: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      icon: MessageCircle,
      title: 'Asesoría VIP 24/7',
      desc: 'Atención personalizada por WhatsApp',
      accent: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  const brands = [
    { name: 'Apple', tag: 'Distribuidor Autorizado' },
    { name: 'Samsung', tag: 'Galaxy Oficial' },
    { name: 'Xiaomi', tag: 'Tienda Oficial' },
    { name: 'Sony', tag: 'Audio & PlayStation' },
    { name: 'JBL', tag: 'Sonido Profesional' },
    { name: 'Nintendo', tag: 'Consolas & Juegos' },
    { name: 'Honor', tag: 'Smartphones & Magic' }
  ];

  return (
    <section className="w-full bg-white border-y border-slate-200/80 font-sans py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* 1. CUADRÍCULA DE 4 BENEFICIOS CLAVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all group"
              >
                <div className={`p-3 rounded-xl ${item.bg} ${item.accent} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-900 tracking-tight">{item.title}</h4>
                  <p className="text-[11px] font-medium text-slate-500 truncate">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. CINTA DE MARCAS OFICIALES */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Marcas Oficiales:</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto w-full sm:w-auto justify-start sm:justify-end pb-1 [&::-webkit-scrollbar]:hidden">
            {brands.map((b, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/70 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 transition-all shrink-0 cursor-default"
              >
                <span className="text-xs font-black tracking-tight">{b.name}</span>
                <span className="text-[9px] font-semibold text-slate-400 hidden md:inline">| {b.tag}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
