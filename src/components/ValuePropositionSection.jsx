import React from 'react';
import { ShieldCheck, Truck, HeadphonesIcon, ArrowRight } from 'lucide-react';

export const ValuePropositionSection = ({ onNavigateCatalog }) => {
  return (
    <section className="py-16 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Comprar tecnología original no debería ser un riesgo
          </h2>
          <p className="text-slate-600 text-lg">
            Garantizamos la autenticidad y funcionamiento de cada equipo con respaldo directo de fábrica. Tu inversión está 100% segura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Benefit 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-900">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Garantía M Store 1 Año</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Respaldo total directo con nosotros. Si tu equipo presenta defectos de fábrica, gestionamos el reemplazo o reparación sin demoras.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-900">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Envíos VIP 24 Horas</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Entregas aseguradas a todo el país. Rastreo en vivo y empaque de alta seguridad para que tus equipos lleguen intactos.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-900">
              <HeadphonesIcon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">Asesoría Técnica</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No estás solo tras la compra. Nuestro equipo de soporte está disponible vía WhatsApp para ayudarte con configuraciones.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigateCatalog && onNavigateCatalog('todos')}
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 text-white px-8 py-3.5 rounded-xl font-extrabold transition-all shadow-md hover:scale-105 active:scale-95"
          >
            Explorar Productos Protegidos
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
