import React, { useEffect } from 'react';
import { X, Tv, Smartphone, Headphones, Watch, Zap, Sparkles, Flame, Shield, Box, Tag } from 'lucide-react';

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

  // DIRECT MAIN CATEGORIES (ESTILO IVOO DIRECTO SIN SUB-CATÁLOGOS)
  const defaultCategories = [
    { name: 'Televisores Smart 4K', filterId: 'televisores', icon: '📺', badge: 'Smart TV' },
    { name: 'Neveras & Refrigeración', filterId: 'neveras', icon: '🧊', badge: 'Inverter' },
    { name: 'Cocinas & Estufas', filterId: 'cocina', icon: '🍳', badge: 'Inducción' },
    { name: 'Aires Acondicionados', filterId: 'aires', icon: '🌬️', badge: 'Eco' },
    { name: 'Lavadoras & Lavandería', filterId: 'lavadoras', icon: '🧺', badge: 'AI DD' },
    { name: 'Smartphones & Telefonía', filterId: 'smartphones', icon: '📱', badge: 'Flagships' },
    { name: 'Zona Síragon', filterId: 'siragon', badge: 'Síragon' },
    { name: 'Zona Samsung', filterId: 'samsung', badge: 'Samsung' },
    { name: 'Zona Apple', filterId: 'apple', badge: 'Apple' },
    { name: 'Zona Xiaomi', filterId: 'xiaomi', badge: 'Xiaomi' },
    { name: 'Zona LG', filterId: 'lg', badge: 'LG' },
    { name: 'Zona Soneview', filterId: 'soneview', badge: 'Soneview' },
    { name: 'Audio High-End', filterId: 'audio', icon: '🔊', badge: 'Hi-Fi' },
    { name: 'Smart Watches', filterId: 'wearables', icon: '⌚', badge: 'GPS' },
    { name: 'Scooter & Movilidad', filterId: 'scooter', icon: 'scooter', badge: 'Cyber' }
  ];

  const allCategories = [
    ...defaultCategories,
    ...customCategories.map(c => ({
      name: c.name,
      filterId: c.id,
      icon: '🏷️',
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
      className="fixed inset-x-0 top-[65px] z-50 bg-[#0A0908]/98 backdrop-blur-2xl border-b border-[#00E5FF]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 md:p-8 animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-space text-white">Menú de Categorías M Store</h3>
              <p className="text-xs text-slate-300 font-inter">Categorías principales del catálogo gestionadas en el panel administrador</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            aria-label="Cerrar Menú de Categorías"
            className="p-3 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
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
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF] hover:bg-[#00E5FF]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] cursor-pointer text-slate-200 hover:text-[#00E5FF] transition-all group text-left active:scale-95 min-h-[44px]"
            >
              <div className="flex items-center gap-2.5">
                {cat.icon && <span className="text-base shrink-0">{cat.icon}</span>}
                <span className="font-bold text-xs group-hover:translate-x-1 transition-transform leading-snug">{cat.name}</span>
              </div>

              {cat.badge && (
                <span className="text-[9px] bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 rounded-md border border-[#00E5FF]/30 font-extrabold group-hover:bg-[#00E5FF] group-hover:text-black transition-colors shrink-0">
                  {cat.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bottom Direct Action */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00E5FF]" />
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
