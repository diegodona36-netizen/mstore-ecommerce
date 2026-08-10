import React from 'react';
import { Home, LayoutGrid, ShoppingCart, MapPin } from 'lucide-react';

export const MobileBottomNav = ({ 
  cartCount = 0, 
  onOpenMegaMenu, 
  onOpenCart, 
  onScrollToHome, 
  onScrollToLocation 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0908]/95 backdrop-blur-2xl border-t border-[#00E5FF]/30 py-2 px-3 font-space text-[10px]">
      <div className="grid grid-cols-4 items-center gap-1 text-center">
        
        {/* 1. Inicio */}
        <button
          onClick={onScrollToHome}
          aria-label="Ir al inicio"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-[#00E5FF] active:text-[#00E5FF] transition-colors py-1.5 focus-visible:outline-none min-h-[44px]"
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="font-semibold tracking-wider">Inicio</span>
        </button>

        {/* 2. Categorías */}
        <button
          onClick={onOpenMegaMenu}
          aria-label="Abrir categorías"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-[#00E5FF] active:text-[#00E5FF] transition-colors py-1.5 focus-visible:outline-none min-h-[44px]"
        >
          <LayoutGrid className="w-5 h-5 shrink-0" />
          <span className="font-semibold tracking-wider">Categorías</span>
        </button>

        {/* 3. Carrito */}
        <button
          onClick={onOpenCart}
          aria-label={`Abrir carrito (${cartCount} productos)`}
          className="relative flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-[#00E5FF] active:text-[#00E5FF] transition-colors py-1.5 focus-visible:outline-none min-h-[44px]"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 shrink-0" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#00E5FF] text-black font-extrabold text-[9px] flex items-center justify-center shadow-[0_0_10px_#00E5FF]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-semibold tracking-wider">Carrito</span>
        </button>

        {/* 4. Ubicación / Tienda */}
        <button
          onClick={onScrollToLocation}
          aria-label="Ir a ubicación de tienda física"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-[#00E5FF] active:text-[#00E5FF] transition-colors py-1.5 focus-visible:outline-none min-h-[44px]"
        >
          <MapPin className="w-5 h-5 shrink-0 text-[#00E5FF]" />
          <span className="font-semibold tracking-wider text-[#00E5FF]">Tienda</span>
        </button>

      </div>
    </div>
  );
};
