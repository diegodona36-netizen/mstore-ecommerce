import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  Check, 
  Minus, 
  Plus, 
  Share2, 
  Truck, 
  Building2, 
  Star, 
  MessageCircle, 
  AlertCircle, 
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailPage = ({ 
  product, 
  allProducts = [], 
  onBack, 
  onAddToCart, 
  onSelectProduct 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [isImageFading, setIsImageFading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImage(product?.image || '');
    setActiveThumbIdx(0);
    setIsImageFading(false);
    setQuantity(1);
  }, [product]);

  if (!product) return null;

  // Smooth image switcher function (Apple / Amazon style)
  const switchImageSmoothly = (newImageUrl) => {
    if (!newImageUrl || newImageUrl === activeImage) return;
    setIsImageFading(true);
    setTimeout(() => {
      setActiveImage(newImageUrl);
      setIsImageFading(false);
    }, 120);
  };

  // Color name maps
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

  const baseImages = Array.isArray(product.images) && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const thumbnails = activeImage && !baseImages.includes(activeImage)
    ? [activeImage, ...baseImages]
    : baseImages;

  const hasExplicitVariants = Array.isArray(product.variants) && product.variants.length > 0;

  // Dynamic Options
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

  // Colors list
  const colorsList = Array.isArray(product.colors) && product.colors.length > 0
    ? product.colors.map(c => typeof c === 'object' && c.name ? c : { name: String(c), hex: getColorHexFromName(String(c)), image: c.image || null })
    : (hasExplicitVariants && product.variants.some(v => v.color)
        ? Array.from(
            new Map(
              product.variants
                .filter(v => v.color)
                .map(v => [v.color, { name: v.color, hex: v.colorHex || getColorHexFromName(v.color), image: v.image || null }])
            ).values()
          )
        : []);

  const [selectedColor, setSelectedColor] = useState(colorsList[0] || 'Negro');

  const handleColorSelect = (col) => {
    setSelectedColor(col);

    if (typeof col === 'object' && col.image) {
      switchImageSmoothly(col.image);
      return;
    }

    const colorName = getColorDisplayName(col).toLowerCase();
    const matchingVariant = (product.variants || []).find(v => {
      const vTitle = (v.title || '').toLowerCase();
      const vColor = (v.color || '').toLowerCase();
      return (vTitle.includes(colorName) || vColor.includes(colorName)) && v.image && v.image !== product.image;
    });

    if (matchingVariant && matchingVariant.image) {
      switchImageSmoothly(matchingVariant.image);
    }
  };

  const handleDynamicOptionChange = (optionName, value) => {
    setSelectedOptions(prev => {
      const updated = { ...prev, [optionName]: value };
      
      const matchingVar = (product.variants || []).find(v => {
        if (v.title === value) return true;
        if (v.options && Object.keys(updated).every(k => v.options[k] === updated[k])) return true;
        return false;
      });

      if (matchingVar && matchingVar.image && matchingVar.image !== product.image) {
        switchImageSmoothly(matchingVar.image);
      }

      return updated;
    });
  };

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

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart({ 
      ...product, 
      price: currentPrice, 
      selectedOptions,
      selectedVariant: matchedVariant,
      selectedColor: getColorDisplayName(selectedColor),
      image: activeImage || product.image,
      quantity 
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsAppDirectBuy = () => {
    let msg = `🛒 *HOLA M STORE, DESEO COMPRAR DIRECTAMENTE ESTE EQUIPO:*\n\n`;
    msg += `▪️ *${product.name}*\n`;
    if (selectedOptions && Object.keys(selectedOptions).length > 0) {
      Object.entries(selectedOptions).forEach(([k, v]) => {
        msg += `   • ${k}: ${v}\n`;
      });
    }
    if (selectedColor) {
      msg += `   • Color: ${getColorDisplayName(selectedColor)}\n`;
    }
    msg += `   • Cantidad: ${quantity}\n`;
    msg += `💰 *PRECIO TOTAL: $${(currentPrice * quantity).toFixed(2)} USD*\n\n`;
    msg += `¿Tienen disponibilidad y delivery inmediato? ¡Gracias!`;

    const whatsappUrl = `https://wa.me/584120000000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira ${product.name} en M Store`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Related products
  const relatedProducts = (allProducts || [])
    .filter(p => p.id !== product.id && (p.category === product.category || !product.category))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans pb-24 sm:pb-16 animate-fadeIn select-none">
      
      {/* 1. TOP NAVIGATION BREADCRUMB & BACK BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-3">
          
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs sm:text-sm transition-all active:scale-95 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la tienda</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 text-xs font-bold transition-all shadow-2xs"
              title="Compartir enlace del producto"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? '¡Enlace copiado!' : 'Compartir'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN PRODUCT CONTENT CARD CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 sm:py-8">
        
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ------------------------------------------------------------- */}
            {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES DEDICADA               */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Imagen Principal Hero con Fondo Mate Suave */}
              <div className="w-full h-72 sm:h-96 md:h-[450px] rounded-3xl bg-[#F8FAFC] border border-slate-200/80 p-6 flex items-center justify-center relative overflow-hidden group shadow-2xs">
                
                {/* Badges Flotantes */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap">
                  {product.hasCashea !== false && (
                    <span className="bg-[#FFE600] text-black font-black text-[10px] uppercase px-2.5 py-1 rounded-md border border-amber-400 shadow-xs">
                      CASHEA
                    </span>
                  )}
                  {product.tag && (
                    <span className="bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-md">
                      {product.tag}
                    </span>
                  )}
                </div>

                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className={`max-h-full max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-all duration-300 ease-in-out ${
                    isImageFading ? 'opacity-25 scale-95' : 'opacity-100 scale-100'
                  }`}
                />
              </div>

              {/* Carrusel de Miniaturas con Espaciado Generoso y sin Colisiones */}
              {thumbnails.length > 1 && (
                <div className="pt-2">
                  <div className="flex items-center gap-3.5 overflow-x-auto py-3 px-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200">
                    {thumbnails.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          switchImageSmoothly(img);
                          setActiveThumbIdx(idx);
                        }}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 p-2 transition-all overflow-hidden flex items-center justify-center shrink-0 shadow-2xs ${
                          (activeImage === img || (!activeImage && activeThumbIdx === idx))
                            ? 'border-blue-600 shadow-md ring-2 ring-blue-600/30 scale-105'
                            : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                        }`}
                      >
                        <img src={img} alt="Miniatura" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Beneficios Corporativos de Confianza */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-slate-700 text-xs">
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-extrabold block text-slate-900">Garantía Oficial</span>
                    <span className="text-[11px] text-slate-500">1 Año de cobertura total</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-extrabold block text-slate-900">Envíos Gratis</span>
                    <span className="text-[11px] text-slate-500">Zoom, MRW y Tealca</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* COLUMNA DERECHA: BUY BOX & ESPECIFICACIONES                    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Header: Rating + Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating || '5.0'}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">({product.reviewsCount || 142} reseñas de clientes)</span>
                </div>

                <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Precio de contado</div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        ${currentPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-black text-slate-600">USD</span>
                    </div>
                  </div>

                  {product.oldPrice && (
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Antes</div>
                      <span className="text-sm sm:text-base text-slate-400 line-through font-bold">
                        ${product.oldPrice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                <div>
                  {isOutOfStock ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-50 text-red-700 font-extrabold text-xs border border-red-200">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Agotado temporalmente en esta versión</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>En Stock para entrega inmediata {availableStockUnits !== null && `(${availableStockUnits} disponibles)`}</span>
                    </span>
                  )}
                </div>

                {/* Cashea Badge */}
                {isVariantCasheaActive && (
                  <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-3 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-[#FFE600] text-black px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-400 shadow-2xs shrink-0">
                        CASHEA
                      </span>
                      <div className="text-left">
                        <span className="block text-xs font-black text-slate-900">
                          Disponible con Cashea
                        </span>
                        <span className="text-[11px] font-bold text-amber-900">
                          Llévatelo hoy y paga en cuotas • 0% de Interés
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Selector de Colores (Cambio de Imagen Dinámico) */}
              {colorsList.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Color Seleccionado:
                    </span>
                    <span className="text-xs font-extrabold text-blue-600">
                      {getColorDisplayName(selectedColor)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {colorsList.map((col, idx) => {
                      const hex = typeof col === 'object' && col.hex ? col.hex : getColorHexFromName(col);
                      const name = getColorDisplayName(col);
                      const isSel = getColorDisplayName(selectedColor) === name;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleColorSelect(col)}
                          className={`group/swatch flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all shadow-2xs ${
                            isSel 
                              ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20' 
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <span 
                            className="w-4 h-4 rounded-full border border-slate-300 shrink-0"
                            style={{ backgroundColor: hex }}
                          />
                          <span className={`text-xs font-bold ${isSel ? 'text-blue-900 font-black' : 'text-slate-700'}`}>
                            {name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Selector de Versiones / Capacidades */}
              {dynamicOptions && dynamicOptions.filter(o => !o.name.toLowerCase().includes('color')).length > 0 && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  {dynamicOptions.filter(o => !o.name.toLowerCase().includes('color')).map((opt, oIdx) => {
                    const selectedVal = selectedOptions[opt.name] || opt.values[0] || '';

                    return (
                      <div key={oIdx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                            {opt.name}:
                          </span>
                          <span className="text-xs font-extrabold text-blue-600">{selectedVal}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {opt.values.map((val, vIdx) => {
                            const isSel = selectedVal === val;
                            return (
                              <button
                                key={vIdx}
                                type="button"
                                onClick={() => handleDynamicOptionChange(opt.name, val)}
                                className={`py-3 px-3.5 rounded-2xl text-xs font-extrabold transition-all border text-center active:scale-95 shadow-2xs ${
                                  isSel
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-600/20 scale-[1.02]'
                                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selector de Cantidad & Botones de Compra (Desktop) */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-xl text-slate-600 hover:bg-white hover:shadow-2xs transition-all disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-black text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-xl text-slate-600 hover:bg-white hover:shadow-2xs transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isOutOfStock}
                    className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 ${
                      isOutOfStock
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : added 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Agregar al Carrito</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Direct Buy */}
                <button
                  type="button"
                  onClick={handleWhatsAppDirectBuy}
                  className="w-full py-3.5 px-6 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Comprar Directo por WhatsApp</span>
                </button>
              </div>

              {/* Descripción & Detalles */}
              {product.description && (
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                    Descripción del Producto
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* 3. PRODUCTOS RELACIONADOS */}
        {relatedProducts.length > 0 && (
          <div className="mt-10 sm:mt-14 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      También te puede interesar
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Productos recomendados de la misma categoría
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={onAddToCart}
                    onQuickView={(selProd) => onSelectProduct && onSelectProduct(selProd)}
                    isLightBg={true}
                  />
                ))}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* 4. MOBILE STICKY BOTTOM BUY BAR (ESTILO AMAZON / MERCADOLIBRE) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden shadow-xl flex items-center justify-between gap-2.5">
        <div>
          <div className="text-[9px] text-slate-400 uppercase font-bold">Total</div>
          <div className="text-base font-black text-slate-900 leading-none">
            ${(currentPrice * quantity).toFixed(2)}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleWhatsAppDirectBuy}
            className="p-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-2xs active:scale-95 shrink-0"
            title="Comprar por WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </button>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95 ${
              isOutOfStock 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-600 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};
