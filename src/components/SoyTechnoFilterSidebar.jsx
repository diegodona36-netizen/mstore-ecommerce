import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check, SlidersHorizontal } from 'lucide-react';

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
  const [openSections, setOpenSections] = useState({
    categoria: true,
    marca: true,
    precio: true,
    color: true,
  });

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

  const categories = [
    { id: 'todos', name: 'Todas las Categorías' },
    { id: 'smartphones', name: 'Smartphones y Celulares' },
    { id: 'linea-blanca', name: 'Televisores y Video' },
    { id: 'laptops', name: 'Laptops y PC' },
    { id: 'gamer', name: 'Consolas y Gaming' },
    { id: 'audio', name: 'Audio y Sonido' },
    { id: 'wearables', name: 'Smartwatches' },
    { id: 'tablets', name: 'Tablets' }
  ];

  const brandOptions = [
    { id: 'todas', label: 'Todas las Marcas' },
    { id: 'apple', label: 'Apple' },
    { id: 'samsung', label: 'Samsung' },
    { id: 'xiaomi', label: 'Xiaomi' },
    { id: 'lg', label: 'LG' },
    { id: 'sony', label: 'Sony' }
  ];

  const colorOptions = [
    { id: 'todos', label: 'Todos' },
    { id: 'negro', label: 'Negro' },
    { id: 'plata', label: 'Plata / Titanio' },
    { id: 'blanco', label: 'Blanco' }
  ];

  // Base classes for the sidebar
  const bgClass = isLightBg ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0a0a0a] border-neutral-800 text-white';
  const borderClass = isLightBg ? 'border-slate-200' : 'border-neutral-800';
  const textMuted = isLightBg ? 'text-slate-500' : 'text-slate-400';
  const hoverBg = isLightBg ? 'hover:bg-slate-50' : 'hover:bg-neutral-900';

  return (
    <div className={`w-full lg:w-[260px] shrink-0 rounded-2xl border p-5 font-sans ${bgClass}`}>
      
      {/* Header */}
      <div className={`flex items-center justify-between pb-4 mb-4 border-b ${borderClass}`}>
        <h2 className="text-lg font-black tracking-tight">Filtros</h2>
        <button 
          onClick={() => {
             if(onSelectCategory) onSelectCategory('todos');
             if(onSelectBrand) onSelectBrand('todas');
          }}
          className={`text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors`}
        >
          Borrar
        </button>
      </div>

      <div className="space-y-5">
        
        {/* CATEGORÍAS */}
        <div>
          <button
            onClick={() => toggleSection('categoria')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left mb-2"
          >
            <span>Categorías</span>
            {openSections.categoria ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.categoria && (
            <div className="space-y-1.5 pt-1 animate-fadeIn">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory && onSelectCategory(c.id)}
                  className={`w-full flex items-center gap-2 text-left text-sm py-1.5 transition-colors ${
                    activeCategory === c.id ? 'font-bold text-blue-600' : `${textMuted} hover:text-blue-600`
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    activeCategory === c.id ? 'border-blue-600 bg-blue-600' : borderClass
                  }`}>
                    {activeCategory === c.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`w-full h-px ${borderClass}`}></div>

        {/* MARCAS */}
        <div>
          <button
            onClick={() => toggleSection('marca')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left mb-2"
          >
            <span>Marcas</span>
            {openSections.marca ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.marca && (
            <div className="space-y-1.5 pt-1 animate-fadeIn">
              {brandOptions.map(b => (
                <button
                  key={b.id}
                  onClick={() => onSelectBrand && onSelectBrand(b.id)}
                  className={`w-full flex items-center gap-2 text-left text-sm py-1.5 transition-colors ${
                    selectedBrand === b.id ? 'font-bold text-blue-600' : `${textMuted} hover:text-blue-600`
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    selectedBrand === b.id ? 'border-blue-600 bg-blue-600' : borderClass
                  }`}>
                    {selectedBrand === b.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="truncate">{b.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`w-full h-px ${borderClass}`}></div>

        {/* PRECIO */}
        <div>
          <button
            onClick={() => toggleSection('precio')}
            className="w-full flex items-center justify-between py-1 text-sm font-extrabold text-left mb-3"
          >
            <span>Precios</span>
            {openSections.precio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {openSections.precio && (
            <div className="pt-1 animate-fadeIn space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 rounded text-slate-700 dark:text-slate-300">
                  ${minPrice}
                </span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-neutral-800 rounded text-slate-700 dark:text-slate-300">
                  ${maxPrice}
                </span>
              </div>
              
              <div className="relative w-full py-2">
                <div className={`h-1 w-full rounded-full relative ${isLightBg ? 'bg-slate-200' : 'bg-neutral-800'}`}>
                  <div 
                    className="absolute h-full bg-blue-600 rounded-full"
                    style={{
                      left: `${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}%`,
                      right: `${100 - ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}%`
                    }}
                  />
                </div>
                <input 
                  type="range" min={minLimit} max={maxLimit} value={minPrice} onChange={handleMinSliderChange}
                  className="absolute top-1 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <input 
                  type="range" min={minLimit} max={maxLimit} value={maxPrice} onChange={handleMaxSliderChange}
                  className="absolute top-1 left-0 w-full appearance-none bg-transparent pointer-events-none focus:outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>

              <button
                onClick={() => onApplyFilter && onApplyFilter({ minPrice, maxPrice, selectedBrand, selectedColor, selectedType })}
                className="w-full py-2 rounded-lg bg-black hover:bg-neutral-900 text-white text-xs font-bold transition-colors mt-2"
              >
                Aplicar Filtro
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
