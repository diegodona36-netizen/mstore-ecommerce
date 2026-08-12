import React, { useState, useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, LayoutGrid,
  Wind, Refrigerator, WashingMachine, Laptop, UtensilsCrossed, Watch,
  ChevronRight, ChevronDown, Sparkles, Home, MapPin, MessageSquare, Flame, Tag, ShieldCheck
} from 'lucide-react';

export const CategoryMegaMenuTest = ({ isOpen, onClose, onSelectCategory, customCategories = [] }) => {
  const [activeTab, setActiveTab] = useState('categorias'); // 'categorias' | 'menu'
  const [expandedCatId, setExpandedCatId] = useState(null);

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

  // ESTRUCTURA ESTILO SOYTECHNO CON SUB-CATEGORÍAS Y MARCAS
  const soyTechnoCategories = [
    {
      id: 'telefonos',
      name: 'Teléfonos Celulares',
      Icon: Smartphone,
      filterId: 'telefonos',
      subs: [
        { name: 'Zona Apple (iPhone 16 Pro Max / 15 / 14)', filterId: 'apple' },
        { name: 'Zona Samsung Galaxy (S24 Ultra & AI)', filterId: 'samsung' },
        { name: 'Zona Xiaomi & POCO (14 Ultra & Leica)', filterId: 'xiaomi' },
        { name: 'Honor, Tecno & Infinix', filterId: 'telefonos' },
        { name: 'Ver Todos los Teléfonos Celulares', filterId: 'telefonos' }
      ]
    },
    {
      id: 'televisores',
      name: 'Televisores & Smart TVs',
      Icon: Tv,
      filterId: 'televisores',
      subs: [
        { name: 'Zona Síragon Smart TVs 4K', filterId: 'siragon' },
        { name: 'Samsung Neo QLED & OLED 4K', filterId: 'samsung' },
        { name: 'Soneview Google TVs', filterId: 'soneview' },
        { name: 'Pantallas Gigantes 75"+', filterId: 'televisores' },
        { name: 'Ver Todos los Televisores', filterId: 'televisores' }
      ]
    },
    {
      id: 'laptops',
      name: 'Laptops & Computación',
      Icon: Laptop,
      filterId: 'computadoras',
      subs: [
        { name: 'Laptops Gamer & Alto Rendimiento', filterId: 'computadoras' },
        { name: 'MacBook Air & MacBook Pro', filterId: 'apple' },
        { name: 'Equipos All-In-One & Escritorio', filterId: 'computadoras' },
        { name: 'Monitores 4K Gamer 144Hz', filterId: 'computadoras' }
      ]
    },
    {
      id: 'neveras',
      name: 'Neveras & Refrigeración',
      Icon: Refrigerator,
      filterId: 'neveras',
      subs: [
        { name: 'Neveras Inverter Multi-Door', filterId: 'neveras' },
        { name: 'Freezers & Congeladores', filterId: 'neveras' },
        { name: 'Línea Blanca LG Electronics', filterId: 'lg' }
      ]
    },
    {
      id: 'lavadoras',
      name: 'Lavadoras & Lavandería',
      Icon: WashingMachine,
      filterId: 'lavadoras',
      subs: [
        { name: 'Lavadoras Carga Frontal Inverter', filterId: 'lavadoras' },
        { name: 'Secadoras & Centrifugadoras', filterId: 'lavadoras' }
      ]
    },
    {
      id: 'cocina',
      name: 'Cocinas & Estufas',
      Icon: UtensilsCrossed,
      filterId: 'cocina',
      subs: [
        { name: 'Cocinas a Gas 4 y 6 Hornillas', filterId: 'cocina' },
        { name: 'Topes de Inducción & Vitrocerámica', filterId: 'cocina' }
      ]
    },
    {
      id: 'aires',
      name: 'Aires Acondicionados',
      Icon: Wind,
      filterId: 'aires',
      subs: [
        { name: 'Split Inverter 12,000 BTU - 24,000 BTU', filterId: 'aires' },
        { name: 'Aires Portátiles & Compactos', filterId: 'aires' }
      ]
    },
    {
      id: 'audio',
      name: 'Audífonos & Sonido Hi-Fi',
      Icon: Headphones,
      filterId: 'audio',
      subs: [
        { name: 'AirPods & Beats Audio', filterId: 'apple' },
        { name: 'Barras de Sonido Dolby Atmos', filterId: 'audio' },
        { name: 'Parlantes Bluetooth Potentes', filterId: 'audio' }
      ]
    },
    {
      id: 'wearables',
      name: 'Relojes Inteligentes',
      Icon: Watch,
      filterId: 'wearables',
      subs: [
        { name: 'Apple Watch Ultra 2 & Series 10', filterId: 'apple' },
        { name: 'Galaxy Watch 7 Titanio', filterId: 'samsung' }
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
      {/* Backdrop oscuro con Blur */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Drawer Lateral Desplazable (SoyTechno Navigation Drawer) */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#0A0908] border-r border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] flex flex-col h-full overflow-hidden animate-slideInLeft font-space">
        
        {/* Top Header Drawer */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-tight">Catálogo M Store</h3>
              <p className="text-[10px] text-slate-400 font-inter">Telefonía & Tecnología Venezuela</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Cerrar Menú"
            className="p-2 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-300 hover:text-black transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs (Estilo SoyTechno: "Categorías" | "Menú") */}
        <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.02] shrink-0">
          <button
            onClick={() => setActiveTab('categorias')}
            className={`py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all relative ${
              activeTab === 'categorias' 
                ? 'text-[#00E5FF] bg-[#00E5FF]/10' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Categorías</span>
            {activeTab === 'categorias' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all relative ${
              activeTab === 'menu' 
                ? 'text-[#00E5FF] bg-[#00E5FF]/10' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Menú</span>
            {activeTab === 'menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]" />
            )}
          </button>
        </div>

        {/* TAB 1: LISTADO VERTICAL DE CATEGORÍAS CON CHEVRONS & DESPLEGABLE */}
        {activeTab === 'categorias' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-white/5">
            
            {/* Botón Ver Todo */}
            <button
              onClick={() => handleCategorySelect('todos', 'Todos los Productos')}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-[#00E5FF]/15 border border-transparent hover:border-[#00E5FF]/40 text-slate-100 hover:text-[#00E5FF] transition-all text-xs font-bold group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                <span>Todos los Productos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF]" />
            </button>

            {soyTechnoCategories.map((cat) => {
              const isExpanded = expandedCatId === cat.id;
              const IconComp = cat.Icon;

              return (
                <div key={cat.id} className="pt-1">
                  <div 
                    onClick={() => toggleExpand(cat.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.05] text-slate-200 hover:text-white transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#00E5FF]/50 group-hover:text-[#00E5FF] transition-all">
                        <IconComp className="w-4 h-4 text-[#00E5FF]" />
                      </div>
                      <span className="text-xs font-bold text-slate-100 group-hover:text-[#00E5FF] transition-colors">
                        {cat.name}
                      </span>
                    </div>

                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#00E5FF]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF]" />
                    )}
                  </div>

                  {/* Sub-categorías Accordion */}
                  {isExpanded && cat.subs && (
                    <div className="ml-9 pl-3 border-l-2 border-[#00E5FF]/30 my-1 space-y-1 animate-fadeIn">
                      {cat.subs.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleCategorySelect(sub.filterId, sub.name)}
                          className="w-full text-left p-2 rounded-xl hover:bg-[#00E5FF]/10 text-xs font-medium text-slate-300 hover:text-[#00E5FF] transition-all flex items-center justify-between"
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="w-3 h-3 text-slate-500" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Categorías Personalizadas */}
            {customCategories.length > 0 && (
              <div className="pt-3">
                <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categorías Agregadas</p>
                {customCategories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleCategorySelect(c.id, c.name)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 text-slate-300 hover:text-white transition-all text-xs font-bold"
                  >
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-[#00E5FF]" />
                      <span>{c.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: MENÚ DE NAVEGACIÓN Y ACCESOS RÁPIDOS */}
        {activeTab === 'menu' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-space text-xs">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onClose();
              }}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-slate-200 hover:text-[#00E5FF] transition-all font-bold"
            >
              <Home className="w-4 h-4 text-[#00E5FF]" />
              <span>Página Principal (Inicio)</span>
            </button>

            <a
              href="#catalogo-productos"
              onClick={onClose}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-slate-200 hover:text-[#00E5FF] transition-all font-bold"
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Ofertas Aniversario & Cyber</span>
            </a>

            <a
              href="#marcas-oficiales"
              onClick={onClose}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-slate-200 hover:text-[#00E5FF] transition-all font-bold"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Marcas Oficiales (Síragon, Samsung, Apple, Xiaomi)</span>
            </a>

            <a
              href="#ubicacion"
              onClick={onClose}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/40 text-slate-200 hover:text-[#00E5FF] transition-all font-bold"
            >
              <MapPin className="w-4 h-4 text-[#00E5FF]" />
              <span>Ubicación & Tienda Física</span>
            </a>

            <a
              href="https://wa.me/584120000000"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 transition-all font-bold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Asesoría Directa por WhatsApp</span>
            </a>
          </div>
        )}

        {/* Footer Callout Drawer */}
        <div className="p-4 border-t border-white/10 bg-black/60 shrink-0 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
            <span>Garantía Oficial M Store 1 Año</span>
          </div>
        </div>

      </div>
    </div>
  );
};
