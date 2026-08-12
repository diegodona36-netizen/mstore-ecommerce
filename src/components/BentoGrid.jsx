import React from 'react';
import { Smartphone, Headphones, Watch, BatteryCharging, Tv, ArrowUpRight, Sparkles } from 'lucide-react';

export const BentoGrid = ({ onSelectCategory, isLightBg = true }) => {
  return (
    <section id="bento" className={`py-12 sm:py-16 relative ${isLightBg ? 'bg-[#F8FAFC]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest font-space mb-2 ${
              isLightBg ? 'text-[#0066FF]' : 'text-[#00E5FF]'
            }`}>
              <Sparkles className="w-4 h-4" /> Categorías de Vanguardia
            </div>
            <h2 className={`text-3xl md:text-5xl font-extrabold font-space ${
              isLightBg ? 'text-slate-900' : 'text-white'
            }`}>
              Explora Nuestro <span className={isLightBg ? 'text-[#0066FF]' : 'gradient-text-cyan'}>Universo Tech</span>
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-inter ${
            isLightBg ? 'text-slate-600' : 'text-slate-400'
          }`}>
            Diseño Bento Box de última generación. Selecciona cualquier categoría para explorar y filtrar el catálogo en tiempo real.
          </p>
        </div>

        {/* Bento Box Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Telefonía Insignia */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('smartphones')}
            className={`md:col-span-2 lg:col-span-2 md:row-span-2 rounded-3xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-500 min-h-[380px] flex flex-col justify-between ${
              isLightBg 
                ? 'bg-white border-2 border-slate-200 shadow-sm hover:border-[#00E5FF] hover:shadow-md' 
                : 'glass-card border border-white/10 hover:border-[#00E5FF]/50'
            }`}
          >
            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80" 
                alt="Smartphones Insignia" 
                className="w-full h-full object-contain transform translate-x-8 translate-y-8 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-3 rounded-2xl ${
                isLightBg 
                  ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' 
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
              }`}>
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-black bg-[#00E5FF] px-3 py-1 rounded-full font-space shadow-[0_0_10px_#00E5FF] uppercase">
                Serie Flagship
              </span>
            </div>

            <div className="relative z-10 pt-20">
              <h3 className={`text-2xl md:text-3xl font-extrabold font-space group-hover:text-[#0066FF] transition-colors flex items-center gap-2 ${
                isLightBg ? 'text-slate-900' : 'text-white'
              }`}>
                Telefonía Insignia
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#0066FF]" />
              </h3>
              <p className={`text-xs sm:text-sm mt-2 max-w-sm font-inter ${
                isLightBg ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Procesadores de 3nm, pantallas de 120Hz y cámaras de nivel profesional. Apple, Samsung y Xiaomi.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-[#0066FF] font-space uppercase">
                Ver Catálogo Completo &rarr;
              </div>
            </div>
          </div>

          {/* Card 2: Línea Blanca & Smart Home */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('linea-blanca')}
            className={`md:col-span-1 lg:col-span-2 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 min-h-[200px] flex flex-col justify-between ${
              isLightBg 
                ? 'bg-white border-2 border-slate-200 shadow-sm hover:border-[#00E5FF] hover:shadow-md' 
                : 'glass-card border border-white/10 hover:border-[#00E5FF]/50'
            }`}
          >
            <div className="absolute -right-6 -bottom-6 w-1/2 h-full opacity-35 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80" 
                alt="Línea Blanca High-Tech" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className={`p-3 rounded-2xl ${
                isLightBg 
                  ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' 
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
              }`}>
                <Tv className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className={`text-xl font-bold font-space group-hover:text-[#0066FF] transition-colors ${
                isLightBg ? 'text-slate-900' : 'text-white'
              }`}>
                Línea Blanca & Smart Home
              </h3>
              <p className={`text-xs mt-1 font-inter ${
                isLightBg ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Electrodomésticos inteligentes, Smart TVs OLED y tecnología del hogar.
              </p>
            </div>
          </div>

          {/* Card 3: Audio High-End */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('audio')}
            className={`md:col-span-1 lg:col-span-1 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 min-h-[200px] flex flex-col justify-between ${
              isLightBg 
                ? 'bg-white border-2 border-slate-200 shadow-sm hover:border-[#00E5FF] hover:shadow-md' 
                : 'glass-card border border-white/10 hover:border-[#00E5FF]/50'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-3 rounded-2xl ${
                isLightBg 
                  ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' 
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
              }`}>
                <Headphones className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className={`text-lg font-bold font-space group-hover:text-[#0066FF] transition-colors ${
                isLightBg ? 'text-slate-900' : 'text-white'
              }`}>
                Audio High-End
              </h3>
              <p className={`text-xs mt-1 font-inter ${
                isLightBg ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Hi-Fi, Cancelación de Ruido Activa y Soundbars Dolby Atmos.
              </p>
            </div>
          </div>

          {/* Card 4: Wearables */}
          <div 
            onClick={() => onSelectCategory && onSelectCategory('wearables')}
            className={`md:col-span-1 lg:col-span-1 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 min-h-[200px] flex flex-col justify-between ${
              isLightBg 
                ? 'bg-white border-2 border-slate-200 shadow-sm hover:border-[#00E5FF] hover:shadow-md' 
                : 'glass-card border border-white/10 hover:border-[#00E5FF]/50'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className={`p-3 rounded-2xl ${
                isLightBg 
                  ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' 
                  : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
              }`}>
                <Watch className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className={`text-lg font-bold font-space group-hover:text-[#0066FF] transition-colors ${
                isLightBg ? 'text-slate-900' : 'text-white'
              }`}>
                Wearables & Health
              </h3>
              <p className={`text-xs mt-1 font-inter ${
                isLightBg ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Apple Watch, Galaxy Watch y sensores biomeétricos de precisión.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
