import React from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

export const ValuePropositionSection = ({ onNavigateCatalog }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      title: '1 Año de Garantía Oficial',
      description: 'Todos nuestros productos son 100% originales, nuevos en caja sellada con respaldo directo en nuestro centro de servicio.'
    },
    {
      icon: Truck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      title: 'Envíos VIP Asegurados',
      description: 'Entregas a toda Venezuela con Tealca, Zoom o MRW asegurados al 100%. Delivery express en 24 horas en la ciudad.'
    },
    {
      icon: CreditCard,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      title: 'Financiamiento con Cashea',
      description: 'Paga una inicial cómoda y divide el resto en cuotas quincenales sin intereses a través de tu app Cashea.'
    },
    {
      icon: HeadphonesIcon,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      title: 'Asesoría Técnica Especializada',
      description: 'Acompañamiento VIP antes, durante y después de tu compra. Te ayudamos a configurar tu equipo y resolver dudas.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-slate-200/80 text-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Por qué elegir M Store</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Comprar tecnología original con total respaldo y tranquilidad
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Eliminamos el riesgo en tus compras tecnológicas. Calidad certificada, garantía real en tienda física y la mejor atención en Venezuela.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${pillar.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action CTA */}
        <div className="text-center pt-2">
          <button 
            type="button"
            onClick={() => onNavigateCatalog && onNavigateCatalog('todos')}
            className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/25 active:scale-95 group"
          >
            <span>Explorar Todos los Productos Protegidos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
