import React, { useState } from 'react';
import { 
  Smartphone, Search, ShoppingBag, ArrowLeft, Truck, ShieldCheck, 
  Sparkles, Star, ChevronRight, Filter, Flame, Phone, Tag, Check, Award
} from 'lucide-react';

export function SoyTechnoExperiment({ onBackToMain }) {
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [selectedRam, setSelectedRam] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Catálogo Estilo Soy Techno Venezuela
  const soyTechnoProducts = [
    {
      id: 'st-1',
      brand: 'Tecno',
      name: 'Tecno Spark 30 Pro 256GB + 8GB RAM',
      specs: 'Pantalla AMOLED 120Hz | Cámara 108MP | Batería 5000mAh',
      price: 169.00,
      oldPrice: 199.00,
      discount: '15% OFF',
      badge: 'ENVÍO GRATIS NACIONAL',
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Súper Venta'
    },
    {
      id: 'st-2',
      brand: 'Infinix',
      name: 'Infinix Note 40 Pro 256GB + 12GB RAM',
      specs: 'Carga Rápida 70W | Cámara 108MP OIS | Pantalla Curva AMOLED',
      price: 229.00,
      oldPrice: 269.00,
      discount: '14% OFF',
      badge: 'OFERTA RELÁMPAGO',
      ram: '12GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Más Vendido'
    },
    {
      id: 'st-3',
      brand: 'Xiaomi',
      name: 'Xiaomi Redmi Note 13 Pro+ 512GB + 12GB RAM',
      specs: 'Cámara 200MP OIS | Carga 120W | IP68 Resistente al Agua',
      price: 389.00,
      oldPrice: 449.00,
      discount: '13% OFF',
      badge: 'ENVÍO GRATIS EXPRESS',
      ram: '12GB',
      storage: '512GB',
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Top Gama'
    },
    {
      id: 'st-4',
      brand: 'Samsung',
      name: 'Samsung Galaxy A55 5G 256GB + 8GB RAM',
      specs: 'Procesador Exynos 1480 | Cámara 50MP OIS | Pantalla Super AMOLED',
      price: 349.00,
      oldPrice: 399.00,
      discount: '12% OFF',
      badge: 'GARANTÍA OFICIAL 1 AÑO',
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Oficial'
    },
    {
      id: 'st-5',
      brand: 'Honor',
      name: 'Honor Magic6 Lite 256GB + 8GB RAM',
      specs: 'Pantalla Ultra Resistente Anti-Caídas | Batería 5300mAh | 108MP',
      price: 249.00,
      oldPrice: 289.00,
      discount: '13% OFF',
      badge: 'DELIVERY GRATIS CARACAS',
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Resistente'
    },
    {
      id: 'st-6',
      brand: 'Tecno',
      name: 'Tecno Camon 30 Premier 512GB + 12GB RAM',
      specs: 'Lente Periscopio 50MP | Chip de Imagen Sony | Carga 70W',
      price: 419.00,
      oldPrice: 489.00,
      discount: '14% OFF',
      badge: 'ENVÍO GRATIS NACIONAL',
      ram: '12GB',
      storage: '512GB',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop',
      colorTag: 'Cámara Pro'
    }
  ];

  const brands = [
    { id: 'todos', name: 'Todas las Marcas' },
    { id: 'Tecno', name: 'Tecno Mobile' },
    { id: 'Infinix', name: 'Infinix' },
    { id: 'Xiaomi', name: 'Xiaomi Redmi' },
    { id: 'Samsung', name: 'Samsung Galaxy' },
    { id: 'Honor', name: 'Honor' }
  ];

  const filtered = soyTechnoProducts.filter(p => {
    const matchBrand = selectedBrand === 'todos' || p.brand === selectedBrand;
    const matchRam = selectedRam === 'todos' || p.ram === selectedRam;
    const matchQuery = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBrand && matchRam && matchQuery;
  });

  const handleWhatsAppOrder = (product) => {
    const msg = `Hola M Store! Deseo comprar el equipo estilo Soy Techno: *${product.name}* (${product.price} USD). ¿Tienen disponibilidad?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-inter pb-20">
      
      {/* BARRA SUPERIOR PROMOCIONAL ESTILO SOY TECHNO */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-between shadow-md">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1 bg-black/30 hover:bg-black/50 text-white px-3 py-1 rounded-full transition-all text-[11px] min-h-[32px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>
        <div className="flex items-center gap-2 truncate text-[11px] sm:text-xs">
          <Truck className="w-4 h-4 shrink-0 text-amber-300" />
          <span className="font-extrabold uppercase">ENVÍO GRATIS A NIVEL NACIONAL • MRW / ZOOM / TEALCA</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>Garantía Oficial M Store</span>
        </div>
      </div>

      {/* HEADER PRINCIPAL SOY TECHNO DESIGN */}
      <header className="bg-[#0B101D] border-b border-red-500/30 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          
          {/* LOGO M STORE - SOY TECHNO EDITION */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-black text-white text-xl shadow-[0_0_20px_rgba(239,68,68,0.4)]">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black font-space tracking-wider text-white">M STORE</span>
                <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">TECHNO</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Zona Celulares Venezuela</p>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar Tecno, Infinix, Xiaomi, Samsung, Honor..."
              className="w-full bg-white/5 border border-red-500/30 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none transition-all"
            />
          </div>

          {/* CONTACT & CART */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/584120000000" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/50 text-emerald-400 px-3 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all min-h-[40px]"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Atención 24/7</span>
            </a>
          </div>

        </div>
      </header>

      {/* HERO BANNER ESTILO SOY TECHNO (OFERTAS EN CELULARES) */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 border border-red-500/40 p-6 sm:p-10 shadow-[0_0_40px_rgba(239,68,68,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/60 text-red-400 text-xs font-black uppercase">
              <Flame className="w-4 h-4 text-red-500" />
              <span>SUPER PRECIOS SOY TECHNO 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-space leading-tight">
              Los Celulares Más Vendidos de Venezuela
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Equipos 100% nuevos en caja sellada con Garantía Oficial. Tecno, Infinix, Xiaomi, Samsung y Honor con Envío Gratis a nivel nacional.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="bg-amber-400 text-black font-black text-xs px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider">
                ENVÍO GRATIS EXPRESS
              </div>
              <div className="text-xs text-slate-300 font-bold">
                ✓ Cobro a Destino Asegurado
              </div>
            </div>
          </div>

          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-white p-4 border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center justify-center shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop" 
              alt="Tecno Spark 30 Pro"
              className="w-full h-full object-contain filter drop-shadow-md" 
            />
          </div>
        </div>
      </section>

      {/* MARCAS BARRA INTERACTIVA */}
      <section className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {brands.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBrand(b.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border shrink-0 min-h-[44px] flex items-center gap-2 ${
                selectedBrand === b.id
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-red-500/40 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{b.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* FILTROS POR MEMORIA RAM */}
      <section className="max-w-7xl mx-auto px-4 mt-4 flex items-center gap-3 text-xs font-bold">
        <span className="text-slate-400 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Filtrar RAM:</span>
        {['todos', '8GB', '12GB'].map(ram => (
          <button
            key={ram}
            onClick={() => setSelectedRam(ram)}
            className={`px-3 py-1.5 rounded-xl border text-xs transition-all ${
              selectedRam === ram
                ? 'bg-amber-400 text-black border-amber-400 font-extrabold'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            {ram === 'todos' ? 'Todas' : ram}
          </button>
        ))}
      </section>

      {/* GRID DE PRODUCTOS ESTILO SOY TECHNO */}
      <main className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div 
            key={p.id}
            className="bg-[#0D1322] rounded-3xl p-5 border border-red-500/20 hover:border-red-500 transition-all flex flex-col justify-between space-y-4 group hover:shadow-[0_10px_35px_rgba(239,68,68,0.25)] relative"
          >
            {/* BADGES */}
            <div className="flex items-center justify-between">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-md">
                {p.badge}
              </span>
              <span className="bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                {p.colorTag}
              </span>
            </div>

            {/* FOTO PRODUCTO EN MARCO BLANCO ESTUDIO */}
            <div className="w-full h-52 bg-white rounded-2xl p-4 flex items-center justify-center border border-slate-200 shadow-sm relative group-hover:scale-105 transition-transform">
              <img src={p.image} alt={p.name} className="w-full h-full object-contain filter drop-shadow-sm" />
            </div>

            {/* DETALLES */}
            <div className="space-y-2 text-left">
              <div className="text-[11px] text-red-400 font-black uppercase tracking-wider">{p.brand} • {p.ram} / {p.storage}</div>
              <h3 className="text-sm font-bold text-white line-clamp-2 min-h-[40px] font-space">{p.name}</h3>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{p.specs}</p>

              {/* PRECIO LEGIBLE BLANCO HD */}
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-2xl font-black text-white font-inter tracking-tight">${p.price.toFixed(2)}</span>
                <span className="text-xs font-bold text-red-400">USD</span>
                {p.oldPrice && (
                  <span className="text-xs text-slate-500 line-through font-inter ml-1">${p.oldPrice.toFixed(2)}</span>
                )}
                <span className="ml-auto bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {p.discount}
                </span>
              </div>
            </div>

            {/* BOTÓN WHATSAPP SOY TECHNO */}
            <button
              onClick={() => handleWhatsAppOrder(p)}
              className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
            >
              <span>Comprar por WhatsApp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </main>

    </div>
  );
}
