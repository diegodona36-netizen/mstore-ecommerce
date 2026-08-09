import React, { useState } from 'react';
import { 
  Lock, X, Upload, CheckCircle2, ShieldCheck, Tag, Plus, 
  FolderPlus, Layers, Trash2, Smartphone, Search, Package, Edit, RefreshCw 
} from 'lucide-react';

export const AdminPanelModal = ({ 
  isOpen, 
  onClose, 
  onAddProduct,
  products = [],
  onRemoveProduct,
  categories = [],
  onAddCategory,
  onRemoveCategory
}) => {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('producto'); // 'producto' | 'categorias' | 'inventario'

  // Product Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('smartphones');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [specsInput, setSpecsInput] = useState('Pantalla AMOLED, Batería 5000mAh, Garantía 1 Año');
  const [successMsg, setSuccessMsg] = useState('');

  // Category Creation Form state
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');
  const [catSuccessMsg, setCatSuccessMsg] = useState('');

  // Inventory Search Filter
  const [inventorySearch, setInventorySearch] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  // Local File Upload (.jpg, .png, .webp)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setPreviewImage(url);
  };

  // Product Submit
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) return;

    const specsArray = specsInput.split(',').map(s => s.trim()).filter(Boolean);

    const newProd = {
      id: Date.now(),
      name,
      category,
      subcategory: subcategory || 'Novedad Cyber',
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price) * 1.15,
      rating: 5.0,
      image: imageUrl,
      thumbnails: [imageUrl, imageUrl, imageUrl],
      specs: specsArray.length > 0 ? specsArray : ['Garantía M Store 1 Año', 'Envío Gratis 24H'],
      description: description || `${name} importado de alta gama con garantía oficial M Store.`,
      tag: subcategory ? subcategory.toUpperCase() : 'NUEVO'
    };

    onAddProduct(newProd);

    setSuccessMsg(`¡Producto "${name}" guardado e integrado exitosamente!`);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageUrl('');
    setPreviewImage('');
    setSubcategory('');
    
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Category Submit
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName) return;

    const catId = newCatId || newCatName.toLowerCase().replace(/\s+/g, '-');
    
    if (onAddCategory) {
      onAddCategory({
        id: catId,
        name: newCatName,
        icon: Smartphone
      });
    }

    setCatSuccessMsg(`¡Categoría "${newCatName}" creada exitosamente!`);
    setNewCatName('');
    setNewCatId('');

    setTimeout(() => setCatSuccessMsg(''), 3000);
  };

  // Inventory Filter
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    (p.subcategory && p.subcategory.toLowerCase().includes(inventorySearch.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 border border-[#00E5FF]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-space text-white">Panel Administrador - M Store</h3>
              <p className="text-xs text-slate-400">Acceso exclusivo para empleados de la empresa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. PIN Security Form */}
        {!isAuthenticated ? (
          <form onSubmit={handlePinSubmit} className="space-y-5 py-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] mb-2">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold font-space text-white">Ingresa el PIN de Seguridad</h4>
              <p className="text-xs text-slate-400 mt-1">Clave predeterminada para empleados: <strong className="text-[#00E5FF]">1234</strong></p>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="• • • •"
                className="w-full text-center text-2xl font-bold tracking-[0.5em] bg-white/5 border border-white/20 focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.4)] rounded-2xl py-3 text-white outline-none font-space"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-400 font-semibold animate-shake">
                  ❌ PIN Incorrecto. Intenta con "1234".
                </p>
              )}

              <button
                type="submit"
                className="w-full btn-cyan-glow py-3 rounded-xl font-bold text-xs font-space text-black uppercase tracking-wider"
              >
                Ingresar al Panel
              </button>
            </div>
          </form>
        ) : (
          /* 2. Authenticated Admin Tabs & Forms */
          <div className="space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white/5 border border-white/10 rounded-2xl">
              <button
                onClick={() => setActiveTab('producto')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold font-space transition-all ${
                  activeTab === 'producto' 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_#00E5FF]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Plus className="w-4 h-4" />
                Cargar Producto
              </button>
              
              <button
                onClick={() => setActiveTab('categorias')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold font-space transition-all ${
                  activeTab === 'categorias' 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_#00E5FF]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                Categorías
              </button>

              <button
                onClick={() => setActiveTab('inventario')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold font-space transition-all ${
                  activeTab === 'inventario' 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_15px_#00E5FF]' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Package className="w-4 h-4" />
                Inventario ({products.length})
              </button>
            </div>

            {/* TAB 1: PRODUCT LOAD FORM */}
            {activeTab === 'producto' && (
              <form onSubmit={handleProductSubmit} className="space-y-4 text-left">
                
                {successMsg && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-space">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Smart TV Samsung 65 QLED"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-space">Categoría Principal *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#141824] border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-space"
                    >
                      <option value="smartphones">📱 Smartphones & Flagships</option>
                      <option value="linea-blanca">📺 Línea Blanca & Smart TV</option>
                      <option value="audio">🎧 Audio High-End & Hi-Fi</option>
                      <option value="wearables">⌚ Wearables & Relojes</option>
                      <option value="accesorios">⚡ Accesorios & Powerbanks</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>🏷️ {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subcategory & Tag Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-space">Subcategoría / Etiqueta</label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="Ej: Smart TV 4K / Inverter AI"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-space">Precio Oferta ($USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="999.00"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* File Upload Selector (.JPG / .PNG / .WebP) */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-space flex items-center justify-between">
                    <span>Imagen del Producto *</span>
                    <span className="text-[10px] text-slate-400 font-normal">Formatos: .jpg, .jpeg, .png, .webp</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto shrink-0 cursor-pointer flex items-center justify-center gap-2 bg-[#00E5FF]/10 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-black border border-[#00E5FF]/40 px-4 py-2.5 rounded-xl text-xs font-bold font-space transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Examinar Imagen (.JPG/.PNG)</span>
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp, image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-400 font-space">o pega una URL:</span>

                    <input
                      type="url"
                      value={imageUrl}
                      onChange={handleUrlChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  {previewImage && (
                    <div className="mt-2 p-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-[#F4F5F7] p-1 overflow-hidden shrink-0">
                        <img src={previewImage} alt="Vista previa" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold">✓ Imagen cargada correctamente</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full btn-cyan-glow py-3 rounded-xl font-bold text-xs font-space text-black uppercase tracking-wider mt-4"
                >
                  Guardar Producto en la Tienda
                </button>
              </form>
            )}

            {/* TAB 2: CATEGORY MANAGEMENT */}
            {activeTab === 'categorias' && (
              <div className="space-y-5 text-left">
                
                {catSuccessMsg && (
                  <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>{catSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleCategorySubmit} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold font-space text-[#00E5FF] flex items-center gap-2">
                    <FolderPlus className="w-4 h-4" />
                    Crear Nueva Categoría Principal
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="Nombre de Categoría (ej: Gaming & Consolas)"
                      className="bg-black/40 border border-white/15 focus:border-[#00E5FF] rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                    />

                    <button
                      type="submit"
                      className="btn-cyan-glow py-2 px-4 rounded-xl font-bold text-xs font-space text-black flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Crear Categoría
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold font-space text-slate-300 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00E5FF]" />
                    Categorías Activas en la Tienda
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {[
                      { id: 'smartphones', name: 'Smartphones & Flagships' },
                      { id: 'linea-blanca', name: 'Línea Blanca & Smart TV' },
                      { id: 'audio', name: 'Audio High-End & Hi-Fi' },
                      { id: 'wearables', name: 'Wearables & Relojes' },
                      { id: 'accesorios', name: 'Accesorios & Powerbanks' },
                      ...categories
                    ].map((catItem) => (
                      <div 
                        key={catItem.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-space text-slate-200"
                      >
                        <span className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-[#00E5FF]" />
                          {catItem.name}
                        </span>
                        {categories.some(c => c.id === catItem.id) && (
                          <button
                            type="button"
                            onClick={() => onRemoveCategory && onRemoveCategory(catItem.id)}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                            title="Eliminar categoría personalizada"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: INVENTORY & PRODUCT MANAGEMENT */}
            {activeTab === 'inventario' && (
              <div className="space-y-4 text-left">
                
                {/* Search in Inventory */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    placeholder="Filtrar productos por nombre o categoría..."
                    className="w-full bg-white/5 border border-white/15 focus:border-[#00E5FF] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none font-inter"
                  />
                </div>

                {/* Product List */}
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs font-space">
                      No se encontraron productos en el inventario.
                    </div>
                  ) : (
                    filteredProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00E5FF]/30 transition-all gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#F4F5F7] p-1 shrink-0 overflow-hidden">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold font-space text-white line-clamp-1">{p.name}</h5>
                            <p className="text-[10px] text-slate-400 uppercase font-space">
                              {p.category} {p.subcategory && `• ${p.subcategory}`}
                            </p>
                            <span className="text-xs font-bold text-[#00E5FF] font-space">${p.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemoveProduct && onRemoveProduct(p.id)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 transition-all"
                            title="Eliminar producto del catálogo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
