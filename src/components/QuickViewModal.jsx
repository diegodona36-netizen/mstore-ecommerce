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

  const thumbnails = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const hasExplicitVariants = Array.isArray(product.variants) && product.variants.length > 0;

  // -------------------------------------------------------------
  // DYNAMIC SHOPIFY-STYLE OPTION EXTRACTION
  // -------------------------------------------------------------
  const dynamicOptions = Array.isArray(product.options) && product.options.length > 0
    ? product.options
    : (hasExplicitVariants && product.variants[0].options
        ? Object.keys(product.variants[0].options).map(optName => ({
            name: optName,
            values: Array.from(new Set(product.variants.map(v => v.options?.[optName]).filter(Boolean)))
          }))
        : null);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (dynamicOptions && dynamicOptions.length > 0) {
      const initial = {};
      dynamicOptions.forEach(opt => {
        if (opt.values && opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      });
      return initial;
    }
    return {};
  });

  useEffect(() => {
    if (dynamicOptions && dynamicOptions.length > 0) {
      const initial = {};
      dynamicOptions.forEach(opt => {
        if (opt.values && opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      });
      setSelectedOptions(initial);
      setHasUserInteracted(false);
    }
  }, [product]);

  // Legacy fallback options (if not using dynamic schema)
  const parseOptions = (val, fallback = []) => {
    if (Array.isArray(val) && val.length > 0) return val;
    if (typeof val === 'string' && val.trim()) return val.split(',').map(s => s.trim()).filter(Boolean);
    return fallback;
  };

  // Parse visual colors list (independent of price)
  const colorsList = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors.map(c => typeof c === 'object' && c.name ? c : { name: String(c), hex: getColorHexFromName(String(c)) })
    : (hasExplicitVariants && product.variants.some(v => v.color)
        ? Array.from(
            new Map(
              product.variants
                .filter(v => v.color)
                .map(v => [v.color, { name: v.color, hex: v.colorHex || getColorHexFromName(v.color) }])
            ).values()
          )
        : (product.colors ? parseOptions(product.colors, []) : []));

  const [selectedColor, setSelectedColor] = useState(colorsList[0] || 'Negro');
  const [legacyRam, setLegacyRam] = useState('');
  const [legacyStorage, setLegacyStorage] = useState('');

  // Find active matched variant
  const matchedVariant = hasExplicitVariants
    ? (dynamicOptions && dynamicOptions.length > 0
        ? (product.variants.find(v => {
            if (v.title && selectedOptions['Versión'] === v.title) return true;
            if (v.options && Object.keys(selectedOptions).every(k => v.options[k] === selectedOptions[k])) return true;
            return false;
          }) || product.variants[0])
        : (product.variants.find(v => v.color === getColorDisplayName(selectedColor)) || product.variants[0]))
    : null;

  // Price calculations
  const variantPrices = hasExplicitVariants 
    ? product.variants.map(v => parseFloat(v.price) || 0).filter(p => p > 0) 
    : [];
  const minVariantPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(product.price) || 0);
  const maxVariantPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(product.price) || 0);
  const hasPriceRange = minVariantPrice !== maxVariantPrice && minVariantPrice > 0;

  const currentPrice = matchedVariant 
    ? (parseFloat(matchedVariant.price) || parseFloat(product.price) || 0)
    : (parseFloat(product.price) || 0);

  const isVariantCasheaActive = matchedVariant 
    ? (matchedVariant.hasCashea !== false && product.hasCashea !== false)
    : (product.hasCashea !== false);

  const isOutOfStock = matchedVariant 
    ? (matchedVariant.stock !== undefined && matchedVariant.stock !== null && parseInt(matchedVariant.stock) <= 0)
    : (product.inStock === false);

  const availableStockUnits = matchedVariant?.stock !== undefined && matchedVariant?.stock !== null && matchedVariant?.stock !== ''
    ? parseInt(matchedVariant.stock) 
    : null;

  const handleDynamicOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
    setHasUserInteracted(true);
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart({ 
      ...product, 
      price: currentPrice, 
      selectedOptions,
      selectedVariant: matchedVariant,
      quantity 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-fadeIn select-none font-sans">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 backdrop-blur-md transition-all shadow-sm active:scale-95"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES */}
            <div className="p-6 sm:p-8 bg-[#F8FAFC] border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between items-center">
              
              {/* Imagen Principal */}
              <div className="w-full h-64 sm:h-80 flex items-center justify-center relative p-4">
                <img
                  src={thumbnails[activeThumbIdx] || product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all duration-300"
                />
              </div>

              {/* Thumbnails ONLY if there are 2 or more images */}
              {thumbnails.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {thumbnails.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveThumbIdx(idx)}
                      className={`w-14 h-14 rounded-2xl bg-white border-2 p-1.5 transition-all overflow-hidden flex items-center justify-center ${
                        activeThumbIdx === idx
                          ? 'border-blue-600 shadow-md scale-105'
                          : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Miniatura" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Garantía y Seguridad */}
              <div className="w-full mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>1 Año de Garantía Oficial</span>
                </span>
                <span>Caja Sellada Original</span>
              </div>

            </div>

            {/* COLUMNA DERECHA: BUY BOX */}
            <div className="p-6 sm:p-8 flex flex-col justify-between text-left space-y-5 bg-white">
              
              <div className="space-y-4">
                {/* TÍTULO DEL PRODUCTO */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                  {product.name}
                </h2>

                {/* Clean USD Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[11px] font-extrabold text-slate-700 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Dólares ($ USD)</span>
                </div>

                {/* 1. RANGO DE PRECIO DINÁMICO */}
                <div className="space-y-1 pt-1">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 tracking-tight font-sans flex items-baseline gap-1.5">
                    {!hasUserInteracted && hasPriceRange ? (
                      <span>${minVariantPrice.toFixed(2)} - ${maxVariantPrice.toFixed(2)}</span>
                    ) : (
                      <span>${currentPrice.toFixed(2)}</span>
                    )}
                    <span className="text-sm font-black text-slate-400">USD</span>
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

                  {/* Insignia Cashea */}
                  {isVariantCasheaActive && (
                    <div className="mt-2.5 bg-amber-50/90 border border-amber-300 rounded-2xl p-3 flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-[#FFE600] text-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-400 shadow-xs shrink-0">
                          CASHEA
                        </span>
                        <div className="text-left">
                          <span className="block text-xs font-black text-slate-900">
                            Disponible con Cashea
                          </span>
                          <span className="text-[11px] font-semibold text-amber-900">
                            Paga en cuotas sin interés con tu cuenta Cashea
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ------------------------------------------------------------- */}
                {/* 2. VISUAL COLOR SWATCHES (INDEPENDENT OF PRICE)               */}
                {/* ------------------------------------------------------------- */}
                {colorsList.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-800">Color:</span>
                      <span className="text-xs font-bold text-slate-600">{getColorDisplayName(selectedColor)}</span>
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {colorsList.map((col, idx) => {
                        const hex = typeof col === 'object' && col.hex ? col.hex : getColorHexFromName(col);
                        const name = getColorDisplayName(col);
                        const isSel = getColorDisplayName(selectedColor) === name;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => { setSelectedColor(col); setHasUserInteracted(true); }}
                            className={`w-7 h-7 rounded-full border-2 transition-all shadow-xs relative ${
                              isSel 
                                ? 'border-blue-600 scale-125 ring-2 ring-blue-600/30' 
                                : 'border-slate-300 hover:scale-110 hover:border-slate-400'
                            }`}
                            style={{ backgroundColor: hex }}
                            title={name}
                          >
                            {hex?.toUpperCase() === '#FFFFFF' && (
                              <span className="absolute inset-0 rounded-full border border-slate-200" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* 3. HARDWARE & SPEC OPTIONS (DICTATE VARIANT PRICE & STOCK)   */}
                {/* ------------------------------------------------------------- */}
                {dynamicOptions && dynamicOptions.filter(o => !o.name.toLowerCase().includes('color')).length > 0 && (
                  <div className="space-y-3.5 pt-2 border-t border-slate-100">
                    {dynamicOptions.filter(o => !o.name.toLowerCase().includes('color')).map((opt, oIdx) => {
                      const selectedVal = selectedOptions[opt.name] || opt.values[0] || '';

                      return (
                        <div key={oIdx} className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-800">{opt.name}:</span>
                            <span className="text-xs font-extrabold text-blue-600">{selectedVal}</span>
                          </div>

                          {opt.values.length <= 6 ? (
                            <div className="flex items-center gap-2 flex-wrap pt-0.5">
                              {opt.values.map((val, vIdx) => {
                                const isSel = selectedVal === val;
                                return (
                                  <button
                                    key={vIdx}
                                    type="button"
                                    onClick={() => handleDynamicOptionChange(opt.name, val)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all active:scale-95 border ${
                                      isSel
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-105'
                                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="relative">
                              <select
                                value={selectedVal}
                                onChange={(e) => handleDynamicOptionChange(opt.name, e.target.value)}
                                className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer shadow-xs pr-10"
                              >
                                {opt.values.map((val, vIdx) => (
                                  <option key={vIdx} value={val}>
                                    {val}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

              {/* BUY CONTROLS & QUANTITY */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-black text-slate-900 select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to cart CTA */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                      isOutOfStock
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        : added
                        ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                    }`}
                  >
                    {isOutOfStock ? (
                      <span>Agotado</span>
                    ) : added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Añadir al Carrito</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
