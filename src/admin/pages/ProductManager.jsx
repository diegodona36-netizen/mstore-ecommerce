import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Package, 
  Loader2, 
  X, 
  Upload, 
  Check, 
  DollarSign,
  Calculator,
  Percent
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Client-side image compressor (fits within Firestore document limits easily)
const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'smartphones',
    price: '',
    originalPrice: '',
    tag: '',
    description: '',
    inStock: true,
    hasCashea: true,
    casheaInitialPercent: 40,
    casheaInstallments: 3,
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'smartphones',
      price: '',
      originalPrice: '',
      tag: '',
      description: '',
      inStock: true,
      hasCashea: true,
      casheaInitialPercent: 40,
      casheaInstallments: 3,
      image: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || 'smartphones',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      tag: product.tag || '',
      description: product.description || '',
      inStock: product.inStock !== false,
      hasCashea: product.hasCashea !== false,
      casheaInitialPercent: product.casheaInitialPercent || 40,
      casheaInstallments: product.casheaInstallments || 3,
      image: product.image || ''
    });
    setSelectedFile(null);
    setPreviewUrl(product.image || '');
    setIsModalOpen(true);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const compressed = await compressImage(file);
      setPreviewUrl(compressed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Por favor ingresa nombre y precio.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = previewUrl || formData.image;

      // Default placeholder if none provided
      if (!finalImageUrl) {
        finalImageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
      }

      const productPayload = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        tag: formData.tag.trim(),
        description: formData.description.trim(),
        inStock: formData.inStock,
        hasCashea: formData.hasCashea,
        casheaInitialPercent: parseInt(formData.casheaInitialPercent) || 40,
        casheaInstallments: parseInt(formData.casheaInstallments) || 3,
        image: finalImageUrl,
        rating: editingProduct?.rating || 5.0,
        reviewsCount: editingProduct?.reviewsCount || 1,
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        // UPDATE
        await updateDoc(doc(db, 'products', editingProduct.id), productPayload);
      } else {
        // CREATE
        productPayload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'products'), productPayload);
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Hubo un error al guardar el producto. Revisa la consola.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`¿Eliminar definitivamente "${product.name}"?`)) return;

    try {
      await deleteDoc(doc(db, 'products', product.id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error al eliminar el producto.");
    }
  };

  // Calculations
  const numericPrice = parseFloat(formData.price) || 0;
  const initialPercent = parseInt(formData.casheaInitialPercent) || 40;
  const installmentsCount = parseInt(formData.casheaInstallments) || 3;
  const casheaInitialAmount = numericPrice * (initialPercent / 100);
  const casheaInstallmentAmount = (numericPrice * (1 - initialPercent / 100)) / installmentsCount;

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">Crea, edita y administra los productos y financiamiento Cashea.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar producto por nombre..."
            className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Selector & Product Count Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden md:inline">Categoría:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <span className="px-3.5 py-2 bg-blue-50 text-blue-700 text-xs font-black rounded-xl whitespace-nowrap border border-blue-100">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No hay productos registrados en la base de datos</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm">
              {searchQuery ? 'No se encontraron resultados para tu búsqueda.' : 'Comienza creando tu primer producto con el botón "Nuevo Producto".'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 text-xs font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Producto</th>
                  <th className="py-3.5 px-4">Categoría</th>
                  <th className="py-3.5 px-4">Precio Contado</th>
                  <th className="py-3.5 px-4">Plan Cashea</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProducts.map((p) => {
                  const pPrice = parseFloat(p.price) || 0;
                  const pInitPct = p.casheaInitialPercent || 40;
                  const pInstallments = p.casheaInstallments || 3;
                  const pInitial = pPrice * (pInitPct / 100);
                  const pInstallment = (pPrice * (1 - pInitPct / 100)) / pInstallments;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden p-1 flex items-center justify-center">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{p.name}</div>
                            <div className="text-xs text-slate-400 line-clamp-1">{p.description || 'Sin descripción'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="capitalize px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="font-black text-slate-900">${pPrice.toFixed(2)} USD</div>
                        {p.originalPrice && (
                          <div className="text-xs text-slate-400 line-through">${p.originalPrice}</div>
                        )}
                      </td>

                      {/* Cashea Plan Preview */}
                      <td className="py-3 px-4">
                        {p.hasCashea !== false ? (
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1 bg-[#FFE600] text-black px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400">
                              CASHEA
                            </div>
                            <div className="text-xs font-bold text-slate-800">
                              Inicial: <span className="text-amber-600">${pInitial.toFixed(2)}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {pInstallments} cuotas de ${pInstallment.toFixed(2)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Solo Contado</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                          p.inStock 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-red-50 text-red-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {p.inStock ? 'En Stock' : 'Agotado'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Editar Producto"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="p-2 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Eliminar Producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL CREAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              {/* Product Image Upload Section */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Imagen del Producto
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group">
                    {previewUrl || formData.image ? (
                      <img src={previewUrl || formData.image} alt="Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <Package className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Subir Foto del equipo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="O pega aquí una URL de imagen (https://...)"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ej. Samsung Galaxy S24 Ultra 512GB"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                />
              </div>

              {/* Category & Tag Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Categoría *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  >
                    <option value="smartphones">Smartphones</option>
                    <option value="linea-blanca">Línea Blanca & Smart TV</option>
                    <option value="computacion">Computación & Laptops</option>
                    <option value="audio">Audio High-End</option>
                    <option value="wearables">Wearables & Relojes</option>
                    <option value="accesorios">Accesorios Cyber</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Etiqueta Promocional
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="ej. Flagship 2026, Oferta, Top Ventas"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Precio de Contado ($ USD) *
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="999.00"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Precio Anterior ($ USD tachado)
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="1199.00"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* CASHEA FINANCING CALCULATOR BOX */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider border border-amber-400 shadow-sm">
                      CASHEA
                    </span>
                    <span className="text-xs font-bold text-slate-900">Configuración de Financiamiento Cashea</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasCashea}
                      onChange={(e) => setFormData({ ...formData, hasCashea: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded border-amber-300 focus:ring-amber-400 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-700">Activo con Cashea</span>
                  </label>
                </div>

                {formData.hasCashea && (
                  <>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          % Inicial Solicitada
                        </label>
                        <select
                          value={formData.casheaInitialPercent}
                          onChange={(e) => setFormData({ ...formData, casheaInitialPercent: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          <option value="40">40% Inicial (Nivel 1 y 2)</option>
                          <option value="50">50% Inicial (Nivel 3)</option>
                          <option value="60">60% Inicial</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Número de Cuotas
                        </label>
                        <select
                          value={formData.casheaInstallments}
                          onChange={(e) => setFormData({ ...formData, casheaInstallments: e.target.value })}
                          className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          <option value="3">3 Cuotas (Estándar)</option>
                          <option value="6">6 Cuotas (Línea Extendida)</option>
                        </select>
                      </div>
                    </div>

                    {/* Live Calculation Display */}
                    {numericPrice > 0 && (
                      <div className="bg-white/80 rounded-xl p-3 border border-amber-200/60 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Pago Inicial del Cliente:</span>
                          <span className="font-extrabold text-amber-700 text-sm">
                            ${casheaInitialAmount.toFixed(2)} USD
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">
                            {installmentsCount} Cuotas c/ 14 días de:
                          </span>
                          <span className="font-extrabold text-slate-900 text-sm">
                            ${casheaInstallmentAmount.toFixed(2)} USD c/u
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                  Descripción Corta
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Resumen de especificaciones o detalles clave del producto..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all resize-none"
                />
              </div>

              {/* Stock Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="inStock" className="text-sm font-bold text-slate-700 cursor-pointer select-none">
                  Disponible en Stock para compra inmediata
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingProduct ? 'Actualizar Producto' : 'Crear Producto'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
