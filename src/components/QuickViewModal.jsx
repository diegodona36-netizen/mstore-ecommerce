import React, { useState } from 'react';
import { 
  X, Star, ShoppingBag, ShieldCheck, Check, Minus, Plus, 
  ChevronRight, MessageCircle, Eye, Share2, Cpu, HardDrive
} from 'lucide-react';
import { Logo } from './Logo';

// Dictionary of human-readable color names for e-commerce
const COLOR_NAME_MAP = {
  '#3A3B3C': 'Titanio Negro',
  '#E3E4E5': 'Titanio Blanco',
  '#2B3844': 'Titanio Azul',
  '#C5A059': 'Titanio Natural',
  '#1D1E22': 'Negro Medianoche',
  '#F1F0EA': 'Blanco Crema',
  '#4A5061': 'Gris Violeta',
  '#94806A': 'Amarillo Ámbar',
  '#0A0A0A': 'Negro Azabache',
  '#00E5FF': 'Cian Cyber',
  '#E5E5E5': 'Plata Estelar',
  '#121212': 'Negro Profundo',
  '#C0C0C0': 'Plata Titanio',
  '#F5F5DC': 'Blanco Marfil',
  '#475569': 'Gris Grafito',
  '#0F172A': 'Azabache Deep'
};

const formatColorLabel = (colVal) => {
  if (!colVal) return 'Titanio Negro';
  if (typeof colVal === 'object') {
    if (colVal.name && !colVal.name.startsWith('#')) return colVal.name;
    if (colVal.hex && COLOR_NAME_MAP[colVal.hex.toUpperCase()]) return COLOR_NAME_MAP[colVal.hex.toUpperCase()];
    return 'Negro Elegante';
  }
  if (typeof colVal === 'string') {
    const upper = colVal.toUpperCase();
    if (COLOR_NAME_MAP[upper]) return COLOR_NAME_MAP[upper];
    if (!colVal.startsWith('#')) return colVal;
  }
  return 'Titanio Negro';
};

export const QuickViewModal = ({ product, onClose, onAddToCart }) => {
<<<<<<< HEAD
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blanco Marfil');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
=======
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '#3A3B3C');
  const [selectedRam, setSelectedRam] = useState(product?.specs?.ram || '12GB');
  const [selectedStorage, setSelectedStorage] = useState(product?.specs?.storage || '256GB');
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
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
    '#3A3B3C',
    '#E3E4E5',
    '#2B3844',
    '#C5A059'
  ];

