import React, { useState } from 'react';
import { 
  X, ShoppingBag, ShieldCheck, Check, Minus, Plus, 
  ChevronRight, MessageCircle, Eye, Share2
} from 'lucide-react';
import { Logo } from './Logo';

export const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blanco Marfil');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [selectedRam, setSelectedRam] = useState('8GB');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);

  if (!product) return null;

  const rateVES = 60.5;

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

  const storageOptions = ['128GB', '256GB', '512GB'];
  const ramOptions = ['8GB', '12GB', '16GB'];

  const formatColorLabel = (col) => typeof col === 'object' ? col.name : col;

  const handleAdd = () => {
    onAddToCart({ ...product, selectedColor, selectedStorage, selectedRam, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = product.price * quantity;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
    message += `*Color:* ${formatColorLabel(selectedColor)}\n`;
    message += `*RAM:* ${selectedRam}\n`;
    message += `*Almacenamiento:* ${selectedStorage}\n`;
    message += `*Cantidad:* ${quantity}\n`;
    message += `*Precio Unitario:* $${product.price.toFixed(2)}\n`;
    message += `*TOTAL:* $${subtotal.toFixed(2)} USD (${(subtotal * rateVES).toLocaleString('es-VE')} Bs)\n\n`;
    message += `Hola, quiero comprar este producto inmediatamente. ¿Tienen disponibilidad?`;

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleShare = (platform) => {
    const currentUrl = window.location.href;
    const text = `¡Mira este producto en M Store! ${product.name}`;
    let shareUrl = '';

    if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} - ${currentUrl}`)}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    else if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    else if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;

    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const displayOldPrice = product.oldPrice ? product.oldPrice : (product.price * 1.25);

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

        {/* 2. CUERPO DEL MODAL - RESPONSIVO: desktop 2 columnas, móvil 1 columna scroll natural */}
        <div className="overflow-y-auto max-h-[80vh] md:max-h-none md:overflow-visible">
          <div className="p-0 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch">
              
              {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES CON SIDEBAR OSCURO PLANO SIN MARGENES EXTERNOS */}
              <div className="md:col-span-6 flex items-stretch p-0 m-0 bg-slate-50 border-r border-slate-200">
                
                {/* Tira de Miniaturas (Left Column) */}
                <div className="flex flex-col w-24 h-full m-0 p-0 bg-slate-900 rounded-none rounded-bl-xl overflow-y-auto scrollbar-hide">
                  {thumbnails.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveThumbIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden p-1.5 my-2 mx-auto transition-all bg-slate-800/80 flex items-center justify-center shrink-0 border-2 ${
                        activeThumbIdx === idx
                          ? 'border-white ring-2 ring-white/30 scale-105 shadow-md'
                          : 'border-slate-700 hover:border-slate-500 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                    </button>
                  ))}
                </div>

                {/* Cuadro Principal de Imagen */}
                <div className="relative flex-1 p-6 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
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

              {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
              <div className="md:col-span-6 p-5 sm:p-8 flex flex-col text-left space-y-4 bg-white">
                
                {/* TÍTULO DEL PRODUCTO */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  {product.name}
                </h2>

                {/* PRECIOS Y FINANCIAMIENTO CASHEA */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      ${product.price.toFixed(2)} USD
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
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs font-black text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">CASHEA</span>
                      <span>Inicial: ${(product.price * 0.4).toFixed(2)} USD</span>
                    </div>
                    <span className="text-[11px] text-amber-900 font-bold">+ 3 cuotas sin interés</span>
                  </div>
                </div>

                {/* SELECTOR DE MEMORIA RAM */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    Memoria RAM: <span className="text-slate-900 font-black">{selectedRam}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {ramOptions.map((ram) => (
                      <button
                        key={ram}
                        onClick={() => setSelectedRam(ram)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                          selectedRam === ram
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SELECTOR DE ALMACENAMIENTO */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    Almacenamiento: <span className="text-slate-900 font-black">{selectedStorage}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {storageOptions.map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStorage(st)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                          selectedStorage === st
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SELECTOR DE COLOR */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                    Color: <span className="text-slate-900 font-black">{formatColorLabel(selectedColor)}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {colorsList.map((col, idx) => {
                      const hex = typeof col === 'object' ? col.hex : (idx === 0 ? '#F5F5DC' : idx === 1 ? '#475569' : '#0F172A');
                      const name = formatColorLabel(col);
                      const isSel = formatColorLabel(selectedColor) === name;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(col)}
                          className={`w-7 h-7 rounded-full border-2 transition-all shadow-sm ${
                            isSel ? 'border-slate-900 scale-125 ring-2 ring-slate-900/20' : 'border-slate-300 hover:scale-110'
                          }`}
                          style={{ backgroundColor: hex }}
                          title={name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* SELECTOR DE CANTIDAD */}
                <div className="flex items-center gap-3 pt-1">
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

                {/* BOTONES PRINCIPALES DE ACCIÓN CON FONDO OSCURO PREMIUM (bg-slate-900) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAdd}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Añadir Al Carrito</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsAppCheckout}
                    className="py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white shadow-md transition-all active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Comprar por WhatsApp</span>
                  </button>
                </div>

                {/* BOTONES DE COMPARTIR */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-700">Compartir:</span>
                    <div className="flex items-center gap-1.5 ml-1">
                      <button onClick={() => handleShare('whatsapp')} className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:scale-110 transition-transform">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleShare('facebook')} className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:scale-110 transition-transform font-black">
                        f
                      </button>
                      <button onClick={() => handleShare('telegram')} className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:scale-110 transition-transform">
                        ✈
                      </button>
                      <button onClick={() => handleShare('twitter')} className="w-7 h-7 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center hover:scale-110 transition-transform font-black">
                        𝕏
                      </button>
                    </div>
                  </div>
                </div>

                {/* BANDEROLA DE PERSONAS VIENDO ESTE PRODUCTO EN VIVO */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center gap-2.5 text-xs text-slate-800 font-extrabold shadow-sm">
                  <Eye className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
                  <span>378 personas están viendo este producto en este momento</span>
                </div>

                {/* GARANTÍA M STORE */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-slate-800 shrink-0" />
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
