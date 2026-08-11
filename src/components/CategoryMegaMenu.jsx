import React from 'react';
import { 
  Smartphone, Headphones, Watch, BatteryCharging, Tv, Laptop, Gamepad2, 
  Wind, ShieldCheck, Zap, Sparkles, X, ChevronRight 
} from 'lucide-react';

export const MEGA_MENU_CATEGORIES = [
  {
    title: 'Zona Telefonía & Flagship',
    id: 'smartphones',
    icon: Smartphone,
    items: [
      { label: 'iPhone Serie Pro Max', filterId: 'smartphones', sub: 'Apple 16 Pro Max' },
      { label: 'Samsung Galaxy Ultra', filterId: 'smartphones', sub: 'S24 Ultra & AI' },
      { label: 'Google Pixel & Plegables', filterId: 'smartphones', sub: 'Pixel 9 Pro Fold' },
      { label: 'Xiaomi & Flagship Cyber', filterId: 'smartphones', sub: '14 Ultra Leica' }
    ]
  },
  {
    title: 'Línea Blanca & Smart Home',
    id: 'linea-blanca',
    icon: Tv,
    items: [
      { label: 'Smart TVs 4K & Neo QLED', filterId: 'linea-blanca', sub: 'Pantallas OLED 144Hz' },
      { label: 'Lavadoras & Lavandería AI', filterId: 'linea-blanca', sub: 'Inverter Smart' },
      { label: 'Aires Acondicionados & Clima', filterId: 'linea-blanca', sub: 'Eco Inverter' },
      { label: 'Neveras & Domótica Smart', filterId: 'linea-blanca', sub: 'Hub Matter integrado' }
    ]
  },
  {
    title: 'Audio High-End & Hi-Fi',
    id: 'audio',
    icon: Headphones,
    items: [
      { label: 'AirPods Max & Over-Ear', filterId: 'audio', sub: 'Audio Espacial' },
      { label: 'Audífonos Cancelación Ruido', filterId: 'audio', sub: 'Sony WH-1000XM5' },
      { label: 'Parlantes & Barras de Sonido', filterId: 'audio', sub: 'Dolby Atmos' },
      { label: 'Earbuds TWS In-Ear', filterId: 'audio', sub: 'Hi-Res Wireless' }
    ]
  },
  {
    title: 'Wearables & Smartwatches',
    id: 'wearables',
    icon: Watch,
    items: [
      { label: 'Apple Watch Ultra 2', filterId: 'wearables', sub: 'Titanio 49mm' },
      { label: 'Galaxy Watch & Titanio', filterId: 'wearables', sub: 'GPS Dual & ECG' },
      { label: 'Bandas Deportivas', filterId: 'wearables', sub: 'Sensores Biométricos' }
    ]
  },
  {
    title: 'Accesorios & Powerbanks',
    id: 'accesorios',
    icon: BatteryCharging,
    items: [
      { label: 'MagSafe Baterías Cyber', filterId: 'accesorios', sub: 'Qi2 15W 10000mAh' },
      { label: 'Fundas Tácticas Titanium', filterId: 'accesorios', sub: 'Protección Militar' },
      { label: 'Cargadores PD 30W a 100W', filterId: 'accesorios', sub: 'Carga Ultra-Rápida' }
    ]
  }
];

export const CategoryMegaMenu = ({ isOpen, onClose, onSelectCategory }) => {
  if (!isOpen) return null;

  const handleItemClick = (categoryId) => {
    onSelectCategory(categoryId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 pt-20 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Main Glass Panel (IVOO Style Mega Menu Dropdown) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass-modal rounded-3xl p-6 md:p-8 border border-[#00E5FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-space text-white">Menú de Categorías M Store</h3>
                <p className="text-xs text-slate-400">Explora todos los productos, tecnología e innovaciones</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid Columns (IVOO Mega Menu Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-2">
            {MEGA_MENU_CATEGORIES.map((catGroup) => {
              const IconComp = catGroup.icon;
              return (
                <div key={catGroup.id} className="space-y-3">
                  
                  {/* Category Group Header */}
                  <button
                    onClick={() => handleItemClick(catGroup.id)}
                    className="flex items-center gap-2 text-sm font-bold font-space text-[#00E5FF] hover:text-white transition-colors group w-full text-left pb-2 border-b border-white/10"
                  >
                    <div className="p-1.5 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black transition-all">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span>{catGroup.title}</span>
                  </button>

                  {/* Subcategory list */}
                  <ul className="space-y-2">
                    {catGroup.items.map((subItem, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleItemClick(subItem.filterId)}
                          className="w-full text-left p-2 rounded-xl hover:bg-white/[0.06] hover:border-[#00E5FF]/30 border border-transparent transition-all group flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-semibold text-slate-200 group-hover:text-[#00E5FF] transition-colors font-space">
                              {subItem.label}
                            </p>
                            <p className="text-[10px] text-slate-400">{subItem.sub}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                      </li>
                    ))}
                  </ul>

                </div>
              );
            })}
          </div>

          {/* Bottom Callout Bar */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00E5FF]" />
              <span>Todos los productos incluyen <strong>Garantía Oficial M Store</strong> y envío VIP.</span>
            </div>
            <button
              onClick={() => handleItemClick('todos')}
              className="btn-cyan-glow px-5 py-2 rounded-xl text-xs font-bold font-space text-black shrink-0"
            >
              Ver Todo el Catálogo &rarr;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
