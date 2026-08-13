import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';

export const SocialProofBar = () => {
  return (
    <section className="bg-white border-y border-slate-200 py-6 md:py-8 select-none overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          
          {/* Trust Signal Text */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex -space-x-2">
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 object-cover" src="https://i.pravatar.cc/100?img=1" alt="Cliente" />
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 object-cover" src="https://i.pravatar.cc/100?img=2" alt="Cliente" />
              <img className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 object-cover" src="https://i.pravatar.cc/100?img=3" alt="Cliente" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                +2k
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.9/5 Calificación Promedio
              </p>
              <p className="text-[11px] font-medium text-slate-500">
                Basado en +2,500 clientes satisfechos
              </p>
            </div>
          </div>

          {/* Vertical Divider (Desktop only) */}
          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          {/* Official Brands Logos */}
          <div className="w-full flex-1 overflow-x-auto no-scrollbar mask-edges">
            <div className="flex items-center justify-between md:justify-around gap-8 min-w-max px-4">
              
              <div className="flex items-center gap-1.5 grayscale opacity-60 hover:opacity-100 transition-opacity">
                <span className="font-extrabold text-sm tracking-tight text-slate-800">Apple</span>
              </div>

              <div className="flex items-center grayscale opacity-60 hover:opacity-100 transition-opacity">
                 <span className="font-black text-xl tracking-tighter text-slate-800 uppercase italic">Samsung</span>
              </div>

              <div className="flex items-center grayscale opacity-60 hover:opacity-100 transition-opacity">
                <span className="font-black text-lg tracking-wider text-slate-800">XIAOMI</span>
              </div>

              <div className="flex items-center grayscale opacity-60 hover:opacity-100 transition-opacity bg-slate-800 text-white px-2 py-0.5 rounded-sm">
                <span className="font-black text-sm tracking-widest">JBL</span>
              </div>
              
              <div className="flex items-center gap-1.5 opacity-60 text-slate-600 font-bold text-xs uppercase tracking-widest pl-4 border-l border-slate-200">
                <ShieldCheck className="w-4 h-4" />
                Distribuidores Oficiales
              </div>

            </div>
          </div>
          
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
};
