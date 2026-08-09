import React from 'react';
import { Smartphone, Headphones, Watch, BatteryCharging, Tv, ArrowUpRight, Sparkles } from 'lucide-react';

export const BentoGrid = ({ onSelectCategory }) => {
  return (
    <section id="bento" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#00E5FF] text-xs font-bold uppercase tracking-widest font-space mb-3">
              <Sparkles className="w-4 h-4" /> Categorías de Vanguardia
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-space text-white">
              Explora Nuestro <span className="gradient-text-cyan">Universo Tech</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0">
            Diseño Bento Box de última generación. Selecciona la categoría para filtrar el catálogo en tiempo real.
          </p>
        </div>

        {/* Bento Box Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Telefonía Insignia (Large Featured 2x2) */}
          <div 
            onClick={() => onSelectCategory('smartphones')}
            className="md:col-span-2 lg:col-span-2 md:row-span-2 glass-card rounded-3xl p-8 relative overflow-hidden group cursor-pointer border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 min-h-[380px] flex flex-col justify-between"
          >
            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80" 
                alt="Smartphones Insignia" 
                className="w-full h-full object-contain transform translate-x-8 translate-y-8 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-black bg-[#00E5FF] px-3 py-1 rounded-full font-space shadow-[0_0_10px_#00E5FF]">
                Serie Flagship
              </span>
            </div>

            <div className="relative z-10 pt-20">
              <h3 className="text-2xl md:text-3xl font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                Telefonía Insignia
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#00E5FF]" />
              </h3>
              <p className="text-slate-300 text-sm mt-2 max-w-sm">
                Procesadores de 3nm, pantallas de 120Hz y cámaras de nivel profesional. Apple, Samsung y Google Pixel.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#00E5FF]">
                Ver Catálogo Completo &rarr;
              </div>
            </div>
          </div>

          {/* Card 2: Línea Blanca & Smart Home (Top Right Featured Card) */}
          <div 
            onClick={() => onSelectCategory('linea-blanca')}
            className="md:col-span-1 lg:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 min-h-[200px] flex flex-col justify-between"
          >
            <div className="absolute -right-6 -bottom-6 w-1/2 h-full opacity-35 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80" 
                alt="Línea Blanca High-Tech" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Tv className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="text-xl font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors">
                Línea Blanca & Smart Home
              </h3>
              <p className="text-slate-300 text-xs mt-1">
                Electrodomésticos inteligentes, Smart TVs OLED y tecnología del hogar.
              </p>
            </div>
          </div>

          {/* Card 3: Audio High-End */}
          <div 
            onClick={() => onSelectCategory('audio')}
            className="md:col-span-1 lg:col-span-1 glass-card rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 min-h-[200px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Headphones className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="text-lg font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors">
                Audio High-End
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Cancelación activa de ruido y sonido Hi-Fi.
              </p>
            </div>
          </div>

          {/* Card 4: Accesorios MagSafe */}
          <div 
            onClick={() => onSelectCategory('accesorios')}
            className="md:col-span-1 lg:col-span-1 glass-card rounded-3xl p-6 relative overflow-hidden group cursor-pointer border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 min-h-[200px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="text-lg font-bold font-space text-white group-hover:text-[#00E5FF] transition-colors">
                Accesorios MagSafe
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Carga ultra-rápida y fundas tácticas.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
