import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, LayoutGrid, Sparkles, Home, Store, Layers } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar = ({ 
  cartCount, 
  onOpenCart, 
  onOpenMegaMenu,
  onToggleMegaMenu, 
  isMegaMenuOpen,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigateHome,
  onNavigateCatalog
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0908]/95 backdrop-blur-xl border-b border-[#00E5FF]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-5">
          
          {/* 1. Brand Logo (Navega a Inicio) */}
          <div 
            onClick={() => onNavigateHome && onNavigateHome()} 
            className="flex items-center shrink-0 cursor-pointer"
          >
            <Logo size="medium" />
          </div>

          {/* 2. Menú de Categorías Button */}
          <button
            onClick={onOpenMegaMenu || onToggleMegaMenu}
            className={`hidden md:flex items-center gap-2 px-3.5 md:px-4 py-2 rounded-xl text-xs font-bold font-space transition-all duration-300 shrink-0 border ${
              isMegaMenuOpen 
                ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_25px_#00E5FF]' 
                : 'bg-[#00E5FF]/10 border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_#00E5FF]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Categorías</span>
          </button>

          {/* 3. Integrated Live Search Bar (Escritorio) */}
          <form 
            onSubmit={handleSearchFormSubmit}
            className="flex-1 max-w-md relative hidden md:block"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none transition-colors group-focus-within:text-[#00E5FF]" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar en M Store (ej: iPhone, Smart TV 4K, AirPods)..."
                className="w-full bg-white/[0.05] border border-white/15 focus:border-[#00E5FF] focus:bg-black/60 focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] text-white text-xs rounded-xl pl-10 pr-4 py-2 outline-none transition-all placeholder:text-slate-500 font-inter"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* 3b. Buscador Amplio en Móvil */}
          <form 
            onSubmit={handleSearchFormSubmit}
            className="flex-1 relative md:hidden ml-1 sm:ml-2"
          >
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full bg-white/[0.06] border border-white/15 focus:border-[#00E5FF] focus:bg-black/60 text-white text-xs rounded-full pl-9 pr-3 py-2 outline-none font-inter min-h-[38px] placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* 4. APP STORE STYLE DESKTOP NAVIGATION BAR */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3 shrink-0 font-space text-xs">
            
            {/* Inicio Link */}
            <button
              onClick={() => onNavigateHome && onNavigateHome()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Home className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Inicio</span>
            </button>

            {/* Catálogo Link */}
            <button
              onClick={() => onNavigateCatalog && onNavigateCatalog('todos')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold text-slate-300 hover:text-[#00E5FF] hover:bg-[#00E5FF]/10 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Catálogo</span>
            </button>

            {/* Ofertas Cyber */}
            <button
              onClick={() => onNavigateCatalog && onNavigateCatalog('todos')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl font-extrabold text-[#00E5FF] hover:bg-[#00E5FF]/15 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ofertas Cyber</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#00E5FF] hover:bg-cyan-300 text-black px-4 py-2 rounded-xl font-extrabold transition-all duration-300 group shadow-[0_0_15px_#00E5FF]"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-[#00E5FF] border border-[#00E5FF] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
