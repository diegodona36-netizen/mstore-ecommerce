import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, LayoutGrid, Sparkles } from 'lucide-react';
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
  onNavigateHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full bg-slate-950 border-b border-slate-800 shadow-sm transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5">
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
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 shrink-0 border ${
              isMegaMenuOpen 
                ? 'bg-slate-800 text-white border-slate-700 shadow-md' 
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800 shadow-sm'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Menú de Categorías</span>
          </button>

          {/* 3. Integrated Live Search Bar (Escritorio) */}
          <form 
            onSubmit={handleSearchFormSubmit}
            className="flex-1 max-w-md relative hidden md:block"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none transition-colors" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar en M Store (ej: iPhone, Smart TV 4K, AirPods)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 text-white text-xs rounded-lg pl-10 pr-4 py-2.5 outline-none transition-all placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* 3b. Buscador Amplio en Móvil (Ocupa todo el espacio restable) */}
          <form 
            onSubmit={handleSearchFormSubmit}
            className="flex-1 relative md:hidden ml-1 sm:ml-2"
          >
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-slate-700 text-white text-xs rounded-full pl-9 pr-3 py-2 outline-none min-h-[38px] placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* 4. Right Actions */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 group shadow-sm active:scale-95"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 text-slate-300 group-hover:text-white" />
              <span>Carrito</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-slate-900 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Search & Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-800 flex flex-col gap-3 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearchFormSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full bg-slate-900 border border-slate-800 text-white text-xs rounded-lg pl-10 pr-4 py-2.5 outline-none"
              />
            </form>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleMegaMenu();
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-900 bg-white transition-all shadow-sm"
            >
              <LayoutGrid className="w-4 h-4" />
              Ver Menú Completo de Categorías
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
