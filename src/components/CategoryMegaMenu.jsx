import React, { useState, useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, LayoutGrid,
  Wind, Refrigerator, WashingMachine, Laptop, UtensilsCrossed, Watch,
  ChevronRight, ChevronDown, Sparkles, Home, MapPin, MessageSquare, Gamepad2, Monitor, Printer, Tablet, Wifi, PhoneCall
} from 'lucide-react';

export const CategoryMegaMenu = ({ isOpen, onClose, onSelectCategory, customCategories = [] }) => {
  const [activeTab, setActiveTab] = useState('categorias'); // 'categorias' | 'menu'
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

  // Exact SoyTechno Clean Categories Taxonomy (Icon Left, Text Center, Chevron Right)
  const soyTechnoCategories = [
    { id: 'smartphones', name: 'Teléfonos Celulares', Icon: Smartphone, filterId: 'smartphones' },
    { id: 'linea-blanca', name: 'Televisores', Icon: Tv, filterId: 'linea-blanca' },
    { id: 'laptops', name: 'Laptops', Icon: Laptop, filterId: 'accesorios' },
    { id: 'gamer', name: 'Zona Gamer', Icon: Gamepad2, filterId: 'accesorios' },
    { id: 'computacion', name: 'Equipos de Computación', Icon: Monitor, filterId: 'accesorios' },
    { id: 'accesorios-pc', name: 'Accesorios de Computación', Icon: Zap, filterId: 'accesorios' },
    { id: 'impresoras', name: 'Impresoras', Icon: Printer, filterId: 'accesorios' },
    { id: 'tablets', name: 'Tablets', Icon: Tablet, filterId: 'smartphones' },
    { id: 'wearables', name: 'Relojes Inteligentes', Icon: Watch, filterId: 'wearables' },
    { id: 'audio', name: 'Audífonos y Sonido', Icon: Headphones, filterId: 'audio' },
    { id: 'streaming', name: 'Dispositivos Streaming', Icon: Tv, filterId: 'linea-blanca' },
    { id: 'redes', name: 'Redes y Conectividad', Icon: Wifi, filterId: 'accesorios' }
  ];

  const menuNavLinks = [
    { name: 'Tienda Electrónica', href: '#catalogo' },
    { name: 'Ofertas Cyber', href: '#catalogo' },
    { name: 'Ubicaciones & Tienda Física', href: '#ubicacion' },
    { name: 'Métodos de Pago & Cuotas', href: '#beneficios' },
    { name: 'Atención VIP por WhatsApp', href: 'https://wa.me/584120000000' }
  ];

  const handleCategoryClick = (filterId, catName) => {
    onSelectCategory(filterId, catName);
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Menú Móvil Off-canvas Drawer M Store"
      className="fixed inset-0 z-[60] flex"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Panel Lateral Desplazable Off-canvas Drawer */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#0A0908] border-r border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.3)] flex flex-col h-full overflow-hidden animate-slideInLeft font-space">
        
        {/* Header con botón cerrar */}
        <div className="p-4 bg-black/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-white">M Store Navegación</span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar Menú"
            className="p-2 rounded-full bg-white/10 hover:bg-[#00E5FF] text-slate-300 hover:text-black transition-all min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sistema de Pestañas Superiores ('Categorías' y 'Menú') con subrayado azul indicador */}
        <div className="grid grid-cols-2 border-b border-white/10 bg-black/40 shrink-0">
          <button
            onClick={() => setActiveTab('categorias')}
            className={`py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all relative ${
              activeTab === 'categorias' 
                ? 'text-[#00E5FF] bg-[#00E5FF]/10 font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Categorías</span>
            {activeTab === 'categorias' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 text-xs font-extrabold uppercase tracking-wider transition-all relative ${
              activeTab === 'menu' 
                ? 'text-[#00E5FF] bg-[#00E5FF]/10 font-black' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Menú</span>
            {activeTab === 'menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]" />
            )}
          </button>
        </div>

        {/* Body Contenido por Pestaña */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {activeTab === 'categorias' ? (
            /* Lista de filas limpias: Ícono minimalista izquierda, texto centro, chevron (>) derecha */
            soyTechnoCategories.map((cat) => {
              const { Icon } = cat;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.filterId, cat.name)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-white/5 hover:border-[#00E5FF]/50 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-[#00E5FF]/20 group-hover:text-[#00E5FF] text-slate-300 flex items-center justify-center transition-all shrink-0 border border-white/10">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-extrabold text-white group-hover:text-[#00E5FF] transition-colors">
                      {cat.name}
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          ) : (
            /* Pestaña Menú Principal */
            <div className="space-y-2 pt-2">
              {menuNavLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={onClose}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-white/5 hover:border-[#00E5FF]/40 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-extrabold text-slate-200 hover:text-[#00E5FF] transition-all"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-white/10 bg-black/80 shrink-0 text-center">
          <p className="text-[10px] text-slate-400 font-inter">Garantía Oficial M Store 1 Año | Atención VIP WhatsApp</p>
        </div>

      </div>
    </div>
  );
};
