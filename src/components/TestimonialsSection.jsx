import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Eduardo Martínez",
      location: "Caracas, Miranda",
      role: "Compra verificada: Samsung Galaxy S24 Ultra (512GB)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      text: "Excelente atención de principio a fin. El equipo llegó al día siguiente perfectamente empacado con sus sellos de seguridad originales. Pagar con Cashea fue súper rápido.",
      rating: 5,
      date: "Hace 3 días"
    },
    {
      id: 2,
      name: "Valeria Mendoza",
      location: "Valencia, Carabobo",
      role: "Compra verificada: Smart TV Samsung 65' Crystal 4K",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      text: "Tenía temor de comprar una pantalla tan grande por internet, pero el envío por Tealca estuvo 100% asegurado. La televisión llegó impecable y con su certificado de garantía.",
      rating: 5,
      date: "Hace 1 semana"
    },
    {
      id: 3,
      name: "Andrés Silva R.",
      location: "Lechería, Anzoátegui",
      role: "Compra verificada: Apple AirPods Pro 2da Gen",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
      text: "100% originales. Verifiqué el número de serie en la página de Apple y la cobertura de 1 año estaba activa. Recomiendo totalmente a M Store.",
      rating: 5,
      date: "Hace 2 semanas"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Opiniones Reales de Compradores</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            La confianza de nuestros clientes es nuestro mayor respaldo
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            Más de 2,500 clientes satisfechos disfrutan hoy de sus equipos con garantía total en toda Venezuela.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5 relative"
            >
              <div className="space-y-4">
                {/* Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verificado</span>
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">{t.name}</h4>
                  </div>
                  <p className="text-[10px] text-blue-600 font-bold truncate">{t.role}</p>
                  <p className="text-[10px] text-slate-400">{t.location} • {t.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
