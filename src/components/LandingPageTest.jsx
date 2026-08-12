import React, { useState, useEffect } from 'react';
import { 
  Menu, Search, ShoppingCart, Heart, ChevronRight, X,
  Tv, Smartphone, Headphones, Flame, Sparkles, Check,
  MapPin, Clock, Phone, Navigation, Gift, ChevronLeft,
  Calculator, MessageSquare, ArrowRight, Tag, Eye, Trash2, Plus, Minus,
  Wind, Refrigerator, WashingMachine, Laptop, LayoutGrid
} from 'lucide-react';
import { Logo } from './Logo';
import { CategoryMegaMenuTest } from './CategoryMegaMenuTest';
import { QuickViewModal } from './QuickViewModal';
import { AdminPanelModal } from './AdminPanelModal';
import { Footer } from './Footer';
import { SupportChatWidget } from './SupportChatWidget';
import { LocationSection } from './LocationSection';
import { MobileBottomNav } from './MobileBottomNav';

export const LandingPageTest = ({ 
  customCategories = [],
  adminProducts = [],
  onAddProduct,
  onUpdateProduct,
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
  const [compareTab, setCompareTab] = useState('phones');

  // Secret Hash Listener for #admin
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  // Hero Slider State (High-Impact Production Style)
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      id: 0,
      tag: '🔥 GRAN VENTA ANIVERSARIO',
      title: 'Envíos Nacionales & Ofertas Especiales',
      subtitle: 'MRW • ZOOM • TEALCA • Cobro a Destino',
      desc: 'Disfruta de ofertas exclusivas en Smartphones, Smart TVs y Electrodomésticos con Envío Seguro y Garantía Oficial M Store.',
      price: 'HASTA 30% OFF',
      oldPrice: '',
      badge: 'Envíos Nacionales Asegurados a Todo el País',
      image: '/mstore_hero_banner.jpg',
      bgGradient: 'from-blue-950/90 via-[#0A0908] to-cyan-950/90'
    },
    {
      id: 1,
      tag: 'OFERTA DESTACADA',
      title: 'Smart TV 75" Neo QLED 4K AI',
      subtitle: 'Síragon & Samsung Pro Series',
      highlight: 'Pantalla Gigante 120Hz',
      desc: 'Experiencia de cine en casa con procesamiento de IA. Incluye combo especial de regalo: Barra de Sonido Dolby Atmos + Instalación Oficial a Domicilio.',
      price: '$1,499.00',
      oldPrice: '$1,899.00',
      discount: '21% OFF',
      badge: 'Combo Soundbar + Instalación Gratis',
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop',
      bgGradient: 'from-blue-950/90 via-[#0A0908] to-cyan-950/90'
    },
    {
      id: 2,
      tag: 'ZONA APPLE',
      title: 'iPhone 16 Pro Max 1TB Titanio',
      subtitle: 'Edición Titanio Negro',
      highlight: 'Procesador A18 Pro 3nm',
      desc: 'El smartphone más potente con botón de cámara táctil. Regalo especial: Funda MagSafe Oficial + Vidrio Templado + Envío 24H.',
      price: '$1,299.00',
      oldPrice: '$1,499.00',
      discount: '13% OFF',
      badge: 'Garantía Oficial M Store 1 Año',
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpeg',
      bgGradient: 'from-[#00E5FF]/20 via-[#0A0908] to-purple-950/90'
    },
    {
      id: 3,
      tag: 'LÍNEA BLANCA SMART',
      title: 'Nevera Síragon 18 Pies Inverter',
      subtitle: 'Tecnología No Frost & Dispensador',
      highlight: 'Ahorro del 60% de Luz',
      desc: 'Compresor Inverter inteligente de alta eficiencia con control de temperatura digital y acabados de acero inoxidable.',
      price: '$899.00',
      oldPrice: '$1,099.00',
      discount: '18% OFF',
      badge: '5 Años de Garantía en Compresor',
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=800&auto=format&fit=crop',
      bgGradient: 'from-emerald-950/90 via-[#0A0908] to-cyan-950/90'
    }
  ];

  // Countdown timer
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

  // CATÁLOGO BASE — 1 producto representativo por categoría (editables desde Admin)
  const defaultCatalogProducts = [
    {
      id: 'p-1', category: 'televisores', brand: 'siragon',
      name: 'Smart TV 55" 4K UHD Google TV Síragon',
      price: 499.00, originalPrice: 599.00, rating: 4.9,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?q=80&w=600&auto=format&fit=crop',
      specs: ['Google TV Oficial', '4K UHD', 'HDR10+', 'Control por Voz'],
      description: 'Televisor 55 pulgadas con sistema Google TV, acceso a Netflix, YouTube, Disney+ y Google Assistant integrado.'
    },
    {
      id: 'p-2', category: 'computadoras', brand: 'samsung',
      name: 'Laptop Samsung Galaxy Book4 Pro 16"',
      price: 1299.00, originalPrice: 1499.00, rating: 4.9,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop',
      specs: ['Intel Core Ultra 7', 'RAM 16GB LPDDR5', 'SSD 512GB NVMe', 'Pantalla AMOLED 3K'],
      description: 'Laptop ultradelgada premium con pantalla AMOLED de 3K, procesador de última generación y batería de 76Wh.'
    },
    {
      id: 'p-3', category: 'aires', brand: 'lg',
      name: 'Aire Acondicionado LG 18000 BTU Inverter V',
      price: 549.00, originalPrice: 649.00, rating: 4.8,
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=600&auto=format&fit=crop',
      specs: ['Inverter V Ahorro 70%', 'Wi-Fi ThinQ', 'Filtro PM1.0', 'Gas R32 Ecológico'],
      description: 'Aire acondicionado Inverter de alto rendimiento con control inteligente desde tu smartphone y máxima eficiencia energética.'
    },
    {
      id: 'p-4', category: 'telefonos', brand: 'apple',
      name: 'iPhone 16 Pro Max 256GB Titanio Negro',
      price: 1199.00, originalPrice: 1399.00, rating: 5.0,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpeg',
      specs: ['Chip A18 Pro 3nm', 'Cámara 48MP ProRAW', 'Titanio Grado 5', 'Batería 33h video'],
      description: 'El iPhone más avanzado. Diseño en titanio, sistema de cámaras profesional con botón de cámara táctil y chip A18 Pro.'
    },
    {
      id: 'p-5', category: 'neveras', brand: 'siragon',
      name: 'Nevera Síragon No Frost 18 Pies Inverter',
      price: 899.00, originalPrice: 1099.00, rating: 4.9,
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=600&auto=format&fit=crop',
      specs: ['Compresor Inverter', 'No Frost Total', 'Dispensador de Agua', 'Acero Inoxidable'],
      description: 'Nevera de alta eficiencia con compresor Inverter, panel digital y diseño en acero inoxidable anti-huellas.'
    },
    {
      id: 'p-6', category: 'lavadoras', brand: 'lg',
      name: 'Lavadora LG Carga Frontal 12KG Steam AI',
      price: 749.00, originalPrice: 899.00, rating: 4.9,
      image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=600&auto=format&fit=crop',
      specs: ['Motor AI Direct Drive', 'Lavado a Vapor', '10 Años Garantía Motor', 'EcoHybrid'],
      description: 'Lavadora de carga frontal con inteligencia artificial que detecta el tipo de tela y ajusta el ciclo automáticamente.'
    },
    {
      id: 'p-7', category: 'audio', brand: 'samsung',
      name: 'Soundbar Samsung HW-Q990D 11.1.4ch Dolby',
      price: 699.00, originalPrice: 849.00, rating: 4.8,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop',
      specs: ['11.1.4 Canales', 'Dolby Atmos', 'DTS:X', 'SpaceFit Sound Pro'],
      description: 'Barra de sonido premium con tecnología Dolby Atmos, 11 altavoces integrados y configuración automática de audio.'
    }
  ];

  // Combined product list
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

    setToastMsg(`¡${prodObj.name} añadido al Carrito!`);
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
    let orderText = `*¡NUEVA ORDEN DE COMPRA M STORE #${orderNumber}!*\n\n`;
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
    { name: 'Zona Samsung', filterId: 'samsung', logo: 'SAMSUNG', desc: 'Smart TVs & Galaxy' },
    { name: 'Zona Apple', filterId: 'apple', logo: ' APPLE', desc: 'iPhone & AirPods' },
    { name: 'Zona Xiaomi', filterId: 'xiaomi', logo: 'XIAOMI', desc: 'Smartphones & Smart Home' },
    { name: 'Zona LG', filterId: 'lg', logo: 'LG ELECTRONICS', desc: 'Línea Blanca Inverter' },
    { name: 'Zona Soneview', filterId: 'soneview', logo: 'SONEVIEW', desc: 'Google TVs & Audio' },
    { name: 'Zona Viotto', filterId: 'viotto', logo: 'VIOTTO', desc: 'Smart TVs Económicos' }
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
    <div className="min-h-screen bg-[#0A0908] text-white font-inter selection:bg-[#00E5FF] selection:text-black relative pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#00E5FF] text-black font-bold font-space text-xs px-4 py-3 rounded-2xl shadow-[0_0_25px_#00E5FF] flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* MICRO-BANNER SUPERIOR FORMAL (SOLO EN ESCRITORIO) */}
      <div className="hidden md:block bg-[#050B14] border-b border-white/10 text-[11px] font-space text-slate-300 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="text-[#00E5FF]">🚚</span> Envíos a Nivel Nacional
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#00E5FF]">🛡️</span> Garantía Oficial M Store 1 Año
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#00E5FF] font-semibold">
            <span>💬 Atención Personalizada por WhatsApp</span>
          </div>
        </div>
      </div>

      {/* HEADER PRINCIPAL RESPONSIVE */}
      <header className="sticky top-0 z-40 bg-[#0A0908]/95 backdrop-blur-xl border-b border-[#00E5FF]/30 px-3 sm:px-6 md:px-8 py-2.5 md:py-3">
        <div className="max-w-7xl mx-auto">
          
          {/* Fila Única en Móvil (Logo + Buscador) / Fila Completa en Escritorio */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-4">
            
            {/* Logo M Store */}
            <div className="shrink-0 flex items-center">
              <Logo size="medium" />
            </div>

            {/* BUSCADOR MÓVIL CON DESPLEGABLE PREDICTIVO EN TIEMPO REAL */}
            <div className="flex-1 md:hidden relative">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  aria-label="Buscar productos"
                  className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 outline-none font-inter min-h-[40px]"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Desplegable Predictivo Móvil */}
              {searchQuery.trim().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0E17]/98 border border-[#00E5FF]/40 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden z-50 divide-y divide-white/10 max-h-72 overflow-y-auto">
                  {filteredProducts.slice(0, 5).map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => { setQuickViewProduct(p); setSearchQuery(''); }}
                      className="p-3 flex items-center gap-3 hover:bg-[#00E5FF]/10 cursor-pointer transition-colors text-left"
                    >
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-contain bg-white rounded-lg p-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold font-space text-white truncate">{p.name}</h5>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white font-bold font-inter">${p.price.toFixed ? p.price.toFixed(2) : p.price} USD</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="p-4 text-xs text-slate-400 font-space text-center">No se encontraron productos para "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>

            {/* EN ESCRITORIO (md+): Menú Categorías + Buscador + Carrito */}
            <div className="hidden md:flex flex-1 items-center gap-4 mx-4">
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

              {/* Buscador Amplio en Escritorio con Desplegable Predictivo */}
              <div className="flex-1 max-w-xl relative">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-300 absolute left-4 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar televisores, neveras, cocinas, lavadoras, teléfonos..."
                    aria-label="Buscar productos por nombre"
                    className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded-full pl-11 pr-8 py-2.5 text-xs text-white placeholder-slate-400 outline-none font-inter min-h-[44px]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Desplegable Predictivo Escritorio */}
                {searchQuery.trim().length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0E17]/98 border border-[#00E5FF]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden z-50 divide-y divide-white/10 max-h-80 overflow-y-auto">
                    {filteredProducts.slice(0, 6).map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => { setQuickViewProduct(p); setSearchQuery(''); }}
                        className="p-3.5 flex items-center gap-3.5 hover:bg-[#00E5FF]/10 cursor-pointer transition-colors text-left"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-contain bg-white rounded-xl p-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold font-space text-white truncate">{p.name}</h5>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-white font-bold font-inter">${p.price.toFixed ? p.price.toFixed(2) : p.price} USD</span>
                          </div>
                        </div>
                        <span className="text-[#00E5FF] font-bold font-space text-xs hover:underline shrink-0">Ver &rarr;</span>
                      </div>
                    ))}
                    {filteredProducts.length === 0 && (
                      <div className="p-4 text-xs text-slate-400 font-space text-center">No se encontraron resultados para "{searchQuery}"</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Carrito de Compras en Escritorio (md+) */}
            <div className="hidden md:flex items-center shrink-0 text-xs font-space">
              <button 
                onClick={() => setIsCartOpen(true)}
                aria-label={`Ver Carrito de Compras (${cartItems.reduce((a, b) => a + b.quantity, 0)} productos)`}
                className="relative cursor-pointer p-3 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/50 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Ver Carrito de Compras"
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
        </div>
      </header>

      {/* MENÚ DE CATEGORÍAS 5 COLUMNAS DIRECTAS IVOO */}
      <CategoryMegaMenuTest
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={handleCategorySelectFromMenu}
        customCategories={customCategories}
      />

      {/* HERO BANNER PRINCIPAL (Limpio, Elegante y Espacioso) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6" aria-label="Banners Principales de Ofertas">
        <div className={`relative rounded-3xl overflow-hidden glass-card border border-[#00E5FF]/40 min-h-[400px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-10 pt-8 sm:pt-10 pb-8 transition-all duration-700 bg-gradient-to-r ${heroSlides[currentSlide].bgGradient} shadow-[0_0_40px_rgba(0,229,255,0.2)]`}>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
            
            {/* TEXT & PRICE COLUMN */}
            <div className="lg:col-span-7 space-y-4 text-left">
              {/* Badge Única */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/50 text-[#00E5FF] text-xs font-extrabold font-space uppercase shadow-[0_0_12px_rgba(0,229,255,0.3)]">
                  <Flame className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="truncate">{heroSlides[currentSlide].tag}</span>
                </div>
              </div>

              {/* Título Limpio de 2 Líneas Max */}
              <div className="space-y-1">
                <p className="text-xs font-bold font-space text-slate-300 uppercase tracking-wider">{heroSlides[currentSlide].subtitle}</p>
                <h1 className="text-2xl sm:text-4xl xl:text-5xl font-extrabold font-space text-white leading-tight">
                  {heroSlides[currentSlide].title}
                </h1>
              </div>

              {/* Descripción Corta */}
              <p className="text-slate-300 text-xs sm:text-sm font-inter leading-relaxed line-clamp-2 max-w-xl">
                {heroSlides[currentSlide].desc}
              </p>

              {/* Precio + Botón de Comprar */}
              <div className="space-y-3 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black font-inter text-white tracking-tight">
                    {heroSlides[currentSlide].price}
                  </span>
                  <span className="text-xs font-extrabold text-[#00E5FF] font-inter">USD</span>
                  {heroSlides[currentSlide].oldPrice && (
                    <span className="text-xs sm:text-sm text-slate-400 line-through font-inter ml-1">
                      {heroSlides[currentSlide].oldPrice}
                    </span>
                  )}
                </div>

                <div>
                  <button 
                    onClick={() => handleAddToCart({ id: heroSlides[currentSlide].id, name: heroSlides[currentSlide].title, price: 1499.00, image: heroSlides[currentSlide].image })}
                    aria-label={`Comprar ${heroSlides[currentSlide].title}`}
                    className="w-full sm:w-auto btn-cyan-glow px-6 py-3 rounded-xl text-black font-extrabold text-xs font-space uppercase tracking-wider shadow-[0_0_20px_#00E5FF] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                  >
                    <span>Comprar Ahora</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Garantía / Badge Adicional */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold font-space">
                  <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{heroSlides[currentSlide].badge}</span>
                </div>
              </div>
            </div>

            {/* PRODUCT PHOTO / BANNER CONTAINER */}
            <div className="lg:col-span-5 flex justify-center relative">
              {heroSlides[currentSlide].image.endsWith('.jpg') ? (
                <div className="w-full max-w-md h-48 sm:h-60 rounded-3xl overflow-hidden border-2 border-[#00E5FF]/50 shadow-[0_0_35px_rgba(0,229,255,0.35)] group transition-transform hover:scale-105 bg-black/60 p-1 flex items-center justify-center">
                  <img 
                    src={heroSlides[currentSlide].image} 
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" 
                  />
                </div>
              ) : (
                <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-3xl bg-white p-4 border-2 border-[#00E5FF]/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.25)] group transition-transform hover:scale-105">
                  <img 
                    src={heroSlides[currentSlide].image} 
                    alt={heroSlides[currentSlide].title}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]" 
                  />
                </div>
              )}
            </div>

          </div>

          {/* CONTROLES DE SLIDER EN SU PROPIA FILA SEPARADA */}
          <div className="w-full flex items-center justify-center sm:justify-end gap-2 pt-6 sm:pt-0 sm:absolute sm:bottom-6 sm:right-8 z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length); }}
              aria-label="Ver slide anterior"
              className="p-2 rounded-full bg-black/70 border border-white/20 hover:border-[#00E5FF] text-white hover:text-[#00E5FF] transition-all min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-1.5 items-center px-1">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(idx); }}
                  aria-label={`Ir al slide ${idx + 1}`}
                  className="p-1 flex items-center justify-center focus-visible:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-6 h-2 bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]'
                        : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(prev => (prev + 1) % heroSlides.length); }}
              aria-label="Ver siguiente slide"
              className="p-2 rounded-full bg-black/70 border border-white/20 hover:border-[#00E5FF] text-white hover:text-[#00E5FF] transition-all min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* CONTENEDORES CENTRALES ELEGANTES CYBER MATTE (ENMARCADOS SIN BLANCO EXCESIVO) */}
      <div className="bg-[#0A0908] text-white py-10 space-y-12 font-inter">
        
        {/* CINTA DE MARCAS OFICIALES — CARRUSEL MINIMALISTA EN 1 FILA */}
        <section className="max-w-7xl mx-auto px-4 md:px-8" aria-label="Marcas Oficiales">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {officialBrands.map((b, idx) => (
              <button 
                key={idx}
                onClick={() => handleCategorySelectFromMenu(b.filterId, b.name)}
                aria-label={`Filtrar productos de ${b.name}`}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#F8FAFC] border-2 border-slate-200 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 shadow-sm focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none transition-all group shrink-0 active:scale-95 min-h-[44px]"
              >
                <span className="w-2 h-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF] shrink-0 group-hover:scale-125 transition-transform"></span>
                <span className="text-xs font-extrabold font-space text-slate-900 group-hover:text-[#0066FF] tracking-wider whitespace-nowrap">{b.logo}</span>
                <span className="text-[10px] text-slate-500 font-inter whitespace-nowrap">({b.desc})</span>
              </button>
            ))}
          </div>
        </section>

        {/* CALCULADORA DE FINANCIAMIENTO & CUOTAS (SECCIÓN OSCURA CYBER MATTE DE ALTO IMPACTO) */}
        <section className="bg-[#0B0E17] py-12 border-t border-b border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#00E5FF]/30 shadow-[0_0_40px_rgba(0,229,255,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-extrabold font-space uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>Simulador de Cuotas & Financiamiento</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-space text-white">
                  Calcula tu Compra en <span className="gradient-text-cyan">Cómodas Cuotas</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-inter leading-relaxed">
                  Ajusta el monto total de tu equipo y selecciona el plazo deseado para consultar la cuota estimada al mes sin papeleos molestos.
                </p>

                {/* Slider de Monto */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-extrabold font-space text-slate-200">
                    <span>Monto Total del Producto:</span>
                    <span className="text-lg text-[#00E5FF] font-black">${calcAmount} USD</span>
                  </div>
                  <input 
                    type="range" 
                    min="200" 
                    max="3000" 
                    step="50" 
                    value={calcAmount} 
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full accent-[#00E5FF] cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-inter">
                    <span>$200 USD</span>
                    <span>$1,500 USD</span>
                    <span>$3,000 USD</span>
                  </div>
                </div>

                {/* Plazos de Meses */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-extrabold font-space text-slate-300">Plazo:</span>
                  {[3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setCalcMonths(m)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold font-space transition-all border ${
                        calcMonths === m
                          ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_#00E5FF]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-[#00E5FF]'
                      }`}
                    >
                      {m} Meses
                    </button>
                  ))}
                </div>
              </div>

              {/* Resultado de Cuota Estándar */}
              <div className="lg:col-span-6 bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-[#00E5FF]/40 flex flex-col justify-between items-center text-center space-y-5 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                <div>
                  <span className="text-xs font-extrabold text-[#00E5FF] uppercase tracking-widest font-space">Cuota Estimada al Mes</span>
                  <div className="text-4xl sm:text-6xl font-black font-inter text-white tracking-tight mt-2">
                    ${Math.round(calcAmount / calcMonths)} <span className="text-sm font-extrabold text-[#00E5FF]">USD/mes</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-inter mt-1">Plan a {calcMonths} meses por un valor total de ${calcAmount} USD</p>
                </div>

                <a
                  href={`https://wa.me/584120000000?text=Hola%20M%20Store!%20Me%20interesa%20un%20financiamiento%20para%20un%20equipo%20de%20$${calcAmount}%20USD%20en%20cuotas%20de%20$${Math.round(calcAmount / calcMonths)}/mes.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-cyan-glow py-3.5 rounded-2xl text-black font-extrabold text-xs font-space uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_#00E5FF] hover:scale-105 active:scale-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Solicitar Cuota por WhatsApp &rarr;</span>
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* COMPARADOR TÉCNICO DE FLAGSHIPS (SECCIÓN OSCURA CYBER MATTE) */}
        <section className="bg-[#080C14] py-12 border-b border-white/10 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-extrabold font-space uppercase mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Comparador Técnico de Gama Alta</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-extrabold font-space text-white">
                    Compara los Flagships del Momento
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCompareTab('phones')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold font-space border transition-all ${
                      compareTab === 'phones'
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_#00E5FF]'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-[#00E5FF]'
                    }`}
                  >
                    Smartphones Pro
                  </button>
                  <button
                    onClick={() => setCompareTab('tvs')}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold font-space border transition-all ${
                      compareTab === 'tvs'
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_#00E5FF]'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-[#00E5FF]'
                    }`}
                  >
                    Smart TVs 4K
                  </button>
                </div>
              </div>

              {compareTab === 'phones' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-inter text-xs">
                  {[
                    {
                      name: ' iPhone 16 Pro Max',
                      badge: 'Apple Titanio',
                      screen: '6.9" Super Retina XDR 120Hz',
                      chip: 'Procesador A18 Pro 3nm',
                      camera: '48MP Fusion + 5x Telefoto',
                      battery: 'Hasta 33h de Video',
                      price: '$1,299.00 USD'
                    },
                    {
                      name: 'Samsung Galaxy S24 Ultra',
                      badge: 'Galaxy AI',
                      screen: '6.8" Dynamic AMOLED 2X',
                      chip: 'Snapdragon 8 Gen 3',
                      camera: '200MP + 50MP Periscopio',
                      battery: '5,000 mAh Carga 45W',
                      price: '$1,199.00 USD'
                    },
                    {
                      name: 'Xiaomi 14 Ultra Leica',
                      badge: 'Camara Leica 1"',
                      screen: '6.73" LTPO OLED 3000 nits',
                      chip: 'Snapdragon 8 Gen 3',
                      camera: 'Cuádruple 50MP Leica 1"',
                      battery: '5,000 mAh Carga 90W',
                      price: '$1,099.00 USD'
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/50 rounded-2xl p-5 border border-white/10 space-y-3 hover:border-[#00E5FF] transition-all shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 px-2.5 py-1 rounded-full font-space">{item.badge}</span>
                        <span className="font-extrabold text-[#00E5FF] text-sm font-space">{item.price}</span>
                      </div>
                      <h4 className="font-black text-sm text-white font-space">{item.name}</h4>
                      <ul className="space-y-2 text-slate-300 pt-2 border-t border-white/10">
                        <li>📱 <strong>Pantalla:</strong> {item.screen}</li>
                        <li>⚡ <strong>Chipset:</strong> {item.chip}</li>
                        <li>📸 <strong>Cámara:</strong> {item.camera}</li>
                        <li>🔋 <strong>Batería:</strong> {item.battery}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-inter text-xs">
                  {[
                    {
                      name: 'Smart TV 75" Neo QLED 4K Samsung',
                      badge: 'Samsung OLED',
                      screen: '75 Pulgadas Neo QLED 4K 120Hz',
                      chip: 'Procesador NQ4 AI Gen2',
                      sound: 'Dolby Atmos 60W',
                      price: '$1,499.00 USD'
                    },
                    {
                      name: 'Smart TV 55" Google TV Síragon',
                      badge: 'Síragon Official',
                      screen: '55 Pulgadas 4K UHD Direct LED',
                      chip: 'Google TV AI OS',
                      sound: 'Dolby Audio Surround',
                      price: '$499.00 USD'
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/50 rounded-2xl p-5 border border-white/10 space-y-3 hover:border-[#00E5FF] transition-all shadow-md">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/30 px-2.5 py-1 rounded-full font-space">{item.badge}</span>
                        <span className="font-extrabold text-[#00E5FF] text-sm font-space">{item.price}</span>
                      </div>
                      <h4 className="font-black text-sm text-white font-space">{item.name}</h4>
                      <ul className="space-y-2 text-slate-300 pt-2 border-t border-white/10">
                        <li>📺 <strong>Panel:</strong> {item.screen}</li>
                        <li>🧠 <strong>Sistema:</strong> {item.chip}</li>
                        <li>🔊 <strong>Sonido:</strong> {item.sound}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CATÁLOGO PRINCIPAL DE PRODUCTOS (ENMARCADO EN TARJETA CYBER MATTE) */}
        <main id="catalogo-productos" className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-8">

            {/* CATALOG HEADER */}
            <div className="space-y-4 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/40 text-xs font-extrabold font-space uppercase mb-1">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Catálogo M Store</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-space text-white">
                    {selectedCategoryName}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5 font-inter">{filteredProducts.length} productos disponibles con envío inmediato</p>
                </div>
              </div>

              {/* CATEGORY QUICK FILTER PILLS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-space">
                {[
                  { id: 'todos',        name: 'Todos los Productos', Icon: LayoutGrid },
                  { id: 'televisores',  name: 'Televisores',    Icon: Tv },
                  { id: 'computadoras', name: 'Computadoras',   Icon: Laptop },
                  { id: 'aires',        name: 'Aires A/C',      Icon: Wind },
                  { id: 'telefonos',    name: 'Teléfonos',      Icon: Smartphone },
                  { id: 'neveras',      name: 'Neveras',        Icon: Refrigerator },
                  { id: 'lavadoras',    name: 'Lavadoras',      Icon: WashingMachine },
                  { id: 'audio',        name: 'Audio',          Icon: Headphones },
                  ...customCategories.map(c => ({ id: c.id, name: c.name, Icon: LayoutGrid }))
                ].map(({ id, name, Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleCategorySelectFromMenu(id, name)}
                    aria-label={`Filtrar por ${name}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold font-space transition-all border shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:outline-none ${
                      selectedCategory === id
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_15px_#00E5FF]'
                        : 'bg-white/5 text-slate-200 border-white/10 hover:border-[#00E5FF] hover:text-[#00E5FF]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>

          {/* PRODUCTS GRID (DISEÑADO EN TARJETAS BLANCAS LIMPIAS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-[#00E5FF] transition-all flex flex-col justify-between space-y-3 group hover:shadow-[0_12px_30px_rgba(0,229,255,0.2)] cursor-pointer"
                onClick={() => setQuickViewProduct(p)}
                role="button"
                aria-label={`Ver detalles de ${p.name}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setQuickViewProduct(p)}
              >
                {/* IMAGE AREA (Crisp White Studio Frame) */}
                <div className="w-full h-48 rounded-xl bg-[#F8FAFC] p-3 flex items-center justify-center relative overflow-hidden border border-slate-100 group-hover:border-[#00E5FF] transition-all shadow-inner">
                  {/* Quick view hover badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl z-10">
                    <span className="bg-[#00E5FF] text-black text-[10px] font-extrabold font-space px-3 py-1.5 rounded-full shadow-[0_0_15px_#00E5FF] uppercase">
                      VER DETALLES →
                    </span>
                  </div>

                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.1)]" />
                </div>

                {/* PRODUCT INFO */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1 text-amber-500 text-[11px] font-space font-bold">
                    <span>★ {p.rating || '5.0'}</span>
                    <span className="text-slate-500">(142 reseñas)</span>
                  </div>
                  <h3 className="text-xs font-extrabold font-space text-slate-900 group-hover:text-[#0066FF] line-clamp-2 min-h-[32px] transition-colors">{p.name}</h3>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-lg font-black text-slate-900 font-inter tracking-tight">
                      ${p.price.toFixed ? p.price.toFixed(2) : p.price}
                    </span>
                    <span className="text-xs font-extrabold text-[#0066FF] font-inter">USD</span>
                    {p.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-inter ml-1">
                        ${p.originalPrice.toFixed ? p.originalPrice.toFixed(2) : p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* ACTION BUTTON — solo Carrito */}
                <div className="pt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}
                    aria-label={`Añadir ${p.name} al carrito`}
                    className="w-full btn-cyan-glow py-2.5 rounded-xl text-xs font-extrabold font-space text-black active:scale-95 focus-visible:ring-2 focus-visible:ring-black shadow-[0_0_15px_rgba(0,229,255,0.4)] min-h-[44px] uppercase tracking-wider"
                  >
                    Añadir al Carrito
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
                className="px-8 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-[#0066FF] font-extrabold text-xs font-space hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF] focus-visible:ring-2 focus-visible:ring-[#00E5FF] transition-all shadow-md active:scale-95 min-h-[44px]"
              >
                Cargar Más Productos del Catálogo &darr;
              </button>
            </div>
            )}

          </div>
        </main>

        {/* SECCIÓN TIENDA FÍSICA Y MAPA (ENMARCADA EN CYBER MATTE) */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <LocationSection isLightBg={false} />
        </div>

      </div>

      {/* FOOTER LIMPIO EN NEGRO EN EL PIE DE PÁGINA */}
      <Footer />

      {/* DRAWER DE CARRITO CON CHECKOUT DIRECTO A WHATSAPP EN USD ($) */}
      {isCartOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          aria-label="Carrito de Compras"
          className="fixed inset-0 z-[60] flex justify-end animate-fadeIn"
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
                  <span>Tu Carrito de Compras</span>
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
                  aria-label="Finalizar Compra enviando pedido a WhatsApp"
                  className="w-full btn-cyan-glow py-3.5 rounded-2xl text-black font-extrabold text-xs font-space uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_#00E5FF] min-h-[44px]"
                >
                  <Phone className="w-4 h-4 fill-black" />
                  <span>Finalizar Compra por WhatsApp</span>
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

      {/* SECRET ADMIN PANEL MODAL (ACCESIBLE VÍA HASH #admin O TECLADO) */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }}
        products={adminProducts}
        onAddProduct={onAddProduct}
        onUpdateProduct={onUpdateProduct}
        onRemoveProduct={onRemoveProduct}
        categories={customCategories}
        onAddCategory={onAddCategory}
        onRemoveCategory={onRemoveCategory}
      />

      {/* WIDGET CHAT DE SOPORTE FLOTANTE (SE OCULTA AUTOMÁTICAMENTE CUANDO HAY MODALES O CARRITO ABIERTO) */}
      <SupportChatWidget isHidden={isMegaMenuOpen || isCartOpen || isAdminOpen || Boolean(quickViewProduct)} />

      {/* BARRA NAVEGADORA INFERIOR TIPO APP PARA CELULARES (SE OCULTA CUANDO HAY MODALES O CARRITO ABIERTO) */}
      <MobileBottomNav 
        isHidden={isMegaMenuOpen || isCartOpen || isAdminOpen || Boolean(quickViewProduct)}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onScrollToLocation={() => {
          const el = document.getElementById('ubicacion');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
      />

    </div>
  );
};
