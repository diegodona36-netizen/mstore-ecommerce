import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TrustBar = () => {
  return (
    <section className="w-full bg-white border-b border-slate-200/80 font-sans py-3.5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* CINTA DE MARCAS OFICIALES CON LOGOS VECTORIALES EN NEGRO PURO */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-500 shrink-0">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Distribuidores Oficiales & Garantía Directa:</span>
          </div>
          {/* Marcas Oficiales en Tipografía Pura de Marca, Limpias y Grandes */}
          <div className="flex items-center gap-7 sm:gap-11 overflow-x-auto w-full md:w-auto justify-start md:justify-end py-1 [&::-webkit-scrollbar]:hidden">
            
            {/* Apple */}
            <span className="font-sans font-semibold text-lg sm:text-xl tracking-tight text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Apple">
              Apple
            </span>

            {/* Samsung */}
            <span className="font-sans font-black text-base sm:text-lg tracking-[0.22em] text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Samsung">
              SAMSUNG
            </span>

            {/* Xiaomi */}
            <span className="font-sans font-black text-base sm:text-lg tracking-wider text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Xiaomi">
              XIAOMI
            </span>

            {/* Sony */}
            <span className="font-serif font-black text-lg sm:text-xl tracking-[0.22em] text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Sony">
              SONY
            </span>

            {/* PlayStation */}
            <span className="font-sans font-black text-base sm:text-lg tracking-tight text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="PlayStation">
              PlayStation
            </span>

            {/* JBL */}
            <span className="font-sans font-black italic text-xl sm:text-2xl tracking-tighter text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="JBL">
              JBL
            </span>

            {/* Nintendo */}
            <span className="font-sans font-black text-base sm:text-lg tracking-wider text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Nintendo">
              NINTENDO
            </span>

            {/* Honor */}
            <span className="font-sans font-black text-base sm:text-lg tracking-[0.28em] text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="Honor">
              HONOR
            </span>

            {/* ASUS */}
            <span className="font-sans font-black text-base sm:text-lg tracking-[0.2em] text-black shrink-0 cursor-default select-none hover:text-blue-600 transition-colors" title="ASUS">
              ASUS
            </span>

          </div>
        </div>
      </div>
    </section>
  );
};;
