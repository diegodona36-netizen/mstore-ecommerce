import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, ArrowLeft, Truck, ShieldCheck, 
  ChevronRight, ChevronLeft, Phone, User, Shuffle, Heart, 
  MapPin, CreditCard, Sparkles, Star, Flame, Tag, Check, X,
  Tv, Smartphone, Laptop, Gamepad2, Refrigerator, Watch, Headphones, Zap
} from 'lucide-react';

/* ────────────────────────── DATA DE LA HOME PAGE DE SOYTECHNO ────────────────────────── */

// Banners Promocionales del Hero Principal
const HERO_SLIDES = [
  {
    id: 1,
    title: 'TECNOLOGÍA DE ÚLTIMA GENERACIÓN EN VENEZUELA',
    subtitle: 'Smartphones, Televisores 4K, Laptops y Electrodomésticos con Envío Gratis Nacional',
    badge: 'OFERTAS DE TEMPORADA SOYTECHNO',
    bgGradient: 'from-[#0C1A38] via-[#1565C0] to-[#0C1A38]',
    buttonText: 'Explorar Catálogo',
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'PANTALLAS & SMART TVS 4K DE ALTA DEFINICIÓN',
    subtitle: 'Disfruta de tus series y deportes favoritos con la mejor calidad visual',
    badge: 'ZONA TV & AUDIO',
    bgGradient: 'from-[#0A1128] via-[#1C3144] to-[#0A1128]',
    buttonText: 'Ver Televisores',
    img: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'EQUIPOS DE COMPUTACIÓN & ZONA GAMER 2026',
    subtitle: 'Laptops de alto rendimiento para trabajo, estudio y videojuegos',
    badge: 'GAMING & LAPTOPS',
    bgGradient: 'from-[#1A0933] via-[#4A0E4E] to-[#1A0933]',
    buttonText: 'Ver Laptops',
    img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop'
  }
];

// Categorías Principales de la Home
const HOME_CATEGORIES = [
  { id: 'celulares', name: 'Teléfonos Celulares', icon: Smartphone, count: '139 Equipos', color: 'bg-blue-50 text-blue-600' },
  { id: 'tvs', name: 'Televisores & Audio', icon: Tv, count: '85 Modelos', color: 'bg-amber-50 text-amber-600' },
  { id: 'laptops', name: 'Laptops & Computación', icon: Laptop, count: '64 Equipos', color: 'bg-purple-50 text-purple-600' },
  { id: 'gamer', name: 'Zona Gamer', icon: Gamepad2, count: '42 Accesorios', color: 'bg-rose-50 text-rose-600' },
  { id: 'hogar', name: 'Línea Blanca & Hogar', icon: Refrigerator, count: '90 Productos', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'relojes', name: 'Smartwatches & Audio', icon: Watch, count: '55 Gadgets', color: 'bg-sky-50 text-sky-600' }
];

// Productos Destacados Multicategoría de la Home
const HOME_PRODUCTS = [
  {
    id: 'hp-1',
    category: 'celulares',
    brand: 'Honor',
    name: 'Honor 600e – 6.6” – 8GB / 256GB (Dimensity 7100 Elite, 108MP)',
    price: 451.00,
    oldPrice: 579.00,
    badge: 'MÁS VENDIDO',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop'
  },
  {
    id: 'hp-2',
    category: 'tvs',
    brand: 'Samsung',
    name: 'Smart TV Samsung 55" Crystal UHD 4K HDR10+ Smart Hub',
    price: 489.00,
    oldPrice: 599.00,
    badge: 'OFERTA DESTACADA',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&auto=format&fit=crop'
  },
  {
    id: 'hp-3',
    category: 'laptops',
    brand: 'Lenovo',
    name: 'Laptop Lenovo IdeaPad Slim 3 Core i5 13a Gen 16GB / 512GB SSD',
    price: 549.00,
    oldPrice: 629.00,
    badge: 'ENVÍO GRATIS',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&auto=format&fit=crop'
  },
  {
    id: 'hp-4',
    category: 'celulares',
    brand: 'Samsung',
    name: 'Samsung Galaxy S25 Ultra 512GB / 12GB RAM Titanio',
    price: 910.00,
    oldPrice: 999.00,
    badge: 'ZONA SAMSUNG',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop'
  },
  {
    id: 'hp-5',
    category: 'hogar',
    brand: 'Aiwa',
    name: 'Corneta Frigobar Speaker Aiwa Bluetooth 100W RMS RGB Lights',
    price: 189.00,
    oldPrice: 229.00,
    badge: 'PRECIO RELÁMPAGO',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&auto=format&fit=crop'
  },
  {
    id: 'hp-6',
    category: 'celulares',
    brand: 'Vivo',
    name: 'Vivo V40 SE 5G – 6.67″ / 8GB / 256GB FlashCharge 80W',
    price: 337.00,
    oldPrice: 430.00,
    badge: 'OFERTA RECOMENDADA',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop'
  }
];

