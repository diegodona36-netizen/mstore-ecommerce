import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, CreditCard, Building2, Sparkles } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      icon: CreditCard,
      question: "¿Cómo funciona el pago en cuotas con Cashea?",
      answer: "Puedes adquirir cualquier producto marcado con la insignia de Cashea. Al realizar tu pedido, pagas únicamente el porcentaje inicial correspondiente a tu nivel en la app Cashea (desde 40% a 50%) y el saldo restante se divide en cuotas sin interés cada 14 días. Todo el proceso es rápido y seguro."
    },
    {
      icon: ShieldCheck,
      question: "¿Qué garantía tienen los productos vendidos en M Store?",
      answer: "Todos nuestros equipos son 100% originales, nuevos en caja sellada y cuentan con 1 Año de Garantía Oficial M Store. Si el equipo presenta algún defecto de fábrica, nosotros nos encargamos directamente del diagnóstico, reemplazo o servicio técnico sin trámites engorrosos."
    },
    {
      icon: Truck,
      question: "¿Cómo son los envíos a nivel nacional y tiempos de entrega?",
      answer: "Realizamos envíos asegurados a toda Venezuela a través de las mejores agencias (Tealca, Zoom, MRW). Para entregas en la ciudad contamos con delivery express en menos de 24 horas. Cada paquete viaja con embalaje de alta seguridad y número de guía para rastreo en tiempo real."
    },
    {
      icon: Building2,
      question: "¿Tienen tienda física donde pueda ver los equipos y retirar personalmente?",
      answer: "¡Sí! Contamos con nuestro Showroom Principal donde puedes probar los smartphones de última generación, pantallas y equipos de audio. Nuestro personal te brindará asesoría técnica VIP y podrás pagar directamente en el local."
    },
    {
      icon: Sparkles,
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos Divisas en efectivo (USD), Zelle, Banesco Panamá, Binance Pay (USDT), Pago Móvil y financiamiento en cuotas sin interés con Cashea."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50 font-sans border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 border border-blue-200 text-blue-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Rápidas</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Preguntas Frecuentes
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Todo lo que necesitas saber sobre garantías, financiamiento Cashea, envíos y compras seguras en M Store.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-500/10' 
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">
                      {faq.question}
                    </span>
                  </div>

                  <div className={`p-1 rounded-full shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p className="pl-11">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
