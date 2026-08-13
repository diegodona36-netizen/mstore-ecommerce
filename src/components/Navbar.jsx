import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, LayoutGrid, X, ChevronDown, Shield, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar = ({ 
  cartCount = 0, 
  onOpenCart, 
  onOpenMegaMenu,
  onToggleMegaMenu, 
  isMegaMenuOpen,
  searchQuery = '',
  onSearchChange,
  onSearchSubmit,
  onNavigateHome,
  onSelectCategory
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

  const navCategories = [
    { label: 'Smartphones', id: 'smartphones' },
    { label: 'Laptops & PC', id: 'computacion' },
    { label: 'Audio Hi-Fi', id: 'audio' },
    { label: 'Televisores', id: 'televisores' },
    { label: 'Hogar Inteligente', id: 'hogar' },
    { label: 'Gaming', id: 'gaming' },
    { label: 'Ofertas', id: 'ofertas', isSpecial: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md font-sans transition-all duration-300">
      
      {/* 1. MAIN HEADER (DEEP LUXURY SLATE / OBSIDIAN) */}
      <div className="bg-[#0B0F17] border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between gap-3 md:gap-5">
            
            {/* BRAND LOGO */}
            <div 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="flex items-center shrink-0 cursor-pointer group"
              title="Volver a Inicio"
            >
              <Logo size="medium" />
            </div>

            {/* CATEGORIES BUTTON (DESKTOP) */}
            <button
              type="button"
              onClick={onOpenMegaMenu || onToggleMegaMenu}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                isMegaMenuOpen 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30' 
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-white/25 shadow-xs active:scale-95'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" />
              <span>Categorías</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
            </button>

            {/* SEARCH BAR (EXPANSIVE DESKTOP) */}
            <form 
              onSubmit={handleSearchFormSubmit}
              className="flex-1 max-w-xl relative hidden md:block"
            >
              <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all overflow-hidden">
                <Search className="w-4 h-4 text-slate-400 ml-3.5 pointer-events-none shrink-0" />
                <input
                  type="text"
                  value={searchQuery || ''}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder="Buscar en M Store (ej: iPhone 15 Pro, MacBook, Smart TV 4K)..."
                  className="w-full text-slate-900 text-xs font-medium px-3 py-2.5 bg-transparent placeholder:text-slate-400 outline-none"
                />
                
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange && onSearchChange('')}
                    className="p-1.5 mr-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Limpiar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Buscar</span>
                </button>
              </div>
            </form>

            {/* SEARCH BAR (MOBILE) */}
            <form 
              onSubmit={handleSearchFormSubmit}
              className="flex-1 relative md:hidden"
            >
              <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 focus-within:border-blue-500 overflow-hidden">
                <Search className="w-3.5 h-3.5 text-slate-400 ml-3 pointer-events-none shrink-0" />
                <input
                  type="text"
                  value={searchQuery || ''}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full text-slate-900 text-xs font-medium px-2.5 py-2 bg-transparent placeholder:text-slate-400 outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange && onSearchChange('')}
                    className="p-1 mr-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* RIGHT ACTIONS GROUP */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Shopping Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-md shadow-blue-600/25 active:scale-95 transition-all group"
                aria-label="Ver Carrito de Compras"
              >
                <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">Carrito</span>
                {cartCount > 0 && (
                  <span className="bg-white text-blue-700 font-black text-[11px] min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION CATEGORIES RIBBON */}
      <div className="w-full bg-white border-b border-slate-200/90 shadow-xs overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-start md:justify-center gap-1 sm:gap-2 py-2">
          {navCategories.map((cat) => {
            if (cat.isSpecial) {
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-all shrink-0 active:scale-95 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{cat.label}</span>
                </button>
              );
            }

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wide text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition-all shrink-0 whitespace-nowrap active:scale-95"
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

    </header>
  );
};
