import React from 'react';
import { Truck, ShieldCheck, Zap } from 'lucide-react';

export const TopBar = () => {
  return (
    <div className="bg-[#00E5FF]/10 border-b border-[#00E5FF]/30 py-2 px-4 text-center select-none backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-space text-[#00E5FF]">
        
        {/* Left item */}
        <div className="flex items-center gap-2">
          <Truck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Envío Gratis a Nivel Nacional en Compras VIP</span>
          <span className="sm:hidden font-bold">Envío Gratis Nacional 🚛</span>
        </div>

        {/* Center item */}
        <div className="hidden md:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Garantía Oficial M Store 1 Año en Electrodomésticos y Telefonía</span>
        </div>

        {/* Right item */}
        <div className="flex items-center gap-1.5 font-bold">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Atención Directa WhatsApp</span>
        </div>

      </div>
    </div>
  );
};
