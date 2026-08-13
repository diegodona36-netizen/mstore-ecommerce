import React, { useState, useEffect } from 'react';
import { 
  X, Tv, Smartphone, Headphones, Zap, LayoutGrid,
  Wind, Refrigerator, WashingMachine, Laptop, UtensilsCrossed, Watch,
  ChevronRight, ChevronDown, Sparkles, Home, MapPin, MessageSquare, Gamepad2, Monitor, Printer, Tablet, Wifi, PhoneCall
} from 'lucide-react';

export const CategoryMegaMenu = ({ isOpen, onClose, onSelectCategory, customCategories = [] }) => {
  const [activeTab, setActiveTab] = useState('categorias'); // 'categorias' | 'menu'

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
      className="fixed inset-0 z-[60] flex font-sans"
    >
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Panel Lateral Desplazable Off-canvas Drawer */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden animate-slideInLeft border-r border-slate-200">
        
        {/* Header con botón cerrar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <LayoutGrid className="w-5 h-5 text-slate-700" />
            <span className="text-sm font-black uppercase tracking-wider text-slate-900">Menú M Store</span>
          </div>
          <button 
            onClick={onClose}
            aria-label="Cerrar Menú"
            className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sistema de Pestañas Superiores */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-white shrink-0">
          <button
            onClick={() => setActiveTab('categorias')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'categorias' 
                ? 'text-slate-900 bg-slate-50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Categorías</span>
            {activeTab === 'categorias' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`py-3.5 text-xs font-bold uppercase tracking-wider transition-all relative ${
              activeTab === 'menu' 
                ? 'text-slate-900 bg-slate-50' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Menú</span>
            {activeTab === 'menu' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        </div>

        {/* Body Contenido por Pestaña */}
        <div className="flex-1 overflow-y-auto bg-white">
          {activeTab === 'categorias' ? (
            /* Lista Clásica E-commerce */
            <div className="flex flex-col">
              {soyTechnoCategories.map((cat) => {
                const { Icon } = cat;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.filterId, cat.name)}
                    className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
                      <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {cat.name}
                      </span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                  </div>
                );
              })}
            </div>
          ) : (
            /* Pestaña Menú Principal */
            <div className="flex flex-col">
              {menuNavLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={onClose}
                  className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors group text-sm font-bold text-slate-700 hover:text-slate-900"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 text-center">
          <p className="text-xs text-slate-500 font-medium">Garantía Oficial M Store 1 Año | Atención VIP WhatsApp</p>
        </div>

      </div>
    </div>
  );
};
