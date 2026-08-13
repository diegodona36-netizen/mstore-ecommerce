import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, ArrowLeft, Truck, ShieldCheck, 
  ChevronRight, ChevronLeft, Phone, User, Shuffle, Heart, 
  MapPin, CreditCard, Sparkles, Star, Flame, Tag, Check, X,
  Tv, Smartphone, Laptop, Gamepad2, Refrigerator, Watch, Headphones, Zap, Printer, Tablet
} from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { Logo } from './Logo';

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
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCategoriesDrawerOpen, setIsCategoriesDrawerOpen] = useState(false);

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

      {/* 1. BARRA SUPERIOR AMARILLA CASHEA (ÚNICO LUGAR DE CASHEA INFORMATIVO) */}
      <div className="bg-[#FFE600] text-black font-black text-xs py-2 px-4 sm:px-8 flex items-center justify-between shadow-sm border-b border-amber-300">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1.5 bg-black/10 hover:bg-black/20 text-black px-3.5 py-1 rounded-full text-[11px] font-black transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs tracking-tight">
          <span className="bg-black text-[#FFE600] px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-black">CASHEA</span>
          <span>⚡ COMPRA HOY Y PAGA EN CUOTAS CON CASHEA SIN INTERÉS • ENVÍOS GRATIS A TODO EL PAÍS</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] font-black text-slate-900">
          <span>📍 Caracas & Lechería</span>
          <span>•</span>
          <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="hover:underline">💬 Atención 24/7</a>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL CLEAN & BRIGHT (BLANCO PURO #FFFFFF - SIN RECUADRO EN LOGO) */}
      <header className="bg-white text-slate-900 py-3.5 px-4 sm:px-8 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO OFICIAL M STORE SOBRE FONDO BLANCO PURO */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo variant="light" size="medium" />
          </div>

          {/* BUSCADOR AMPLIO Y PROMINENTE */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué buscas hoy? (iPhone 16, Galaxy S25, Smart TV 4K, Laptops...)"
                className="w-full bg-[#F8F9FA] text-slate-900 rounded-full pl-5 pr-14 py-2.5 text-xs placeholder-slate-400 outline-none border border-slate-300 focus:border-[#0055FF] transition-all shadow-inner"
              />
              <button className="absolute right-1 w-9 h-9 rounded-full bg-[#0055FF] hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-all">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACCESOS DIRECTOS (MI CUENTA, CARRITO, WHATSAPP) */}
          <div className="flex items-center gap-5 text-xs font-semibold">
            <div className="hidden lg:flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <div className="text-left text-[11px] leading-tight">
                <span className="block font-bold text-slate-900">Envíos GRATIS</span>
                <span className="text-slate-500 text-[10px]">a Nivel Nacional</span>
              </div>
            </div>

            <a 
              href="https://wa.me/584120000000?text=Hola%20M%20Store%2C%20quisiera%20consultar%20disponibilidad%20de%20productos." 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              <div className="text-left text-[11px] leading-tight hidden sm:block">
                <span className="block font-bold text-slate-800">Contáctanos por</span>
                <span className="text-emerald-600 font-extrabold">WHATSAPP</span>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-700 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <div className="relative cursor-pointer" onClick={() => { setCartCount(c => c + 1); showToast('Carrito actualizado'); }}>
                <ShoppingBag className="w-6 h-6 text-slate-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#0055FF] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 3. SUB-NAVBAR CATEGORÍAS EN FONDO GRIS CLARO (#F8F9FA) */}
      <nav className="bg-[#F8F9FA] text-slate-800 border-b border-slate-200 px-4 sm:px-8 py-2 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 text-xs font-bold">
          <button onClick={() => setIsCategoriesDrawerOpen(true)} className="bg-[#0055FF] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-extrabold flex items-center gap-2 transition-all shadow-sm">
            <span>≡ Categorías</span>
          </button>

          <div className="flex items-center gap-6 text-slate-700">
            <span className="text-blue-600 font-black cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Inicio</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsCategoriesDrawerOpen(true)}>Teléfonos Celulares</span>
            <span className="hover:text-red-600 cursor-pointer text-red-600 font-black transition-colors" onClick={() => setIsCategoriesDrawerOpen(true)}>Ofertas M Store</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsCategoriesDrawerOpen(true)}>Televisores 4K</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsCategoriesDrawerOpen(true)}>Laptops & PC</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={() => setIsCategoriesDrawerOpen(true)}>Zona Gamer</span>
            <span className="text-blue-600 font-black cursor-pointer hover:underline" onClick={() => setIsCategoriesDrawerOpen(true)}>Club M Store</span>
          </div>
        </div>
      </nav>

      {/* 4. HERO BANNER CAROUSEL PROMOCIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800">
          
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>TECNOLOGÍA DE ÚLTIMA GENERACIÓN</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight uppercase font-space text-white">
              {HERO_SLIDES[currentSlide].title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              {HERO_SLIDES[currentSlide].subtitle}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button 
                onClick={onOpenCelularesCategory}
                className="bg-[#0055FF] hover:bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
              >
                <span>{HERO_SLIDES[currentSlide].buttonText}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => setIsCategoriesDrawerOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl font-bold text-xs transition-all border border-white/20"
              >
                Ver Categorías
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 relative group shrink-0 bg-black">
            <img 
              src={HERO_SLIDES[currentSlide].img} 
              alt="M Store Promo" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          </div>

        </div>

        {/* INDICADORES DEL SLIDER */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-[#0055FF]' : 'w-2 bg-slate-300'}`}
            />
          ))}
        </div>
      </section>

      {/* 5. NAVEGACIÓN DE CATEGORÍAS RÁPIDAS (ÍCONOS CIRCULARES MINIMALISTAS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {HOME_CATEGORIES.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={onOpenCelularesCategory}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group text-center flex flex-col items-center justify-center space-y-3"
              >
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">{cat.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold">{cat.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CUADRÍCULA DE CATÁLOGO CON PESTAÑAS INTERACTIVAS DE MARCAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest block">CATÁLOGO DE PRODUCTOS</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#222222] font-space tracking-tight">Equipos Destacados M Store</h2>
          </div>

          {/* PESTAÑAS INTERACTIVAS DE MARCAS (APPLE, SAMSUNG, XIAOMI, HONOR, TECNO, VIVO) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['TODOS', 'APPLE', 'SAMSUNG', 'XIAOMI', 'HONOR', 'TECNO', 'VIVO'].map((brand) => (
              <button
                key={brand}
                onClick={() => setToastMsg(`Filtrado por marca: ${brand}`)}
                className="px-4 py-2 rounded-full text-xs font-extrabold transition-all border shrink-0 bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600 shadow-sm"
              >
                {brand}
              </button>
            ))}
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

                <div 
                  className="w-full h-52 p-3 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => setQuickViewProduct(p)}
                >
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                  />
                </div>

                <div className="space-y-2 text-left">
                  <h3 
                    onClick={() => setQuickViewProduct(p)}
                    className="text-xs font-bold text-[#222222] line-clamp-2 min-h-[36px] cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {p.name}
                  </h3>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-[#222222] font-sans tracking-tight">{finalPrice}</span>
                    {oldPriceText && (
                      <span className="text-xs text-slate-400 line-through font-mono ml-auto">{oldPriceText}</span>
                    )}
                  </div>

                  {/* DOS BADGES DE FINANCIAMIENTO INTEGRADOS VISUALMENTE ("Paga con Cashea" y "Aceptamos Krece") */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="bg-[#FFE600] text-black font-extrabold px-2.5 py-1 rounded-full text-[10px] tracking-tight shadow-sm">
                      ⚡ Paga con Cashea
                    </span>
                    <span className="bg-blue-100 text-blue-800 font-extrabold px-2.5 py-1 rounded-full text-[10px] tracking-tight">
                      💳 Aceptamos Krece
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setQuickViewProduct(p)}
                    className="w-full bg-[#F8F9FA] hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1 border border-slate-200"
                  >
                    <span>Ver Detalle</span>
                  </button>
                  <button
                    onClick={() => {
                      const msg = `Hola M Store, me interesa adquirir el producto ${p.name} por $${p.price.toFixed(2)}. ¿Está disponible?`;
                      window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="w-full bg-[#0055FF] hover:bg-blue-700 text-white font-black py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1 shadow-md active:scale-95"
                  >
                    <span>Agregar al carrito</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. BOTÓN FLOTANTE ESTÁTICO DE WHATSAPP EN ESQUINA INFERIOR DERECHA */}
      <a 
        href="https://wa.me/584120000000?text=Hola%20M%20Store%2C%20quisiera%20hacer%20una%20consulta." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-[#25D366] hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Atención por WhatsApp"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>

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

      {/* DRAWER LATERAL DE CATEGORÍAS (REPLICANDO SCREENSHOT 1) */}
      {isCategoriesDrawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-fadeIn">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCategoriesDrawerOpen(false)} />

          <div className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto font-sans">
            <div>
              {/* HEADER DEL DRAWER */}
              <div className="bg-[#0055FF] text-white p-5 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wide">
                  <span>≡ Todas las Categorías</span>
                </div>
                <button 
                  onClick={() => setIsCategoriesDrawerOpen(false)}
                  className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* LISTA DE CATEGORÍAS ESTILO SOYTECHNO (SCREENSHOT 1) */}
              <div className="divide-y divide-slate-100 text-left text-xs font-extrabold text-slate-800">
                {[
                  { name: 'Teléfonos Celulares', icon: Smartphone },
                  { name: 'Televisores', icon: Tv },
                  { name: 'Laptops', icon: Laptop },
                  { name: 'Zona Gamer', icon: Gamepad2 },
                  { name: 'Equipos de Computación', icon: Laptop },
                  { name: 'Accesorios de Computación', icon: Headphones },
                  { name: 'Impresoras', icon: Printer },
                  { name: 'Tablets', icon: Tablet },
                  { name: 'Relojes Inteligentes', icon: Watch },
                  { name: 'Audífonos y Sonido', icon: Headphones },
                  { name: 'Dispositivos Streaming', icon: Tv },
                  { name: 'Contadoras Autenticadoras', icon: Zap }
                ].map((item, idx) => {
                  const IconC = item.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => { setIsCategoriesDrawerOpen(false); onOpenCelularesCategory(); }}
                      className="p-4 flex items-center justify-between hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <IconC className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FOOTER DEL DRAWER */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
              <span className="text-[11px] font-bold text-slate-400">M Store Venezuela — Catálogo 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE PRODUCTO ESTILO SOYTECHNO (SCREENSHOT 2) */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p) => {
            setCartCount(c => c + 1);
            showToast(`Agregado al carrito: ${p.name}`);
            setQuickViewProduct(null);
          }}
        />
      )}

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
