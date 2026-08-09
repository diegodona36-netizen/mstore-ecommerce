import React, { useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, Sparkles, Tag, LayoutGrid,
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

  // CATEGORÍAS PRINCIPALES — iconos Lucide limpios
  const defaultCategories = [
    { name: 'Televisores Smart 4K', filterId: 'televisores', Icon: Tv,               badge: 'Smart TV' },
    { name: 'Neveras & Refrigeración', filterId: 'neveras',  Icon: Refrigerator,     badge: 'Inverter' },
    { name: 'Cocinas & Estufas',    filterId: 'cocina',      Icon: UtensilsCrossed,  badge: 'Inducción' },
    { name: 'Aires Acondicionados', filterId: 'aires',       Icon: Wind,             badge: 'Eco' },
    { name: 'Lavadoras & Lavandería', filterId: 'lavadoras', Icon: WashingMachine,   badge: 'AI DD' },
    { name: 'Teléfonos & Telefonía', filterId: 'telefonos',  Icon: Smartphone,       badge: 'Flagships' },
    { name: 'Zona Síragon',         filterId: 'siragon',     Icon: null,             badge: 'Síragon' },
    { name: 'Zona Samsung',         filterId: 'samsung',     Icon: null,             badge: 'Samsung' },
    { name: 'Zona Apple',           filterId: 'apple',       Icon: null,             badge: 'Apple' },
    { name: 'Zona Xiaomi',          filterId: 'xiaomi',      Icon: null,             badge: 'Xiaomi' },
    { name: 'Zona LG',              filterId: 'lg',          Icon: null,             badge: 'LG' },
    { name: 'Zona Soneview',        filterId: 'soneview',    Icon: null,             badge: 'Soneview' },
    { name: 'Computadoras & Laptops', filterId: 'computadoras', Icon: Laptop,        badge: 'Pro' },
    { name: 'Audio High-End',       filterId: 'audio',       Icon: Headphones,       badge: 'Hi-Fi' },
    { name: 'Smart Watches',        filterId: 'wearables',   Icon: Watch,            badge: 'GPS' },
  ];

  const allCategories = [
    ...defaultCategories,
    ...customCategories.map(c => ({
      name: c.name,
      filterId: c.id,
      Icon: LayoutGrid,
      badge: 'ADMIN'
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
      className="fixed inset-x-0 top-[65px] z-50 bg-[#0A0908]/98 backdrop-blur-2xl border-b border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 md:p-8 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Sin fondo azul — solo ícono sobre oscuro */}
            <div className="p-2 text-slate-300">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-space text-white">Menú de Categorías M Store</h3>
              <p className="text-xs text-slate-400 font-inter">Selecciona una categoría para filtrar el catálogo</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            aria-label="Cerrar Menú de Categorías"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* DIRECT MAIN CATEGORIES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-space">
          {allCategories.map((cat, idx) => (
            <button 
              key={idx}
              onClick={() => handleCategoryClick(cat.filterId, cat.name)}
              aria-label={`Filtrar por categoría ${cat.name}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] cursor-pointer text-slate-200 hover:text-[#00E5FF] transition-all group text-left active:scale-95 min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                {cat.Icon && (
                  <cat.Icon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#00E5FF] transition-colors" />
                )}
                <span className="font-bold text-xs group-hover:translate-x-0.5 transition-transform leading-snug">{cat.name}</span>
              </div>

              {cat.badge && (
                <span className="text-[9px] bg-white/5 text-slate-400 px-2 py-0.5 rounded-md border border-white/10 font-extrabold group-hover:bg-[#00E5FF]/10 group-hover:text-[#00E5FF] group-hover:border-[#00E5FF]/30 transition-colors shrink-0 ml-1">
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Direct Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-500" />
            <span>Haz clic en cualquier categoría para filtrar instantáneamente todo el catálogo.</span>
          </div>

          <button 
            onClick={() => handleCategoryClick('todos', 'Todos los Productos')}
            className="text-[#00E5FF] font-extrabold hover:underline font-space focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] px-2 py-1 rounded"
          >
            Ver Todo el Catálogo General &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
