import React, { useState } from 'react';
import { 
  Lock, X, Upload, CheckCircle2, ShieldCheck, Tag, Plus, 
  FolderPlus, Layers, Trash2, Smartphone, Search, Package, Edit, RefreshCw 
} from 'lucide-react';

export const AdminPanelModal = ({ 
  isOpen, 
  onClose, 
  onAddProduct,
  onUpdateProduct,
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
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('televisores');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [specsInput, setSpecsInput] = useState('Garantía M Store 1 Año, Envío 24H');
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

  // Start Editing a product
  const handleStartEdit = (prod) => {
    setEditingId(prod.id);
    setName(prod.name || '');
    setCategory(prod.category || 'televisores');
    setSubcategory(prod.subcategory || '');
    setPrice(prod.price ? prod.price.toString() : '');
    setOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : '');
    setDescription(prod.description || '');
    setImageUrl(prod.image || '');
    setPreviewImage(prod.image || '');
    setSpecsInput(prod.specs ? prod.specs.join(', ') : 'Garantía M Store 1 Año, Envío 24H');
    setActiveTab('producto');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setImageUrl('');
    setPreviewImage('');
    setSubcategory('');
  };

  // Product Submit (Add or Update)
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) return;

    const specsArray = specsInput.split(',').map(s => s.trim()).filter(Boolean);

    const prodData = {
      id: editingId || Date.now(),
      name,
      category,
      subcategory: subcategory || 'Novedad M Store',
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : parseFloat(price) * 1.15,
      rating: 5.0,
      image: imageUrl,
      thumbnails: [imageUrl, imageUrl, imageUrl],
      specs: specsArray.length > 0 ? specsArray : ['Garantía M Store 1 Año', 'Envío Gratis 24H'],
      description: description || `${name} con garantía oficial M Store.`,
      tag: subcategory ? subcategory.toUpperCase() : 'OFERTA'
    };

    if (editingId && onUpdateProduct) {
      onUpdateProduct(prodData);
      setSuccessMsg(`¡Producto "${name}" actualizado exitosamente!`);
    } else if (onAddProduct) {
      onAddProduct(prodData);
      setSuccessMsg(`¡Producto "${name}" guardado e integrado exitosamente!`);
    }

    handleCancelEdit();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Panel Administrador - M Store</h3>
              <p className="text-xs text-slate-500">Acceso exclusivo para empleados de la empresa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. PIN Security Form */}
        {!isAuthenticated ? (
          <form onSubmit={handlePinSubmit} className="space-y-5 py-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-900 mb-2">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">Ingresa el PIN de Seguridad</h4>
              <p className="text-xs text-slate-500 mt-1">Clave para empleados: <strong className="text-slate-900">1234</strong></p>
            </div>

            <div className="max-w-xs mx-auto space-y-3">
              <input
                type="password"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="• • • •"
                className="w-full text-center text-2xl font-bold tracking-[0.5em] bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-xl py-3 text-slate-900 outline-none"
                autoFocus
              />

              {pinError && (
                <p className="text-xs text-red-500 font-semibold animate-shake">
                  ❌ PIN Incorrecto. Intenta con "1234".
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Ingresar al Panel
              </button>
            </div>
          </form>
        ) : (
          /* 2. Authenticated Admin Tabs & Forms */
          <div className="space-y-6">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <button
                onClick={() => setActiveTab('producto')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'producto' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Plus className="w-4 h-4" />
                {editingId ? 'Editar Producto' : 'Cargar Producto'}
              </button>
              
              <button
                onClick={() => setActiveTab('categorias')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'categorias' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FolderPlus className="w-4 h-4" />
                Categorías
              </button>

              <button
                onClick={() => setActiveTab('inventario')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'inventario' 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4" />
                Inventario ({products.length})
              </button>
            </div>

            {/* TAB 1: PRODUCT LOAD / EDIT FORM */}
            {activeTab === 'producto' && (
              <form onSubmit={handleProductSubmit} className="space-y-4 text-left">
                
                {editingId && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold">
                    <span className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Editando: {name}
                    </span>
                    <button 
                      type="button" 
                      onClick={handleCancelEdit}
                      className="text-xs text-slate-500 hover:text-slate-900 underline"
                    >
                      Cancelar Edición
                    </button>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Smart TV Síragon 55 4K"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Category Selection — Synchronized with Catálogo Main */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Categoría Principal *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none"
                    >
                      <option value="televisores">📺 Televisores</option>
                      <option value="computadoras">💻 Computadoras</option>
                      <option value="aires">🌬️ Aires Acondicionados</option>
                      <option value="telefonos">📱 Teléfonos & Smartphones</option>
                      <option value="neveras">🧊 Neveras & Refrigeración</option>
                      <option value="lavadoras">🧺 Lavadoras</option>
                      <option value="audio">🔊 Audio High-End</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>🏷️ {c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subcategory & Tag Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Subcategoría / Etiqueta</label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="Ej: Smart TV 4K / Inverter AI"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Precio Oferta ($USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="499.00"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Descripción corta</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción rápida del producto..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded-lg px-3.5 py-2 text-xs text-slate-900 outline-none"
                  />
                </div>

                {/* File Upload Selector (.JPG / .PNG / .WebP) */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center justify-between">
                    <span>Imagen del Producto *</span>
                    <span className="text-[10px] text-slate-500 font-normal">Formatos: .jpg, .jpeg, .png, .webp</span>
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto shrink-0 cursor-pointer flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-lg text-xs font-bold transition-all">
                      <Upload className="w-4 h-4" />
                      <span>Examinar Imagen</span>
                      <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp, image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-slate-500">o pega una URL:</span>

                    <input
                      type="url"
                      value={imageUrl}
                      onChange={handleUrlChange}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {previewImage && (
                    <div className="mt-2 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-3">
                      <div className="w-14 h-14 rounded-md bg-white p-1 overflow-hidden shrink-0 border border-slate-100">
                        <img src={previewImage} alt="Vista previa" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-xs text-emerald-600 font-semibold">✓ Imagen lista</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider mt-4 shadow-sm transition-colors"
                >
                  {editingId ? 'Guardar Cambios del Producto' : 'Guardar Producto en la Tienda'}
                </button>
              </form>
            )}

            {/* TAB 2: CATEGORY MANAGEMENT */}
            {activeTab === 'categorias' && (
              <div className="space-y-5 text-left">
                
                {catSuccessMsg && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{catSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleCategorySubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <FolderPlus className="w-4 h-4 text-slate-500" />
                    Crear Nueva Categoría Principal
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="Nombre de Categoría (ej: Consolas & Gaming)"
                      className="bg-white border border-slate-200 focus:border-slate-900 rounded-lg px-3.5 py-2 text-xs text-slate-900 outline-none"
                    />

                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Crear Categoría
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-500" />
                    Categorías Activas en la Tienda
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {[
                      { id: 'televisores',  name: 'Televisores' },
                      { id: 'computadoras', name: 'Computadoras' },
                      { id: 'aires',        name: 'Aires Acondicionados' },
                      { id: 'telefonos',    name: 'Teléfonos & Smartphones' },
                      { id: 'neveras',      name: 'Neveras & Refrigeración' },
                      { id: 'lavadoras',    name: 'Lavadoras' },
                      { id: 'audio',        name: 'Audio High-End' },
                      ...categories
                    ].map((catItem) => (
                      <div 
                        key={catItem.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-sm"
                      >
                        <span className="flex items-center gap-2">
                          <Tag className="w-3.5 h-3.5 text-slate-400" />
                          {catItem.name}
                        </span>
                        {categories.some(c => c.id === catItem.id) && (
                          <button
                            type="button"
                            onClick={() => onRemoveCategory && onRemoveCategory(catItem.id)}
                            className="p-1 text-slate-400 hover:text-red-500 transition-colors bg-slate-50 hover:bg-red-50 rounded"
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
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 text-slate-900 text-xs rounded-lg pl-10 pr-4 py-2.5 outline-none"
                  />
                </div>

                {/* Product List */}
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No se encontraron productos en el inventario.
                    </div>
                  ) : (
                    filteredProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-all gap-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-50 p-1 shrink-0 overflow-hidden border border-slate-100">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h5>
                            <p className="text-[10px] text-slate-500 uppercase font-medium">
                              {p.category} {p.subcategory && `• ${p.subcategory}`}
                            </p>
                            <span className="text-xs font-bold text-slate-900">${p.price}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* BOTÓN EDITAR */}
                          <button
                            onClick={() => handleStartEdit(p)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all flex items-center gap-1 text-xs font-bold"
                            title="Editar producto"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Editar</span>
                          </button>

                          {/* BOTÓN ELIMINAR */}
                          <button
                            onClick={() => onRemoveProduct && onRemoveProduct(p.id)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 transition-all"
                            title="Eliminar producto del catálogo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