<<<<<<< HEAD
  const storageOptions = ['128GB', '256GB', '512GB'];

  const handleAdd = () => {
    onAddToCart({ ...product, selectedColor, selectedStorage, quantity });
=======
  const ramOptions = ['8GB', '12GB', '16GB'];
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  const handleAdd = () => {
    onAddToCart({ 
      ...product, 
      selectedColor: formatColorLabel(selectedColor), 
      selectedRam,
      selectedStorage,
      quantity 
    });
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = product.price * quantity;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
<<<<<<< HEAD
    message += `*Almacenamiento:* ${selectedStorage}\n`;
    message += `*Color:* ${typeof selectedColor === 'object' ? selectedColor.name : selectedColor}\n`;
=======
    message += `*Color:* ${formatColorLabel(selectedColor)}\n`;
    message += `*Memoria RAM:* ${selectedRam}\n`;
    message += `*Almacenamiento:* ${selectedStorage}\n`;
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

<<<<<<< HEAD
      {/* Contenedor Principal del Modal (2 Columnas en Escritorio, 1 Columna en Móvil sin scrollbars internas complejas) */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-8 my-auto text-slate-900 font-sans">
=======
      {/* Main Split-Background Product Detail Modal Container */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900">
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
        
        {/* 1. HEADER DEL MODAL (TOP BAR OSCURO PRINCIPAL bg-[#0A0908]) */}
        <div className="bg-[#0A0908] px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between relative z-20">
          
          {/* Logo y Migas de Pan (Breadcrumbs) con contraste blanco */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-slate-300 overflow-x-auto pr-4">
            <div className="shrink-0">
              <Logo size="small" />
            </div>

<<<<<<< HEAD
        {/* MIGAS DE PAN (BREADCRUMBS) */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 pb-4 pr-10 overflow-x-auto scrollbar-none">
          <Logo variant="light" size="small" />
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className="hover:text-slate-900 cursor-pointer">Inicio</span>
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className="hover:text-slate-900 cursor-pointer uppercase">{product.category || 'Telefonía'}</span>
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className="hover:text-slate-900 cursor-pointer">{product.brand || 'M Store'}</span>
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className="text-slate-800 font-extrabold truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 items-center sm:items-start w-full">
            
            {/* Tira de miniaturas (Sin scrollbar visible usando CSS e inline style) */}
            <div 
              className="flex sm:flex-col gap-2.5 shrink-0 overflow-x-auto sm:overflow-y-auto max-w-full pb-1 sm:pb-0 scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {thumbnails.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbIdx(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden p-1.5 border-2 transition-all bg-slate-50 flex items-center justify-center shrink-0 ${
                    activeThumbIdx === idx
                      ? 'border-slate-900 ring-2 ring-slate-900/20 scale-105 shadow-sm'
                      : 'border-slate-200 hover:border-slate-400 opacity-75 hover:opacity-100'
=======
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-[#00E5FF] cursor-pointer shrink-0">Inicio</span>
            
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-[#00E5FF] cursor-pointer uppercase shrink-0">{product.category || 'Telefonía'}</span>
            
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-[#00E5FF] cursor-pointer shrink-0">{product.brand || 'M Store'}</span>
            
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
        <div className="overflow-y-auto max-h-[75vh] md:max-h-none md:overflow-visible">
          <div className="p-5 sm:p-8 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              
              {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES */}
              <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
                
                {/* Tira de Miniaturas - scrollbar oculto, scroll táctil preservado */}
                <div
                  className="bg-[#0A0908] p-3 rounded-2xl flex sm:flex-col gap-2.5 shrink-0 overflow-x-auto sm:overflow-y-auto max-w-full sm:max-h-[340px] pb-1 sm:pb-0 shadow-inner no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                {thumbnails.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden p-1 border-2 transition-all bg-[#0D131F] flex items-center justify-center shrink-0 ${
                      activeThumbIdx === idx
                        ? 'border-[#00E5FF] opacity-100'
                        : 'border-white/10 hover:border-slate-500 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
                </div>

                {/* Cuadro Principal de Imagen (Fondo Claro bg-slate-50) */}
                <div className="relative flex-1 w-full h-72 sm:h-96 rounded-2xl bg-slate-50 p-6 flex items-center justify-center border border-slate-200 overflow-hidden shadow-inner">
                  
                  {/* ETIQUETA 'NUEVO' PÍLDORA FLOTANTE */}
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                    NUEVO
                  </span>

                  <img
                    src={thumbnails[activeThumbIdx]}
                    alt={product.name}
                    className="h-full max-h-[90%] object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

              </div>

              {/* COLUMNA DERECHA */}
              <div className="lg:col-span-6 flex flex-col text-left space-y-4">
              
              {/* TÍTULO DEL PRODUCTO */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                {product.name}
              </h2>

              {/* PRECIOS Y FINANCIAMIENTO CASHEA (PRECIO EN TEXT-SLATE-900 NEGRO GRANDE) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ${product.price.toFixed(2)}{' '}
                    <span className="text-base text-[#0066FF] font-extrabold">USD</span>
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

              {/* SELECTOR DE COLOR CON NOMBRES COMERCIALES LEGIBLES */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                  Color Seleccionado: <span className="text-[#0066FF] font-black">{formatColorLabel(selectedColor)}</span>
                </label>
                <div className="flex items-center gap-3">
                  {colorsList.map((col, idx) => {
                    const hex = typeof col === 'object' ? (col.hex || '#3A3B3C') : col;
                    const name = formatColorLabel(col);
                    const isSel = formatColorLabel(selectedColor) === name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(col)}
                        className={`w-7 h-7 rounded-full border-2 transition-all shadow-sm ${
                          isSel ? 'border-[#0066FF] scale-125 ring-2 ring-[#00E5FF]' : 'border-slate-300 hover:scale-110'
                        }`}
                        style={{ backgroundColor: hex }}
                        title={name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* SELECTOR DE MEMORIA RAM */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-slate-500" />
                  <span>Memoria RAM:</span>
                  <span className="text-slate-900 font-black">{selectedRam}</span>
                </label>
                <div className="flex items-center gap-2">
                  {ramOptions.map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        selectedRam === ram
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTOR DE ALMACENAMIENTO */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                  <span>Almacenamiento:</span>
                  <span className="text-slate-900 font-black">{selectedStorage}</span>
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {storageOptions.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedStorage(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        selectedStorage === size
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECTOR DE CANTIDAD */}
              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Cantidad:</span>
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

              {/* BOTONES PRINCIPALES DE ACCIÓN - colores premium oscuros */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <button
                  onClick={handleAdd}
                  className={`py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all duration-300 shadow-md active:scale-95 ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-700 text-white'
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-black" />
                      <span>Añadir Al Carrito</span>
                    </>
                  )}
                </button>

<<<<<<< HEAD
            {/* Cuadro Principal de Imagen */}
            <div className="relative flex-1 w-full h-72 sm:h-96 rounded-2xl bg-slate-50 p-6 flex items-center justify-center border border-slate-200 overflow-hidden shadow-inner">
              <span className="absolute top-3 right-3 bg-emerald-500 text-white font-black text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                NUEVO
              </span>
              <img
                src={thumbnails[activeThumbIdx]}
                alt={product.name}
                className="h-full max-h-[90%] object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>

          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
          <div className="flex flex-col text-left space-y-4">
            
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
=======
                <button
                  onClick={handleWhatsAppCheckout}
                  className="py-3.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Comprar Ahora</span>
                </button>
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
              </div>

              {/* BOTONES DE COMPARTIR */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
<<<<<<< HEAD
                  <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">CASHEA</span>
                  <span>Inicial: ${(product.price * 0.4).toFixed(2)} USD</span>
                </div>
                <span className="text-[11px] text-amber-900 font-bold">+ 3 cuotas sin interés</span>
              </div>
            </div>

            {/* SELECTOR DE ALMACENAMIENTO / RAM (FONDO OSCURO BG-SLATE-900 PARA EL SELECCIONADO) */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                Almacenamiento: <span className="text-slate-900 font-black">{selectedStorage}</span>
              </label>
              <div className="flex items-center gap-2">
                {storageOptions.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
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
            <div className="space-y-2 pt-1">
              <label className="text-xs font-extrabold text-slate-700 block uppercase tracking-wider">
                Color Seleccionado: <span className="text-slate-900 font-black">{typeof selectedColor === 'object' ? selectedColor.name : selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {colorsList.map((col, idx) => {
                  const hex = typeof col === 'object' ? col.hex : (idx === 0 ? '#F5F5DC' : idx === 1 ? '#475569' : '#0F172A');
                  const name = typeof col === 'object' ? col.name : col;
                  const isSel = (typeof selectedColor === 'object' ? selectedColor.name : selectedColor) === name;
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
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
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
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
=======
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
>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
                </div>
              </div>

<<<<<<< HEAD
            {/* BANDEROLA DE PERSONAS VIENDO ESTE PRODUCTO EN VIVO */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-800 font-extrabold shadow-sm">
              <Eye className="w-4 h-4 text-emerald-600 animate-pulse shrink-0" />
              <span>378 personas están viendo este producto en este momento</span>
            </div>

            {/* GARANTÍA M STORE */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-slate-800 shrink-0" />
              <span>Garantía Oficial M Store + Envío Exprés Asegurado a Nivel Nacional</span>
=======
              {/* BANDEROLA DE PERSONAS VIENDO ESTE PRODUCTO EN VIVO */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-2.5 text-xs text-blue-900 font-extrabold shadow-sm">
                <Eye className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />
                <span>378 personas están viendo este producto en este momento</span>
              </div>

              {/* GARANTÍA M STORE */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Garantía Oficial M Store + Envío Exprés Asegurado a Nivel Nacional</span>
              </div>

>>>>>>> 000d8a90b7359b0f56c6d85f2a3bc54c538f7b42
            </div>

          </div>
        </div>{/* end scroll wrapper */}

      </div>
    </div>
  );
};
