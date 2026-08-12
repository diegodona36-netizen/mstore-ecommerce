import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, ChevronRight, Star } from 'lucide-react';

export const Hero = ({ onExploreClick, onQuickViewHero }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-[#0A0908] flex items-center">
      
      {/* Ambient Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">
            
            {/* Top Micro Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#00E5FF]/40 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-space flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Colección Oficial Flagship 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-space text-white leading-[1.08] tracking-tight">
              Transforma tu <br />
              <span className="gradient-text-cyan drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]">
                tecnología
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm md:text-lg font-normal max-w-xl leading-relaxed">
              Smartphones insignia, pantallas Smart TV 4K, audio Hi-Fi y electrodomésticos inteligentes con envío directo a todo el país y garantía oficial M Store.
            </p>

            {/* CTA Buttons */}
            {/* CTA Buttons - 1 Primary CTA + 1 Secondary link on Mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={onExploreClick}
                className="btn-cyan-glow px-8 py-3.5 rounded-xl text-sm font-extrabold font-space text-black flex items-center justify-center gap-2 w-full sm:w-auto group shadow-[0_0_25px_#00E5FF] hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <a
                href="#catalogo"
                className="px-5 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold font-space text-slate-300 hover:text-[#00E5FF] transition-all flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <span>Ver Ofertas Cyber</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">Envío 24H</p>
                  <p className="text-[10px] text-slate-400">Garantizado</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">Garantía 1 Año</p>
                  <p className="text-[10px] text-slate-400">Oficial M Store</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Star className="w-4 h-4 fill-[#00E5FF]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white font-space">4.9/5 Estrellas</p>
                  <p className="text-[10px] text-slate-400">+2,500 Clientes</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Showcase Mockup */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative glass-card rounded-3xl p-5 border border-[#00E5FF]/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] w-full max-w-md">
              
              {/* Product Badge Tag */}
              <div className="absolute top-8 left-8 z-20 bg-black/80 backdrop-blur-md border border-[#00E5FF]/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider font-space">Destacado del Mes</span>
              </div>

              {/* Product Showcase Image */}
              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-black p-4 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
                  alt="iPhone 16 Pro Max 1TB Titanio"
                  className="h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,229,255,0.3)] hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Specs Card */}
              <div className="mt-4 p-4 rounded-2xl bg-black/60 backdrop-blur-lg border border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white font-space">iPhone 16 Pro Max 1TB</h3>
                  <p className="text-[11px] text-[#00E5FF] font-semibold">Titanio Negro • Chip A18 Pro</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-white">$1,599</span>
                    <span className="text-xs text-slate-500 line-through">$1,749</span>
                  </div>
                </div>
                <button
                  onClick={onQuickViewHero}
                  className="bg-[#00E5FF] hover:bg-[#00F2FE] text-black px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_#00E5FF] flex items-center gap-1 font-space"
                >
                  Ver Detalle
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
