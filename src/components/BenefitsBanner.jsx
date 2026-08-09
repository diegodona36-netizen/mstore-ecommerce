import React from 'react';
import { Truck, ShieldCheck, Headphones, CreditCard, Sparkles } from 'lucide-react';
import { BENEFITS } from '../data/products';

export const BenefitsBanner = () => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Truck': return <Truck className="w-7 h-7 text-[#00E5FF]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-[#00E5FF]" />;
      case 'Headphones': return <Headphones className="w-7 h-7 text-[#00E5FF]" />;
      case 'CreditCard': return <CreditCard className="w-7 h-7 text-[#00E5FF]" />;
      default: return <Sparkles className="w-7 h-7 text-[#00E5FF]" />;
    }
  };

  return (
    <section id="beneficios" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-[#00E5FF]/20 relative overflow-hidden">
          
          {/* Subtle Ambient Background glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00E5FF] opacity-10 blur-3xl pointer-events-none rounded-full"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-4 group">
                <div className="p-3.5 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300">
                  {getIcon(benefit.icon)}
                </div>
                <div>
                  <h4 className="text-base font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
