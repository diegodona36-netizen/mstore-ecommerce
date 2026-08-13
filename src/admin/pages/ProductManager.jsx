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
  Cpu,
  HardDrive,
  Palette,
  Sparkles,
  Layers,
  Layers3,
  ChevronDown,
  ChevronUp,
  AlertTriangle
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Quick suggestions for datalists
const RAM_SUGGESTIONS = ['4GB', '6GB', '8GB', '12GB', '16GB', '24GB', '32GB'];
const STORAGE_SUGGESTIONS = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
const COLOR_SUGGESTIONS = [
  'Negro Mate', 'Blanco Puro', 'Titanio Natural', 'Gris Grafito',
  'Azul Titanio', 'Oro Champán', 'Verde Esmeralda', 'Rojo Carmesí',
  'Plata', 'Rosa Gold', 'Morado', 'Naranja'
];

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
  const [expandedRows, setExpandedRows] = useState({});

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
    variants: [],
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

  const toggleRowExpand = (productId) => {
    setExpandedRows(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
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
      variants: [
        {
          id: `var_${Date.now()}_1`,
          color: 'Negro Mate',
          ram: '12GB',
          storage: '256GB',
          price: '',
          stock: 5,
          hasCashea: true
        }
      ],
      image: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    // Parse existing variants or construct from legacy data
    let existingVariants = [];
    if (Array.isArray(product.variants) && product.variants.length > 0) {
      existingVariants = product.variants.map((v, i) => ({
        id: v.id || `var_${Date.now()}_${i}`,
        color: v.color || (typeof v.colors === 'string' ? v.colors : 'Negro'),
        ram: v.ram || '8GB',
        storage: v.storage || (typeof v.size === 'string' ? v.size : '256GB'),
        price: v.price !== undefined ? v.price : (product.price || ''),
        stock: v.stock !== undefined ? v.stock : 5,
        hasCashea: v.hasCashea !== undefined ? v.hasCashea : (product.hasCashea !== false)
      }));
    } else if (Array.isArray(product.storageOptions) && product.storageOptions.length > 0) {
      // Convert legacy storageOptions into explicit variant items
      existingVariants = product.storageOptions.map((st, i) => {
        const size = typeof st === 'object' ? st.size : st;
        const price = typeof st === 'object' ? st.price : product.price;
        const color = Array.isArray(product.colors) && product.colors[0] 
          ? (typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0]) 
          : 'Negro';
        const ram = Array.isArray(product.ramOptions) && product.ramOptions[0] ? product.ramOptions[0] : '8GB';

        return {
          id: `var_${Date.now()}_${i}`,
          color: color || 'Negro',
          ram: ram || '8GB',
          storage: size || '256GB',
          price: price || product.price || '',
          stock: 5,
          hasCashea: product.hasCashea !== false
        };
      });
    }

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
      variants: existingVariants,
      image: product.image || ''
    });
    setSelectedFile(null);
    setPreviewUrl(product.image || '');
    setIsModalOpen(true);
  };

  // Dynamic repeater handlers
  const addVariantBlock = () => {
    const lastVar = formData.variants[formData.variants.length - 1];
    const newVariant = {
      id: `var_${Date.now()}_${formData.variants.length + 1}`,
      color: lastVar?.color || 'Negro Mate',
      ram: lastVar?.ram || '8GB',
      storage: lastVar?.storage || '256GB',
      price: formData.price || lastVar?.price || '',
      stock: 5,
      hasCashea: formData.hasCashea !== false
    };

    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant]
    }));
  };

  const updateVariantField = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const removeVariantBlock = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, idx) => idx !== indexToRemove)
    }));
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

      // Clean and normalize variants
      const cleanVariants = formData.variants.map((v, i) => ({
        id: v.id || `var_${Date.now()}_${i}`,
        color: (v.color || 'Negro').trim(),
        ram: (v.ram || '').trim(),
        storage: (v.storage || '').trim(),
        price: parseFloat(v.price) || parseFloat(formData.price) || 0,
        stock: parseInt(v.stock) >= 0 ? parseInt(v.stock) : 0,
        hasCashea: v.hasCashea !== false
      }));

      // Extract unique lists for backwards compatibility with storefront filters
      const uniqueColors = Array.from(new Set(cleanVariants.map(v => v.color).filter(Boolean)));
      const uniqueRams = Array.from(new Set(cleanVariants.map(v => v.ram).filter(Boolean)));
      const uniqueStorages = Array.from(new Set(cleanVariants.map(v => v.storage).filter(Boolean)));

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
        variants: cleanVariants,
        colors: uniqueColors,
        ramOptions: uniqueRams,
        storageOptions: uniqueStorages,
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

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'todos' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Suggestions datalists for easy fast typing */}
      <datalist id="ram-list">
        {RAM_SUGGESTIONS.map(r => <option key={r} value={r} />)}
      </datalist>
      <datalist id="storage-list">
        {STORAGE_SUGGESTIONS.map(s => <option key={s} value={s} />)}
      </datalist>
      <datalist id="color-list">
        {COLOR_SUGGESTIONS.map(c => <option key={c} value={c} />)}
      </datalist>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">Crea, edita y administra los productos, variantes y financiamiento Cashea.</p>
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
            <h3 className="text-base font-bold text-slate-800">No hay productos registrados</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm">
              {searchQuery ? 'No se encontraron resultados para tu búsqueda.' : 'Crea tu primer producto con el botón "Nuevo Producto".'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/75 text-slate-500 text-xs font-extrabold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Producto</th>
                  <th className="py-3.5 px-4">Categoría</th>
                  <th className="py-3.5 px-4">Precio ($ USD)</th>
                  <th className="py-3.5 px-4">Plan Cashea</th>
                  <th className="py-3.5 px-4">Lotes y Variantes</th>
                  <th className="py-3.5 px-4">Stock Total</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProducts.map((p) => {
                  const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
                  const variants = hasVariants ? p.variants : [];
                  const variantsCount = variants.length;

                  // Price calculation with range support
                  const variantPrices = hasVariants 
                    ? variants.map(v => parseFloat(v.price) || 0).filter(pr => pr > 0)
                    : [parseFloat(p.price) || 0];

                  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(p.price) || 0);
                  const maxPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(p.price) || 0);
                  const hasPriceRange = minPrice !== maxPrice;

                  // Total Stock
                  const totalStock = hasVariants
                    ? variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0)
                    : (p.inStock !== false ? 'En Stock' : 'Agotado');

                  const hasOutOfStockVariant = hasVariants && variants.some(v => parseInt(v.stock) <= 0);

                  // Cashea calculation
                  const pInitPct = p.casheaInitialPercent || 40;
                  const pInstallments = p.casheaInstallments || 3;
                  const minInitial = minPrice * (pInitPct / 100);
                  const maxInitial = maxPrice * (pInitPct / 100);
                  const minInstallment = (minPrice * (1 - pInitPct / 100)) / pInstallments;
                  const maxInstallment = (maxPrice * (1 - pInitPct / 100)) / pInstallments;

                  const isExpanded = !!expandedRows[p.id];

                  return (
                    <React.Fragment key={p.id}>
                      <tr className={`hover:bg-slate-50/70 transition-colors ${isExpanded ? 'bg-blue-50/30' : ''}`}>
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
                              <div className="text-xs text-slate-400 line-clamp-1">
                                {p.description || 'Sin descripción'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="capitalize px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                            {p.category}
                          </span>
                        </td>

                        {/* Price (Range Support) */}
                        <td className="py-3 px-4">
                          {hasPriceRange ? (
                            <div>
                              <div className="font-black text-blue-700 text-xs sm:text-sm">
                                ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                              </div>
                              <div className="text-[10px] font-bold text-slate-400">Rango según modelo</div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-black text-slate-900">${minPrice.toFixed(2)} USD</div>
                              {p.originalPrice && (
                                <div className="text-xs text-slate-400 line-through">${p.originalPrice}</div>
                              )}
                            </div>
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
                                Inicial: <span className="text-amber-600">
                                  ${minInitial.toFixed(0)}{hasPriceRange ? ` - $${maxInitial.toFixed(0)}` : ''}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium">
                                {pInstallments} cuotas de ${minInstallment.toFixed(0)}{hasPriceRange ? ` - $${maxInstallment.toFixed(0)}` : ''}
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Solo Contado</span>
                          )}
                        </td>

                        {/* Variants Accordion Button */}
                        <td className="py-3 px-4">
                          {hasVariants ? (
                            <button
                              onClick={() => toggleRowExpand(p.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-200 transition-all shadow-xs"
                            >
                              <Layers className="w-3.5 h-3.5 text-blue-600" />
                              <span>{variantsCount} {variantsCount === 1 ? 'modelo' : 'modelos'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Modelo Único</span>
                          )}
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                              totalStock === 0 || totalStock === 'Agotado'
                                ? 'bg-red-50 text-red-600'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                totalStock === 0 || totalStock === 'Agotado' ? 'bg-red-500' : 'bg-emerald-500'
                              }`} />
                              {typeof totalStock === 'number' ? `${totalStock} unid.` : totalStock}
                            </span>

                            {hasOutOfStockVariant && (
                              <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Hay modelos sin stock</span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(p)}
                              className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Editar Producto y Lotes"
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

                      {/* EXPANDABLE INLINE DRAWER FOR VARIANTS */}
                      {isExpanded && hasVariants && (
                        <tr className="bg-slate-50/80 border-y border-slate-200">
                          <td colSpan="7" className="p-4 sm:p-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                  <Layers3 className="w-4 h-4 text-blue-600" />
                                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                                    Desglose de Lotes / Modelos Físicos de "{p.name}"
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-slate-500">
                                  Stock Total: <strong className="text-slate-900">{totalStock} unidades</strong>
                                </span>
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
                                      <th className="py-2 px-3">#</th>
                                      <th className="py-2 px-3">Color</th>
                                      <th className="py-2 px-3">RAM</th>
                                      <th className="py-2 px-3">Almacenamiento</th>
                                      <th className="py-2 px-3">Precio Venta</th>
                                      <th className="py-2 px-3">Stock Físico</th>
                                      <th className="py-2 px-3">Cashea</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-medium">
                                    {variants.map((v, vIdx) => {
                                      const vStock = parseInt(v.stock) || 0;
                                      const vPrice = parseFloat(v.price) || parseFloat(p.price) || 0;
                                      return (
                                        <tr key={v.id || vIdx} className="hover:bg-slate-50/50">
                                          <td className="py-2 px-3 font-bold text-slate-400">{vIdx + 1}</td>
                                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block" />
                                            {v.color || 'Negro'}
                                          </td>
                                          <td className="py-2 px-3 text-slate-700 font-semibold">{v.ram || '—'}</td>
                                          <td className="py-2 px-3 font-black text-slate-900">{v.storage || '—'}</td>
                                          <td className="py-2 px-3 font-black text-blue-600">${vPrice.toFixed(2)} USD</td>
                                          <td className="py-2 px-3">
                                            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                                              vStock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                                            }`}>
                                              {vStock > 0 ? `${vStock} unid.` : 'Agotado (0)'}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3">
                                            {v.hasCashea !== false ? (
                                              <span className="text-amber-600 font-bold">🟡 Activo</span>
                                            ) : (
                                              <span className="text-slate-400">Contado</span>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL CREAR / EDITAR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 my-6 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 sticky top-0 bg-white z-20">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Configuración de catálogo y lotes de inventario</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Product Image Upload Section */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Imagen Principal del Producto
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative group flex-shrink-0">
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
                  Nombre General del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ej. Samsung Galaxy S24 Ultra"
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
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all cursor-pointer"
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

              {/* Base Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Precio Base de Referencia ($ USD) *
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
                    Precio Anterior Tachado ($ USD)
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

              {/* ------------------------------------------------------------- */}
              {/* SECTION: GESTOR DE VARIANTES DINÁMICAS (DYNAMIC REPEATER)      */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Layers3 className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Modelos y Variantes Reales
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Agrega solo las combinaciones físicas que tienes en tu factura o stock.
                    </p>
                  </div>

                  <span className="text-xs font-black px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 self-start sm:self-auto">
                    {formData.variants.length} {formData.variants.length === 1 ? 'variante' : 'variantes'}
                  </span>
                </div>

                {/* Dynamic Variants List */}
                {formData.variants.length === 0 ? (
                  <div className="py-8 px-4 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
                    <Package className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">No has agregado modelos específicos todavía</p>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                      Haz clic en el botón de abajo para registrar cada combinación con su color, RAM, almacenamiento, precio y stock.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.variants.map((variant, idx) => (
                      <div 
                        key={variant.id || idx}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300 relative space-y-4"
                      >
                        {/* Card Header: Title & Delete button */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span className="font-extrabold text-xs text-slate-900">
                              {variant.color || 'Color'} • {variant.ram || 'RAM'} • {variant.storage || 'Almacenamiento'}
                            </span>
                            {variant.price && (
                              <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                ${parseFloat(variant.price).toFixed(2)} USD
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeVariantBlock(idx)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                            title="Eliminar esta variante"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>

                        {/* Card Inputs Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Color */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Color del Equipo *
                            </label>
                            <input
                              type="text"
                              required
                              list="color-list"
                              value={variant.color}
                              onChange={(e) => updateVariantField(idx, 'color', e.target.value)}
                              placeholder="ej. Negro Mate, Titanio"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* RAM */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Memoria RAM
                            </label>
                            <input
                              type="text"
                              list="ram-list"
                              value={variant.ram}
                              onChange={(e) => updateVariantField(idx, 'ram', e.target.value)}
                              placeholder="ej. 8GB, 12GB"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* Storage */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Almacenamiento *
                            </label>
                            <input
                              type="text"
                              required
                              list="storage-list"
                              value={variant.storage}
                              onChange={(e) => updateVariantField(idx, 'storage', e.target.value)}
                              placeholder="ej. 128GB, 256GB, 512GB"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* Price */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Precio de Venta ($ USD) *
                            </label>
                            <div className="relative">
                              <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="number"
                                step="0.01"
                                required
                                value={variant.price}
                                onChange={(e) => updateVariantField(idx, 'price', e.target.value)}
                                placeholder={formData.price || '0.00'}
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                              />
                            </div>
                          </div>

                          {/* Stock */}
                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Stock Disponible (Unidades) *
                            </label>
                            <input
                              type="number"
                              min="0"
                              required
                              value={variant.stock}
                              onChange={(e) => updateVariantField(idx, 'stock', e.target.value)}
                              placeholder="5"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* Cashea Toggle */}
                          <div className="flex flex-col justify-end">
                            <label className="flex items-center gap-2 p-2 bg-amber-50/60 border border-amber-200 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors">
                              <input
                                type="checkbox"
                                checked={variant.hasCashea}
                                onChange={(e) => updateVariantField(idx, 'hasCashea', e.target.checked)}
                                className="w-4 h-4 text-amber-500 rounded border-amber-300 focus:ring-amber-400 cursor-pointer"
                              />
                              <span className="text-[11px] font-extrabold text-amber-950 select-none">
                                Aplica Cashea
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* MAIN ACTION BUTTON: + Agregar Modelo/Variante */}
                <button
                  type="button"
                  onClick={addVariantBlock}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Agregar Modelo / Variante</span>
                </button>
              </div>

              {/* GLOBAL CASHEA FINANCING CONFIGURATION */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded font-black text-[10px] uppercase tracking-wider border border-amber-400 shadow-sm">
                      CASHEA
                    </span>
                    <span className="text-xs font-bold text-slate-900">Parámetros de Financiamiento Cashea</span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasCashea}
                      onChange={(e) => setFormData({ ...formData, hasCashea: e.target.checked })}
                      className="w-4 h-4 text-amber-500 rounded border-amber-300 focus:ring-amber-400 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-700">Cashea Habilitado</span>
                  </label>
                </div>

                {formData.hasCashea && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        % Inicial Solicitada
                      </label>
                      <select
                        value={formData.casheaInitialPercent}
                        onChange={(e) => setFormData({ ...formData, casheaInitialPercent: e.target.value })}
                        className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
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
                        className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                      >
                        <option value="3">3 Cuotas (Estándar)</option>
                        <option value="6">6 Cuotas (Línea Extendida)</option>
                      </select>
                    </div>
                  </div>
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
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 sticky bottom-0 bg-white z-20">
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
