import React, { useState, useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, LayoutGrid,
  Wind, Refrigerator, WashingMachine, Laptop, UtensilsCrossed, Watch,
  ChevronRight, ChevronDown, Sparkles, Home, MapPin, MessageSquare, Gamepad2, Monitor, Printer, Tablet, Wifi, Calculator
} from 'lucide-react';

export const CategoryMegaMenu = ({ isOpen, onClose, onSelectCategory, customCategories = [] }) => {
  const [activeTab, setActiveTab] = useState('categorias');
  const [expandedCatId, setExpandedCatId] = useState(null);

  // ESC key listener
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

  // Complete SoyTechno Category Taxonomy
  const soyTechnoCategories = [
    {
      id: 'telefonos',
      name: 'Teléfonos Celulares',
      Icon: Smartphone,
      filterId: 'smartphones',
      badge: 'Pro 2026',
      subs: [
        { name: 'Zona Apple (iPhone 16 Pro Max / 15 / 14)', filterId: 'apple' },
        { name: 'Zona Samsung Galaxy (S24 Ultra & AI)', filterId: 'samsung' },
        { name: 'Zona Xiaomi & POCO (14 Ultra & Leica)', filterId: 'xiaomi' },
        { name: 'Honor, Tecno & Infinix', filterId: 'smartphones' },
        { name: 'Ver Todos los Celulares', filterId: 'smartphones' }
      ]
    },
    {
      id: 'televisores',
      name: 'Televisores & Smart TVs',
      Icon: Tv,
      filterId: 'linea-blanca',
      badge: 'OLED 4K',
      subs: [
        { name: 'Zona Síragon Smart TVs 4K', filterId: 'siragon' },
        { name: 'Samsung Neo QLED & OLED 4K', filterId: 'samsung' },
        { name: 'Pantallas Gigantes 75"+', filterId: 'linea-blanca' },
        { name: 'Ver Todos los Televisores', filterId: 'linea-blanca' }
      ]
    },
    {
      id: 'laptops',
      name: 'Laptops & MacBooks',
      Icon: Laptop,
      filterId: 'accesorios',
      badge: 'M3 Max',
      subs: [
        { name: 'MacBook Air & MacBook Pro', filterId: 'apple' },
        { name: 'Laptops Gamer & Alto Rendimiento', filterId: 'accesorios' },
        { name: 'Equipos All-In-One & Escritorio', filterId: 'accesorios' }
      ]
    },
    {
      id: 'gamer',
      name: 'Zona Gamer & Consolas',
      Icon: Gamepad2,
      filterId: 'accesorios',
      badge: 'PS5 Pro',
      subs: [
        { name: 'PlayStation 5 & Mandos DualSense', filterId: 'accesorios' },
        { name: 'Nintendo Switch OLED & Juegos', filterId: 'accesorios' },
        { name: 'Accesorios Gamer & Headsets', filterId: 'audio' }
      ]
    },
    {
      id: 'computacion',
      name: 'Equipos de Computación',
      Icon: Monitor,
      filterId: 'accesorios',
      subs: [
        { name: 'Monitores 4K 144Hz & Curvos', filterId: 'accesorios' },
        { name: 'Teclados Mecánicos & Mouses RGB', filterId: 'accesorios' }
      ]
    },
    {
      id: 'accesorios-pc',
      name: 'Accesorios de Computación',
      Icon: Zap,
      filterId: 'accesorios',
      subs: [
        { name: 'Cables HDMI 2.1 & Adaptares Type-C', filterId: 'accesorios' },
        { name: 'Cargadores Rápidos GaN & MagSafe', filterId: 'accesorios' }
      ]
    },
    {
      id: 'impresoras',
      name: 'Impresoras & Tintas',
      Icon: Printer,
      filterId: 'accesorios',
      subs: [
        { name: 'Impresoras Multifuncionales EcoTank', filterId: 'accesorios' },
        { name: 'Tintas Continuas & Consumibles', filterId: 'accesorios' }
      ]
    },
    {
      id: 'tablets',
      name: 'Tablets & iPads',
      Icon: Tablet,
      filterId: 'smartphones',
      badge: 'M4',
      subs: [
        { name: 'iPad Pro M4 & iPad Air', filterId: 'apple' },
        { name: 'Samsung Galaxy Tab S9', filterId: 'samsung' },
        { name: 'Xiaomi Pad 6', filterId: 'xiaomi' }
      ]
    },
    {
      id: 'relojes',
      name: 'Relojes Inteligentes',
      Icon: Watch,
      filterId: 'wearables',
      badge: 'Biométrico',
      subs: [
        { name: 'Apple Watch Ultra 2 & Series 10', filterId: 'apple' },
        { name: 'Galaxy Watch 7 Titanio', filterId: 'samsung' }
      ]
    },
    {
      id: 'audio',
      name: 'Audífonos & Sonido Hi-Fi',
      Icon: Headphones,
      filterId: 'audio',
      badge: 'Dolby',
      subs: [
        { name: 'AirPods Max & AirPods Pro 2', filterId: 'apple' },
        { name: 'Barras de Sonido & Dolby Atmos', filterId: 'audio' },
        { name: 'Parlantes Bluetooth Potentes', filterId: 'audio' }
      ]
    },
    {
      id: 'linea-blanca',
      name: 'Hogar & Línea Blanca',
      Icon: Refrigerator,
      filterId: 'linea-blanca',
      badge: 'Inverter',
      subs: [
        { name: 'Neveras Multi-Door Inverter', filterId: 'linea-blanca' },
        { name: 'Lavadoras Carga Frontal', filterId: 'linea-blanca' },
        { name: 'Aires Acondicionados Split', filterId: 'linea-blanca' },
        { name: 'Freidoras de Aire Smart AirFryer', filterId: 'linea-blanca' }
      ]
    },
    {
      id: 'redes',
      name: 'Redes & Conectividad',
      Icon: Wifi,
      filterId: 'accesorios',
      subs: [
        { name: 'Routers Wi-Fi 6 & MESH', filterId: 'accesorios' },
        { name: 'Repetidores de Señal & Antenas', filterId: 'accesorios' }
      ]
    }
  ];

  const handleCategorySelect = (filterId, catName) => {
    onSelectCategory(filterId, catName);
    onClose();
  };

  const toggleExpand = (id) => {
    setExpandedCatId(prev => (prev === id ? null : id));
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Menú de Categorías M Store Estilo SoyTechno"
      className="fixed inset-0 z-[60] flex"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Drawer Lateral Desplazable Estilo SoyTechno */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#0A0908] border-r border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.3)] flex flex-col h-full overflow-hidden animate-slideInLeft font-space">
        
        {/* Top Header Button "Todas las Categorías" */}
        <div className="p-4 bg-black/80 border-b border-white/10 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-white">M Store Menú</span>
            </div>
            <button 
              onClick={onClose}
              aria-label="Cerrar Menú"
              className="p-2 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-300 hover:text-black transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white p-3.5 rounded-2xl flex items-center justify-between shadow-[0_0_20px_rgba(0,102,255,0.4)] cursor-pointer transition-all group">
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-sm font-extrabold tracking-tight">Todas las Categorías</span>
            </div>
            <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-mono font-bold">12 Secciones</span>
          </div>
        </div>

        {/* Categories Scrollable Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          {soyTechnoCategories.map((cat) => {
            const isExpanded = expandedCatId === cat.id;
            const { Icon } = cat;

            return (
              <div key={cat.id} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300 hover:border-[#00E5FF]/40">
                <div 
                  onClick={() => handleCategorySelect(cat.filterId, cat.name)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/[0.06] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/5 group-hover:bg-[#00E5FF]/20 group-hover:text-[#00E5FF] text-slate-300 flex items-center justify-center transition-all shrink-0 border border-white/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-white group-hover:text-[#00E5FF] transition-colors flex items-center gap-2">
                        {cat.name}
                        {cat.badge && (
                          <span className="text-[9px] bg-[#00E5FF]/15 text-[#00E5FF] px-1.5 py-0.5 rounded font-mono font-bold border border-[#00E5FF]/30">
                            {cat.badge}
                          </span>
                        )}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-inter leading-none mt-1">Explorar catálogo directo</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {cat.subs && cat.subs.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(cat.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        aria-label="Ver Subcategorías"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-[#00E5FF]" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Subcategories Accordion */}
                {isExpanded && cat.subs && (
                  <div className="bg-black/50 border-t border-white/10 px-4 py-2 space-y-1 font-inter text-xs">
                    {cat.subs.map((sub, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleCategorySelect(sub.filterId, sub.name)}
                        className="w-full text-left py-2 px-3 rounded-xl text-slate-300 hover:text-[#00E5FF] hover:bg-white/5 transition-all flex items-center justify-between group/sub"
                      >
                        <span>{sub.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 text-[#00E5FF] transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Drawer Info */}
        <div className="p-4 border-t border-white/10 bg-black/60 shrink-0 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
              <span>Garantía Oficial M Store 1 Año</span>
            </span>
            <span className="text-[#00E5FF] font-bold">100% WhatsApp</span>
          </div>
        </div>

      </div>
    </div>
  );
};
