import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  LayoutGrid, 
  X, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  Eye,
  Truck,
  CreditCard,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Home as HomeIcon,
  Gamepad2,
  Tag
} from 'lucide-react';
import { Logo } from './Logo';

export const Navbar = ({
  onOpenCart,
  onToggleMegaMenu,
  onOpenMegaMenu,
  isMegaMenuOpen,
  cartCount = 0,
  searchQuery = '',
  onSearchChange,
  products = [],
  onQuickView,
  onSearchSubmit,
  onNavigateHome,
  onSelectCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (onSearchSubmit) onSearchSubmit();
  };

  // Real-time case-insensitive & accent-insensitive predictive search
  const cleanStr = (str) => 
    (str || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const searchResults = (searchQuery && searchQuery.trim().length > 0)
    ? products.filter(p => {
        const q = cleanStr(searchQuery);
        const name = cleanStr(p.name);
        const category = cleanStr(p.category);
        const tag = cleanStr(p.tag);
        const desc = cleanStr(p.description);
        const id = cleanStr(p.id);
        return (
          name.includes(q) ||
          category.includes(q) ||
          tag.includes(q) ||
          desc.includes(q) ||
          id.includes(q)
        );
      }).slice(0, 6)
    : [];

  const navCategories = [
    { label: 'Smartphones', id: 'smartphones', icon: Smartphone },
    { label: 'Laptops & PC', id: 'computacion', icon: Laptop },
    { label: 'Audio Hi-Fi', id: 'audio', icon: Headphones },
    { label: 'Televisores', id: 'linea-blanca', icon: Tv },
    { label: 'Hogar Inteligente', id: 'hogar', icon: HomeIcon },
    { label: 'Gaming', id: 'gaming', icon: Gamepad2 },
    { label: 'Ofertas', id: 'ofertas', icon: Tag, isSpecial: true }
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-md font-sans transition-all duration-300">
      
      {/* 0. BARRA SUPERIOR DE ANUNCIOS: CASHEA, ENVÍOS Y GARANTÍAS */}
      <div className="w-full bg-[#070A0F] text-slate-300 border-b border-white/10 py-1.5 px-4 font-sans text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="bg-[#FFE600] text-black font-black text-[9px] px-1.5 py-0.5 rounded shadow-2xs">CASHEA</span>
            <span className="text-slate-200 font-bold">Compra hoy y paga en cuotas sin interés con Cashea</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Envíos Gratis a Nivel Nacional (Zoom • MRW • Tealca)</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>1 Año de Garantía Oficial</span>
            </span>
          </div>
        </div>
      </div>

      {/* 1. MAIN HEADER BAR (DEEP OBSIDIAN / LUXURY SLATE) */}
      <div className="bg-[#0B0F17] border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between gap-3 sm:gap-4 md:gap-6">
            
            {/* BRAND LOGO */}
            <div 
              onClick={() => onNavigateHome && onNavigateHome()} 
              className="flex items-center shrink-0 cursor-pointer group py-1"
              title="Volver a Inicio"
            >
              <Logo size="medium" />
            </div>

            {/* CATEGORIES BUTTON (DESKTOP) */}
            <button
              type="button"
              onClick={onOpenMegaMenu || onToggleMegaMenu}
              className={`hidden md:flex items-center gap-2.5 px-4 h-11 rounded-xl text-xs font-black transition-all shrink-0 border ${
                isMegaMenuOpen 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30' 
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/15 hover:border-white/25 shadow-xs active:scale-95'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-blue-400" />
              <span>Categorías</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
            </button>

            {/* EXPANSIVE SEARCH BAR & LIVE PREDICTIVE RESULTS (DESKTOP) */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative hidden md:block">
              <form 
                onSubmit={handleSearchFormSubmit}
                className="w-full relative"
              >
                <div className="relative flex items-center bg-white rounded-xl shadow-sm border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all overflow-hidden h-11">
                  <Search className="w-4 h-4 text-slate-400 ml-4 pointer-events-none shrink-0" />
                  <input
                    type="text"
                    value={searchQuery || ''}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={(e) => {
                      onSearchChange && onSearchChange(e.target.value);
                      setIsSearchFocused(true);
                    }}
                    placeholder="Buscar en M Store (ej: iPhone 15 Pro, MacBook, Smart TV 4K, S24 Ultra)..."
                    className="w-full text-slate-900 text-xs font-semibold px-3 py-2.5 bg-transparent placeholder:text-slate-400 outline-none"
                  />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange && onSearchChange('')}
                      className="p-1.5 mr-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Limpiar búsqueda"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 h-full text-xs font-black flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <span>Buscar</span>
                  </button>
                </div>
              </form>

              {/* FLOATING PREDICTIVE RESULTS DROPDOWN */}
              {isSearchFocused && searchQuery && searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-fadeIn">
                  <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Sugerencias instantáneas ({searchResults.length})</span>
                    <span className="text-blue-600 font-black cursor-pointer hover:underline" onClick={handleSearchFormSubmit}>
                      Ver catálogo completo &rarr;
                    </span>
                  </div>

                  {searchResults.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs font-medium">
                      No encontramos productos para "<span className="font-bold text-slate-800">{searchQuery}</span>".
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {searchResults.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setIsSearchFocused(false);
                            onQuickView && onQuickView(p);
                          }}
                          className="p-3 flex items-center justify-between gap-3 hover:bg-blue-50/70 cursor-pointer transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 p-1 shrink-0 border border-slate-200 flex items-center justify-center">
                              <img src={p.image} alt={p.name} className="h-full object-contain" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                                {p.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-slate-400 capitalize">{p.category || 'Tecnología'}</span>
                                {p.hasCashea !== false && (
                                  <span className="bg-[#FFE600] text-black px-1.5 py-0.2 rounded font-black text-[8px]">
                                    CASHEA
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0 flex items-center gap-2.5">
                            <div>
                              <div className="text-xs font-black text-slate-900 font-inter">
                                ${parseFloat(p.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                              </div>
                            </div>
                            <span className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 transition-colors">
                              <Eye className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-2.5 bg-slate-100 text-center border-t border-slate-200">
                    <button
                      type="button"
                      onClick={handleSearchFormSubmit}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Presiona Enter o clic en "Buscar" para explorar en vista cuadrícula
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SEARCH BAR (MOBILE) */}
            <form 
              onSubmit={handleSearchFormSubmit}
              className="flex-1 relative md:hidden"
            >
              <div className="relative flex items-center bg-white rounded-xl shadow-xs border border-slate-200 focus-within:border-blue-500 overflow-hidden h-10">
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

            {/* RIGHT ACTIONS GROUP: SHOPPING CART BUTTON */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenCart}
                className="relative flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-4 h-11 rounded-xl text-xs font-black shadow-md shadow-blue-600/30 active:scale-95 transition-all group"
                aria-label="Ver Carrito de Compras"
              >
                <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Carrito</span>
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

      {/* 2. SUB-NAVIGATION CATEGORIES RIBBON (SOLO CATEGORÍAS LIMPIO Y CENTRADO) */}
      <div className="w-full bg-white border-b border-slate-200/90 shadow-xs overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-start md:justify-center gap-1 sm:gap-2 py-2">
          {navCategories.map((cat) => {
            if (cat.isSpecial) {
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all shrink-0 active:scale-95 shadow-2xs"
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
                className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs uppercase tracking-wide text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-all shrink-0 whitespace-nowrap active:scale-95"
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
