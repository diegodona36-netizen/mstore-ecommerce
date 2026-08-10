import React, { useState, useMemo } from 'react';
import { 
  Smartphone, Search, ShoppingBag, ArrowLeft, Truck, ShieldCheck, 
  Sparkles, Star, ChevronRight, Filter, Flame, Phone, Tag, Check, Award,
  SlidersHorizontal, RefreshCw, Eye, X, Home, Grid, Heart, MapPin, Percent
} from 'lucide-react';

export function SoyTechnoExperiment({ onBackToMain }) {
  // State for search, filters, sorting and quick view
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [selectedRam, setSelectedRam] = useState('todos');
  const [selectedStorage, setSelectedStorage] = useState('todos');
  const [selectedNetwork, setSelectedNetwork] = useState('todos');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  // Expanded High-Fidelity Catalog from SoyTechno Venezuela
  const soyTechnoProducts = [
    {
      id: 'st-1',
      brand: 'Tecno',
      name: 'Tecno Spark 30 Pro 256GB + 8GB RAM',
      specs: 'Pantalla AMOLED 120Hz | Cámara 108MP | Batería 5000mAh | Helio G100',
      price: 169.00,
      oldPrice: 199.00,
      discount: '15% OFF',
      badge: 'ENVÍO GRATIS NACIONAL',
      ram: '8GB',
      storage: '256GB',
      network: '4G',
      rating: 4.9,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
      tag: 'OFERTA RELÁMPAGO',
      tagBg: 'bg-red-600'
    },
    {
      id: 'st-2',
      brand: 'Infinix',
      name: 'Infinix Note 40 Pro 256GB + 12GB RAM',
      specs: 'Carga Rápida 70W | Cámara 108MP OIS | Pantalla Curva AMOLED 120Hz',
      price: 229.00,
      oldPrice: 269.00,
      discount: '14% OFF',
      badge: 'MÁS VENDIDO',
      ram: '12GB',
      storage: '256GB',
      network: '4G',
      rating: 5.0,
      reviews: 185,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      tag: 'SUPER PRECIO',
      tagBg: 'bg-amber-500'
    },
    {
      id: 'st-3',
      brand: 'Xiaomi',
      name: 'Xiaomi Redmi Note 13 Pro+ 5G 512GB + 12GB RAM',
      specs: 'Cámara 200MP OIS | Carga HyperCharge 120W | IP68 Resistente al Agua',
      price: 389.00,
      oldPrice: 449.00,
      discount: '13% OFF',
      badge: 'ENVÍO EXPRESS 24H',
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      rating: 4.9,
      reviews: 340,
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop',
      tag: 'TOP GAMA',
      tagBg: 'bg-purple-600'
    },
    {
      id: 'st-4',
      brand: 'Samsung',
      name: 'Samsung Galaxy A55 5G 256GB + 8GB RAM',
      specs: 'Procesador Exynos 1480 4nm | Cámara 50MP OIS | Pantalla Super AMOLED',
      price: 349.00,
      oldPrice: 399.00,
      discount: '12% OFF',
      badge: 'GARANTÍA OFICIAL 1 AÑO',
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      rating: 4.8,
      reviews: 290,
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
      tag: 'SAMSUNG OFICIAL',
      tagBg: 'bg-blue-600'
    },
    {
      id: 'st-5',
      brand: 'Honor',
      name: 'Honor Magic6 Lite 5G 256GB + 8GB RAM',
      specs: 'Pantalla Anti-Caídas 360° | Batería 5300mAh | Cámara 108MP',
      price: 249.00,
      oldPrice: 289.00,
      discount: '13% OFF',
      badge: 'DELIVERY GRATIS CARACAS',
      ram: '8GB',
      storage: '256GB',
      network: '5G',
      rating: 4.9,
      reviews: 160,
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop',
      tag: 'ULTRA RESISTENTE',
      tagBg: 'bg-emerald-600'
    },
    {
      id: 'st-6',
      brand: 'Tecno',
      name: 'Tecno Camon 30 Premier 5G 512GB + 12GB RAM',
      specs: 'Lente Periscopio 50MP | Chip de Imagen Sony | Carga 70W',
      price: 419.00,
      oldPrice: 489.00,
      discount: '14% OFF',
      badge: 'ENVÍO GRATIS NACIONAL',
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      rating: 5.0,
      reviews: 95,
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop',
      tag: 'CÁMARA PRO',
      tagBg: 'bg-red-600'
    },
    {
      id: 'st-7',
      brand: 'Infinix',
      name: 'Infinix Hot 40 Pro 256GB + 8GB RAM',
      specs: 'Motor Helio G99 Ultra | Cámara 108MP | Pantalla FHD+ 120Hz',
      price: 149.00,
      oldPrice: 179.00,
      discount: '16% OFF',
      badge: 'OFERTA ECONÓMICA',
      ram: '8GB',
      storage: '256GB',
      network: '4G',
      rating: 4.7,
      reviews: 410,
      image: 'https://images.unsplash.com/photo-1546054454-aa25e27610f9?q=80&w=600&auto=format&fit=crop',
      tag: 'CALIDAD PRECIO',
      tagBg: 'bg-amber-500'
    },
    {
      id: 'st-8',
      brand: 'Xiaomi',
      name: 'Poco X6 Pro 5G 512GB + 12GB RAM',
      specs: 'Procesador Dimensity 8300 Ultra | Pantalla 1.5K AMOLED 120Hz | Carga 67W',
      price: 329.00,
      oldPrice: 379.00,
      discount: '13% OFF',
      badge: 'GAMER EDITION',
      ram: '12GB',
      storage: '512GB',
      network: '5G',
      rating: 4.9,
      reviews: 520,
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop',
      tag: 'GAMER 120FPS',
      tagBg: 'bg-amber-600'
    }
  ];

  const brands = [
    { id: 'todos', name: 'Todas las Marcas' },
    { id: 'Tecno', name: 'Tecno Mobile' },
    { id: 'Infinix', name: 'Infinix' },
    { id: 'Xiaomi', name: 'Xiaomi / Poco' },
    { id: 'Samsung', name: 'Samsung Galaxy' },
    { id: 'Honor', name: 'Honor' }
  ];

  // Filter and Sort Logic
  const filteredAndSorted = useMemo(() => {
    let result = soyTechnoProducts.filter(p => {
      const matchBrand = selectedBrand === 'todos' || p.brand === selectedBrand;
      const matchRam = selectedRam === 'todos' || p.ram === selectedRam;
      const matchStorage = selectedStorage === 'todos' || p.storage === selectedStorage;
      const matchNetwork = selectedNetwork === 'todos' || p.network === selectedNetwork;
      const matchQuery = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchRam && matchStorage && matchNetwork && matchQuery;
    });

    if (sortBy === 'lowPrice') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'highPrice') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedBrand, selectedRam, selectedStorage, selectedNetwork, sortBy, searchQuery]);

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    setToastMsg(`¡${product.name} añadido al carrito!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleWhatsAppOrder = (product) => {
    const msg = `Hola M Store! Deseo realizar el pedido del equipo estilo SoyTechno: *${product.name}* por *${product.price.toFixed(2)} USD*. ¿Tienen disponibilidad inmediata para envío?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-inter pb-24 relative">

      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-red-600 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* BARRA SUPERIOR PROMOCIONAL ANUNCIO SOYTECHNO */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-between shadow-md">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1.5 bg-black/40 hover:bg-black/70 text-white px-3.5 py-1 rounded-full transition-all text-[11px] font-extrabold min-h-[32px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>
        <div className="flex items-center gap-2 truncate text-[11px] sm:text-xs">
          <Truck className="w-4 h-4 shrink-0 text-amber-300" />
          <span className="font-extrabold uppercase">ENVÍOS GRATIS A NIVEL NACIONAL • MRW / ZOOM / TEALCA</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Garantía Oficial M Store 1 Año</span>
        </div>
      </div>

      {/* HEADER STICKY CON LOGO SOYTECHNO & BÚSQUEDA */}
      <header className="bg-[#0B101D]/95 border-b border-red-500/30 sticky top-0 z-40 backdrop-blur-xl px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              M
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black font-space tracking-wider text-white">M STORE</span>
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">TECHNO</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Catálogo Celulares 2026</p>
            </div>
          </div>

          {/* BUSCADOR */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar Tecno, Infinix, Xiaomi, Samsung, Honor..."
              className="w-full bg-white/5 border border-red-500/30 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] rounded-full pl-11 pr-8 py-2.5 text-xs text-white placeholder-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* BOTONES CARRITO Y ATENCIÓN */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/584120000000" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all min-h-[40px]"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp Vantas</span>
            </a>

            <div className="relative">
              <button className="p-2.5 rounded-2xl bg-white/5 border border-white/15 text-white hover:border-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_10px_#ef4444]">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* BANNER PRINCIPAL HIGH-IMPACT AMBIENTE SOYTECHNO */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-red-950/80 to-slate-950 border border-red-500/40 p-6 sm:p-10 shadow-[0_0_40px_rgba(239,68,68,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/60 text-red-400 text-xs font-black uppercase shadow-sm">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>ZONA DE CELULARES SOY TECHNO 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-space leading-tight">
              Los Celulares Más Vendidos de Venezuela
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-inter">
              Equipos 100% nuevos en caja sellada con Garantía Oficial. Tecno, Infinix, Xiaomi, Samsung y Honor con Envío Gratis a nivel nacional.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="bg-amber-400 text-black font-black text-xs px-4 py-2.5 rounded-xl shadow-lg uppercase tracking-wider">
                🚚 ENVÍO GRATIS EXPRESS
              </div>
              <div className="text-xs text-slate-300 font-bold bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                ✓ Cobro a Destino Asegurado
              </div>
            </div>
          </div>

          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-white p-4 border-2 border-red-500/50 shadow-[0_0_35px_rgba(239,68,68,0.35)] flex items-center justify-center shrink-0 group hover:scale-105 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop" 
              alt="Tecno Spark 30 Pro"
              className="w-full h-full object-contain filter drop-shadow-md" 
            />
          </div>
        </div>
      </section>

      {/* CINTA DE FILTROS POR MARCAS */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {brands.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBrand(b.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border shrink-0 min-h-[44px] flex items-center gap-2.5 ${
                selectedBrand === b.id
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-red-500/40 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>{b.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* BARRA DE FILTROS SECUNDARIOS (RAM, ALMACENAMIENTO, RED & ORDEN) */}
      <section className="max-w-7xl mx-auto px-4 mt-6 bg-[#0B101D] p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
        <div className="flex flex-wrap items-center gap-4">
          
          {/* RAM */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">RAM:</span>
            {['todos', '8GB', '12GB'].map(ram => (
              <button
                key={ram}
                onClick={() => setSelectedRam(ram)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedRam === ram
                    ? 'bg-amber-400 text-black border-amber-400 font-extrabold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {ram === 'todos' ? 'Todas' : ram}
              </button>
            ))}
          </div>

          {/* STORAGE */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Almacenamiento:</span>
            {['todos', '256GB', '512GB'].map(st => (
              <button
                key={st}
                onClick={() => setSelectedStorage(st)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedStorage === st
                    ? 'bg-amber-400 text-black border-amber-400 font-extrabold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {st === 'todos' ? 'Todos' : st}
              </button>
            ))}
          </div>

          {/* NETWORK */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Red:</span>
            {['todos', '4G', '5G'].map(net => (
              <button
                key={net}
                onClick={() => setSelectedNetwork(net)}
                className={`px-3 py-1.5 rounded-xl border transition-all ${
                  selectedNetwork === net
                    ? 'bg-red-600 text-white border-red-500 font-extrabold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {net === 'todos' ? 'Todas' : net}
              </button>
            ))}
          </div>

        </div>

        {/* ORDENAR POR */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-400">Ordenar por:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/5 border border-white/15 text-white rounded-xl px-3 py-1.5 outline-none font-bold text-xs cursor-pointer focus:border-red-500"
          >
            <option value="popular" className="bg-[#0B101D]">Más Populares</option>
            <option value="lowPrice" className="bg-[#0B101D]">Precio: Menor a Mayor</option>
            <option value="highPrice" className="bg-[#0B101D]">Precio: Mayor a Menor</option>
            <option value="rating" className="bg-[#0B101D]">Mejores Reseñas</option>
          </select>
        </div>
      </section>

      {/* LISTADO DE PRODUCTOS HIGH FIDELITY */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAndSorted.map(p => (
          <div 
            key={p.id}
            className="bg-[#0D1322] rounded-3xl p-4 border border-red-500/20 hover:border-red-500 transition-all flex flex-col justify-between space-y-3 group hover:shadow-[0_10px_35px_rgba(239,68,68,0.25)] relative text-left"
          >
            {/* BADGES SUPERIORES */}
            <div className="flex items-center justify-between gap-1">
              <span className={`${p.tagBg} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm truncate`}>
                {p.tag}
              </span>
              <span className="bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0">
                {p.network}
              </span>
            </div>

            {/* FOTO CON MARCO BLANCO ESTUDIO */}
            <div 
              className="w-full h-48 bg-white rounded-2xl p-3 flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden cursor-pointer"
              onClick={() => setQuickViewProduct(p)}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                  VER DETALLES →
                </span>
              </div>
              <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform" />
            </div>

            {/* INFORMACIÓN DEL EQUIPO */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-red-400 font-black uppercase tracking-wider">{p.brand}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" /> {p.rating} ({p.reviews})
                </span>
              </div>

              <h3 className="text-xs font-bold text-white line-clamp-2 min-h-[32px] font-space">{p.name}</h3>
              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{p.specs}</p>

              {/* PRECIO LEGIBLE EN BLANCO HD */}
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-xl font-black text-white font-inter tracking-tight">${p.price.toFixed(2)}</span>
                <span className="text-[10px] font-extrabold text-red-400">USD</span>
                {p.oldPrice && (
                  <span className="text-[11px] text-slate-500 line-through font-inter ml-1">${p.oldPrice.toFixed(2)}</span>
                )}
                <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {p.discount}
                </span>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleAddToCart(p)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 rounded-xl text-[11px] transition-all min-h-[40px] flex items-center justify-center gap-1"
              >
                <span>Añadir</span>
              </button>

              <button
                onClick={() => handleWhatsAppOrder(p)}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black py-2.5 rounded-xl text-[11px] uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-1 min-h-[40px]"
              >
                <span>Comprar</span>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL VISTA RÁPIDA SOYTECHNO */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B101D] border-2 border-red-500/50 rounded-3xl max-w-lg w-full p-6 space-y-4 relative shadow-[0_0_50px_rgba(239,68,68,0.4)] text-left">
            <button 
              onClick={() => setQuickViewProduct(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-black text-red-400 uppercase">
              <Smartphone className="w-4 h-4" />
              <span>{quickViewProduct.brand} • {quickViewProduct.ram} / {quickViewProduct.storage}</span>
            </div>

            <h3 className="text-lg font-black text-white font-space">{quickViewProduct.name}</h3>

            <div className="w-full h-56 bg-white rounded-2xl p-4 flex items-center justify-center border border-slate-200">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-contain" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
              {quickViewProduct.specs}
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-inter">${quickViewProduct.price.toFixed(2)}</span>
              <span className="text-xs font-bold text-red-400">USD</span>
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-slate-500 line-through ml-2">${quickViewProduct.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-2xl text-xs"
              >
                Añadir al Carrito
              </button>

              <button
                onClick={() => handleWhatsAppOrder(quickViewProduct)}
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg"
              >
                Comprar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVEGACIÓN MÓVIL INFERIOR STICKY ESTILO SOYTECHNO */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B101D]/95 border-t border-red-500/30 backdrop-blur-xl px-4 py-2 flex items-center justify-around text-[10px] font-bold text-slate-400">
        <button onClick={onBackToMain} className="flex flex-col items-center gap-1 hover:text-white">
          <Home className="w-5 h-5 text-red-500" />
          <span>Inicio</span>
        </button>
        <button onClick={() => setSelectedBrand('todos')} className="flex flex-col items-center gap-1 hover:text-white">
          <Grid className="w-5 h-5 text-slate-300" />
          <span>Marcas</span>
        </button>
        <button onClick={() => setSelectedRam('8GB')} className="flex flex-col items-center gap-1 hover:text-white">
          <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          <span>Ofertas</span>
        </button>
        <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-1 hover:text-white">
          <Phone className="w-5 h-5 text-emerald-400" />
          <span>Contacto</span>
        </a>
      </div>

    </div>
  );
}
