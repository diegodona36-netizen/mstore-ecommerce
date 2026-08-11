import React, { useState, useMemo } from 'react';
import { 
  Search, ShoppingBag, ArrowLeft, Truck,
  ChevronRight, Filter, Phone, Check, X,
  User, MapPin, CreditCard, Tv, Smartphone, Laptop, Gamepad2, Printer, Tablet, Watch, Headphones, Zap
} from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { Logo } from './Logo';

/* ────────────────────────── DATA DE SOYTECHNO ────────────────────────── */

// Marcas destacadas estilo SoyTechno
const BRAND_CIRCLES = [
  { id: 'Samsung', label: 'Teléfono Celular Samsung', logoText: 'SAMSUNG', color: 'text-blue-800' },
  { id: 'Apple', label: 'iPhone', logoText: '', color: 'text-black text-2xl' },
  { id: 'Honor', label: 'Teléfono Celular Honor', logoText: 'HONOR', color: 'text-slate-800 tracking-widest' },
  { id: 'Xiaomi', label: 'Teléfono Celular Xiaomi', logoText: 'mi', color: 'text-orange-500 font-extrabold text-xl' },
  { id: 'Tecno', label: 'Teléfono Celular Tecno', logoText: 'TECNO', color: 'text-blue-600 font-black' },
  { id: 'Vivo', label: 'Teléfono Celular Vivo', logoText: 'vivo', color: 'text-sky-600 font-extrabold' },
  { id: 'Oukitel', label: 'Teléfono Celular Oukitel', logoText: 'OUKITEL', color: 'text-slate-700 font-bold text-xs' },
];

// Catálogo Real extraído de soytechno.com
const REAL_SOYTECHNO_PRODUCTS = [
  {
    id: 'st-real-1',
    brand: 'Honor',
    name: 'Honor 600e – 6.6” – 8GB / 256GB (Procesador Dimensity 7100 Elite, Cámara 108MP)',
    price: 451.00,
    oldPrice: 579.00,
    discount: '22% OFF',
    ram: '8GB',
    storage: '256GB',
    network: '5G',
    badge: 'MÁS VENDIDO',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop',
    specs: 'Pantalla AMOLED 120Hz | Batería 6320mAh | Resistencia IP66 | Carga Rápida'
  },
  {
    id: 'st-real-2',
    brand: 'Samsung',
    name: 'Teléfono Celular Samsung Galaxy S25 Ultra 512GB / 12GB RAM Titanio',
    price: 910.00,
    oldPrice: 999.00,
    discount: '9% OFF',
    ram: '12GB',
    storage: '512GB',
    network: '5G',
    badge: 'OFICIAL ZONA SAMSUNG',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop',
    specs: 'Procesador Snapdragon 8 Elite | Cámara 200MP Zoom 100x | S-Pen Integrado'
  },
  {
    id: 'st-real-3',
    brand: 'Vivo',
    name: 'Teléfono Celular Vivo V40 SE – 6.67″ / 8GB / 256GB',
    price: 337.00,
    oldPrice: 430.00,
    discount: '21% OFF',
    ram: '8GB',
    storage: '256GB',
    network: '5G',
    badge: 'ENVÍO GRATIS',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop',
    specs: 'Pantalla AMOLED 120Hz | Carga Rápida FlashCharge 80W | Dual Stereo Speakers'
  },
  {
    id: 'st-real-4',
    brand: 'Vivo',
    name: 'Teléfono Celular Vivo Y19S – 6.6″ / 6GB / 256GB',
    price: 179.00,
    oldPrice: 228.00,
    discount: '21% OFF',
    ram: '6GB',
    storage: '256GB',
    network: '4G',
    badge: 'OFERTA DESTACADA',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop',
    specs: 'Batería 5500mAh | Resistente a caídas y salpicaduras | Luz de Notificaciones RGB'
  },
  {
    id: 'st-real-5',
    brand: 'Oukitel',
    name: 'Teléfono Celular Oukitel C67 4G – 6.73” / 8GB / 256GB',
    price: 159.00,
    oldPrice: 199.00,
    discount: '20% OFF',
    ram: '8GB',
    storage: '256GB',
    network: '4G',
    badge: 'ENVÍO GRATIS',
    image: 'https://images.unsplash.com/photo-1546054454-aa25e27610f9?w=500&auto=format&fit=crop',
    specs: 'Batería de larga duración | Pantalla Ultra Fluida 90Hz | Lector de Huella Lateral'
  },
  {
    id: 'st-real-6',
    brand: 'Tecno',
    name: 'Teléfono Celular Tecno Spark 30 Pro 256GB / 8GB RAM – Negro',
    price: 149.00,
    oldPrice: 189.00,
    discount: '21% OFF',
    ram: '8GB',
    storage: '256GB',
    network: '4G',
    badge: 'SUPER PRECIO',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop',
    specs: 'Pantalla AMOLED 120Hz | Cámara 108MP | Procesador Helio G100'
  }
];

