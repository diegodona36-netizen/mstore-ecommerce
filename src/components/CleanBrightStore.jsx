import React, { useState, useMemo } from 'react';
import { 
  Search, ShoppingBag, Truck, ShieldCheck, Phone, User, 
  Star, ChevronRight, Filter, Zap, CreditCard, ArrowRight,
  Smartphone, Headphones, Clock, Plug, Shield
} from 'lucide-react';

export function CleanBrightStore({ onBackToMain }) {
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  const PRODUCTS_DATA = [
    {
      id: 'cb-1',
      brand: 'Apple',
      name: 'iPhone 15 Pro Max 256GB Titanio Natural',
      price: 1199.00,
      rating: 5.0,
      reviews: 142,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'cb-2',
      brand: 'Samsung',
      name: 'Samsung Galaxy S25 Ultra 512GB / 12GB RAM Titanio',
      price: 910.00,
      rating: 4.9,
      reviews: 98,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'cb-3',
      brand: 'Honor',
      name: 'Honor 600e 256GB / 8GB RAM (MediaTek Dimensity 7100)',
      price: 451.00,
      rating: 4.9,
      reviews: 74,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'cb-4',
      brand: 'Xiaomi',
      name: 'Xiaomi Redmi Note 13 Pro+ 5G 512GB / 12GB RAM',
      price: 389.00,
      rating: 4.8,
      reviews: 115,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'cb-5',
      brand: 'Tecno',
      name: 'Tecno Spark 30 Pro 256GB / 8GB RAM – Negro',
      price: 149.00,
      rating: 4.7,
      reviews: 210,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'cb-6',
      brand: 'Infinix',
      name: 'Infinix Note 40 Pro 256GB / 12GB RAM Carga 70W',
      price: 229.00,
      rating: 4.9,
      reviews: 86,
      badges: ['Paga con Cashea', 'Aceptamos Krece'],
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter(p => {
      const matchBrand = selectedBrand === 'todos' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchSearch;
    });
  }, [selectedBrand, searchQuery]);

  const handleWhatsAppOrder = (productName, productPrice) => {
    const formattedPrice = `$${parseFloat(productPrice).toFixed(2)} USD`;
    const message = `Hola M Store, me interesa adquirir el producto ${productName} por ${formattedPrice}. ¿Está disponible?`;
    const whatsappUrl = `https://wa.me/584120000000?text=${encodeURIComponent(message)}`;
    
    setCartCount(prev => prev + 1);
    setToastMsg(`¡${productName} añadido al pedido!`);
    setTimeout(() => setToastMsg(null), 3000);

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#0F172A] font-inter selection:bg-[#00B4D8] selection:text-white pb-24 text-left">

      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#00B4D8] text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-[0_8px_25px_rgba(0,180,216,0.3)] flex items-center gap-2 animate-bounce">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. TOP BAR */}
      <div className="bg-[#0F172A] text-white text-xs font-semibold py-2 px-4 sm:px-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-[#00B4D8]" />
          <span><strong>Envío Gratis</strong> a nivel nacional | Delivery Express Caracas</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#00B4D8]" />
            Garantía Oficial M Store 1 Año
          </span>
          <span className="opacity-40">•</span>
          <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> WhatsApp Directo
          </a>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40 shadow-sm px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedBrand('todos')}>
            <div className="w-10 h-10 rounded-xl bg-[#00B4D8] text-white font-black text-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,180,216,0.3)]">
              M
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#0F172A] font-space block leading-none">M STORE</span>
              <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest block mt-0.5">TECNOLOGÍA DE ALTA GAMA</span>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar iPhone, Samsung, Xiaomi, AirPods, Smartwatches..." 
              className="w-full bg-[#F8F9FA] border border-[#E2E8F0] focus:border-[#00B4D8] focus:bg-white rounded-full pl-5 pr-12 py-2.5 text-xs text-[#0F172A] placeholder-slate-400 outline-none transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#00B4D8] hover:bg-[#0077B6] text-white flex items-center justify-center transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/584120000000" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Atención al Cliente</span>
            </a>

            <div className="relative cursor-pointer p-2 text-[#0F172A]">
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#00B4D8] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 3. CATEGORY NAV */}
      <nav className="bg-white border-b border-[#E2E8F0] px-4 sm:px-8 py-2.5 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs font-bold text-[#64748B]">
          <button className="bg-[#00B4D8] text-white px-4 py-1.5 rounded-full font-extrabold flex items-center gap-2 hover:bg-[#0077B6] transition-colors">
            <span>≡ Todas las Categorías</span>
          </button>

          <a href="#catalogo" className="text-[#00B4D8] font-extrabold">Smartphones</a>
          <a href="#catalogo" className="hover:text-[#0F172A]">Fundas & Estuches</a>
          <a href="#catalogo" className="hover:text-[#0F172A]">Auriculares & Sonido</a>
          <a href="#catalogo" className="hover:text-[#0F172A]">Smartwatches</a>
          <a href="#catalogo" className="hover:text-[#0F172A]">Línea Blanca</a>
          <a href="#catalogo" className="text-rose-600 font-extrabold">🔥 Ofertas del Mes</a>
        </div>
      </nav>

      {/* 4. HERO BANNER */}
      <section className="bg-gradient-to-br from-white via-slate-50 to-slate-100 border-b border-[#E2E8F0] py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00B4D8] text-xs font-black">
              <Zap className="w-3.5 h-3.5 fill-[#00B4D8]" />
              <span>LO ÚLTIMO EN TECNOLOGÍA EN VENEZUELA</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#0F172A] font-space leading-tight">
              Tu Próximo Smartphone de Alta Gama al Mejor Precio
            </h1>

            <p className="text-sm text-[#64748B] leading-relaxed">
              Equipos 100% nuevos en caja sellada con Garantía Oficial M Store. Llévatelo hoy mismo con financiamiento en cuotas o contado directo.
            </p>

            {/* BADGES CASHEA Y KRECE */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="bg-cyan-50 border border-cyan-200 text-[#00B4D8] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <CreditCard className="w-4 h-4" />
                <span>Paga con <strong>Cashea</strong></span>
              </div>
              <div className="bg-sky-50 border border-sky-200 text-[#0891B2] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <CreditCard className="w-4 h-4" />
                <span>Aceptamos <strong>Krece</strong></span>
              </div>
              <div className="bg-white border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Envío Gratis Nacional</span>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#catalogo" 
                className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#0077B6] text-white font-extrabold px-6 py-3.5 rounded-2xl text-xs shadow-[0_4px_15px_rgba(0,180,216,0.3)] transition-all"
              >
                <span>Explorar Catálogo</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="w-72 h-72 sm:w-80 sm:h-80 bg-white rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2E8F0] flex items-center justify-center shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop" 
              alt="Smartphones M Store" 
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 5. CATEGORÍAS GRID */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-left">
            <h2 className="text-2xl font-black text-[#0F172A] font-space">Categorías Destacadas</h2>
            <p className="text-xs text-[#64748B]">Navega por nuestro inventario completo de productos</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: 'Smartphones', count: '+130 Modelos', icon: '📱' },
              { title: 'Fundas & Estuches', count: '+90 Diseños', icon: '🛡️' },
              { title: 'Auriculares & Audio', count: '+60 Dispositivos', icon: '🎧' },
              { title: 'Smartwatches', count: '+45 Relojes', icon: '⌚' },
              { title: 'Línea Blanca', count: '+50 Productos', icon: '🔌' },
            ].map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E2E8F0] hover:border-[#00B4D8] rounded-3xl p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,180,216,0.15)] transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#00B4D8] flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-xs text-[#0F172A]">{cat.title}</h3>
                <span className="text-[10px] text-[#64748B] font-semibold">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CATALOG & BRAND TABS */}
      <section id="catalogo" className="py-12 px-4 sm:px-8 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left">
              <h2 className="text-2xl font-black text-[#0F172A] font-space">Catálogo de Productos</h2>
              <p className="text-xs text-[#64748B]">Filtra tus marcas preferidas en tiempo real</p>
            </div>

            {/* BRAND TABS */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E2E8F0]">
              {['todos', 'Apple', 'Samsung', 'Xiaomi', 'Tecno', 'Infinix', 'Honor'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedBrand === brand
                      ? 'bg-[#00B4D8] text-white shadow-sm font-extrabold'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {brand === 'todos' ? 'Todos' : brand}
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#00B4D8] rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_35px_rgba(0,180,216,0.15)] transition-all flex flex-col justify-between space-y-4 text-left group"
              >
                <div>
                  {/* BADGES CASHEA Y KRECE */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {p.badges.map((badge, bIdx) => (
                      <span 
                        key={bIdx}
                        className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase border ${
                          badge.includes('Cashea')
                            ? 'bg-[#E0F7FA] text-[#00B4D8] border-[#00B4D8]/30'
                            : 'bg-cyan-50 text-cyan-700 border-cyan-300'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* IMAGEN MARCO LIMPIO */}
                  <div className="w-full h-48 bg-[#FAFAFA] rounded-2xl p-4 flex items-center justify-center mb-3">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                    />
                  </div>

                  {/* VALORACIÓN EN ESTRELLAS */}
                  <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                    {'★'.repeat(5)}
                    <span className="text-[#64748B] text-[10px] font-semibold">({p.rating} / {p.reviews} reseñas)</span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0F172A] line-clamp-2 min-h-[36px]">{p.name}</h3>

                  <div className="flex items-baseline gap-1.5 pt-2">
                    <span className="text-2xl font-black text-[#0F172A] font-space">${p.price.toFixed(2)}</span>
                    <span className="text-xs font-extrabold text-[#00B4D8]">USD</span>
                  </div>
                </div>

                {/* BOTÓN WHATSAPP API AGREGAR AL PEDIDO */}
                <button
                  onClick={() => handleWhatsAppOrder(p.name, p.price)}
                  className="w-full bg-[#00B4D8] hover:bg-[#0077B6] text-white font-extrabold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,180,216,0.25)] active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Agregar al pedido</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON (BOTTOM RIGHT) */}
      <a 
        href="https://wa.me/584120000000?text=Hola%20M%20Store%2C%20quisiera%20recier%20atenci%C3%B3n%20personalizada" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
        title="Contactar por WhatsApp"
      >
        <Phone className="w-7 h-7 fill-white" />
      </a>

      {/* 
        ========================================================================
        BLOQUE DE CHAT LOCAL (ESQUINA INFERIOR IZQUIERDA)
        ========================================================================
        Pega tu script de Chat Local (LiveChat / Crisp / Tawk.to) aquí abajo:
      */}
      <div className="fixed bottom-6 left-6 z-50 bg-white border border-[#E2E8F0] shadow-xl rounded-2xl px-4 py-2.5 hidden sm:flex items-center gap-3 text-xs font-bold text-[#0F172A]">
        <div className="w-8 h-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-black">
          💬
        </div>
        <span>Chat de Atención M Store</span>
      </div>

    </div>
  );
}