// Marcas Aliadas Oficiales
const ALLIED_BRANDS = ['SAMSUNG', 'APPLE', 'XIAOMI', 'HONOR', 'TECNO', 'VIVO', 'AIWA', 'LENOVO', 'TCL', 'OUKITEL'];

export function SoyTechnoHomePage({ onBackToMain, onOpenCelularesCategory }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);

  const rateVES = 60.5;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleWhatsApp = (product) => {
    const priceText = currency === 'USD' ? `$${product.price.toFixed(2)} USD` : `${(product.price * rateVES).toLocaleString('es-VE')} Bs`;
    const msg = `Hola M Store! Deseo información sobre el producto de la portada de SoyTechno: *${product.name}* (${priceText}). ¿Tienen envío gratis?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 font-sans selection:bg-[#0055FF] selection:text-white pb-24 text-left">

      {/* TOAST FEEDBACK */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#0C1A38] text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-blue-500/30 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. BARRA SUPERIOR AMARILLA PROMO & CASHEA */}
      <div className="bg-[#FFE600] text-black font-extrabold text-xs py-2 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1.5 bg-black/10 hover:bg-black/20 text-black px-3.5 py-1 rounded-full text-[11px] transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>

        <div className="flex items-center gap-2 font-black text-[11px] sm:text-xs tracking-tight">
          <span className="bg-black text-white px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold">SOYTECHNO HOME</span>
          <span>Compra en cuotas o de contado directo con Envío Gratis en Venezuela</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] font-bold">
          <span>📍 Caracas & Lechería</span>
          <span>•</span>
          <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="hover:underline">💬 Atención 24/7</a>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL AZUL MARINO DEEP NAVY */}
      <header className="bg-[#0C1A38] text-white py-4 px-4 sm:px-8 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO SOYTECHNO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tighter text-white font-mono">SOYTECHNO</span>
              </div>
              <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest">Tienda Oficial Venezuela</p>
            </div>
          </div>

          {/* BUSCADOR CON BOTÓN CIRCULAR AZUL */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué buscas hoy? (Televisores, Celulares, Laptops, Audífonos...)"
                className="w-full bg-white text-slate-900 rounded-full pl-5 pr-14 py-2.5 text-xs placeholder-slate-400 outline-none shadow-inner border border-slate-200"
              />
              <button className="absolute right-1 w-9 h-9 rounded-full bg-[#0055FF] hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MENÚ DERECHA */}
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
              <div className="relative cursor-pointer" onClick={() => { setCartCount(c => c + 1); showToast('Carrito actualizado'); }}>
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 3. SUB-NAVBAR CATEGORÍAS */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 text-xs font-bold text-slate-700">
          <button onClick={onOpenCelularesCategory} className="bg-[#0055FF] text-white px-5 py-2 rounded-full font-extrabold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
            <span>≡ Categorías</span>
          </button>

          <div className="flex items-center gap-6">
            <span className="text-blue-600 font-black cursor-pointer">Inicio</span>
            <span className="hover:text-blue-600 cursor-pointer" onClick={onOpenCelularesCategory}>Teléfonos Celulares</span>
            <span className="hover:text-blue-600 cursor-pointer text-red-600 font-black">Ofertas Principal</span>
            <span className="hover:text-blue-600 cursor-pointer">Televisores</span>
            <span className="hover:text-blue-600 cursor-pointer">Laptops</span>
            <span className="hover:text-blue-600 cursor-pointer">Zona Gamer</span>
            <span className="hover:text-blue-600 cursor-pointer text-blue-600">Club SoyTechno</span>
          </div>
        </div>
      </nav>

      {/* 4. HERO BANNER CAROUSEL EN LA HOME PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${HERO_SLIDES[currentSlide].bgGradient} text-white p-8 sm:p-12 shadow-2xl transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10`}>
          
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-amber-300" />
              <span>{HERO_SLIDES[currentSlide].badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-space leading-tight tracking-tight">
              {HERO_SLIDES[currentSlide].title}
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={onOpenCelularesCategory}
                className="bg-[#FFE600] hover:bg-amber-400 text-black font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{HERO_SLIDES[currentSlide].buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 flex items-center justify-center shrink-0 shadow-2xl">
            <img 
              src={HERO_SLIDES[currentSlide].img} 
              alt="Promoción SoyTechno" 
              className="w-full h-full object-contain filter drop-shadow-2xl" 
            />
          </div>

          {/* CONTROLES SLIDER */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 5. SECCIÓN DE CATEGORÍAS DE LA HOME PAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-[#0C1A38]">Explora por Categorías</h2>
            <p className="text-xs text-slate-500 font-medium">Toda la tecnología disponible con entrega rápida en Venezuela</p>
          </div>
          <button onClick={onOpenCelularesCategory} className="text-xs font-extrabold text-blue-600 hover:underline flex items-center gap-1">
            <span>Ver Todo El Catálogo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {HOME_CATEGORIES.map((c) => {
            const IconComp = c.icon;
            return (
              <div 
                key={c.id}
                onClick={onOpenCelularesCategory}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer text-center space-y-3 group"
              >
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${c.color} group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">{c.name}</h3>
                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{c.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CATÁLOGO DE PRODUCTOS DESTACADOS MULTICATEGORÍA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-[#0C1A38] flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600 fill-red-600 animate-pulse" />
              <span>Lo Más Vendido en Venezuela</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">Equipos 100% nuevos en caja sellada con Garantía Oficial</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${currency === 'USD' ? 'bg-[#0055FF] text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
            >
              🇺🇸 USD ($)
            </button>
            <button 
              onClick={() => setCurrency('VES')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${currency === 'VES' ? 'bg-[#0055FF] text-white shadow-sm' : 'bg-slate-100 text-slate-600'}`}
            >
              🇻🇪 VES (Bs)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_PRODUCTS.map((p) => {
            const finalPrice = currency === 'USD' ? `$${p.price.toFixed(2)}` : `${(p.price * rateVES).toLocaleString('es-VE')} Bs`;
            const oldPriceText = p.oldPrice ? (currency === 'USD' ? `$${p.oldPrice.toFixed(2)}` : `${(p.oldPrice * rateVES).toLocaleString('es-VE')} Bs`) : null;

            return (
              <div 
                key={p.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group relative"
              >
                <div className="flex items-center justify-between">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                    {p.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{p.brand}</span>
                </div>

                <div className="w-full h-52 p-3 flex items-center justify-center overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                  />
                </div>

                <div className="space-y-2 text-left">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[36px]">{p.name}</h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">{finalPrice}</span>
                    {oldPriceText && (
                      <span className="text-xs text-slate-400 line-through font-mono ml-auto">{oldPriceText}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleWhatsApp(p)}
                  className="w-full bg-[#0055FF] hover:bg-blue-700 text-white font-black py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  <span>Comprar por WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CARROUSEL DE MARCAS ALIADAS EN LA HOME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
          Marcas Oficiales Comercializadas en Venezuela
        </h3>
        <div className="flex items-center justify-between gap-6 overflow-x-auto scrollbar-none pb-2">
          {ALLIED_BRANDS.map((b, idx) => (
            <span key={idx} className="text-slate-400 font-black text-sm tracking-widest shrink-0 hover:text-blue-600 cursor-pointer transition-colors">
              {b}
            </span>
          ))}
        </div>
      </section>

      {/* FLOATING WHATSAPP & BOT */}
      <a 
        href="https://wa.me/584120000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>

      <div className="fixed bottom-6 left-6 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-slate-800 hidden sm:flex">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
          🤖
        </div>
        <span>¿En qué puedo ayudarte? 👋</span>
      </div>

    </div>
  );
}
