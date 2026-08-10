import React, { useState, useMemo } from 'react';
import {
  Search, ShoppingBag, ChevronLeft, ChevronRight, Heart,
  Phone, User, Shuffle, LayoutGrid, List, Filter, X, Check,
  MapPin, CreditCard, Info, Truck, Tag, MessageCircle
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const BRAND_CIRCLES = [
  { id: 'Samsung',  label: 'Teléfono Celular Samsung',  logo: <span className="font-semibold text-[#1428A0] text-sm tracking-widest">SAMSUNG</span> },
  { id: 'Apple',    label: 'iPhone',                    logo: <span className="text-2xl">🍎</span> },
  { id: 'Honor',    label: 'Teléfono Celular Honor',    logo: <span className="font-bold text-slate-800 text-sm tracking-[0.18em] uppercase">HONOR</span> },
  { id: 'Xiaomi',   label: 'Teléfono Celular Xiaomi',   logo: <span className="font-black text-orange-500 text-xl">mi</span> },
  { id: 'Tecno',    label: 'Teléfono Celular Tecno',    logo: <span className="font-black text-[#1565C0] text-sm tracking-wider">TECNO</span> },
  { id: 'Oukitel',  label: 'Teléfono Celular Oukitel',  logo: <span className="font-bold text-slate-700 text-xs tracking-wider">OUKITEL</span> },
];

const PRODUCTS = [
  { id: 1, brand: 'Tecno',   name: 'Teléfono Celular Tecno Spark 30 Pro 256GB / 8GB RAM – Negro',   price: 149.00, oldPrice: null,   badge: 'Envío Gratis', img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop' },
  { id: 2, brand: 'Tecno',   name: 'Teléfono Celular Tecno Camon 30 512GB / 12GB RAM – Verde',      price: 219.00, oldPrice: 259.00, badge: 'Oferta',       img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop' },
  { id: 3, brand: 'Infinix', name: 'Teléfono Celular Infinix Note 40 Pro 256GB / 12GB RAM',        price: 229.00, oldPrice: null,   badge: 'Envío Gratis', img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&auto=format&fit=crop' },
  { id: 4, brand: 'Samsung', name: 'Teléfono Celular Samsung Galaxy A55 5G 256GB / 8GB RAM',       price: 349.00, oldPrice: 399.00, badge: 'Oficial',      img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop' },
  { id: 5, brand: 'Xiaomi',  name: 'Teléfono Celular Xiaomi Redmi Note 13 Pro 512GB / 12GB RAM',   price: 279.00, oldPrice: null,   badge: 'Envío Gratis', img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&auto=format&fit=crop' },
  { id: 6, brand: 'Honor',   name: 'Teléfono Celular Honor Magic6 Lite 5G 256GB / 8GB RAM',        price: 249.00, oldPrice: 289.00, badge: 'Oferta',       img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&auto=format&fit=crop' },
  { id: 7, brand: 'Apple',   name: 'iPhone 15 Pro 256GB Titanio Natural',                           price: 999.00, oldPrice: null,   badge: 'Premium',     img: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&auto=format&fit=crop' },
  { id: 8, brand: 'Oukitel', name: 'Teléfono Celular Oukitel WP36 6.6" 256GB / 16GB RAM',          price: 199.00, oldPrice: 229.00, badge: 'Envío Gratis', img: 'https://images.unsplash.com/photo-1546054454-aa25e27610f9?w=400&auto=format&fit=crop' },
  { id: 9, brand: 'Tecno',   name: 'Teléfono Celular Tecno Spark 30 128GB / 4GB RAM – Plateado',   price: 99.00,  oldPrice: null,   badge: 'Económico',   img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop' },
];

const NAV_LINKS = ['Tienda electrónica','Ofertas','Ubicaciones','Métodos de pago','Nosotros','Contacto','Rastrea tu pedido','Club SoyTechno'];

/* ─────────────────────────── COMPONENT ─────────────────────── */
export function SoyTechnoExperiment({ onBackToMain }) {
  const [brand, setBrand]         = useState('todos');
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('default');
  const [perPage, setPerPage]     = useState(12);
  const [colorOpen, setColorOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(true);
  const [cart, setCart]           = useState([]);
  const [toast, setToast]         = useState(null);
  const [view, setView]           = useState('grid'); // 'grid' | 'list'

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const filtered = useMemo(() => {
    let r = PRODUCTS.filter(p =>
      (brand === 'todos' || p.brand === brand) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === 'low')  r = [...r].sort((a,b) => a.price - b.price);
    if (sort === 'high') r = [...r].sort((a,b) => b.price - a.price);
    return r;
  }, [brand, search, sort]);

  const addCart = (p) => {
    setCart(c => [...c, p]);
    showToast(`${p.name.slice(0,30)}... añadido`);
  };

  const whatsapp = (p) => {
    const msg = `Hola! Me interesa: *${p.name}* — $${p.price} USD. ¿Tienen disponibilidad?`;
    window.open(`https://wa.me/584120000000?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 text-left font-sans pb-20" style={{fontFamily:'system-ui,sans-serif'}}>

      {/* ── TOAST ── */}
      {toast && (
        <div className="fixed top-20 right-5 z-[200] bg-[#003087] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          {toast}
        </div>
      )}

      {/* ══════════════════════════════════════════════════
          1. YELLOW TOP BAR — cashea style, exact match
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#FFE500] text-black text-[11px] font-bold py-2 px-4 flex items-center justify-between gap-2">
        <button onClick={onBackToMain} className="flex items-center gap-1 bg-black/10 hover:bg-black/20 px-3 py-1 rounded-full text-[11px] transition-all shrink-0">
          ← Volver a M&nbsp;Store
        </button>
        <div className="flex items-center gap-2 truncate">
          <span className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-0.5 rounded-full font-black text-[10px]">
            💳 CASHEA
          </span>
          <span className="font-extrabold truncate">| Compra en cuotas lo que necesitas hoy</span>
        </div>
        <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px]">
          <span>📍 Sucursales</span>
          <span>📞 Soporte</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          2. MAIN HEADER — navy blue, logo, search, icons
      ══════════════════════════════════════════════════ */}
      <header className="bg-[#0C1A38] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-5">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setBrand('todos')}>
            <div className="w-10 h-10 rounded-xl bg-[#1565C0] flex items-center justify-center shadow-md">
              <span className="text-white font-black text-base">×S</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight" style={{fontFamily:'system-ui'}}>SOYTECHNO</span>
          </div>

          {/* Search bar with blue circular button */}
          <div className="flex-1 relative hidden sm:block max-w-2xl">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Búsqueda de productos"
              className="w-full rounded-full pl-5 pr-14 py-2.5 text-sm text-slate-900 bg-white outline-none placeholder-slate-400 shadow-inner"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1565C0] hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Right icons */}
          <div className="ml-auto flex items-center gap-5 text-xs">
            {/* Shipping info */}
            <div className="hidden lg:flex items-center gap-2">
              <Truck className="w-6 h-6 text-blue-300" />
              <div className="leading-tight">
                <div className="font-bold text-white text-[11px]">Envíos GRATIS</div>
                <div className="text-slate-400 text-[10px]">a Nivel Nacional</div>
              </div>
            </div>

            {/* WhatsApp contact */}
            <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer"
              className="hidden md:flex items-center gap-2 hover:text-green-400 transition-colors">
              <Phone className="w-6 h-6 text-green-400" />
              <div className="leading-tight">
                <div className="font-bold text-white text-[11px]">Contáctanos por</div>
                <div className="text-green-400 font-extrabold text-[11px]">WHATSAPP</div>
              </div>
            </a>

            {/* Account */}
            <button className="p-1 hover:text-blue-300 transition-colors">
              <User className="w-6 h-6" />
            </button>

            {/* Shuffle */}
            <button className="p-1 hover:text-blue-300 transition-colors hidden sm:block">
              <Shuffle className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button className="p-1 hover:text-blue-300 transition-colors hidden sm:block">
              <Heart className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button className="relative p-1 hover:text-blue-300 transition-colors" onClick={() => showToast('Carrito actualizado')}>
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1565C0] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          3. CATEGORY NAV BAR — white with blue pill button
      ══════════════════════════════════════════════════ */}
      <nav className="bg-white border-b border-slate-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-6 text-xs font-bold text-slate-700 overflow-x-auto scrollbar-none">
          <button className="shrink-0 bg-[#1565C0] text-white px-4 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-colors font-extrabold">
            <span className="text-base leading-none">≡</span>
            <span>Categorías</span>
          </button>
          {NAV_LINKS.map(link => (
            <span key={link}
              className={`shrink-0 cursor-pointer hover:text-[#1565C0] transition-colors whitespace-nowrap ${link === 'Ofertas' ? 'text-red-600 font-extrabold' : ''} ${link === 'Club SoyTechno' ? 'text-[#1565C0]' : ''}`}>
              {link}
            </span>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════
          4. MOBILE SEARCH
      ══════════════════════════════════════════════════ */}
      <div className="sm:hidden bg-[#0C1A38] px-4 pb-3">
        <div className="relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Búsqueda de productos"
            className="w-full rounded-full pl-4 pr-12 py-2.5 text-sm text-slate-900 bg-white outline-none placeholder-slate-400"
          />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1565C0] text-white flex items-center justify-center">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          5. BREADCRUMBS
      ══════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="hover:text-[#1565C0] cursor-pointer" onClick={onBackToMain}>Inicio</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Teléfonos Celulares</span>
        </div>
        <span>Mostrando 1–{Math.min(perPage, filtered.length)} de {PRODUCTS.length} resultados</span>
      </div>

      {/* ══════════════════════════════════════════════════
          6. BRAND CIRCLES CAROUSEL — exact to screenshot
      ══════════════════════════════════════════════════ */}
      <section className="bg-white border-y border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-1 justify-center sm:justify-start">
            {/* Prev arrow */}
            <button className="shrink-0 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#1565C0] transition-colors hidden sm:flex">
              <ChevronLeft className="w-4 h-4" />
            </button>

            {BRAND_CIRCLES.map(b => (
              <div key={b.id}
                onClick={() => setBrand(brand === b.id ? 'todos' : b.id)}
                className="shrink-0 flex flex-col items-center gap-2 cursor-pointer group">
                <div className={`w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center shadow-md transition-all group-hover:shadow-lg group-hover:border-[#1565C0] ${brand === b.id ? 'border-[#1565C0] ring-4 ring-blue-100 scale-105' : 'border-slate-200'}`}>
                  {b.logo}
                </div>
                <span className={`text-[11px] font-semibold text-center max-w-[90px] leading-tight transition-colors ${brand === b.id ? 'text-[#1565C0] font-bold' : 'text-slate-700 group-hover:text-[#1565C0]'}`}>
                  {b.label}
                </span>
              </div>
            ))}

            {/* Next arrow */}
            <button className="shrink-0 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#1565C0] transition-colors hidden sm:flex">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          7. MAIN CONTENT — sidebar + product grid
      ══════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-7">

        {/* ── LEFT SIDEBAR FILTERS ── */}
        <aside className="w-56 shrink-0 hidden md:block space-y-4 text-sm">

          {/* Color filter */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setColorOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-slate-800 hover:bg-slate-50 transition-colors">
              <span>Color</span>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${colorOpen ? 'rotate-90' : ''}`} />
            </button>
            {colorOpen && (
              <div className="px-4 pb-3 pt-1 text-xs text-slate-500 space-y-1.5">
                {['Negro', 'Blanco', 'Azul', 'Verde', 'Dorado', 'Plateado'].map(c => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer hover:text-slate-800">
                    <input type="checkbox" className="rounded border-slate-300 text-[#1565C0]" />
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand filter */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setBrandOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 font-bold text-slate-800 hover:bg-slate-50 transition-colors">
              <span>Marca</span>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${brandOpen ? 'rotate-90' : ''}`} />
            </button>
            {brandOpen && (
              <div className="px-4 pb-3 pt-1 text-xs text-slate-600 space-y-2">
                {['todos', ...BRAND_CIRCLES.map(b => b.id)].map(b => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-slate-900" onClick={() => setBrand(b)}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${brand === b ? 'bg-[#1565C0] border-[#1565C0]' : 'border-slate-300 bg-white'}`}>
                      {brand === b && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="capitalize">{b === 'todos' ? 'Todas las marcas' : b}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Reset */}
          <button
            onClick={() => { setBrand('todos'); setSearch(''); }}
            className="text-xs text-[#1565C0] hover:underline font-bold w-full text-center">
            Restablecer filtros
          </button>
        </aside>

        {/* ── PRODUCT AREA ── */}
        <main className="flex-1 min-w-0 space-y-5">

          {/* Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <h1 className="text-lg font-extrabold text-[#0C1A38]">Teléfonos Celulares</h1>

            <div className="flex items-center gap-3 text-xs flex-wrap">
              {/* Currency */}
              <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-slate-700">
                <span>🇺🇸</span>
                <span className="font-mono">USD</span>
                <span className="text-slate-500 font-normal">Dólares</span>
              </div>

              {/* Show per page */}
              <div className="flex items-center gap-1 text-slate-600 font-semibold">
                <span>Mostrar:</span>
                {[9, 12, 18, 24].map(n => (
                  <button key={n} onClick={() => setPerPage(n)}
                    className={`px-1.5 py-0.5 rounded font-bold transition-colors ${perPage === n ? 'text-[#1565C0]' : 'hover:text-[#1565C0]'}`}>
                    {n}
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-[#1565C0] text-white' : 'text-slate-400 hover:text-slate-700'}`}>
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-[#1565C0] text-white' : 'text-slate-400 hover:text-slate-700'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none cursor-pointer focus:border-[#1565C0]">
                <option value="default">Orden predeterminado</option>
                <option value="low">Precio: Menor a Mayor</option>
                <option value="high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filtered.slice(0, perPage).map(p => (
              <div key={p.id}
                className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex ${view === 'list' ? 'flex-row' : 'flex-col'}`}>
                
                {/* Image */}
                <div className={`relative bg-slate-50 flex items-center justify-center overflow-hidden ${view === 'list' ? 'w-40 shrink-0 h-auto' : 'h-52 w-full'}`}>
                  {p.badge && (
                    <span className={`absolute top-2 left-2 z-10 text-[10px] font-black px-2 py-0.5 rounded-full text-white ${p.badge === 'Oferta' ? 'bg-red-500' : p.badge === 'Premium' ? 'bg-purple-600' : p.badge === 'Económico' ? 'bg-amber-500' : 'bg-[#1565C0]'}`}>
                      {p.badge}
                    </span>
                  )}
                  <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <img src={p.img} alt={p.name}
                    className={`object-contain group-hover:scale-105 transition-transform duration-300 ${view === 'list' ? 'h-32 w-full' : 'h-40 w-full px-4 py-3'}`} />
                </div>

                {/* Info */}
                <div className={`p-4 flex flex-col gap-2.5 flex-1 ${view === 'list' ? 'justify-center' : ''}`}>
                  <p className="text-[10px] font-bold text-[#1565C0] uppercase tracking-wider">{p.brand}</p>
                  <h3 className={`font-semibold text-slate-900 leading-snug line-clamp-2 ${view === 'list' ? 'text-sm' : 'text-xs min-h-[32px]'}`}>{p.name}</h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-xl font-black text-slate-900">${p.price.toFixed(2)}</span>
                    <span className="text-xs font-bold text-[#1565C0]">USD</span>
                    {p.oldPrice && <span className="text-xs text-slate-400 line-through ml-1">${p.oldPrice.toFixed(2)}</span>}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => addCart(p)}
                      className="flex-1 bg-[#1565C0] hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                      Añadir al carrito
                    </button>
                    <button onClick={() => whatsapp(p)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm">
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* ══════════════════════════════════════════════════
          FLOATING WHATSAPP & CHATBOT (exact to SoyTechno)
      ══════════════════════════════════════════════════ */}
      <a href="https://wa.me/584120000000" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.5)] flex items-center justify-center hover:scale-110 transition-transform">
        <Phone className="w-7 h-7 text-white fill-white" />
      </a>

      <div className="fixed bottom-6 left-6 z-50 bg-white border border-slate-200 shadow-xl rounded-2xl px-4 py-2.5 hidden sm:flex items-center gap-2.5 text-xs font-bold text-slate-800 max-w-[200px]">
        <div className="w-8 h-8 rounded-full bg-[#1565C0] text-white flex items-center justify-center text-base shrink-0">🤖</div>
        <span>¿En qué puedo ayudarte? 👋</span>
      </div>
    </div>
  );
}
