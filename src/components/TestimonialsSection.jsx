import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Carlos Martínez",
      role: "Compra: iPhone 15 Pro Max",
      text: "Excelente servicio. El equipo llegó al día siguiente perfectamente empacado. La atención por WhatsApp fue clave para decidirme.",
      rating: 5
    },
    {
      id: 2,
      name: "Laura Gómez",
      role: "Compra: Smart TV Samsung Neo QLED",
      text: "Tenía dudas sobre comprar un televisor tan costoso por internet, pero me dieron garantía oficial y llegó impecable. 100% recomendados.",
      rating: 5
    },
    {
      id: 3,
      name: "Andrés Silva",
      role: "Compra: AirPods Pro 2",
      text: "Originales y sellados de fábrica. Verifiqué la cobertura en la página de Apple sin problemas. Definitivamente volveré a comprar.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-white font-sans border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Nuestros clientes nos avalan
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 italic mb-6 leading-relaxed">
                "{t.text}"
              </p>
              <div>
                <p className="font-extrabold text-slate-900 text-sm">{t.name}</p>
                <p className="text-xs font-medium text-slate-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
