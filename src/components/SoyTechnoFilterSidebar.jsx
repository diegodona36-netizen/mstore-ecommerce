import React, { useState } from 'react';
import { 
  Smartphone, Tv, Laptop, Gamepad2, Monitor, Printer, Tablet, Watch, Headphones, Radio, 
  ChevronDown, ChevronUp, Check, SlidersHorizontal
} from 'lucide-react';

export const SoyTechnoFilterSidebar = ({
  activeCategory = 'todos',
  onSelectCategory,
  selectedBrand = 'todas',
  onSelectBrand,
  selectedColor = 'todos',
  onSelectColor,
  selectedType = 'todos',
  onSelectType,
  priceRange = [1, 1041],
  minLimit = 1,
  maxLimit = 2500,
  onPriceChange,
  onApplyFilter,
  isLightBg = false
}) => {
  // Accordion collapsed state (Collapsed by default as requested by user)
  const [openSections, setOpenSections] = useState({
    color: false,
    marca: false,
    tipo: false
  });

  // Dual handle local state
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  const toggleSection = (sectionKey) => {
    setOpenSections(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const handleMinSliderChange = (e) => {
    const val = Math.min(Number(e.target.value), maxPrice - 20);
    setMinPrice(val);
    if (onPriceChange) onPriceChange([val, maxPrice]);
  };

  const handleMaxSliderChange = (e) => {
    const val = Math.max(Number(e.target.value), minPrice + 20);
    setMaxPrice(val);
    if (onPriceChange) onPriceChange([minPrice, val]);
  };

  // Categories list for Mini Sidebar (Vertical Icons Column)
  const miniSidebarCategories = [
    { id: 'smartphones', name: 'Teléfonos Celulares', Icon: Smartphone },
    { id: 'linea-blanca', name: 'Televisores & Smart TVs', Icon: Tv },
    { id: 'laptops', name: 'Laptops', Icon: Laptop },
    { id: 'gamer', name: 'Zona Gamer', Icon: Gamepad2 },
    { id: 'computacion', name: 'Equipos de Computación', Icon: Monitor },
    { id: 'impresoras', name: 'Impresoras', Icon: Printer },
    { id: 'tablets', name: 'Tablets', Icon: Tablet },
    { id: 'wearables', name: 'Relojes Inteligentes', Icon: Watch },
    { id: 'audio', name: 'Audífonos y Sonido', Icon: Headphones },
    { id: 'streaming', name: 'Dispositivos Streaming', Icon: Radio }
  ];

  const brandOptions = [
    { id: 'todas', label: 'Todas las Marcas' },
    { id: 'apple', label: ' Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'siragon', label: 'Síragon' },
    { id: 'lg', label: 'LG Electronics' }
  ];

  const colorOptions = [
    { id: 'todos', label: 'Todos los Colores', hex: '#FFFFFF' },
    { id: 'negro', label: 'Negro / Space Gray', hex: '#0F172A' },
    { id: 'titanio', label: 'Titanio / Plata', hex: '#94A3B8' },
    { id: 'cian', label: 'Cian Neón / Azul', hex: '#00E5FF' },
    { id: 'dorado', label: 'Dorado / Gold', hex: '#F59E0B' }
  ];

  const typeOptions = [
    { id: 'todos', label: 'Todos los Tipos' },
    { id: 'smartphones', label: 'Smartphones Flagship' },
    { id: 'tvs', label: 'Smart TVs 4K & OLED' },
    { id: 'laptops', label: 'Laptops Pro & Gamer' },
    { id: 'audio', label: 'Audífonos Hi-Fi & Soundbars' }
  ];

  return (
    <div className="flex items-start gap-3 select-none font-space">
      
      {/* 1. NAVEGACIÓN VERTICAL RÁPIDA (MINI SIDEBAR EXTRACTO IZQUIERDO) */}
      <div className={`w-14 shrink-0 rounded-2xl py-4 flex flex-col items-center gap-3 border shadow-md ${
        isLightBg 
          ? 'bg-white border-slate-200 text-slate-700' 
          : 'bg-[#070B12] border-white/10 text-slate-400'
      }`}>
        {/* Main Menu Toggle Icon */}
        <div className="w-9 h-9 rounded-full bg-[#0066FF] text-white flex items-center justify-center shadow-[0_0_12px_#0066FF] mb-2 cursor-pointer">
          <SlidersHorizontal className="w-4 h-4" />
        </div>

        {miniSidebarCategories.map((item) => {
          const isActive = activeCategory === item.id;
          const { Icon } = item;
          return (
            <button
              key={item.id}
              onClick={() => onSelectCategory && onSelectCategory(item.id)}
              title={item.name}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
                isActive
                  ? 'bg-[#0066FF] text-white shadow-[0_0_15px_#0066FF] scale-110'
                  : isLightBg
                    ? 'hover:bg-slate-100 hover:text-[#0066FF] text-slate-600'
                    : 'hover:bg-white/10 hover:text-[#00E5FF] text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              
              {/* Tooltip Hover */}
              <span className="absolute left-12 px-3 py-1 rounded-lg bg-black text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg border border-white/10">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. SIDEBAR DE FILTROS PRINCIPAL (DESKTOP/TABLET) */}
      <div className={`flex-1 rounded-3xl p-6 border shadow-lg space-y-6 ${
        isLightBg
          ? 'bg-white border-slate-200 text-slate-900'
          : 'glass-card border-white/10 text-white'
      }`}>
        
        {/* Acordeón 1: Color */}
        <div className="border-b pb-4 border-slate-200 dark:border-white/10">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left font-space hover:text-[#0066FF] dark:hover:text-[#00E5FF] transition-colors"
          >
            <span>Color</span>
            {openSections.color ? <ChevronUp className="w-4 h-4 text-[#0066FF] dark:text-[#00E5FF]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.color && (
            <div className="pt-3 space-y-2 text-xs font-inter animate-fadeIn">
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectColor && onSelectColor(c.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left border transition-all ${
                    selectedColor === c.id
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#0066FF] font-bold'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: c.hex }} />
                    <span>{c.label}</span>
                  </div>
                  {selectedColor === c.id && <Check className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#00E5FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Acordeón 2: Marca */}
        <div className="border-b pb-4 border-slate-200 dark:border-white/10">
          <button
            onClick={() => toggleSection('marca')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left font-space hover:text-[#0066FF] dark:hover:text-[#00E5FF] transition-colors"
          >
            <span>Marca</span>
            {openSections.marca ? <ChevronUp className="w-4 h-4 text-[#0066FF] dark:text-[#00E5FF]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.marca && (
            <div className="pt-3 space-y-1.5 text-xs font-inter animate-fadeIn">
              {brandOptions.map((b) => (
                <button
                  key={b.id}
                  onClick={() => onSelectBrand && onSelectBrand(b.id)}
                  className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between ${
                    selectedBrand === b.id
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#0066FF] font-bold'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{b.label}</span>
                  {selectedBrand === b.id && <Check className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#00E5FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Acordeón 3: Tipo De Producto */}
        <div className="border-b pb-4 border-slate-200 dark:border-white/10">
          <button
            onClick={() => toggleSection('tipo')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left font-space hover:text-[#0066FF] dark:hover:text-[#00E5FF] transition-colors"
          >
            <span>Tipo De Producto</span>
            {openSections.tipo ? <ChevronUp className="w-4 h-4 text-[#0066FF] dark:text-[#00E5FF]" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {openSections.tipo && (
            <div className="pt-3 space-y-1.5 text-xs font-inter animate-fadeIn">
              {typeOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectType && onSelectType(t.id)}
                  className={`w-full text-left p-2 rounded-xl border transition-all flex items-center justify-between ${
                    selectedType === t.id
                      ? 'bg-[#00E5FF]/15 border-[#00E5FF] text-[#0066FF] font-bold'
                      : 'border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{t.label}</span>
                  {selectedType === t.id && <Check className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#00E5FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. FILTRO DE RANGO DE PRECIO (DUAL-HANDLE SLIDER) */}
        <div className="space-y-4 pt-1">
          <h4 className="text-sm font-extrabold font-space text-slate-900 dark:text-white">
            Filtrar Por Rango De Precio
          </h4>

          {/* Dual Handle Slider track */}
          <div className="relative w-full py-2">
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full relative">
              {/* Active cyan/blue range highlight */}
              <div 
                className="absolute h-full bg-[#0066FF] dark:bg-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]"
                style={{
                  left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                  right: `${100 - ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`
                }}
              />
            </div>

            {/* Min Price Slider Input */}
            <input 
              type="range"
              min={minLimit}
              max={maxLimit}
              value={minPrice}
              onChange={handleMinSliderChange}
              className="absolute top-1 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0066FF] dark:[&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
            />

            {/* Max Price Slider Input */}
            <input 
              type="range"
              min={minLimit}
              max={maxLimit}
              value={maxPrice}
              onChange={handleMaxSliderChange}
              className="absolute top-1 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0066FF] dark:[&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
            />
          </div>

          {/* Dynamic Price Text Display (ej. Precio: 1,00$ — 1.041,00$) */}
          <div className="text-xs font-bold font-inter text-slate-700 dark:text-slate-300">
            Precio: <span className="font-extrabold text-slate-900 dark:text-white font-space">${minPrice.toFixed(2)}$</span> — <span className="font-extrabold text-slate-900 dark:text-white font-space">${maxPrice.toFixed(2)}$</span>
          </div>

          {/* Button "Filtrar" con fondo azul claro / cian neón */}
          <button
            onClick={() => onApplyFilter && onApplyFilter({ minPrice, maxPrice, selectedBrand, selectedColor, selectedType })}
            className="px-6 py-2.5 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/50 text-[#0066FF] dark:text-[#00E5FF] hover:bg-[#0066FF] hover:text-white dark:hover:bg-[#00E5FF] dark:hover:text-black font-extrabold text-xs font-space transition-all shadow-sm active:scale-95 uppercase tracking-wider"
          >
            Filtrar
          </button>
        </div>

      </div>

    </div>
  );
};
