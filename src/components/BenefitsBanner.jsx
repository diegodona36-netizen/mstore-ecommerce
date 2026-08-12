import React from 'react';
import { Truck, ShieldCheck, Headphones, CreditCard, Sparkles } from 'lucide-react';
import { BENEFITS } from '../data/products';

export const BenefitsBanner = ({ isLightBg = true }) => {
  const getIcon = (iconName) => {
    const iconClass = `w-7 h-7 ${isLightBg ? 'text-[#0066FF]' : 'text-[#00E5FF]'}`;
    switch (iconName) {
      case 'Truck': return <Truck className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'Headphones': return <Headphones className={iconClass} />;
      case 'CreditCard': return <CreditCard className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section id="beneficios" className="py-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className={`rounded-3xl p-8 md:p-12 relative overflow-hidden transition-all ${
          isLightBg 
            ? 'bg-white border-2 border-slate-200 shadow-md' 
            : 'glass-card border border-[#00E5FF]/20'
        }`}>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit) => (
              <div key={benefit.id} className="flex items-start gap-4 group">
                <div className={`p-3.5 rounded-2xl shrink-0 transition-all duration-300 ${
                  isLightBg 
                    ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 group-hover:bg-[#0066FF] group-hover:text-white shadow-sm' 
                    : 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 group-hover:scale-110'
                }`}>
                  {getIcon(benefit.icon)}
                </div>
                <div>
                  <h4 className={`text-base font-extrabold font-space group-hover:text-[#0066FF] transition-colors ${
                    isLightBg ? 'text-slate-900' : 'text-white'
                  }`}>
                    {benefit.title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed font-inter font-medium ${
                    isLightBg ? 'text-slate-700' : 'text-slate-400'
                  }`}>
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
