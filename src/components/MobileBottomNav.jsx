import React from 'react';
import { Home, LayoutGrid, ShoppingCart, MapPin } from 'lucide-react';

export const MobileBottomNav = ({ 
  cartCount = 0, 
  onOpenMegaMenu, 
  onOpenCart, 
  onScrollToHome, 
  onScrollToLocation,
  isHidden = false
}) => {
  if (isHidden) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 py-2 px-3 font-sans text-[11px] flex md:hidden">
      <div className="grid grid-cols-4 items-center gap-1 w-full text-center">
        
        {/* 1. Inicio */}
        <button
          onClick={onScrollToHome}
          aria-label="Ir al inicio"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:text-white transition-colors py-1 focus-visible:outline-none min-h-[44px]"
        >
          <Home className="w-5 h-5 shrink-0 text-slate-300" />
          <span className="font-bold tracking-tight">Inicio</span>
        </button>

        {/* 2. Categorías */}
        <button
          onClick={onOpenMegaMenu}
          aria-label="Abrir categorías"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:text-white transition-colors py-1 focus-visible:outline-none min-h-[44px]"
        >
          <LayoutGrid className="w-5 h-5 shrink-0 text-slate-300" />
          <span className="font-bold tracking-tight">Categorías</span>
        </button>

        {/* 3. Carrito */}
        <button
          onClick={onOpenCart}
          aria-label={`Abrir carrito (${cartCount} productos)`}
          className="relative flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:text-white transition-colors py-1 focus-visible:outline-none min-h-[44px]"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 shrink-0 text-slate-300" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-slate-100 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-md border border-slate-800">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-bold tracking-tight">Carrito</span>
        </button>

        {/* 4. Tienda / Ubicación */}
        <button
          onClick={onScrollToLocation}
          aria-label="Ir a ubicación de tienda física"
          className="flex flex-col items-center justify-center gap-1 text-slate-300 hover:text-white active:text-white transition-colors py-1 focus-visible:outline-none min-h-[44px]"
        >
          <MapPin className="w-5 h-5 shrink-0 text-slate-300" />
          <span className="font-bold tracking-tight">Tienda</span>
        </button>

      </div>
    </nav>
  );
};
