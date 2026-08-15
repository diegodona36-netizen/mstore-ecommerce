import React from 'react';
import { ArrowRight, Sparkles, Zap, Shield, Smartphone, Gamepad2 } from 'lucide-react';

export const PromoBanners = ({ onSelectCategory }) => {
  return (
    <section className="w-full bg-slate-50 font-sans py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* BANNER 1: FLAGSHIP SMARTPHONES */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B0F17] via-[#111827] to-[#1E293B] border border-slate-800 p-8 sm:p-10 flex flex-col justify-between text-white group shadow-lg min-h-[300px]">
            {/* Background Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/30 transition-all duration-700"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Flagships 2026
                </span>
                <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider">
                  CASHEA
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                iPhone 15 Pro & <br className="hidden sm:inline" />
                <span className="text-blue-400">Galaxy S24 Ultra</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-sm font-medium">
                Titanio de grado aeroespacial, cámaras de 200MP y rendimiento profesional garantizado.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => onSelectCategory && onSelectCategory('smartphones')}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all shadow-md shadow-blue-600/30 group/btn"
              >
                <span>Explorar Smartphones</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* BANNER 2: GAMING & AUDIO HI-FI */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-slate-800 p-8 sm:p-10 flex flex-col justify-between text-white group shadow-lg min-h-[300px]">
            {/* Background Glow */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-600/30 transition-all duration-700"></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  Experiencia Pro
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  Envío Inmediato
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                PlayStation 5 & <br className="hidden sm:inline" />
                <span className="text-indigo-400">Audio Hi-Fi Sony</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 max-w-sm font-medium">
                Sumérgete en gráficos 4K HDR y audio espacial de alta fidelidad con cancelación de ruido.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <button
                onClick={() => onSelectCategory && onSelectCategory('gaming')}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl transition-all shadow-md group/btn"
              >
                <span>Ver Zona Gaming & Audio</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-slate-900" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
