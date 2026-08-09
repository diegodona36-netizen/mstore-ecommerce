import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, ShoppingCart, User, Heart, ChevronRight, X, 
  Tv, Smartphone, Watch, Headphones, Flame, Shield, Sparkles, Check,
  MapPin, Clock, Phone, Navigation, Truck, RefreshCw, Zap, Gift, ChevronLeft,
  Star, Calculator, Award, MessageSquare, ArrowRight, Tag, Grid, Eye, Trash2, Plus, Minus
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryMegaMenuTest } from './CategoryMegaMenuTest';
import { QuickViewModal } from './QuickViewModal';
import { AdminPanelModal } from './AdminPanelModal';

export const LandingPageTest = ({ 
  customCategories = [],
  adminProducts = [],
  onAddProduct,
  onRemoveProduct,
  onAddCategory,
  onRemoveCategory
}) => {
  // Navigation & Menu States
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('Todos los Productos');
  const [activeFilterId, setActiveFilterId] = useState('todos');
  
  // Search, Wishlist & Toast States
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  // Cart & Checkout Drawer States
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Hero Slider State (High-Impact Production Style)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      id: 1,
      tag: '🔥 OFERTA RELÁMPAGO STAR',
      title: 'Smart TV 75" Neo QLED 4K AI',
      subtitle: 'Síragon & Samsung Pro Series',
      highlight: 'Pantalla Gigante 120Hz',
      desc: 'Experiencia de cine en casa con procesamiento de IA. Incluye combo VIP de regalo: Barra de Sonido Dolby Atmos + Instalación Oficial a Domicilio.',
      price: '$1,499.00',
      oldPrice: '$1,899.00',
      discount: '21% OFF',
      badge: '🎁 Combo Soundbar + Instalación Gratis',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
      bgGradient: 'from-blue-950/90 via-[#0A0908] to-cyan-950/90'
    },
    {
      id: 2,
      tag: '📱 ZONA APPLE FLAGSHIP',
      title: 'iPhone 16 Pro Max 1TB Titanio',
      subtitle: 'Edición Titanio Negro 2026',
      highlight: 'Procesador A18 Pro 3nm',
      desc: 'El smartphone más potente con botón de cámara táctil. Regalo VIP: Funda MagSafe Oficial + Vidrio Templado + Envío 24H.',
      price: '$1,299.00',
      oldPrice: '$1,499.00',
      discount: '13% OFF',
      badge: '🛡️ Garantía Oficial M Store 1 Año',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpeg',
      bgGradient: 'from-[#00E5FF]/20 via-[#0A0908] to-purple-950/90'
    },
    {
      id: 3,
      tag: '🧊 LÍNEA BLANCA SMART AI',
      title: 'Nevera Síragon 18 Pies Inverter',
      subtitle: 'Tecnología No Frost & Dispensador',
      highlight: 'Ahorro del 60% de Luz',
      desc: 'Compresor Inverter inteligente de alta eficiencia con control de temperatura digital y acabados de acero inoxidable.',
      price: '$899.00',
      oldPrice: '$1,099.00',
      discount: '18% OFF',
      badge: '⚡ 5 Años de Garantía en Compresor',
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop',
      bgGradient: 'from-emerald-950/90 via-[#0A0908] to-cyan-950/90'
    }
  ];

  // Countdown timer for IVOO Oferta Banner
  const [timer, setTimer] = useState({ hours: 45, minutes: 52, seconds: 27 });

  // Installment Calculator State
  const [calcAmount, setCalcAmount] = useState(1200);
  const [calcMonths, setCalcMonths] = useState(6);

  // Auto Slider Effect (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // REAL PRODUCTION PRODUCTS DATABASE (MERGED WITH ADMIN PRODUCTS)
  const defaultCatalogProducts = [
    { id: 'p-1', category: 'televisores', brand: 'soneview', name: '43" Google TV FHD Soneview', price: 259.99, originalPrice: 299.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', specs: ['Smart Google TV', 'FHD 1080p', 'HDR10', 'Control por Voz'], description: 'Televisor Smart FHD Soneview con sistema Google TV oficial, Google Assistant y acceso a Netflix, Disney+ y YouTube.' },
    { id: 'p-2', category: 'televisores', brand: 'viotto', name: '43" Google TV FHD Viotto', price: 293.00, originalPrice: 340.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', specs: ['Procesador Quad Core', 'Sonido Surround', 'Conexión WiFi 5G'], description: 'Pantalla inteligente Viotto de 43 pulgadas con colores vibrantes y sonido envolvente cinematográfico.' },
    { id: 'p-3', category: 'televisores', brand: 'viotto', name: '32" Google TV HD Viotto', price: 184.00, originalPrice: 210.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', specs: ['Diseño Ultra Delgado', 'Fácil Conectividad HDMI/USB'], description: 'Ideal para habitaciones u oficinas. Conecta tus dispositivos y disfruta de tus apps preferidas.' },
    { id: 'p-4', category: 'televisores', brand: 'siragon', name: '50" Google TV UHD 4K Síragon', price: 380.00, originalPrice: 450.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', specs: ['Resolución 4K Real', 'Marcos Invisibles', 'Chromecast Integrado'], description: 'Imágenes 4K hiperrealistas con tecnología de procesamiento de color de Síragon.' },
    { id: 'p-5', category: 'televisores', brand: 'siragon', name: '75" Neo QLED 4K Síragon Pro', price: 1499.00, originalPrice: 1899.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', specs: ['Neo QLED 120Hz', 'Dolby Atmos', 'Modo Juego VRR'], description: 'La máxima expresión del entretenimiento. Pantalla de 75 pulgadas con brillo superior y 120Hz de refresco.' },

    { id: 'p-6', category: 'smartphones', brand: 'apple', name: 'iPhone 16 Pro Max 1TB Titanio Negro', price: 1299.00, originalPrice: 1499.00, rating: 5.0, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpeg', specs: ['Chip A18 Pro 3nm', 'Botón de Cámara Táctil', 'Titanio Grado 5', 'Batería 33h'], description: 'El iPhone más avanzado hasta la fecha con diseño en titanio y sistema de cámaras profesional de 48MP.' },
    { id: 'p-7', category: 'smartphones', brand: 'samsung', name: 'Samsung Galaxy S24 Ultra 512GB AI', price: 1199.00, originalPrice: 1399.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop', specs: ['Galaxy AI Integrado', 'Cámara 200MP Zoom 100x', 'S Pen Incluido'], description: 'Potencia absoluta impulsada por Inteligencia Artificial. Pantalla AMOLED 2X brillante y marco de titanio.' },
    { id: 'p-8', category: 'smartphones', brand: 'xiaomi', name: 'Xiaomi 14 Ultra 512GB Leica', price: 999.00, originalPrice: 1199.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop', specs: ['Lentes Ópticos Leica', 'Carga Ultra Rápida 90W', 'Snapdragon 8 Gen 3'], description: 'Fotografía profesional en tu bolsillo con cuádruple cámara Leica de 50MP.' },

    { id: 'p-9', category: 'neveras', brand: 'siragon', name: 'Nevera Síragon 18 Pies Inverter Smart', price: 899.00, originalPrice: 1099.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=600&auto=format&fit=crop', specs: ['Compresor Inverter Ahorro 60%', 'Tecnología No Frost', 'Dispensador de Agua'], description: 'Nevera inteligente de alta capacidad en acero inoxidable anti-huellas.' },
    { id: 'p-10', category: 'lavadoras', brand: 'lg', name: 'Lavadora Carga Frontal LG 12KG AI', price: 749.00, originalPrice: 899.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=600&auto=format&fit=crop', specs: ['Motor AI DD Inteligente', 'Lavado a Vapor Steam', '10 Años Garantía Motor'], description: 'Protege las fibras de tus prendas con inteligencia artificial que detecta el peso y suavidad de las telas.' },
    { id: 'p-11', category: 'aires', brand: 'siragon', name: 'Aire Acondicionado 12000 BTU Inverter', price: 299.00, originalPrice: 360.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop', specs: ['Gas Ecológico R410A', 'Filtro Anti-Bacterias', 'Súper Silencioso 19dB'], description: 'Enfriamiento ultra rápido con máximo ahorro energético Inverter para tu hogar u oficina.' },
    { id: 'p-12', category: 'cocina', brand: 'siragon', name: 'Cocina de Inducción 4 Hornillas Síragon', price: 340.00, originalPrice: 410.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop', specs: ['Superficie Cristal Vitrocerámico', 'Control Táctil Slider', 'Bloqueo de Seguridad Niños'], description: 'Cocción rápida y limpia de máxima eficiencia con sensores de detección de sartenes.' }
  ];

  // Combined product list (admin added products + default catalog)
  const allCatalogProducts = [...adminProducts, ...defaultCatalogProducts];

  // Cart operations
  const handleAddToCart = (product) => {
    const prodObj = typeof product === 'string' 
      ? { id: Date.now(), name: product, price: 999.00, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop', quantity: 1 }
      : { ...product, quantity: 1 };

    setCartItems(prev => {
      const existing = prev.find(item => item.id === prodObj.id || item.name === prodObj.name);
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, prodObj];
    });

    setToastMsg(`¡${prodObj.name} añadido al Carrito VIP!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalUSD = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // CHECKOUT DIRECT TO WHATSAPP IN USD ONLY ($)
  const handleSendOrderToWhatsApp = () => {
    if (cartItems.length === 0) return;

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    let orderText = `*¡NUEVA ORDEN DE COMPRA M STORE VIP #${orderNumber}!*\n\n`;
    orderText += `*Detalle del Pedido:*\n`;

    cartItems.forEach((item, index) => {
      orderText += `${index + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)} USD\n`;
    });

    orderText += `\n*TOTAL A PAGAR:* *$${cartTotalUSD.toFixed(2)} USD*\n\n`;
    orderText += `📌 *Atención:* Deseo coordinar el pago en dólares ($USD) y los detalles de entrega/envío directamente con el asesor por WhatsApp.`;

    const encoded = encodeURIComponent(orderText);
    window.open(`https://wa.me/584120000000?text=${encoded}`, '_blank');
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Official Brands Filter Grid
  const officialBrands = [
    { name: 'Zona Síragon', filterId: 'siragon', logo: 'SÍRAGON', desc: 'TVs & Electrodomésticos' },
    { name: 'Zona Samsung', filterId: 'samsung', logo: 'SAMSUNG', desc: 'Galaxy & Neo QLED' },
    { name: 'Zona Apple', filterId: 'apple', logo: ' APPLE', desc: 'iPhone & MacBooks' },
    { name: 'Zona Xiaomi', filterId: 'xiaomi', logo: 'XIAOMI', desc: 'Smartphones & Smart Home' },
    { name: 'Zona LG', filterId: 'lg', logo: 'LG ELECTRONICS', desc: 'Línea Blanca Inverter' },
    { name: 'Zona Soneview', filterId: 'soneview', logo: 'SONEVIEW', desc: 'Google TVs & Audio' }
  ];

  const calculatedMonthly = (calcAmount / calcMonths).toFixed(2);

  // Filter products by selected category / brand & search query
  const filteredProducts = allCatalogProducts.filter(p => {
    const matchesCat = activeFilterId === 'todos' || p.category === activeFilterId || p.brand === activeFilterId;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleCategorySelectFromMenu = (filterId, catName) => {
    setActiveFilterId(filterId);
    setSelectedCategoryName(catName || 'Categoría Seleccionada');
    const catalogEl = document.getElementById('catalogo-productos');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0908] text-white font-inter selection:bg-[#00E5FF] selection:text-black relative">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#00E5FF] text-black font-bold font-space text-xs px-4 py-3 rounded-2xl shadow-[0_0_25px_#00E5FF] flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER ESTILO IVOO DARK MODE NEÓN */}
      <header className="sticky top-0 z-40 bg-[#0A0908]/95 backdrop-blur-xl border-b border-[#00E5FF]/30 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo M Store */}
          <div className="shrink-0">
            <Logo size="medium" />
          </div>

          {/* Menú de Categorías Button */}
          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            aria-label="Abrir Menú de Categorías"
            aria-expanded={isMegaMenuOpen}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/60 hover:bg-[#00E5FF] hover:text-black focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all text-xs font-extrabold font-space shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.4)] group active:scale-95 min-h-[44px]"
          >
            <Menu className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span>Menú de Categorías</span>
          </button>

          {/* Buscador Amplio al Centro */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-300 absolute left-4 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar televisores, neveras, cocinas, lavadoras, teléfonos..."
                aria-label="Buscar productos por nombre"
                className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-400 outline-none font-inter min-h-[44px]"
              />
            </div>
          </div>

          {/* Admin PIN Access & Carrito */}
          <div className="flex items-center gap-3 shrink-0 text-xs font-space">
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Abrir Panel Administrador"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:border-[#00E5FF] text-slate-200 hover:text-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all min-h-[44px]"
              title="Panel Administrador (PIN 1234)"
            >
              <User className="w-4 h-4 text-[#00E5FF]" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label={`Ver Carrito de Compras VIP (${cartItems.reduce((a, b) => a + b.quantity, 0)} productos)`}
              className="relative cursor-pointer p-3 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/50 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Ver Carrito de Compras VIP"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00E5FF] text-black font-extrabold text-[10px] flex items-center justify-center font-space shadow-[0_0_12px_#00E5FF] animate-bounce">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MENÚ DE CATEGORÍAS 5 COLUMNAS DIRECTAS IVOO */}
      <CategoryMegaMenuTest
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={handleCategorySelectFromMenu}
        customCategories={customCategories}
      />

      {/* HERO BANNER SLIDER DE ALTO IMPACTO */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6" aria-label="Banners Principales de Ofertas">
        <div className={`relative rounded-3xl overflow-hidden glass-card border border-[#00E5FF]/50 min-h-[420px] flex items-center p-6 sm:p-12 transition-all duration-700 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} shadow-[0_0_40px_rgba(0,229,255,0.25)]`}>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/60 text-[#00E5FF] text-xs font-extrabold font-space uppercase shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                  <Flame className="w-4 h-4 text-red-400 animate-bounce" />
                  <span>{heroSlides[currentSlide].tag}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold font-space">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{heroSlides[currentSlide].discount}</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold font-space text-slate-300 uppercase tracking-widest">{heroSlides[currentSlide].subtitle}</p>
                <h1 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold font-space leading-tight text-white">
                  {heroSlides[currentSlide].title} <br/>
                  <span className="text-[#00E5FF] drop-shadow-[0_0_25px_#00E5FF]">
                    {heroSlides[currentSlide].highlight}
                  </span>
                </h1>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm font-inter leading-relaxed max-w-xl">
                {heroSlides[currentSlide].desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-300 font-space uppercase block">Precio Oferta Especial</span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-space text-white flex items-baseline gap-3">
                    <span className="text-[#00E5FF] drop-shadow-[0_0_15px_#00E5FF]">{heroSlides[currentSlide].price}</span>
                    <span className="text-sm text-slate-400 line-through font-normal">{heroSlides[currentSlide].oldPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleAddToCart({ id: heroSlides[currentSlide].id, name: heroSlides[currentSlide].title, price: 1499.00, image: heroSlides[currentSlide].image })}
                  aria-label={`Comprar Oferta VIP ${heroSlides[currentSlide].title}`}
                  className="btn-cyan-glow px-7 py-3.5 rounded-2xl text-black font-extrabold text-xs font-space uppercase tracking-wider shadow-[0_0_25px_#00E5FF] hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white transition-all flex items-center gap-2 group min-h-[44px]"
                >
                  <span>Comprar Oferta VIP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs font-bold font-space">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <span>{heroSlides[currentSlide].badge}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white/5 border border-white/15 p-5 backdrop-blur-xl flex items-center justify-center shadow-2xl group">
                <img 
                  src={heroSlides[currentSlide].image} 
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>

          {/* ACCESSIBLE SLIDER CONTROLS (≥44px TOUCH TARGETS) */}
          <div className="absolute bottom-5 left-6 z-20 flex items-center gap-4">
            <button 
              onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
              aria-label="Ver slide anterior"
              className="p-3 rounded-full bg-black/70 border border-white/30 hover:border-[#00E5FF] text-white hover:text-black hover:bg-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2.5 items-center">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir al slide ${idx + 1}`}
                  className={`h-3 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none ${
                    currentSlide === idx ? 'w-10 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]' : 'w-3 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
              aria-label="Ver siguiente slide"
              className="p-3 rounded-full bg-black/70 border border-white/30 hover:border-[#00E5FF] text-white hover:text-black hover:bg-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* CINTA DE MARCAS OFICIALES CON ELEMENTOS SEMÁNTICOS BUTTON */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-8" aria-label="Marcas Oficiales">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-around gap-3 text-center">
          {officialBrands.map((b, idx) => (
            <button 
              key={idx}
              onClick={() => handleCategorySelectFromMenu(b.filterId, b.name)}
              aria-label={`Filtrar productos de ${b.name}`}
              className="p-3 rounded-xl hover:bg-[#00E5FF]/10 focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all group border border-transparent hover:border-[#00E5FF]/30 min-h-[44px] text-left"
            >
              <span className="text-sm font-extrabold font-space text-white group-hover:text-[#00E5FF] tracking-wider block">{b.logo}</span>
              <span className="text-[11px] text-slate-300 font-space block mt-0.5">{b.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* CATÁLOGO PRINCIPAL FOCADO EN CATEGORÍAS PRINCIPALES */}
      <main id="catalogo-productos" className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">

        {/* CATALOG HEADER & MAIN CATEGORY FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-extrabold font-space uppercase mb-1">
              <Grid className="w-3.5 h-3.5" />
              <span>Catálogo Principal de Productos</span>
            </div>
            <h2 className="text-3xl font-extrabold font-space text-white">
              {selectedCategoryName}
            </h2>
            <p className="text-xs text-slate-300">Mostrando {visibleProducts.length} de {filteredProducts.length} productos en esta categoría</p>
          </div>

          {/* Quick Main Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'todos', name: 'Todos' },
              { id: 'televisores', name: '📺 Televisores' },
              { id: 'neveras', name: '🧊 Neveras' },
              { id: 'cocina', name: '🍳 Cocinas' },
              { id: 'lavadoras', name: '🧺 Lavadoras' },
              { id: 'smartphones', name: '📱 Smartphones' },
              ...customCategories.map(c => ({ id: c.id, name: `🏷️ ${c.name}` }))
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelectFromMenu(cat.id, cat.name)}
                aria-label={`Filtrar por ${cat.name}`}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold font-space transition-all border min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none ${
                  activeFilterId === cat.id
                    ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_#00E5FF]'
                    : 'bg-white/5 border-white/10 text-slate-200 hover:border-[#00E5FF]/40'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID (DESIGNED FOR HUNDREDS OF ITEMS - 4 COLUMNS IVOO STYLE) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl p-4 border border-white/10 hover:border-[#00E5FF]/60 transition-all flex flex-col justify-between space-y-3 group hover:shadow-[0_10px_30px_rgba(0,229,255,0.2)]">
              <div className="w-full h-48 rounded-xl bg-white p-3 flex items-center justify-center relative overflow-hidden">
                <button 
                  onClick={() => toggleWishlist(p.id)} 
                  aria-label={wishlist.includes(p.id) ? `Quitar ${p.name} de favoritos` : `Añadir ${p.name} a favoritos`}
                  className="absolute top-2 left-2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Heart className={`w-5 h-5 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                <button 
                  onClick={() => setQuickViewProduct(p)}
                  aria-label={`Vista rápida de ${p.name}`}
                  className="absolute top-2 right-2 p-2.5 rounded-full bg-black/50 hover:bg-[#00E5FF] text-white hover:text-black focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="Vista Rápida"
                >
                  <Eye className="w-5 h-5" />
                </button>

                <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
              </div>
              
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1 text-amber-400 text-[11px] font-space font-bold">
                  <span>★ {p.rating || '5.0'}</span>
                  <span className="text-slate-300">(142 reseñas)</span>
                </div>
                <h3 className="text-xs font-bold font-space text-slate-100 line-clamp-2 min-h-[32px]">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-[#00E5FF] font-space pt-1">${p.price.toFixed ? p.price.toFixed(2) : p.price} USD</span>
                  {p.originalPrice && <span className="text-xs text-slate-400 line-through">${p.originalPrice.toFixed ? p.originalPrice.toFixed(2) : p.originalPrice}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button 
                  onClick={() => setQuickViewProduct(p)}
                  aria-label={`Ver detalles de ${p.name}`}
                  className="py-2.5 rounded-xl border border-white/20 hover:border-[#00E5FF] text-xs font-bold font-space text-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all min-h-[44px]"
                >
                  Detalles
                </button>
                <button 
                  onClick={() => handleAddToCart(p)} 
                  aria-label={`Añadir ${p.name} al carrito`}
                  className="btn-cyan-glow py-2.5 rounded-xl text-xs font-extrabold font-space text-black active:scale-95 focus-visible:ring-2 focus-visible:ring-white shadow-[0_0_15px_rgba(0,229,255,0.4)] min-h-[44px]"
                >
                  + Carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION / LOAD MORE PRODUCTS */}
        {visibleProducts.length < filteredProducts.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              aria-label="Cargar más productos del catálogo"
              className="px-8 py-3.5 rounded-2xl bg-white/5 border border-[#00E5FF]/40 text-[#00E5FF] font-extrabold text-xs font-space hover:bg-[#00E5FF] hover:text-black focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] active:scale-95 min-h-[44px]"
            >
              Cargar Más Productos del Catálogo &darr;
            </button>
          </div>
        )}

        {/* SIMULADOR DE FINANCIAMIENTO / CUOTAS FLEXIBLES */}
        <section className="glass-card rounded-3xl p-6 sm:p-8 border border-[#00E5FF]/40 space-y-6 text-left shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold font-space text-white">Calculadora de Cuotas Flexibles M Store</h3>
              <p className="text-xs text-[#00E5FF] font-semibold">Simula tu cuota en USD ($) para la compra de tus equipos</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-center">
            <div className="space-y-2">
              <label htmlFor="calc-amount-input" className="text-xs font-bold font-space text-slate-200">Monto de la Compra ($USD):</label>
              <input
                id="calc-amount-input"
                type="number"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                aria-label="Monto de la compra en dólares"
                className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-2xl p-3.5 text-xs text-white outline-none font-space font-extrabold text-base focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] min-h-[44px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold font-space text-slate-200">Plazo en Meses:</label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 6, 12].map(m => (
                  <button
                    key={m}
                    onClick={() => setCalcMonths(m)}
                    aria-label={`Calcular a ${m} meses`}
                    className={`py-3 rounded-2xl text-xs font-extrabold font-space transition-all border min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
                      calcMonths === m
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_20px_#00E5FF]'
                        : 'bg-white/5 border-white/10 text-slate-200 hover:border-[#00E5FF]/40'
                    }`}
                  >
                    {m} Meses
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/50 text-center space-y-1 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <span className="text-[11px] text-slate-300 font-space uppercase">Tu Cuota Estimada</span>
              <div className="text-3xl font-extrabold text-[#00E5FF] font-space drop-shadow-[0_0_10px_#00E5FF]">${calculatedMonthly} USD / mes</div>
              <p className="text-xs text-emerald-400 font-semibold">✓ 0% Intereses en Dólares con Financiamiento M Store</p>
            </div>
          </div>
        </section>

      </main>

      {/* DRAWER DE CARRITO CON CHECKOUT DIRECTO A WHATSAPP EN USD ($) */}
      {isCartOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Carrito de Compras VIP"
          className="fixed inset-0 z-50 flex justify-end animate-fadeIn"
        >
          <div 
            onClick={() => setIsCartOpen(false)} 
            aria-label="Cerrar Carrito de Compras"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          ></div>
          <div className="relative z-10 w-full max-w-md bg-[#0A0908] border-l border-[#00E5FF]/40 h-full p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-[#00E5FF] font-space font-extrabold">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Tu Carrito de Compras VIP</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)} 
                  aria-label="Cerrar Carrito"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-16 text-center space-y-4 text-slate-300">
                  <ShoppingCart className="w-12 h-12 mx-auto text-slate-500" />
                  <p className="text-xs font-space">Tu carrito está vacío.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-cyan-glow px-6 py-3 rounded-xl text-black font-extrabold text-xs font-space uppercase"
                  >
                    Explorar Productos &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-contain bg-white rounded-xl p-1" />
                      <div className="flex-1 text-left space-y-0.5">
                        <h4 className="text-xs font-bold font-space text-white line-clamp-1">{item.name}</h4>
                        <span className="text-xs text-[#00E5FF] font-space font-bold">${item.price.toFixed ? item.price.toFixed(2) : item.price} USD</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleUpdateQuantity(item.id, -1)} aria-label="Disminuir cantidad" className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 min-w-[36px] min-h-[36px] flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="text-xs font-bold font-space text-white px-1">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, 1)} aria-label="Aumentar cantidad" className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 min-w-[36px] min-h-[36px] flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleRemoveFromCart(item.id)} aria-label={`Eliminar ${item.name} del carrito`} className="p-2 text-red-400 hover:text-red-300 ml-1 min-w-[36px] min-h-[36px] flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between font-space">
                  <span className="text-xs text-slate-300 uppercase">Total Pedido ($USD):</span>
                  <span className="text-2xl font-extrabold text-[#00E5FF] drop-shadow-[0_0_10px_#00E5FF]">${cartTotalUSD.toFixed(2)} USD</span>
                </div>

                <button
                  onClick={handleSendOrderToWhatsApp}
                  aria-label="Finalizar Compra enviando pedido a WhatsApp VIP"
                  className="w-full btn-cyan-glow py-3.5 rounded-2xl text-black font-extrabold text-xs font-space uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_#00E5FF] min-h-[44px]"
                >
                  <Phone className="w-4 h-4 fill-black" />
                  <span>Finalizar Compra por WhatsApp VIP</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL DE PRODUCTO */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleFavorite={toggleWishlist}
          isFavorite={wishlist.includes(quickViewProduct.id)}
        />
      )}

      {/* ADMIN PANEL MODAL (PIN 1234) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={adminProducts}
        onAddProduct={onAddProduct}
        onRemoveProduct={onRemoveProduct}
        categories={customCategories}
        onAddCategory={onAddCategory}
        onRemoveCategory={onRemoveCategory}
      />

      {/* BOTÓN FLOTANTE DE WHATSAPP VIP */}
      <a
        href="https://wa.me/584120000000?text=Hola%20M%20Store!%20Deseo%20informaci%C3%B3n%20sobre%20sus%20productos."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a M Store por WhatsApp VIP"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#00E5FF] text-black shadow-[0_0_35px_#00E5FF] hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white transition-all flex items-center justify-center cursor-pointer group min-w-[56px] min-h-[56px]"
        title="Atención Directa WhatsApp M Store"
      >
        <Phone className="w-6 h-6 fill-black group-hover:rotate-12 transition-transform" />
      </a>

    </div>
  );
};
