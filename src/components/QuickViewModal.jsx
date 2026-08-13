import React, { useState } from 'react';
import { 
  X, ShoppingCart, ShieldCheck, Check, Minus, Plus, 
  ChevronRight, MessageCircle, Eye
} from 'lucide-react';
import { Logo } from './Logo';

export const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blanco Marfil');
  const [selectedRam, setSelectedRam] = useState(product?.ram || '8GB');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage || '256GB');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);

  if (!product) return null;

  const rateVES = 60.5;

  // Human-readable color map for HEX codes
  const colorNameMap = {
    '#000000': 'Negro Oscuro',
    '#0F172A': 'Negro Azabache',
    '#121212': 'Negro Mate',
    '#475569': 'Gris Grafito',
    '#F5F5DC': 'Blanco Marfil',
    '#FFFFFF': 'Blanco Puro',
    '#E2E8F0': 'Plata Titanio',
    '#2563EB': 'Azul Cobalto',
    '#DC2626': 'Rojo Carmesí',
    '#10B981': 'Verde Esmeralda',
    '#F59E0B': 'Oro Titanio'
  };

  const getColorDisplayName = (col) => {
    if (!col) return 'Negro Oscuro';
    if (typeof col === 'object') {
      if (col.name && !col.name.startsWith('#')) return col.name;
      if (col.hex && colorNameMap[col.hex.toUpperCase()]) return colorNameMap[col.hex.toUpperCase()];
      if (col.hex && colorNameMap[col.hex]) return colorNameMap[col.hex];
    }
    if (typeof col === 'string') {
      if (!col.startsWith('#')) return col;
      if (colorNameMap[col.toUpperCase()]) return colorNameMap[col.toUpperCase()];
      if (colorNameMap[col]) return colorNameMap[col];
      return 'Negro Oscuro';
    }
    return 'Negro Oscuro';
  };

  // Multi-angle product gallery
  const thumbnails = product.images && product.images.length > 0 ? product.images : [
    product.image,
    product.image,
    product.image
  ];

  const parseOptions = (val, fallback = []) => {
    if (Array.isArray(val) && val.length > 0) return val;
    if (typeof val === 'string' && val.trim()) return val.split(',').map(s => s.trim()).filter(Boolean);
    return fallback;
  };

  const colorsList = parseOptions(product.colors, [
    { name: 'Negro Titanio', hex: '#1E293B' },
    { name: 'Plata Natural', hex: '#E2E8F0' },
    { name: 'Oro Champán', hex: '#FDE68A' }
  ]);

  const defaultRamFallback = (product.category === 'smartphones' || product.category === 'computacion') ? ['8GB', '12GB', '16GB'] : [];
  const defaultStorageFallback = (product.category === 'smartphones' || product.category === 'computacion') ? ['128GB', '256GB', '512GB', '1TB'] : [];

  const ramOptions = parseOptions(product.ramOptions, defaultRamFallback);
  const storageOptions = parseOptions(product.storageOptions, defaultStorageFallback);

  const [selectedColor, setSelectedColor] = useState(colorsList[0] || 'Negro');
  const [selectedRam, setSelectedRam] = useState(ramOptions[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(storageOptions[1] || storageOptions[0] || '');

  const currentColorDisplayName = getColorDisplayName(selectedColor);

  const handleAdd = () => {
    onAddToCart({ ...product, selectedColor, selectedRam, selectedStorage, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = product.price * quantity;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
    message += `*Color:* ${currentColorDisplayName}\n`;
    message += `*RAM:* ${selectedRam}\n`;
    message += `*Almacenamiento:* ${selectedStorage}\n`;
    message += `*Cantidad:* ${quantity}\n`;
    message += `*Precio Unitario:* $${product.price.toFixed(2)}\n`;
    message += `*TOTAL:* $${subtotal.toFixed(2)} USD (${(subtotal * rateVES).toLocaleString('es-VE')} Bs)\n\n`;
    message += `Hola, quiero comprar este producto inmediatamente. ¿Tienen disponibilidad?`;

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const displayOldPrice = product.oldPrice ? product.oldPrice : (product.price * 1.25);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn font-sans">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modern E-Commerce Clean 2-Column Product Detail Modal */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900">
        
        {/* 1. HEADER DEL MODAL (TOP BAR OSCURO SLATE-950 HORIZONTAL DE LADO A LADO) */}
        <div className="bg-black px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between relative z-20 w-full shrink-0">
          
          {/* Logo y Migas de Pan (Breadcrumbs) */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-slate-300 overflow-x-auto pr-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="shrink-0">
              <Logo variant="dark" size="small" />
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-white cursor-pointer shrink-0">Inicio</span>
            
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-white cursor-pointer uppercase shrink-0">{product.category || 'Telefonía'}</span>
            
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-white cursor-pointer shrink-0">{product.brand || 'M Store'}</span>
            
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-white font-extrabold truncate max-w-[180px] sm:max-w-[280px]">{product.name}</span>
          </div>

          {/* Botón de Cerrar 'X' */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors border border-white/10 shrink-0 ml-2 shadow-sm"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. CUERPO DEL MODAL (GRID LIMPIO DE 2 COLUMNAS SIN PARCHES OSCUROS LATERALES) */}
        <div className="overflow-y-auto max-h-[80vh] md:max-h-none md:overflow-visible bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            
            {/* COLUMNA IZQUIERDA: GALERÍA DE PRODUCTO (IMAGEN PRINCIPAL Y MINIATURAS HORIZONTALES EN bg-slate-50) */}
            <div className="p-6 sm:p-8 bg-slate-50 border-r border-slate-200 flex flex-col justify-between items-center relative min-h-[360px] sm:min-h-[440px]">
              
              {/* Badge "NUEVO" Flotante */}
              <span className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[10px] font-extrabold bg-slate-900 text-white shadow-sm uppercase tracking-wider">
                NUEVO
              </span>

              {/* Imagen Principal del Producto (Centrada) */}
              <div className="flex-1 flex items-center justify-center w-full my-auto py-4">
                <img
                  src={thumbnails[activeThumbIdx]}
                  alt={product.name}
                  className="max-h-[280px] sm:max-h-[320px] w-auto object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Tira de Miniaturas Horizontal Limpia sobre Fondo Claro (Debajo de la foto) */}
              <div className="flex items-center justify-center gap-3 pt-4 w-full border-t border-slate-200/80">
                {thumbnails.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden p-1.5 transition-all flex items-center justify-center shrink-0 border-2 ${
                      activeThumbIdx === idx
                        ? 'border-slate-900 bg-white scale-105 shadow-md ring-2 ring-slate-900/10'
                        : 'border-slate-200 bg-white hover:border-slate-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>

            </div>

            {/* COLUMNA DERECHA: BUY BOX E INFORMACIÓN DE COMPRA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between text-left space-y-5 bg-white">
              
              <div className="space-y-4">
                {/* TÍTULO DEL PRODUCTO */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  {product.name}
                </h2>

                {/* PRECIOS Y FINANCIAMIENTO (PRECIO GRANDE EN TEXT-SLATE-900) */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      ${product.price.toFixed(2)}{' '}
                      <span className="text-sm font-extrabold text-slate-700">USD</span>
                    </span>
                    {displayOldPrice && (
                      <span className="text-sm font-bold text-red-500 line-through font-mono">
                        ${displayOldPrice.toFixed(2)} USD
                      </span>
                    )}
                    <span className="text-xs font-bold text-slate-500">
                      (~{(product.price * rateVES).toLocaleString('es-VE', { maximumFractionDigits: 0 })} Bs)
                    </span>
                  </div>

                  {/* Insignia Cashea Dinámica */}
                  {product.hasCashea !== false && product.price > 0 && (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">CASHEA</span>
                        <span>Inicial: ${((parseFloat(product.price) || 0) * ((product.casheaInitialPercent || 40) / 100)).toFixed(2)} USD</span>
                      </div>
                      <span className="text-[11px] text-amber-900 font-bold">
                        + {product.casheaInstallments || 3} cuotas de ${(((parseFloat(product.price) || 0) * (1 - (product.casheaInitialPercent || 40) / 100)) / (product.casheaInstallments || 3)).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* SELECTOR DE COLOR */}
                {colorsList.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      COLOR SELECCIONADO: <span className="text-slate-900 font-black">{currentColorDisplayName}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {colorsList.map((col, idx) => {
                        const hex = typeof col === 'object' ? col.hex : (idx === 0 ? '#1E293B' : idx === 1 ? '#475569' : '#0F172A');
                        const name = getColorDisplayName(col);
                        const isSel = currentColorDisplayName === name;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedColor(col)}
                            className={`w-7 h-7 rounded-full border-2 transition-all shadow-sm ${
                              isSel ? 'border-slate-900 scale-125 ring-2 ring-slate-900/30' : 'border-slate-300 hover:scale-110'
                            }`}
                            style={{ backgroundColor: hex || '#1E293B' }}
                            title={name}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SELECTOR DE MEMORIA RAM */}
                {ramOptions.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      Memoria RAM: <span className="text-slate-900 font-black">{selectedRam}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {ramOptions.map((ramOption) => {
                        const isSelected = selectedRam === ramOption;
                        return (
                          <button
                            key={ramOption}
                            onClick={() => setSelectedRam(ramOption)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                              isSelected
                                ? 'bg-black text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {ramOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SELECTOR DE ALMACENAMIENTO */}
                {storageOptions.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      Almacenamiento: <span className="text-slate-900 font-black">{selectedStorage}</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {storageOptions.map((storageOption) => {
                        const isSelected = selectedStorage === storageOption;
                        return (
                          <button
                            key={storageOption}
                            onClick={() => setSelectedStorage(storageOption)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                              isSelected
                                ? 'bg-black text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {storageOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* SELECTOR DE CANTIDAD */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cantidad:</span>
                  <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl px-2 py-1 font-extrabold text-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* BOTONES PRINCIPALES DE ACCIÓN (BG-SLATE-900 OSCURO) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 text-white ${
                      added
                        ? 'bg-neutral-900'
                        : 'bg-black hover:bg-neutral-900'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Añadir al Carrito</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50 shadow-sm transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-slate-900" />
                    <span>Compra Rápida</span>
                  </button>
                </div>
              </div>

              {/* FOOTER DEL MODAL */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                {/* BANDEROLA DE PERSONAS VIENDO ESTE PRODUCTO EN VIVO */}
                <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-800 font-extrabold shadow-sm">
                  <Eye className="w-4 h-4 text-slate-700 animate-pulse shrink-0" />
                  <span>378 personas están viendo este producto en este momento</span>
                </div>

                {/* GARANTÍA M STORE */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                  <span>Garantía Oficial M Store + Envío Exprés Asegurado a Nivel Nacional</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
