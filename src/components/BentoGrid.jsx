import React from 'react';
import { Smartphone, Headphones, Watch, Tv, ArrowUpRight, Sparkles, Laptop, Gamepad2, Refrigerator, Gift } from 'lucide-react';

export const BentoGrid = ({ onSelectCategory, isLightBg = true }) => {

  const innovativeCategories = [
    {
      id: 'smartphones',
      name: 'Teléfonos Celulares',
      desc: 'iPhone, Galaxy & Xiaomi',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80',
      Icon: Smartphone,
      badge: 'Flagships'
    },
    {
      id: 'linea-blanca',
      name: 'Hogar & Línea Blanca',
      desc: 'Neveras, Lavadoras & AirFryers',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80',
      Icon: Refrigerator,
      badge: 'Smart Home'
    },
    {
      id: 'laptops',
      name: 'Laptops & MacBooks',
      desc: 'Apple M3, Asus & Lenovo',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
      Icon: Laptop,
      badge: 'Pro M3'
    },
    {
      id: 'gamer',
      name: 'Consolas & Gamer',
      desc: 'PS5, Nintendo & Periféricos',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80',
      Icon: Gamepad2,
      badge: 'PS5 Pro'
    },
    {
      id: 'televisores',
      name: 'Televisores & Smart TVs',
      desc: 'Síragon, Samsung & Soneview',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80',
      Icon: Tv,
      badge: '4K OLED'
    },
    {
      id: 'audio',
      name: 'Audífonos & Audio Hi-Fi',
      desc: 'AirPods Max & Soundbars',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
      Icon: Headphones,
      badge: 'Hi-Fi'
    },
    {
      id: 'wearables',
      name: 'Relojes Inteligentes',
      desc: 'Apple Watch & Galaxy Watch',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
      Icon: Watch,
      badge: 'Ultra 2'
    },
    {
      id: 'todos',
      name: 'Gift Cards & VIP',
      desc: 'Tarjetas de Regalo M Store',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80',
      Icon: Gift,
      badge: 'M Store VIP'
    }
  ];

  return (
    <section id="bento" className="space-y-10 py-4 font-space">
      
      {/* 1. SECCIÓN CATEGORÍAS INNOVADORAS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold font-space uppercase ${
              isLightBg 
                ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' 
                : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explora el Catálogo por Sección</span>
            </div>
            <h2 className={`text-2xl sm:text-4xl font-extrabold font-space tracking-tight mt-2 ${
              isLightBg ? 'text-slate-900' : 'text-white'
            }`}>
              Categorías <span className={isLightBg ? 'text-[#0066FF]' : 'gradient-text-cyan'}>Innovadoras</span>
            </h2>
          </div>
          <p className={`text-xs font-inter max-w-sm ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
            Selecciona cualquier categoría para filtrar automáticamente todo el catálogo en tiempo real.
          </p>
        </div>

        {/* Horizontal Category Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {innovativeCategories.map((cat) => {
            const { Icon } = cat;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className={`rounded-2xl p-4 border transition-all duration-300 cursor-pointer group flex flex-col items-center justify-between text-center space-y-3 shadow-sm hover:-translate-y-1 ${
                  isLightBg 
                    ? 'bg-white hover:bg-cyan-50/50 border-slate-200/90 hover:border-[#00E5FF] hover:shadow-md' 
                    : 'bg-black/50 hover:bg-[#00E5FF]/10 border-white/10 hover:border-[#00E5FF]/60'
                }`}
              >
                {/* Image Avatar Frame */}
                <div className={`relative w-16 h-16 rounded-2xl overflow-hidden border p-2 transition-all flex items-center justify-center shrink-0 ${
                  isLightBg 
                    ? 'bg-slate-100/80 border-slate-200 group-hover:border-[#00E5FF]' 
                    : 'bg-white/5 border-white/10 group-hover:border-[#00E5FF]'
                }`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                  <Icon className="w-4 h-4 text-[#00E5FF] absolute bottom-1 right-1 drop-shadow" />
                </div>

                {/* Title */}
                <div>
                  <h4 className={`text-xs font-extrabold font-space leading-snug transition-colors ${
                    isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
                  }`}>
                    {cat.name}
                  </h4>
                  <span className={`text-[9px] font-mono font-bold mt-1 block ${
                    isLightBg ? 'text-[#0066FF]' : 'text-[#00E5FF]'
                  }`}>
                    {cat.badge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. BENTO BOX GRID ASIMÉTRICO */}
      <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6 border-t ${
        isLightBg ? 'border-slate-200' : 'border-white/10'
      }`}>
        
        {/* Card 1: Telefonía Insignia */}
        <div 
          onClick={() => onSelectCategory && onSelectCategory('smartphones')}
          className={`md:col-span-2 lg:col-span-2 md:row-span-2 rounded-3xl p-8 relative overflow-hidden group cursor-pointer transition-all duration-500 min-h-[360px] flex flex-col justify-between border ${
            isLightBg 
              ? 'bg-white border-slate-200/90 hover:border-[#00E5FF] shadow-sm hover:shadow-md' 
              : 'glass-card border-white/10 hover:border-[#00E5FF]/50'
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
            <div className="p-3 rounded-2xl bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-xs font-extrabold text-black bg-[#00E5FF] px-3 py-1 rounded-full font-space shadow-[0_0_10px_#00E5FF] uppercase">
              Serie Flagship 2026
            </span>
          </div>

          <div className="relative z-10 pt-16">
            <h3 className={`text-2xl md:text-3xl font-extrabold font-space transition-colors flex items-center gap-2 ${
              isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
            }`}>
              Telefonía Insignia
              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-[#0066FF]" />
            </h3>
            <p className={`text-xs sm:text-sm mt-2 max-w-sm font-inter ${
              isLightBg ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Procesadores de 3nm, pantallas ProMotion 120Hz y sistemas de cámaras profesionales. Apple, Samsung y Xiaomi.
            </p>
          </div>
        </div>

        {/* Card 2: Línea Blanca & Smart Home */}
        <div 
          onClick={() => onSelectCategory && onSelectCategory('linea-blanca')}
          className={`md:col-span-1 lg:col-span-2 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 border flex flex-col justify-between ${
            isLightBg 
              ? 'bg-white border-slate-200/90 hover:border-[#00E5FF] shadow-sm hover:shadow-md' 
              : 'glass-card border-white/10 hover:border-[#00E5FF]/50'
          }`}
        >
          <div className="flex items-center justify-between relative z-10 mb-4">
            <div className="p-3 rounded-2xl bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40">
              <Tv className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-[#0066FF] bg-[#00E5FF]/15 border border-[#00E5FF]/30 px-2.5 py-1 rounded-full font-space uppercase">
              Hogar Inteligente
            </span>
          </div>

          <div className="relative z-10">
            <h3 className={`text-xl font-extrabold font-space transition-colors flex items-center gap-2 ${
              isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
            }`}>
              Línea Blanca & Smart Home
              <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all text-[#0066FF]" />
            </h3>
            <p className={`text-xs mt-1 font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
              Electrodomésticos inteligentes, Neveras Inverter, Lavadoras y Televisores 4K.
            </p>
          </div>
        </div>

        {/* Card 3: Audio High-End */}
        <div 
          onClick={() => onSelectCategory && onSelectCategory('audio')}
          className={`rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 border flex flex-col justify-between ${
            isLightBg 
              ? 'bg-white border-slate-200/90 hover:border-[#00E5FF] shadow-sm hover:shadow-md' 
              : 'glass-card border-white/10 hover:border-[#00E5FF]/50'
          }`}
        >
          <div className="p-3 rounded-2xl bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40 w-fit mb-4">
            <Headphones className="w-6 h-6" />
          </div>

          <div>
            <h3 className={`text-lg font-extrabold font-space transition-colors ${
              isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
            }`}>
              Audio High-End
            </h3>
            <p className={`text-xs mt-1 font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
              AirPods Max, Cancelación de Ruido y Soundbars Dolby Atmos.
            </p>
          </div>
        </div>

        {/* Card 4: Wearables & Health */}
        <div 
          onClick={() => onSelectCategory && onSelectCategory('wearables')}
          className={`rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 border flex flex-col justify-between ${
            isLightBg 
              ? 'bg-white border-slate-200/90 hover:border-[#00E5FF] shadow-sm hover:shadow-md' 
              : 'glass-card border-white/10 hover:border-[#00E5FF]/50'
          }`}
        >
          <div className="p-3 rounded-2xl bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40 w-fit mb-4">
            <Watch className="w-6 h-6" />
          </div>

          <div>
            <h3 className={`text-lg font-extrabold font-space transition-colors ${
              isLightBg ? 'text-slate-900 group-hover:text-[#0066FF]' : 'text-white group-hover:text-[#00E5FF]'
            }`}>
              Wearables & Health
            </h3>
            <p className={`text-xs mt-1 font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
              Apple Watch Ultra, Galaxy Watch y sensores biométricos.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
};
