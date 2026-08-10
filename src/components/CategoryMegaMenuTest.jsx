import React, { useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, LayoutGrid,
  Wind, Refrigerator, WashingMachine, Laptop, UtensilsCrossed, Watch
} from 'lucide-react';

export const CategoryMegaMenuTest = ({ isOpen, onClose, onSelectCategory, customCategories = [] }) => {
  // ESC key listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // CATEGORÍAS PRINCIPALES (Sin etiquetas innecesarias en el lado derecho)
  const defaultCategories = [
    { name: 'Televisores Smart 4K', filterId: 'televisores', Icon: Tv },
    { name: 'Neveras & Refrigeración', filterId: 'neveras',  Icon: Refrigerator },
    { name: 'Cocinas & Estufas',    filterId: 'cocina',      Icon: UtensilsCrossed },
    { name: 'Aires Acondicionados', filterId: 'aires',       Icon: Wind },
    { name: 'Lavadoras & Lavandería', filterId: 'lavadoras', Icon: WashingMachine },
    { name: 'Teléfonos & Telefonía', filterId: 'telefonos',  Icon: Smartphone },
    { name: 'Computadoras & Laptops', filterId: 'computadoras', Icon: Laptop },
    { name: 'Audio High-End',       filterId: 'audio',       Icon: Headphones },
    { name: 'Smart Watches',        filterId: 'wearables',   Icon: Watch },
    // MARCAS CON ESTILO DE MARCA LIMPIO
    { name: 'Zona Síragon',         filterId: 'siragon',     isBrand: true },
    { name: 'Zona Samsung',         filterId: 'samsung',     isBrand: true },
    { name: 'Zona Apple',           filterId: 'apple',       isBrand: true },
    { name: 'Zona Xiaomi',          filterId: 'xiaomi',      isBrand: true },
    { name: 'Zona LG',              filterId: 'lg',          isBrand: true },
    { name: 'Zona Soneview',        filterId: 'soneview',    isBrand: true }
  ];

  const allCategories = [
    ...defaultCategories,
    ...customCategories.map(c => ({
      name: c.name,
      filterId: c.id,
      Icon: LayoutGrid
    }))
  ];

  const handleCategoryClick = (filterId, catName) => {
    onSelectCategory(filterId, catName);
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Menú de Categorías M Store"
      className="fixed inset-0 z-[60] bg-[#0A0908]/98 backdrop-blur-2xl p-4 sm:p-8 md:p-12 overflow-y-auto animate-fadeIn flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full relative space-y-6 my-auto">
        
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-space text-white">Menú de Categorías M Store</h3>
              <p className="text-xs text-slate-400 font-inter">Selecciona una categoría para filtrar el catálogo instantáneamente</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            aria-label="Cerrar Menú de Categorías"
            className="p-3 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* DIRECT MAIN CATEGORIES GRID (Estética Cian Neón Homogénea y Vibrante) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-space">
          {allCategories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => handleCategoryClick(cat.filterId, cat.name)}
              aria-label={`Filtrar por categoría ${cat.name}`}
              className="flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group text-left active:scale-95 min-h-[48px] border bg-[#00E5FF]/5 border-[#00E5FF]/30 hover:border-[#00E5FF] hover:bg-[#00E5FF]/15 text-slate-100 hover:text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.08)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              <div className="flex items-center gap-3 min-w-0">
                {cat.Icon ? (
                  <cat.Icon className="w-5 h-5 shrink-0 text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF] group-hover:scale-110 transition-transform" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] shrink-0 group-hover:scale-125 transition-transform"></span>
                )}
                <span className="font-bold text-xs group-hover:translate-x-0.5 transition-transform leading-snug truncate">{cat.name}</span>
              </div>

              <span className="text-[#00E5FF] text-xs font-extrabold opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-1">
                &rarr;
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Direct Action */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
            <span>Haz clic en cualquier categoría para ver todos los productos disponibles.</span>
          </div>

          <button 
            onClick={() => handleCategoryClick('todos', 'Todos los Productos')}
            className="btn-cyan-glow px-5 py-2.5 rounded-xl text-black font-extrabold font-space text-xs uppercase shadow-[0_0_15px_rgba(0,229,255,0.3)] min-h-[44px]"
          >
            Ver Todo el Catálogo General &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
