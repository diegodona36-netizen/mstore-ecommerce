import React, { useState, useEffect } from 'react';
import { 
  X, ShoppingCart, ShieldCheck, Check, Minus, Plus, 
  ChevronRight, ChevronDown, MessageCircle, AlertCircle
} from 'lucide-react';
import { Logo } from './Logo';

export const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

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
    if (!col) return 'Negro';
    if (typeof col === 'object') {
      if (col.name && !col.name.startsWith('#')) return col.name;
      if (col.hex && colorNameMap[col.hex.toUpperCase()]) return colorNameMap[col.hex.toUpperCase()];
      if (col.hex && colorNameMap[col.hex]) return colorNameMap[col.hex];
    }
    if (typeof col === 'string') {
      if (!col.startsWith('#')) return col;
      if (colorNameMap[col.toUpperCase()]) return colorNameMap[col.toUpperCase()];
      if (colorNameMap[col]) return colorNameMap[col];
      return col;
    }
    return 'Negro';
  };

  const getColorHexFromName = (color) => {
    if (typeof color === 'object' && color.hex) return color.hex;
    const name = String(typeof color === 'object' ? color.name : color).toLowerCase();
    if (name.includes('desierto') || name.includes('desert') || name.includes('arena')) return '#C2B280';
    if (name.includes('negro') || name.includes('black') || name.includes('oscuro')) return '#121212';
    if (name.includes('blanco') || name.includes('white') || name.includes('estrella') || name.includes('puro')) return '#FFFFFF';
    if (name.includes('medianoche') || name.includes('midnight')) return '#1E293B';
    if (name.includes('titanio') || name.includes('natural')) return '#948B7D';
    if (name.includes('grafito') || name.includes('gris') || name.includes('espacial')) return '#475569';
    if (name.includes('plata') || name.includes('silver')) return '#E2E8F0';
    if (name.includes('morado') || name.includes('purple') || name.includes('lila') || name.includes('lavanda')) return '#D8B4FE';
    if (name.includes('azul') || name.includes('blue') || name.includes('celeste') || name.includes('cielo')) return '#93C5FD';
    if (name.includes('oro') || name.includes('gold') || name.includes('champan') || name.includes('champán')) return '#D97706';
    if (name.includes('oliva') || name.includes('verde') || name.includes('green') || name.includes('esmeralda')) return '#059669';
    if (name.includes('rojo') || name.includes('red') || name.includes('rubi')) return '#DC2626';
    if (name.includes('rosa') || name.includes('pink') || name.includes('rose')) return '#F472B6';
    if (name.includes('naranja') || name.includes('orange')) return '#F97316';
    if (name.includes('amarillo') || name.includes('yellow')) return '#EAB308';
    return '#334155';
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

  const hasExplicitVariants = Array.isArray(product.variants) && product.variants.length > 0;

  // 1. ALL AVAILABLE COLORS
  const colorsList = hasExplicitVariants
    ? Array.from(new Set(product.variants.map(v => v.color).filter(Boolean)))
    : parseOptions(product.colors, [
        { name: 'Negro Titanio', hex: '#1E293B' },
        { name: 'Plata Natural', hex: '#E2E8F0' },
        { name: 'Oro Champán', hex: '#FDE68A' }
      ]);

  const [selectedColor, setSelectedColor] = useState(colorsList[0] || 'Negro');
  const currentColorDisplayName = getColorDisplayName(selectedColor);

  // 2. DEPENDENT AVAILABLE RAMS (Filtered strictly by selected color)
  const variantsForColor = hasExplicitVariants
    ? product.variants.filter(v => v.color === currentColorDisplayName || v.color === selectedColor)
    : [];

  const defaultRamFallback = (product.category === 'smartphones' || product.category === 'computacion') ? ['8GB', '12GB', '16GB'] : [];
  const ramOptions = hasExplicitVariants
    ? Array.from(new Set(variantsForColor.map(v => v.ram).filter(Boolean)))
    : parseOptions(product.ramOptions, defaultRamFallback);

  const [selectedRam, setSelectedRam] = useState(ramOptions[0] || '');

  // Keep selectedRam synchronized if color changes and RAM doesn't exist
  useEffect(() => {
    if (ramOptions.length > 0 && !ramOptions.includes(selectedRam)) {
      setSelectedRam(ramOptions[0]);
    }
  }, [selectedColor, ramOptions]);

  // 3. DEPENDENT AVAILABLE STORAGES (Filtered strictly by selected color AND selected RAM)
  const variantsForColorAndRam = hasExplicitVariants
    ? variantsForColor.filter(v => !v.ram || v.ram === selectedRam)
    : [];

  const defaultStorageFallback = (product.category === 'smartphones' || product.category === 'computacion') ? ['128GB', '256GB', '512GB', '1TB'] : [];
  const rawStorageOptions = hasExplicitVariants
    ? Array.from(new Set(variantsForColorAndRam.map(v => v.storage).filter(Boolean)))
    : parseOptions(product.storageOptions, defaultStorageFallback);

  const [selectedStorage, setSelectedStorage] = useState(rawStorageOptions[0] || '');

  // Keep selectedStorage synchronized if RAM changes and storage doesn't exist
  useEffect(() => {
    if (rawStorageOptions.length > 0 && !rawStorageOptions.includes(selectedStorage)) {
      setSelectedStorage(rawStorageOptions[0]);
    }
  }, [selectedRam, selectedColor, rawStorageOptions]);

  // 4. FIND EXACT MATCHED VARIANT
  const matchedVariant = hasExplicitVariants
    ? (variantsForColorAndRam.find(v => v.storage === selectedStorage) ||
       variantsForColor.find(v => v.storage === selectedStorage) ||
       product.variants.find(v => (v.color === currentColorDisplayName || v.color === selectedColor)) ||
       product.variants[0])
    : null;

  // 5. PRICE RANGE VS SINGLE PRICE CALCULATION
  const variantPrices = hasExplicitVariants 
    ? product.variants.map(v => parseFloat(v.price) || 0).filter(p => p > 0) 
    : [];
  const minVariantPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(product.price) || 0);
  const maxVariantPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(product.price) || 0);
  const hasPriceRange = minVariantPrice !== maxVariantPrice;

  const currentPrice = matchedVariant 
    ? (parseFloat(matchedVariant.price) || parseFloat(product.price) || 0)
    : (parseFloat(product.price) || 0);

  const isVariantCasheaActive = matchedVariant 
    ? (matchedVariant.hasCashea !== false && product.hasCashea !== false)
    : (product.hasCashea !== false);

  // 6. STOCK STATUS
  const isOutOfStock = matchedVariant 
    ? (matchedVariant.stock !== undefined && parseInt(matchedVariant.stock) <= 0)
    : (product.inStock === false);

  const availableStockUnits = matchedVariant?.stock !== undefined ? parseInt(matchedVariant.stock) : null;

  // Handlers with user interaction flag
  const handleColorSelect = (col) => {
    setSelectedColor(col);
    setHasUserInteracted(true);
  };

  const handleRamChange = (e) => {
    setSelectedRam(e.target.value);
    setHasUserInteracted(true);
  };

  const handleStorageChange = (e) => {
    setSelectedStorage(e.target.value);
    setHasUserInteracted(true);
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart({ 
      ...product, 
      price: currentPrice, 
      selectedColor: currentColorDisplayName, 
      selectedRam, 
      selectedStorage, 
      quantity 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppCheckout = () => {
    const subtotal = currentPrice * quantity;
    let message = `*PEDIDO DIRECTO M STORE*\n\n`;
    message += `*Producto:* ${product.name}\n`;
    message += `*Color:* ${currentColorDisplayName}\n`;
    if (selectedRam) message += `*RAM:* ${selectedRam}\n`;
    if (selectedStorage) message += `*Almacenamiento:* ${selectedStorage}\n`;
    message += `*Cantidad:* ${quantity}\n`;
    message += `*Precio Unitario:* $${currentPrice.toFixed(2)}\n`;
    message += `*TOTAL:* $${subtotal.toFixed(2)} USD (${(subtotal * rateVES).toLocaleString('es-VE')} Bs)\n\n`;
    if (isVariantCasheaActive) {
      const initPct = product.casheaInitialPercent || 40;
      const installments = product.casheaInstallments || 3;
      const initPay = subtotal * (initPct / 100);
      const installmentPay = (subtotal * (1 - initPct / 100)) / installments;
      message += `*Plan Cashea:* Inicial $${initPay.toFixed(2)} + ${installments} cuotas de $${installmentPay.toFixed(2)}\n\n`;
    }
    if (isOutOfStock) {
      message += `Hola, veo que esta combinación figura como agotada en la web. ¿Cuándo les llega nuevo inventario?`;
    } else {
      message += `Hola, quiero comprar este producto inmediatamente. ¿Tienen disponibilidad?`;
    }

    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn font-sans">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modern E-Commerce Clean 2-Column Product Detail Modal (SoyTecno Architecture) */}
      <div className="relative z-10 bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto text-slate-900">
        
        {/* 1. HEADER DEL MODAL (TOP BAR OSCURO SLATE-950) */}
        <div className="bg-black px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between relative z-20 w-full shrink-0">
          
          {/* Logo y Migas de Pan */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold text-slate-300 overflow-x-auto pr-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="shrink-0">
              <Logo variant="dark" size="small" />
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-white cursor-pointer shrink-0">Inicio</span>

            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="hover:text-white cursor-pointer capitalize shrink-0">{product.category}</span>

            <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="text-white font-extrabold truncate max-w-[120px] sm:max-w-[200px]">{product.name}</span>
          </div>

          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-200 shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. CUERPO DEL MODAL (GRID LIMPIO DE 2 COLUMNAS) */}
        <div className="overflow-y-auto max-h-[82vh] md:max-h-none md:overflow-visible bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            
            {/* COLUMNA IZQUIERDA: GALERÍA DE PRODUCTO */}
            <div className="p-6 sm:p-8 bg-slate-50 border-r border-slate-200 flex flex-col justify-between items-center relative min-h-[360px] sm:min-h-[440px]">
              
              {/* Badge "NUEVO" Flotante */}
              <span className="absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[10px] font-extrabold bg-slate-900 text-white shadow-sm uppercase tracking-wider">
                {product.tag || 'NUEVO'}
              </span>

              {/* Imagen Principal del Producto */}
              <div className="flex-1 flex items-center justify-center w-full my-auto py-4">
                <img
                  src={thumbnails[activeThumbIdx]}
                  alt={product.name}
                  className="max-h-[280px] sm:max-h-[320px] w-auto object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Tira de Miniaturas Horizontal */}
              <div className="flex items-center justify-center gap-3 pt-4 w-full border-t border-slate-200/80">
                {thumbnails.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden p-1.5 transition-all flex items-center justify-center shrink-0 border-2 ${
                      activeThumbIdx === idx
                        ? 'border-blue-600 bg-white scale-105 shadow-md ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-white hover:border-slate-400 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>

            </div>

            {/* COLUMNA DERECHA: BUY BOX ESTILO SOYTECNO */}
            <div className="p-6 sm:p-8 flex flex-col justify-between text-left space-y-5 bg-white">
              
              <div className="space-y-4">
                {/* TÍTULO DEL PRODUCTO */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  {product.name}
                </h2>

                {/* Currency Badge estilo SoyTecno */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <span>USD Dólares</span>
                  <span className="text-sm">🇺🇸</span>
                </div>

                {/* 1. RANGO DE PRECIO DINÁMICO EN AZUL ELÉCTRICO */}
                <div className="space-y-1 pt-1">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight font-sans">
                    {!hasUserInteracted && hasPriceRange ? (
                      <span>${minVariantPrice.toFixed(2)} - ${maxVariantPrice.toFixed(2)} USD</span>
                    ) : (
                      <span>${currentPrice.toFixed(2)} USD</span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-500">
                    (~{(currentPrice * rateVES).toLocaleString('es-VE', { maximumFractionDigits: 0 })} Bs)
                  </div>

                  {/* Stock Status Badge */}
                  <div className="pt-1">
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-extrabold text-xs border border-red-200">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Agotado en esta combinación</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>En Stock {availableStockUnits !== null && `(${availableStockUnits} disponibles)`}</span>
                      </span>
                    )}
                  </div>

                  {/* Insignia Cashea Dinámica */}
                  {isVariantCasheaActive && currentPrice > 0 && (
                    <div className="mt-2 bg-amber-50 border border-amber-300 rounded-xl p-2.5 flex items-center justify-between text-xs font-black text-slate-900 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">CASHEA</span>
                        <span>Inicial: ${(currentPrice * ((product.casheaInitialPercent || 40) / 100)).toFixed(2)} USD</span>
                      </div>
                      <span className="text-[11px] text-amber-900 font-bold">
                        + {product.casheaInstallments || 3} cuotas de ${((currentPrice * (1 - (product.casheaInitialPercent || 40) / 100)) / (product.casheaInstallments || 3)).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. SELECTOR DE COLOR (CÍRCULOS VISUALES SWATCHES) */}
                {colorsList.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800">Color:</span>
                      <span className="text-xs font-bold text-slate-500">{currentColorDisplayName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {colorsList.map((col, idx) => {
                        const hex = getColorHexFromName(col);
                        const name = getColorDisplayName(col);
                        const isSel = currentColorDisplayName === name;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleColorSelect(col)}
                            className={`w-7 h-7 rounded-full border-2 transition-all shadow-sm relative ${
                              isSel 
                                ? 'border-blue-600 scale-125 ring-2 ring-blue-600/30' 
                                : 'border-slate-300 hover:scale-110 hover:border-slate-400'
                            }`}
                            style={{ backgroundColor: hex }}
                            title={name}
                          >
                            {hex === '#FFFFFF' && (
                              <span className="absolute inset-0 rounded-full border border-slate-200" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. SELECTOR DE MEMORIA RAM (DROPDOWN CONDICIONAL) */}
                {ramOptions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-black text-slate-800 block">
                      Memoria RAM:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedRam}
                        onChange={handleRamChange}
                        className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer shadow-xs pr-10"
                      >
                        {ramOptions.map((ram) => (
                          <option key={ram} value={ram}>
                            {ram}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* 4. SELECTOR DE ALMACENAMIENTO (DROPDOWN CONDICIONAL) */}
                {rawStorageOptions.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-black text-slate-800 block">
                      Capacidad de almacenamiento:
                    </label>
                    <div className="relative">
                      <select
                        value={selectedStorage}
                        onChange={handleStorageChange}
                        className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer shadow-xs pr-10"
                      >
                        {rawStorageOptions.map((st) => {
                          const varForStorage = hasExplicitVariants 
                            ? product.variants.find(v => 
                                v.storage === st && 
                                (v.color === currentColorDisplayName || v.color === selectedColor) &&
                                (!v.ram || v.ram === selectedRam)
                              )
                            : null;
                          const vPrice = varForStorage ? varForStorage.price : null;
                          const isOptOutOfStock = varForStorage && varForStorage.stock !== undefined && parseInt(varForStorage.stock) <= 0;

                          return (
                            <option key={st} value={st}>
                              {st} {vPrice && vPrice !== product.price ? `— ($${parseFloat(vPrice).toFixed(2)} USD)` : ''} {isOptOutOfStock ? '(Agotado)' : ''}
                            </option>
                          );
                        })}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* BARRA DE ACCIÓN: CANTIDAD + AÑADIR AL CARRITO + COMPRAR AHORA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden font-extrabold text-sm h-11 self-center sm:self-auto shrink-0">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={isOutOfStock}
                      className="px-3.5 h-full hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40"
                      title="Disminuir"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-slate-900 font-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={isOutOfStock}
                      className="px-3.5 h-full hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-40"
                      title="Aumentar"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón 1: Añadir Al Carrito */}
                  <button
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className={`flex-1 h-11 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-white shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isOutOfStock 
                        ? 'bg-slate-400' 
                        : added 
                          ? 'bg-emerald-600' 
                          : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isOutOfStock ? (
                      <span>Agotado</span>
                    ) : added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Añadir Al Carrito</span>
                      </>
                    )}
                  </button>

                  {/* Botón 2: Comprar Ahora (WhatsApp) */}
                  <button
                    onClick={handleWhatsAppCheckout}
                    className={`flex-1 h-11 px-4 rounded-xl font-black text-xs sm:text-sm text-white transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                      isOutOfStock 
                        ? 'bg-slate-800 hover:bg-slate-900' 
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isOutOfStock ? 'Consultar Stock' : 'Comprar Ahora'}</span>
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Garantía Oficial M Store • Envío Asegurado a Nivel Nacional</span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
