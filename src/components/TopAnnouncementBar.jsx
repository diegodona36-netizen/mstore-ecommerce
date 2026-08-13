import React from 'react';

export const TopAnnouncementBar = () => {
  return (
    <div className="bg-blue-600 text-white text-center py-2.5 px-4 text-[11px] sm:text-xs font-bold tracking-wide flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 font-sans border-b border-blue-700">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Envío Gratis Nacional</span>
      </div>
      <span className="hidden sm:inline text-slate-600">|</span>
      <div className="flex items-center gap-1.5">
        <span className="bg-[#FFE600] text-black px-1.5 py-0.5 rounded-[4px] font-black uppercase tracking-wider text-[9px] sm:text-[10px]">CASHEA</span>
        <span>¡Lleva hoy y paga en cuotas!</span>
      </div>
      <span className="hidden md:inline text-slate-600">|</span>
      <span className="hidden md:inline">Garantía Oficial M Store</span>
    </div>
  );
};
