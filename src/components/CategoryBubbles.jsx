import React from 'react';
import { Smartphone, Laptop, Tv, Headphones, Clock, Gamepad2, Zap, Flame } from 'lucide-react';

export const CategoryBubbles = ({ onSelectCategory }) => {
  const categories = [
    { id: 'smartphones', label: 'Smartphones', icon: Smartphone, color: 'from-blue-500 to-blue-600', badge: 'Popular' },
    { id: 'computacion', label: 'Laptops & PC', icon: Laptop, color: 'from-indigo-500 to-indigo-600' },
    { id: 'linea-blanca', label: 'Smart TVs', icon: Tv, color: 'from-cyan-500 to-blue-500' },
    { id: 'audio', label: 'Audio Hi-Fi', icon: Headphones, color: 'from-purple-500 to-indigo-600' },
    { id: 'wearables', label: 'Smartwatches', icon: Clock, color: 'from-emerald-500 to-teal-600' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'from-violet-500 to-purple-600' },
    { id: 'accesorios', label: 'Accesorios', icon: Zap, color: 'from-amber-500 to-orange-600' },
    { id: 'ofertas', label: 'Ofertas TOP', icon: Flame, color: 'from-rose-500 to-red-600', isHot: true }
  ];

  return (
    <section className="py-6 sm:py-8 bg-white border-b border-slate-200/80 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">
              Explorar por Categorías
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">Encuentra los mejores equipos seleccionados para ti</p>
          </div>
          <button
            onClick={() => onSelectCategory && onSelectCategory('todos')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all"
          >
            Ver todo el catálogo →
          </button>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                className="group flex flex-col items-center gap-2.5 p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 min-w-[95px] sm:min-w-[110px] shrink-0 active:scale-95 text-center relative overflow-hidden"
              >
                {/* Hot / Popular Badge */}
                {cat.badge && (
                  <span className="absolute top-1.5 right-1.5 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase">
                    {cat.badge}
                  </span>
                )}
                {cat.isHot && (
                  <span className="absolute top-1.5 right-1.5 bg-rose-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase animate-pulse">
                    Hot
                  </span>
                )}

                {/* Icon Container with Gradient on hover */}
                <div className={`w-12 h-12 rounded-2xl bg-white group-hover:bg-gradient-to-tr ${cat.color} border border-slate-200/80 flex items-center justify-center text-slate-700 group-hover:text-white transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:scale-110`}>
                  <Icon className="w-5 h-5 transition-transform duration-300" />
                </div>

                {/* Label */}
                <span className="text-[11px] font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
