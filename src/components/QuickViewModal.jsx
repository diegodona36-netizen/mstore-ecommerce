import React, { useState } from 'react';
import { 
  X, ShoppingBag, ShieldCheck, Check, Minus, Plus, 
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

  // Mock multi-angle thumbnails
  const thumbnails = product.images && product.images.length > 0 ? product.images : [
    product.image,
    product.image,
    product.image
  ];

  const colorsList = product.colors || [
    { name: 'Blanco Marfil', hex: '#F5F5DC' },
    { name: 'Gris Grafito', hex: '#475569' },
    { name: 'Negro Azabache', hex: '#0F172A' }
  ];

  const ramOptions = ['8GB', '12GB', '16GB'];
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  const handleAdd = () => {
    onAddToCart({ ...product, selectedColor, selectedRam, selectedStorage, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = product.price * quantity;
    const colorName = typeof selectedColor === 'object' ? selectedColor.name : selectedColor;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
    message += `*Color:* ${colorName}\n`;
    message += `*RAM:* ${selectedRam}\n`;
    message += `*Almacenamiento:* ${selectedStorage}\n`;
    message += `*Cantidad:* ${quantity}\n`;
    message += `*Precio Unitario:* $${product.price.toFixed(2)}\n`;
    message += `*TOTAL:* $${subtotal.toFixed(2)} USD (${(subtotal * rateVES).toLocaleString('es-VE')} Bs)\n\n`;
    message += `Hola, quiero comprar este producto inmediatamente. ¿Tienen disponibilidad?`;

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const displayOldPrice = product.oldPrice ? product.oldPrice : (product.price * 1.25);
  const currentColorName = typeof selectedColor === 'object' ? selectedColor.name : selectedColor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Split-Background Product Detail Modal Container */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900">
        
        {/* 1. HEADER DEL MODAL (TOP BAR OSCURO PRINCIPAL bg-[#0A0908]) */}
        <div className="bg-[#0A0908] px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between relative z-20">
          
          {/* Logo y Migas de Pan (Breadcrumbs) con contraste blanco */}
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

        {/* 2. CUERPO DEL MODAL - RESPONSIVO: desktop 2 columnas */}
        <div className="overflow-y-auto max-h-[80vh] md:max-h-none md:overflow-visible">
          <div className="p-0 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
              
              {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES CON SIDEBAR OSCURO PLANO SIN MARGENES EXTERNOS */}
              <div className="md:col-span-6 flex items-stretch p-0 m-0 bg-slate-50 border-r border-slate-200">
                
                {/* Tira de Miniaturas (Left Column):
                    - Cero márgenes externos (m-0)
                    - Ocupa alto completo (h-full)
                    - Conecta plano con el header arriba (rounded-none rounded-bl-xl)
                    - Sin barra de scroll visible (overflow-y-auto scrollbar-hide)
                    - Borde sutil y limpio (border-2 border-slate-400) en miniatura activa sin tapar foto
                */}
                <div 
                  className="flex flex-col w-24 h-full m-0 p-0 bg-slate-900 rounded-none rounded-bl-xl overflow-y-auto scrollbar-hide shrink-0"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {thumbnails.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumbIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden p-1.5 my-2.5 mx-auto transition-all flex items-center justify-center shrink-0 border-2 ${
                        activeThumbIdx === idx
                          ? 'border-slate-400 bg-slate-800 scale-105 shadow-md'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-600 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>

                {/* Cuadro Principal de Imagen */}
                <div className="relative flex-1 p-6 sm:p-8 flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                    NUEVO
                  </span>
                  <img
                    src={thumbnails[activeThumbIdx]}
                    alt={product.name}
                    className="max-h-[320px] w-auto object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

              </div>

              {/* COLUMNA DERECHA: INFORMACIÓN Y OPCIONES DE COMPRA */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left space-y-5 bg-white">
                
                <div className="space-y-4">
                  {/* TÍTULO DEL PRODUCTO */}
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                    {product.name}
                  </h2>

                  {/* PRECIOS Y FINANCIAMIENTO (PRECIO GRANDE EN TEXT-SLATE-900 NEGRO GRIS OSCURO) */}
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

                    {/* Insignia Cashea */}
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">CASHEA</span>
                        <span>Inicial: ${(product.price * 0.4).toFixed(2)} USD</span>
                      </div>
                      <span className="text-[11px] text-amber-900 font-bold">+ 3 cuotas sin interés</span>
                    </div>
                  </div>

                  {/* SELECTOR DE COLOR (TEXTO DINÁMICO EN TEXT-SLATE-900) */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                      Color Seleccionado: <span className="text-slate-900 font-black">{currentColorName}</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {colorsList.map((col, idx) => {
                        const hex = typeof col === 'object' ? col.hex : (idx === 0 ? '#F5F5DC' : idx === 1 ? '#475569' : '#0F172A');
                        const name = typeof col === 'object' ? col.name : col;
                        const isSel = currentColorName === name;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedColor(col)}
                            className={`w-7 h-7 rounded-full border-2 transition-all shadow-sm ${
                              isSel ? 'border-slate-900 scale-125 ring-2 ring-slate-900/30' : 'border-slate-300 hover:scale-110'
                            }`}
                            style={{ backgroundColor: hex }}
                            title={name}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* SELECTOR DE MEMORIA RAM (PÍLDORAS CON ACTIVO EN BG-SLATE-900) */}
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
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {ramOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* SELECTOR DE ALMACENAMIENTO (PÍLDORAS CON ACTIVO EN BG-SLATE-900) */}
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
                                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                            }`}
                          >
                            {storageOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

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
                          ? 'bg-slate-800'
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>¡Agregado al Carrito!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Añadir al Carrito</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleWhatsAppCheckout}
                      className="py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white shadow-md transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Comprar Ahora</span>
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
    </div>
  );
};
