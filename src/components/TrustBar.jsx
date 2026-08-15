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

          {/* Marcas Oficiales con Logos en Letra Negra Sobria */}
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto w-full md:w-auto justify-start md:justify-end pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden">
            
            {/* Apple */}
            <div className="flex items-center gap-1.5 text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100 group" title="Apple Authorized">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.7-11.64-13.99-6.42-10-11.37-21.46-14.86-34.38-3.48-12.93-5.23-25.26-5.23-37.01 0-16.14 4.03-29.6 12.09-40.38 8.06-10.78 18.27-16.32 30.64-16.63 4.13 0 9.04 1.15 14.73 3.46 5.69 2.31 9.38 3.52 11.08 3.64 1.48-.12 5.34-1.42 11.58-3.9 6.24-2.48 11.26-3.6 15.06-3.37 13.91 1.08 24.84 6.64 32.79 16.68-12.18 7.39-18.17 17.5-17.97 30.33.2 10.01 4.11 18.49 11.73 25.44 7.62 6.95 16.71 10.79 27.27 11.52-2.18 6.74-4.89 13.35-8.13 19.83zm-29.36-121.2c0 7.83-2.88 15.24-8.64 22.23-6.95 8.16-15.34 13.06-25.17 12.7-1.19-7.6 1.74-15.17 6.8-22.7 5.06-7.53 12.06-12.23 21-14.1 3.51-.73 8.35.34 16.01 1.87z" />
              </svg>
              <span className="font-bold text-sm tracking-tight">Apple</span>
            </div>

            {/* Samsung */}
            <div className="flex items-center text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="Samsung Galaxy">
              <span className="font-black text-sm tracking-widest uppercase font-sans">SAMSUNG</span>
            </div>

            {/* Xiaomi */}
            <div className="flex items-center gap-1.5 text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="Xiaomi Official">
              <div className="w-4 h-4 bg-black rounded-md flex items-center justify-center text-white text-[8px] font-black">
                mi
              </div>
              <span className="font-extrabold text-sm tracking-tight">Xiaomi</span>
            </div>

            {/* Sony */}
            <div className="flex items-center text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="Sony Official">
              <span className="font-black text-base tracking-widest font-serif">SONY</span>
            </div>

            {/* PlayStation */}
            <div className="flex items-center gap-1.5 text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="PlayStation">
              <svg className="w-5 h-4 fill-current" viewBox="0 0 100 80">
                <path d="M40.5 4.5C36.8 6 34.5 9.7 34.5 14v40.3l15.5 4.7V17.8c0-4 1.7-5.5 5.5-6.8 3.8-1.3 7.8-.3 7.8 4v7.3l12.2 3.7V14c0-10.7-9.5-14.8-25-9.5zm-5 59.8L8.7 56.4c-6.8-2.1-7.8-6.6-2.2-10.1 5.7-3.5 15.7-4.7 22.5-2.6l6.5 2v8.6zm31.7 9.6c-7.3 2.3-15.8 1.5-19-1.8l6.8-5.3 12.2-3.8v10.9zm27.8-8.5c-5.7 3.5-15.7 4.7-22.5 2.6l-5.3-1.6v-8.6l10.8 3.3c6.8 2.1 12.7.8 17-5.7z"/>
              </svg>
              <span className="font-bold text-xs tracking-tight">PlayStation</span>
            </div>

            {/* JBL */}
            <div className="flex items-center text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="JBL Pro Sound">
              <span className="font-black text-base tracking-tighter italic">JBL</span>
            </div>

            {/* Nintendo */}
            <div className="flex items-center text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="Nintendo">
              <div className="border-2 border-black rounded-full px-2 py-0.5 flex items-center">
                <span className="font-black text-[10px] tracking-wider uppercase">Nintendo</span>
              </div>
            </div>

            {/* Honor */}
            <div className="flex items-center text-black hover:text-blue-600 transition-colors shrink-0 cursor-default opacity-85 hover:opacity-100" title="Honor">
              <span className="font-black text-xs tracking-widest uppercase">HONOR</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