// Sucursales Oficiales reales de SoyTechno en Venezuela
const SOYTECHNO_STORES = [
  { name: 'SoyTechno SAMBIL Chacao', address: 'Av. Libertador con calle Los Ángeles, Municipio Chacao, Caracas' },
  { name: 'SoyTechno CCCT', address: 'Av. La Estancia con calle Ernesto Blohm, Municipio Chacao, Caracas' },
  { name: 'SoyTechno City Market', address: 'Blvr. de Sabana Grande, Municipio Libertador, Caracas' },
  { name: 'SoyTechno Blvr. Sabana Grande', address: 'Calle Los Apamates con Av. Francisco Solano, Caracas' },
  { name: 'SoyTechno Los Ilustres', address: 'Los Símbolos, Av. Los Ilustres, Municipio Libertador, Caracas' },
  { name: 'SoyTechno Catia', address: 'Avenida El Cuartel Urdaneta, 1ra Vereda, Caracas' },
  { name: 'SoyTechno Lechería', address: 'Av. Guzmán Lander, Lechería, Estado Anzoátegui' },
];

export function SoyTechnoExperiment({ onBackToMain }) {
  const [selectedBrand, setSelectedBrand] = useState('todos');
  const [selectedRam, setSelectedRam] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currency, setCurrency] = useState('USD'); // USD | VES
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [activeTab, setActiveTab] = useState('catalogo'); // catalogo | tiendas
  const [activeModal, setActiveModal] = useState(null); // 'payment' | 'tracking' | 'club' | 'user' | 'categories' | 'contact' | 'cart' | 'quickview'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingStatus, setTrackingStatus] = useState(null);

  const rateVES = 60.5; // Tasa de cambio referencial Bolívares

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartCount(c => c + 1);
    showToast(`"${product.name.slice(0, 22)}..." agregado al Carrito M Store`);
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;
    setTrackingStatus({
      code: trackingCode.toUpperCase(),
      status: 'EN CAMINO / DESPACHADO',
      courier: 'Tealca Express / Delivery M Store',
      location: 'Centro de Distribución M Store - Caracas',
      eta: 'Hoy antes de las 5:00 PM'
    });
  };

  const filteredProducts = useMemo(() => {
    return REAL_SOYTECHNO_PRODUCTS.filter(p => {
      const matchBrand = selectedBrand === 'todos' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
      const matchRam = selectedRam === 'todos' || p.ram === selectedRam;
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchRam && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'low') return a.price - b.price;
      if (sortBy === 'high') return b.price - a.price;
      return 0;
    });
  }, [selectedBrand, selectedRam, searchQuery, sortBy]);

  const handleWhatsApp = (product) => {
    const priceText = currency === 'USD' ? `$${product.price.toFixed(2)} USD` : `${(product.price * rateVES).toLocaleString('es-VE')} Bs`;
    const msg = `Hola M Store! Deseo realizar la compra directa de: *${product.name}* (${priceText}). ¿Tienen disponibilidad en tienda?`;
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

      {/* 1. BARRA SUPERIOR CIAN NEÓN DE OFERTAS & BANNER CASHEA M STORE */}
      <div className="bg-[#00E5FF] text-slate-950 font-extrabold text-xs py-2 px-4 sm:px-8 flex items-center justify-between shadow-sm border-b border-cyan-400/40">
        <button 
          onClick={onBackToMain}
          className="flex items-center gap-1.5 bg-slate-950/10 hover:bg-slate-950/20 text-slate-950 px-3.5 py-1 rounded-full text-[11px] font-black transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a M Store Principal</span>
        </button>

        <div className="flex items-center gap-2 font-black text-[11px] sm:text-xs tracking-tight text-slate-950">
          <span className="bg-slate-950 text-[#00E5FF] px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-black">M STORE</span>
          <span>Compra en cuotas lo que necesitas hoy con Cashea | Envío Gratis Nacional</span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] font-black text-slate-950">
          <span className="cursor-pointer hover:underline" onClick={() => setActiveTab('tiendas')}>📍 Nuestras Tiendas</span>
          <span>•</span>
          <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer" className="hover:underline">💬 Atención WhatsApp</a>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL AZUL MARINO DEEP NAVY CON LOGO OFICIAL TRANSPARENTE */}
      <header className="bg-[#0C1A38] text-white py-3.5 px-4 sm:px-8 shadow-xl border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* LOGO OFICIAL M STORE */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setSelectedBrand('todos'); setActiveTab('catalogo'); }}>
            <Logo variant="dark" size="medium" />
          </div>

          {/* BUSCADOR EN TIEMPO REAL CON BOTÓN AZUL CIRCULAR */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Búsqueda de productos (Ej. Honor 600e, Samsung S25, Vivo V40...)"
                className="w-full bg-white text-slate-900 rounded-full pl-5 pr-14 py-2.5 text-xs placeholder-slate-400 outline-none shadow-inner border border-slate-200"
              />
              <button className="absolute right-1 w-9 h-9 rounded-full bg-[#0055FF] hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MENÚ DERECHA: ENVÍOS + WHATSAPP + CARRITO */}
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
              <button 
                onClick={() => setActiveModal('user')}
                className="p-2 text-white hover:text-[#00E5FF] transition-colors"
                title="Mi Cuenta"
              >
                <User className="w-5 h-5" />
              </button>
              <div 
                className="relative cursor-pointer hover:scale-105 transition-transform" 
                onClick={() => setActiveModal('cart')}
              >
                <ShoppingBag className="w-6 h-6 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#00E5FF] text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 3. BARRA BLANCA DE CATEGORÍAS & MENÚS INTERACTIVOS */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2.5 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 text-xs font-bold text-slate-700">
          
          <button 
            onClick={() => setActiveModal('categories')}
            className="bg-[#0055FF] text-white px-5 py-2 rounded-full font-extrabold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm active:scale-95"
          >
            <span>≡ Categorías</span>
          </button>

          <div className="flex items-center gap-6">
            <span 
              className={`hover:text-blue-600 cursor-pointer ${activeTab === 'catalogo' && selectedBrand === 'todos' ? 'text-blue-600 font-black' : ''}`} 
              onClick={() => { setSelectedBrand('todos'); setActiveTab('catalogo'); }}
            >
              Tienda electrónica
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer text-red-600 font-black"
              onClick={() => { setSelectedBrand('todos'); setSortBy('low'); setActiveTab('catalogo'); showToast('Mostrando ofertas destacadas'); }}
            >
              Ofertas M Store
            </span>
            <span 
              className={`hover:text-blue-600 cursor-pointer ${activeTab === 'tiendas' ? 'text-blue-600 font-black' : ''}`} 
              onClick={() => setActiveTab('tiendas')}
            >
              Ubicaciones / Tiendas
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => setActiveModal('payment')}
            >
              Métodos de pago
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => setActiveModal('contact')}
            >
              Nosotros
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => setActiveModal('contact')}
            >
              Contacto
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => setActiveModal('tracking')}
            >
              Rastrea tu pedido
            </span>
            <span 
              className="hover:text-blue-600 cursor-pointer text-blue-600 font-black"
              onClick={() => setActiveModal('club')}
            >
              Club M Store
            </span>
          </div>

        </div>
      </nav>

      {/* 4. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>
          <span className="hover:underline cursor-pointer" onClick={onBackToMain}>Inicio</span> / <span className="text-slate-900 font-bold">Teléfonos Celulares</span>
        </div>
        <div>
          Mostrando 1–{filteredProducts.length} de {REAL_SOYTECHNO_PRODUCTS.length} resultados reales
        </div>
      </div>

      {/* 5. CÍRCULOS DE MARCAS DE SOYTECHNO */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
          {BRAND_CIRCLES.map((b) => (
            <div 
              key={b.id}
              onClick={() => { setSelectedBrand(selectedBrand === b.id ? 'todos' : b.id); setActiveTab('catalogo'); }}
              className={`flex flex-col items-center gap-2 cursor-pointer group shrink-0 transition-transform ${selectedBrand === b.id ? 'scale-105' : ''}`}
            >
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all ${selectedBrand === b.id ? 'border-blue-600 ring-4 ring-blue-100' : 'border-slate-200'}`}>
                <span className={`font-black text-sm sm:text-base ${b.color}`}>{b.logoText}</span>
              </div>
              <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 text-center max-w-[110px] leading-tight">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL: CATÁLOGO O TIENDAS */}
      {activeTab === 'catalogo' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col md:flex-row gap-8">
          
          {/* BARRA LATERAL DE FILTROS */}
          <aside className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 text-left">
              <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Filtrar Productos</span>
                <Filter className="w-4 h-4 text-slate-400" />
              </h3>

              {/* FILTRO POR MARCA */}
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-slate-700 block">Marca</span>
                {['todos', 'Honor', 'Samsung', 'Vivo', 'Tecno', 'Oukitel'].map(m => (
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

              {/* FILTRO POR MEMORIA RAM */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-extrabold text-slate-700 block">Memoria RAM</span>
                {['todos', '6GB', '8GB', '12GB'].map(ram => (
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

              {/* BOTÓN RESTABLECER */}
              <button 
                onClick={() => { setSelectedBrand('todos'); setSelectedRam('todos'); setSearchQuery(''); }}
                className="w-full text-center text-xs font-bold text-blue-600 hover:underline pt-2 block"
              >
                Restablecer Filtros
              </button>
            </div>
          </aside>

          {/* MAIN CATALOG GRID */}
          <main className="flex-1 space-y-6">
            
            {/* HEADER DEL CATÁLOGO + USD / VES SELECTOR + SORT */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-black text-[#0C1A38]">Teléfonos Celulares</h2>

              <div className="flex items-center gap-4 text-xs font-bold">
                {/* SELECTOR USD / VES REPLICADO DE SOYTECHNO */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-lg transition-all ${currency === 'USD' ? 'bg-[#0055FF] text-white font-black shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    🇺🇸 USD ($)
                  </button>
                  <button 
                    onClick={() => setCurrency('VES')}
                    className={`px-3 py-1 rounded-lg transition-all ${currency === 'VES' ? 'bg-[#0055FF] text-white font-black shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    🇻🇪 VES (Bs)
                  </button>
                </div>

                {/* ORDENAR POR */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                >
                  <option value="default">Orden predeterminado</option>
                  <option value="low">Precio: Menor a Mayor</option>
                  <option value="high">Precio: Mayor a Menor</option>
                </select>
              </div>
            </div>

            {/* PRODUCT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => {
                const finalPrice = currency === 'USD' ? `$${p.price.toFixed(2)}` : `${(p.price * rateVES).toLocaleString('es-VE')} Bs`;
                const oldPriceText = p.oldPrice ? (currency === 'USD' ? `$${p.oldPrice.toFixed(2)}` : `${(p.oldPrice * rateVES).toLocaleString('es-VE')} Bs`) : null;

                return (
                  <div 
                    key={p.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group relative"
                  >
                    {/* BADGES */}
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">
                        {p.badge}
                      </span>
                      <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {p.discount}
                      </span>
                    </div>

                    {/* IMAGEN DE PRODUCTO CON MARCO LIMPIO */}
                    <div className="w-full h-52 p-3 flex items-center justify-center overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
                      />
                    </div>

                    {/* TITULO Y PRECIOS LEGIBLES */}
                    <div className="space-y-2 text-left">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">{p.brand} • {p.ram} / {p.storage}</span>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-2 min-h-[36px] font-sans">{p.name}</h3>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{p.specs}</p>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-2xl font-black text-slate-900 font-sans tracking-tight">{finalPrice}</span>
                        {oldPriceText && (
                          <span className="text-xs text-slate-400 line-through font-mono ml-auto">{oldPriceText}</span>
                        )}
                      </div>

                      {/* FINANCIAMIENTO CASHEA M STORE */}
                      <div className="bg-[#FFF9C4] border border-amber-300 rounded-2xl p-2.5 flex items-center justify-between text-[11px] font-black text-slate-900 shadow-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border border-amber-400/50">CASHEA</span>
                          <span>Inicial: {currency === 'USD' ? `$${(p.price * 0.4).toFixed(2)}` : `${((p.price * 0.4) * rateVES).toLocaleString('es-VE', { maximumFractionDigits: 0 })} Bs`}</span>
                        </div>
                        <span className="text-[10px] text-amber-900 font-bold">+ 3 cuotas</span>
                      </div>
                    </div>

                    {/* BOTONES */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl transition-colors shrink-0"
                        title="Agregar al Carrito"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleWhatsApp(p)}
                        className="flex-1 bg-[#0055FF] hover:bg-blue-700 text-white font-black py-3 rounded-2xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                      >
                        <span>Comprar por WhatsApp</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </main>

        </div>
      ) : (
        /* VISTA DE SUCURSALES FÍSICAS REALES DE SOYTECHNO EN VENEZUELA */
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6 text-left">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h2 className="text-2xl font-black text-[#0C1A38] flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span>Nuestras Tiendas Oficiales en Venezuela</span>
            </h2>
            <p className="text-xs text-slate-500">
              Retira tu compra totalmente GRATIS en cualquiera de nuestros puntos de Pick-Up en Caracas y Anzoátegui.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOYTECHNO_STORES.map((s, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 hover:border-blue-500 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                  📍
                </div>
                <h3 className="font-extrabold text-sm text-slate-900">{s.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.address}</p>
                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-600 font-extrabold">
                  <Check className="w-4 h-4" />
                  <span>Pick Up Gratis Disponible</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP & BOT ASISTENTE REPLICADOS DE SOYTECHNO */}
      <a 
        href="https://wa.me/584120000000" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>

      <div className="fixed bottom-6 left-6 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-3 text-xs font-bold text-slate-800 hidden sm:flex cursor-pointer hover:border-blue-500 transition-all" onClick={() => setActiveModal('contact')}>
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
          🤖
        </div>
        <span>¿En qué puedo ayudarte? 👋</span>
      </div>

      {/* ────────────────────────── MODALES INTERACTIVOS REALES ────────────────────────── */}

      {/* 1. MODAL MÉTODOS DE PAGO */}
      {activeModal === 'payment' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-left border border-slate-200 animate-in fade-in zoom-in-95">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-[#0C1A38] flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <span>Métodos de Pago Oficiales M Store</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="font-black text-amber-900 block">🟡 CASHEA (3 Cuotas sin interés)</span>
                  <span className="text-slate-600 text-[11px]">Compra hoy pagando solo la inicial con tu app Cashea</span>
                </div>
                <span className="bg-amber-400 text-slate-950 px-2 py-1 rounded font-black text-[10px]">ACTIVO</span>
              </div>
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="font-black text-blue-900 block">🏦 Pago Móvil & Transferencia Bs</span>
                  <span className="text-slate-600 text-[11px]">Banesco, Mercantil, Provincial (Tasa BCV oficial)</span>
                </div>
                <span className="bg-blue-600 text-white px-2 py-1 rounded font-black text-[10px]">BCV</span>
              </div>
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="font-black text-emerald-900 block">💵 Zelle & Dólares Efectivo</span>
                  <span className="text-slate-600 text-[11px]">Pagos directos en USD o retiro en tiendas físicas</span>
                </div>
                <span className="bg-emerald-600 text-white px-2 py-1 rounded font-black text-[10px]">USD</span>
              </div>
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="font-black text-purple-900 block">⚡ Binance Pay (USDT)</span>
                  <span className="text-slate-600 text-[11px]">Transferencia directa QR en criptoactivos estables</span>
                </div>
                <span className="bg-purple-600 text-white px-2 py-1 rounded font-black text-[10px]">CRYPTO</span>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full bg-[#0055FF] text-white font-black py-3 rounded-2xl text-xs hover:bg-blue-700 transition-colors">
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* 2. MODAL RASTREO DE PEDIDO */}
      {activeModal === 'tracking' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-left border border-slate-200">
            <button onClick={() => { setActiveModal(null); setTrackingStatus(null); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-[#0C1A38] flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              <span>Rastrea tu Pedido M Store</span>
            </h3>
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <input 
                type="text" 
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Ingresa tu código de pedido (Ej. MS-9842)" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <button type="submit" className="w-full bg-[#0055FF] text-white font-black py-3 rounded-2xl text-xs hover:bg-blue-700 transition-colors">
                Buscar Estado del Envío
              </button>
            </form>
            {trackingStatus && (
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-2 text-xs">
                <span className="bg-blue-600 text-white font-mono px-2 py-0.5 rounded font-black text-[10px]">{trackingStatus.code}</span>
                <p className="font-extrabold text-blue-900">{trackingStatus.status}</p>
                <p className="text-slate-600 text-[11px]">{trackingStatus.location}</p>
                <p className="text-emerald-600 font-bold text-[11px]">Estimado de entrega: {trackingStatus.eta}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. MODAL CLUB M STORE */}
      {activeModal === 'club' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-left border border-slate-200">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#00E5FF]/20 text-[#0055FF] flex items-center justify-center mx-auto text-2xl font-black">
                ✨
              </div>
              <h3 className="text-xl font-black text-[#0C1A38]">Club M Store VIP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Acumula 1 punto por cada $1 de compra. Canjea tus puntos por descuentos exclusivos en celulares, accesorios y cuotas Cashea preferenciales.
              </p>
            </div>
            <button onClick={() => { setActiveModal(null); showToast('¡Bienvenido al Club M Store!'); }} className="w-full bg-[#0055FF] text-white font-black py-3 rounded-2xl text-xs hover:bg-blue-700 transition-colors">
              Unirme Gratis al Club VIP
            </button>
          </div>
        </div>
      )}

      {/* 4. MODAL CATEGORÍAS MEGA MENU */}
      {activeModal === 'categories' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-left border border-slate-200">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-[#0C1A38]">Categorías Principales M Store</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {['Samsung', 'Apple', 'Honor', 'Xiaomi', 'Tecno', 'Vivo', 'Oukitel'].map((b) => (
                <button 
                  key={b}
                  onClick={() => { setSelectedBrand(b); setActiveModal(null); setActiveTab('catalogo'); }}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-2xl font-bold text-left text-slate-800 hover:text-blue-600 transition-all flex items-center justify-between"
                >
                  <span>Smartphones {b}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL CARRITO / DRAWER */}
      {activeModal === 'cart' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between text-left relative animate-in slide-in-from-right">
            <div className="space-y-6 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-black text-[#0C1A38] flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  <span>Tu Carrito de Compras ({cartCount})</span>
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2 text-slate-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">Tu carrito está vacío en este momento.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                      <div>
                        <p className="font-extrabold text-slate-900">{item.name}</p>
                        <p className="text-blue-600 font-black">${item.price.toFixed(2)} USD x {item.qty}</p>
                      </div>
                      <span className="font-black text-slate-700">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button 
                onClick={() => {
                  const msg = `Hola M Store! Deseo procesar mi pedido con ${cartCount} producto(s) por un total de mi carrito.`;
                  window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Finalizar Pedido por WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL MI CUENTA */}
      {activeModal === 'user' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-left border border-slate-200">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-[#0C1A38] flex items-center gap-2">
              <User className="w-6 h-6 text-blue-600" />
              <span>Mi Cuenta M Store</span>
            </h3>
            <div className="space-y-4">
              <input type="email" placeholder="Correo electrónico" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none" />
              <input type="password" placeholder="Contraseña" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs outline-none" />
              <button onClick={() => { setActiveModal(null); showToast('Sesión iniciada correctamente'); }} className="w-full bg-[#0055FF] text-white font-black py-3 rounded-2xl text-xs hover:bg-blue-700 transition-colors">
                Iniciar Sesión / Registrarme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL CONTACTO */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-left border border-slate-200">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-black text-[#0C1A38]">Atención M Store Venezuela</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Somos tu tienda oficial de tecnología y teléfonos celulares con sede en Caracas y Lechería. Envíos gratis garantizados a nivel nacional.
            </p>
            <a 
              href="https://wa.me/584120000000" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-2"
            >
              <span>Escribir por WhatsApp Directo</span>
            </a>
          </div>
        </div>
      )}

      {/* MODAL DETALLE DE PRODUCTO ESTILO SOYTECHNO (SCREENSHOT 2) */}
      {activeModal === 'quickview' && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => { setActiveModal(null); setQuickViewProduct(null); }}
          onAddToCart={(p) => {
            setCartCount(c => c + 1);
            showToast(`Agregado al carrito: ${p.name}`);
            setActiveModal(null);
            setQuickViewProduct(null);
          }}
        />
      )}

    </div>
  );
}
