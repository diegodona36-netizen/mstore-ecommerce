import React, { useState, useMemo } from 'react';
import { 
  Search, ShoppingBag, ArrowLeft, Truck, ShieldCheck, 
  ChevronRight, ChevronDown, Filter, Phone, Check, X, Home, Grid,
  MessageCircle, User, Sliders, LayoutGrid, List
} from 'lucide-react';

export function SoyTechnoExperiment({ onBackToMain }) {
  // Filters & State
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [selectedRam, setSelectedRam] = useState('todos');
  const [selectedStorage, setSelectedStorage] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [cartCount, setCartCount] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Exact Brand circles matching SoyTechno screenshot
  const brandBadges = [
    { id: 'Samsung', name: 'Teléfono Celular Samsung', logoText: 'SAMSUNG', color: 'text-blue-700' },
    { id: 'Apple', name: 'iPhone', logoText: '', color: 'text-black text-2xl font-normal' },
    { id: 'Honor', name: 'Teléfono Celular Honor', logoText: 'HONOR', color: 'text-slate-800 tracking-widest' },
    { id: 'Xiaomi', name: 'Teléfono Celular Xiaomi', logoText: 'mi', color: 'text-orange-500 font-extrabold text-xl' },
    { id: 'Tecno', name: 'Teléfono Celular Tecno', logoText: 'TECNO', color: 'text-blue-600 font-black' },
    { id: 'Infinix', name: 'Teléfono Celular Infinix', logoText: 'Infinix', color: 'text-emerald-600 font-bold' },
  ];

  // Exact Products catalog
  const products = [
    {
      id: 'st-1',
      brand: 'Tecno',
      name: 'Teléfono Celular Tecno Spark 30 Pro 256GB / 8GB RAM',
      price: 169.00,
      oldPrice: 199.00,
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop',
      badge: 'ENVÍO GRATIS'
    },
    {
      id: 'st-2',
      brand: 'Infinix',
      name: 'Teléfono Celular Infinix Note 40 Pro 256GB / 12GB RAM',
      price: 229.00,
      oldPrice: 269.00,
      ram: '12GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
      badge: 'OFERTA'
    },
    {
      id: 'st-3',
      brand: 'Xiaomi',
      name: 'Teléfono Celular Xiaomi Redmi Note 13 Pro+ 512GB / 12GB RAM',
      price: 389.00,
      oldPrice: 449.00,
      ram: '12GB',
      storage: '512GB',
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop',
      badge: 'ENVÍO GRATIS'
    },
    {
      id: 'st-4',
      brand: 'Samsung',
      name: 'Teléfono Celular Samsung Galaxy A55 5G 256GB / 8GB RAM',
      price: 349.00,
      oldPrice: 399.00,
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
      badge: 'OFICIAL'
    },
    {
      id: 'st-5',
      brand: 'Honor',
      name: 'Teléfono Celular Honor Magic6 Lite 256GB / 8GB RAM',
      price: 249.00,
      oldPrice: 289.00,
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop',
      badge: 'ENVÍO GRATIS'
    },
    {
      id: 'st-6',
      brand: 'Apple',
      name: 'iPhone 15 Pro Max 256GB Titanio Natural',
      price: 1199.00,
      oldPrice: 1299.00,
      ram: '8GB',
      storage: '256GB',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop',
      badge: 'PREMIUM'
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchBrand = selectedBrand === 'todos' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchRam = selectedRam === 'todos' || p.ram === selectedRam;
      const matchStorage = selectedStorage === 'todos' || p.storage === selectedStorage;
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchRam && matchStorage && matchSearch;
    });
  }, [selectedBrand, selectedRam, selectedStorage, searchQuery]);

  const handleWhatsApp = (p) => {
    const text = `Hola M Store! Quisiera comprar: *${p.name}* (${p.price} USD). ¿Tienen stock en tienda?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-[#0055FF] selection:text-white pb-20 text-left">
      
      {/* 1. TOP BAR AMARILLA CASHEA / OFERTAS (EXACTA A SOYTECHNO) */}
      <div className="bg-[#FFE600] text-black font-extrabold text-xs py-2 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1.5 bg-black/10 hover:bg-black/20 text-black px-3 py-1 rounded-full text-[11px] transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>

        <div className="flex items-center gap-2 font-black text-[11px] sm:text-xs tracking-tight">
          <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold">PROMO</span>
          <span>Compra en cuotas o contado directo con Envío Gratis hoy</span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] font-bold">
          <span>📍 Sucursales Venezuela</span>
          <span>•</span>
          <span>📞 Soporte Directo</span>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL AZUL MARINO DEEP NAVY (EXACTO SOYTECHNO) */}
      <header className="bg-[#0C1A38] text-white py-4 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO SOYTECHNO STYLE */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedBrand('todos')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tighter text-white font-mono">SOYTECHNO</span>
              </div>
              <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest">Tienda Oficial M Store</p>
            </div>
          </div>

          {/* BUSCADOR CON BOTÓN AZUL (EXACTO AL CAPTURE DE SOYTECHNO) */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Búsqueda de productos"
                className="w-full bg-white text-slate-900 rounded-full pl-5 pr-14 py-2.5 text-xs placeholder-slate-400 outline-none shadow-inner border border-slate-200"
              />
              <button className="absolute right-1 w-9 h-9 rounded-full bg-[#0055FF] hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ÍCONOS Y CONTACTO DE CABECERA */}
          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="hidden lg:flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              <div className="text-left text-[11px] leading-tight">
                <span className="block font-bold">Envíos GRATIS</span>
                <span className="text-slate-400 text-[10px]">a Nivel Nacional</span>
              </div>
            </div>

            <a 
              href="https://wa.me/584120000000" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-blue-300 transition-colors"
            >
              <Phone className="w-5 h-5 text-emerald-400" />
              <div className="text-left text-[11px] leading-tight hidden sm:block">
                <span className="block font-bold">Contáctanos por</span>
                <span className="text-emerald-400 font-extrabold">WHATSAPP</span>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <button className="p-2 text-white hover:text-blue-300">
                <User className="w-5 h-5" />
              </button>
              <div className="relative cursor-pointer" onClick={() => setCartCount(c => c + 1)}>
                <ShoppingBag className="w-6 h-6 text-white" />
                <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 3. BARRA DE CATEGORÍAS BLANCA SUB-HEADER */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 text-xs font-bold text-slate-700">
          
          <button className="bg-[#0055FF] text-white px-5 py-2 rounded-full font-extrabold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
            <span>≡ Categorías</span>
          </button>

          <div className="flex items-center gap-6">
            <span className="hover:text-blue-600 cursor-pointer">Tienda electrónica</span>
            <span className="hover:text-blue-600 cursor-pointer text-red-600 font-black">Ofertas</span>
            <span className="hover:text-blue-600 cursor-pointer">Ubicaciones</span>
            <span className="hover:text-blue-600 cursor-pointer">Métodos de pago</span>
            <span className="hover:text-blue-600 cursor-pointer">Nosotros</span>
            <span className="hover:text-blue-600 cursor-pointer">Contacto</span>
            <span className="hover:text-blue-600 cursor-pointer">Rastrea tu pedido</span>
            <span className="hover:text-blue-600 cursor-pointer text-blue-600">Club SoyTechno</span>
          </div>

        </div>
      </nav>

      {/* 4. BREADCRUMBS Y CONTADOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>
          <span className="hover:underline cursor-pointer" onClick={onBackToMain}>Inicio</span> / <span className="text-slate-900 font-bold">Teléfonos Celulares</span>
        </div>
        <div>
          Mostrando {filteredProducts.length} de {products.length} resultados
        </div>
      </div>

      {/* 5. CÍRCULOS DE MARCAS DE SOYTECHNO (REPLICADOS EXACTOS) */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          {brandBadges.map((b) => (
            <div 
              key={b.id}
              onClick={() => setSelectedBrand(selectedBrand === b.id ? 'todos' : b.id)}
              className={`flex flex-col items-center gap-2 cursor-pointer group shrink-0 transition-transform ${selectedBrand === b.id ? 'scale-105' : ''}`}
            >
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all ${selectedBrand === b.id ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200'}`}>
                <span className={`font-black text-sm sm:text-base ${b.color}`}>{b.logoText}</span>
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 text-center max-w-[110px] leading-tight">
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ZONA PRINCIPAL DE TIENDA CON SIDEBAR DE FILTROS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* BARRA LATERAL DE FILTROS (EXACTA A SOYTECHNO) */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-left">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Filtrar Productos</span>
              <Filter className="w-4 h-4 text-slate-400" />
            </h3>

            {/* MARCA CHECKBOXES */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-700 block">Marca</span>
              {['todos', 'Samsung', 'Apple', 'Honor', 'Xiaomi', 'Tecno', 'Infinix'].map(m => (
                <label key={m} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-blue-600">
                  <input 
                    type="checkbox"
                    checked={selectedBrand === m}
                    onChange={() => setSelectedBrand(m)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{m === 'todos' ? 'Todas las marcas' : m}</span>
                </label>
              ))}
            </div>

            {/* RAM CHECKBOXES */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-extrabold text-slate-700 block">Memoria RAM</span>
              {['todos', '8GB', '12GB'].map(ram => (
                <label key={ram} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-blue-600">
                  <input 
                    type="checkbox"
                    checked={selectedRam === ram}
                    onChange={() => setSelectedRam(ram)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{ram === 'todos' ? 'Cualquier RAM' : ram}</span>
                </label>
              ))}
            </div>

            {/* BOTÓN LIMPIAR */}
            <button 
              onClick={() => { setSelectedBrand('todos'); setSelectedRam('todos'); setSelectedStorage('todos'); setSearchQuery(''); }}
              className="w-full text-center text-xs font-bold text-blue-600 hover:underline pt-2 block"
            >
              Restablecer Filtros
            </button>
          </div>
        </aside>

        {/* CATÁLOGO DE PRODUCTOS (GRID DE TARJETAS LIMPIAS) */}
        <main className="flex-1 space-y-6">
          
          {/* HEADER DEL CATÁLOGO (TITULO + USD SELECTOR + SORTING) */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-black text-[#0C1A38]">Teléfonos Celulares</h2>

            <div className="flex items-center gap-4 text-xs font-bold">
              {/* USD DROPDOWN SELECTOR DE DIVISAS */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <span>🇺🇸</span>
                <span className="font-mono">USD Dólares</span>
              </div>

              {/* SORT DROPDOWN */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
              >
                <option value="default">Orden predeterminado</option>
                <option value="low">Precio: Menor a Mayor</option>
                <option value="high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* GRID TARJETAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(p => (
              <div 
                key={p.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                {/* BADGE */}
                <div className="flex items-center justify-between">
                  <span className="bg-blue-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {p.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.brand}</span>
                </div>

                {/* IMAGEN MARCO BLANCO */}
                <div className="w-full h-48 p-3 flex items-center justify-center overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                  />
                </div>

                {/* TITULO Y PRECIOS */}
                <div className="space-y-1.5 text-left">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[32px]">{p.name}</h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-xl font-black text-slate-900 font-sans">${p.price.toFixed(2)}</span>
                    <span className="text-xs font-bold text-blue-600 font-mono">USD</span>
                    {p.oldPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono ml-auto">${p.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* BOTÓN DE COMPRA WHATSAPP */}
                <button
                  onClick={() => handleWhatsApp(p)}
                  className="w-full bg-[#0055FF] hover:bg-blue-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Comprar por WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </main>

      </div>

      {/* FLOATING WHATSAPP BUTTON (ESTILO SOYTECHNO) */}
      <a 
        href="https://wa.me/584120000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>

      {/* FLOATING BOT CHATBOT ASSISTANT (ESTILO SOYTECHNO) */}
      <div className="fixed bottom-6 left-6 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-slate-800 hidden sm:flex">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
          🤖
        </div>
        <span>¿En qué puedo ayudarte? 👋</span>
      </div>

    </div>
  );
}
