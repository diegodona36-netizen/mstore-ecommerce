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
  Layers,
  Layers3,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Pipette
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// PREDEFINED COLOR PRESETS WITH HEX CODES
export const COLOR_PRESETS = {
  'Negro Mate': '#121212',
  'Negro Titanio': '#1E293B',
  'Titanio Desierto': '#C2B280',
  'Titanio Natural': '#948B7D',
  'Blanco Puro': '#FFFFFF',
  'Blanco Estrella': '#F8FAFC',
  'Gris Grafito': '#475569',
  'Gris Espacial': '#374151',
  'Azul Titanio': '#1E3A8A',
  'Azul Medianoche': '#0F172A',
  'Azul Cielo': '#93C5FD',
  'Oro Champán': '#D97706',
  'Verde Esmeralda': '#059669',
  'Verde Oliva': '#556B2F',
  'Rojo Carmesí': '#DC2626',
  'Plata': '#E2E8F0',
  'Rosa Gold': '#F472B6',
  'Morado Lavanda': '#D8B4FE',
  'Naranja Cósmico': '#F97316'
};

export const COLOR_SUGGESTIONS = Object.keys(COLOR_PRESETS);

export const getSuggestedHex = (colorName) => {
  if (!colorName) return '#121212';
  if (COLOR_PRESETS[colorName]) return COLOR_PRESETS[colorName];
  const name = String(colorName).toLowerCase();
  if (name.includes('desierto') || name.includes('desert') || name.includes('arena')) return '#C2B280';
  if (name.includes('negro') || name.includes('black') || name.includes('oscuro')) return '#121212';
  if (name.includes('blanco') || name.includes('white') || name.includes('estrella') || name.includes('puro')) return '#FFFFFF';
  if (name.includes('medianoche') || name.includes('midnight')) return '#0F172A';
  if (name.includes('titanio') || name.includes('natural')) return '#948B7D';
  if (name.includes('grafito') || name.includes('gris') || name.includes('espacial')) return '#475569';
  if (name.includes('plata') || name.includes('silver')) return '#E2E8F0';
  if (name.includes('morado') || name.includes('purple') || name.includes('lila') || name.includes('lavanda')) return '#D8B4FE';
  if (name.includes('azul') || name.includes('blue') || name.includes('celeste') || name.includes('cielo')) return '#93C5FD';
  if (name.includes('oro') || name.includes('gold') || name.includes('champan') || name.includes('champán')) return '#D97706';
  if (name.includes('oliva') || name.includes('verde') || name.includes('green') || name.includes('esmeralda')) return '#059669';
  if (name.includes('rojo') || name.includes('red') || name.includes('rubi')) return '#DC2626';
  if (name.includes('rosa') || name.includes('pink') || name.includes('rose')) return '#F472B6';
  if (name.includes('naranja') || name.includes('orange')) return '#F97316';
  if (name.includes('amarillo') || name.includes('yellow')) return '#EAB308';
  return '#334155';
};

export const PREDEFINED_RAMS = [
  'No Aplica',
  '4GB',
  '6GB',
  '8GB',
  '12GB',
  '16GB',
  '24GB',
  '32GB',
  '64GB'
];

export const PREDEFINED_STORAGES = [
  'No Aplica / Estándar',
  '32GB',
  '64GB',
  '128GB',
  '256GB',
  '512GB',
  '1TB',
  '2TB'
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

  // Form State (Parent Product has NO price fields - prices exist exclusively per variant)
  const [formData, setFormData] = useState({
    name: '',
    category: 'smartphones',
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
          colorHex: '#121212',
          ram: '12GB',
          storage: '256GB',
          price: '',
          stock: '',
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
      existingVariants = product.variants.map((v, i) => {
        const cName = v.color || (typeof v.colors === 'string' ? v.colors : 'Negro Mate');
        return {
          id: v.id || `var_${Date.now()}_${i}`,
          color: cName,
          colorHex: v.colorHex || getSuggestedHex(cName),
          ram: v.ram || '8GB',
          storage: v.storage || (typeof v.size === 'string' ? v.size : '256GB'),
          price: v.price !== undefined ? v.price : (product.price || ''),
          stock: v.stock !== undefined && v.stock !== null ? v.stock : '',
          hasCashea: v.hasCashea !== undefined ? v.hasCashea : (product.hasCashea !== false)
        };
      });
    } else if (Array.isArray(product.storageOptions) && product.storageOptions.length > 0) {
      // Convert legacy storageOptions into explicit variant items
      existingVariants = product.storageOptions.map((st, i) => {
        const size = typeof st === 'object' ? st.size : st;
        const price = typeof st === 'object' ? st.price : product.price;
        const color = Array.isArray(product.colors) && product.colors[0] 
          ? (typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0]) 
          : 'Negro Mate';
        const ram = Array.isArray(product.ramOptions) && product.ramOptions[0] ? product.ramOptions[0] : '8GB';

        return {
          id: `var_${Date.now()}_${i}`,
          color: color || 'Negro Mate',
          colorHex: getSuggestedHex(color || 'Negro Mate'),
          ram: ram || '8GB',
          storage: size || '256GB',
          price: price || product.price || '',
          stock: '',
          hasCashea: product.hasCashea !== false
        };
      });
    } else {
      existingVariants = [
        {
          id: `var_${Date.now()}_1`,
          color: 'Negro Mate',
          colorHex: '#121212',
          ram: '12GB',
          storage: '256GB',
          price: product.price || '',
          stock: '',
          hasCashea: product.hasCashea !== false
        }
      ];
    }

    setFormData({
      name: product.name || '',
      category: product.category || 'smartphones',
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
      colorHex: lastVar?.colorHex || getSuggestedHex(lastVar?.color || 'Negro Mate'),
      ram: lastVar?.ram || '8GB',
      storage: lastVar?.storage || '256GB',
      price: lastVar?.price || '',
      stock: '',
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
    if (formData.variants.length <= 1) {
      alert('El producto debe tener al menos una variante o modelo.');
      return;
    }
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
    if (!formData.name.trim()) {
      alert('Por favor ingresa el nombre del producto.');
      return;
    }

    if (!formData.variants || formData.variants.length === 0) {
      alert('Debes agregar al menos una variante con su precio de venta.');
      return;
    }

    // Validate that all variants have a valid price
    const missingPrice = formData.variants.some(v => !v.price || parseFloat(v.price) <= 0);
    if (missingPrice) {
      alert('Por favor ingresa un precio de venta válido ($ USD) para cada una de las variantes agregadas.');
      return;
    }

    setIsSubmitting(true);
    try {
      let finalImageUrl = previewUrl || formData.image;

      // Default placeholder if none provided
      if (!finalImageUrl) {
        finalImageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
      }

      // Clean and normalize variants with custom color hex
      const cleanVariants = formData.variants.map((v, i) => {
        const rawStock = v.stock !== '' && v.stock !== undefined && v.stock !== null ? parseInt(v.stock) : null;
        const colorName = (v.color || 'Negro').trim();
        const colorHex = v.colorHex || getSuggestedHex(colorName);

        return {
          id: v.id || `var_${Date.now()}_${i}`,
          color: colorName,
          colorHex: colorHex,
          ram: v.ram === 'No Aplica' ? '' : (v.ram || '').trim(),
          storage: v.storage === 'No Aplica / Estándar' ? '' : (v.storage || '').trim(),
          price: parseFloat(v.price) || 0,
          stock: isNaN(rawStock) ? null : rawStock,
          hasCashea: v.hasCashea !== false
        };
      });

      // Extract unique lists for backwards compatibility with storefront filters
      const uniqueColors = Array.from(
        new Map(cleanVariants.map(v => [v.color, { name: v.color, hex: v.colorHex }])).values()
      );
      const uniqueRams = Array.from(new Set(cleanVariants.map(v => v.ram).filter(Boolean)));
      const uniqueStorages = Array.from(new Set(cleanVariants.map(v => v.storage).filter(Boolean)));

      // Calculate min base price for queries
      const variantPrices = cleanVariants.map(v => v.price).filter(p => p > 0);
      const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : 0;

      const productPayload = {
        name: formData.name.trim(),
        category: formData.category,
        price: minPrice, // Derived strictly from minimum variant price for DB sorting
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
      {/* Global Datalists for fast suggestion picking */}
      <datalist id="admin-color-suggestions">
        {COLOR_SUGGESTIONS.map(c => <option key={c} value={c} />)}
      </datalist>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">Crea, edita y administra los modelos, inventario y financiamiento Cashea.</p>
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

                  // Total Stock Calculation (Supports optional stock)
                  const hasExplicitStockCounts = hasVariants && variants.some(v => v.stock !== null && v.stock !== undefined);
                  const totalStockUnits = hasVariants && hasExplicitStockCounts
                    ? variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0)
                    : null;

                  const hasOutOfStockVariant = hasVariants && variants.some(v => v.stock !== null && v.stock !== undefined && parseInt(v.stock) <= 0);

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
                            </div>
                          )}
                        </td>

                        {/* Cashea Status Preview */}
                        <td className="py-3 px-4">
                          {p.hasCashea !== false ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/90 rounded-xl text-xs font-bold shadow-2xs">
                              <span className="bg-[#FFE600] text-black px-1.5 py-0.5 rounded text-[9px] font-black uppercase border border-amber-400">
                                CASHEA
                              </span>
                              <span>Aplica</span>
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
                              totalStockUnits === 0
                                ? 'bg-red-50 text-red-600'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                totalStockUnits === 0 ? 'bg-red-500' : 'bg-emerald-500'
                              }`} />
                              {totalStockUnits !== null ? `${totalStockUnits} unid.` : 'Disponible'}
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
                                  {totalStockUnits !== null ? (
                                    <>Stock Total: <strong className="text-slate-900">{totalStockUnits} unidades</strong></>
                                  ) : (
                                    <strong className="text-emerald-600">Stock Disponible Continuo</strong>
                                  )}
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
                                      const hasStockVal = v.stock !== null && v.stock !== undefined && v.stock !== '';
                                      const vStock = hasStockVal ? parseInt(v.stock) : null;
                                      const vPrice = parseFloat(v.price) || parseFloat(p.price) || 0;
                                      const vColorHex = v.colorHex || getSuggestedHex(v.color);
                                      return (
                                        <tr key={v.id || vIdx} className="hover:bg-slate-50/50">
                                          <td className="py-2 px-3 font-bold text-slate-400">{vIdx + 1}</td>
                                          <td className="py-2 px-3 font-bold text-slate-900 flex items-center gap-2">
                                            <span 
                                              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs inline-block shrink-0" 
                                              style={{ backgroundColor: vColorHex }}
                                            />
                                            <span>{v.color || 'Negro'}</span>
                                          </td>
                                          <td className="py-2 px-3 text-slate-700 font-semibold">{v.ram || '—'}</td>
                                          <td className="py-2 px-3 font-black text-slate-900">{v.storage || '—'}</td>
                                          <td className="py-2 px-3 font-black text-blue-600">${vPrice.toFixed(2)} USD</td>
                                          <td className="py-2 px-3">
                                            <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                                              vStock === null || vStock > 0 
                                                ? 'bg-emerald-50 text-emerald-700' 
                                                : 'bg-red-50 text-red-600'
                                            }`}>
                                              {vStock !== null ? (vStock > 0 ? `${vStock} unid.` : 'Agotado (0)') : 'Disponible'}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-fadeIn">
            
            {/* 1. FIXED MODAL HEADER (No scroll, no overlap) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {editingProduct ? 'Editar Producto y Modelos' : 'Crear Nuevo Producto'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Configuración de catálogo y lotes físicos con precios individuales</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. SCROLLABLE FORM BODY */}
            <form id="product-admin-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">
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

              {/* ------------------------------------------------------------- */}
              {/* SECTION: GESTOR DE VARIANTES DINÁMICAS (DYNAMIC REPEATER)      */}
              {/* Rich Custom Color Swatch + Optional Stock                     */}
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
                      Configura el tono visual exacto, RAM, almacenamiento, precio individual y stock de cada variante.
                    </p>
                  </div>

                  <span className="text-xs font-black px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 self-start sm:self-auto">
                    {formData.variants.length} {formData.variants.length === 1 ? 'modelo' : 'modelos'}
                  </span>
                </div>

                {/* Dynamic Variants List */}
                <div className="space-y-4">
                  {formData.variants.map((variant, idx) => {
                    const currentHex = variant.colorHex || getSuggestedHex(variant.color);

                    return (
                      <div 
                        key={variant.id || idx}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300 relative space-y-4"
                      >
                        {/* Card Header: Title & Delete button */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span 
                              className="w-4 h-4 rounded-full border border-slate-300 shadow-xs inline-block shrink-0" 
                              style={{ backgroundColor: currentHex }}
                            />
                            <span className="font-extrabold text-xs text-slate-900">
                              {variant.color || 'Color'} {variant.ram && variant.ram !== 'No Aplica' ? `• ${variant.ram}` : ''} {variant.storage && variant.storage !== 'No Aplica / Estándar' ? `• ${variant.storage}` : ''}
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
                            title="Eliminar este modelo"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>

                        {/* Card Inputs Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* 1. Custom Color Picker + Autocomplete Name */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-[11px] font-extrabold text-slate-700">
                                Color & Muestra *
                              </label>
                              <span className="text-[10px] text-slate-400 font-bold font-mono">
                                {currentHex}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Visual Color Swatch / HTML5 Color Picker */}
                              <label 
                                className="relative w-8 h-8 rounded-xl border border-slate-300 shadow-xs cursor-pointer overflow-hidden shrink-0 flex items-center justify-center transition-transform hover:scale-105"
                                style={{ backgroundColor: currentHex }}
                                title="Haz clic aquí para seleccionar el tono visual exacto"
                              >
                                <input
                                  type="color"
                                  value={currentHex}
                                  onChange={(e) => updateVariantField(idx, 'colorHex', e.target.value)}
                                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                                />
                                <Pipette className="w-3.5 h-3.5 text-white filter drop-shadow opacity-75 pointer-events-none" />
                              </label>

                              {/* Color Name Input with Suggestions */}
                              <input
                                type="text"
                                required
                                list="admin-color-suggestions"
                                value={variant.color}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  const autoHex = getSuggestedHex(val);
                                  setFormData(prev => {
                                    const updated = [...prev.variants];
                                    updated[idx] = { 
                                      ...updated[idx], 
                                      color: val,
                                      colorHex: autoHex || updated[idx].colorHex
                                    };
                                    return { ...prev, variants: updated };
                                  });
                                }}
                                placeholder="ej. Titanio Desierto, Azul..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                              />
                            </div>
                          </div>

                          {/* 2. RAM Dropdown */}
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Memoria RAM *
                            </label>
                            <select
                              value={variant.ram || '8GB'}
                              onChange={(e) => updateVariantField(idx, 'ram', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
                            >
                              {PREDEFINED_RAMS.map(r => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>

                          {/* 3. Storage Dropdown */}
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Almacenamiento *
                            </label>
                            <select
                              value={variant.storage || '256GB'}
                              onChange={(e) => updateVariantField(idx, 'storage', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
                            >
                              {PREDEFINED_STORAGES.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>

                          {/* 4. Variant Selling Price Input (Required) */}
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Precio de Venta ($ USD) *
                            </label>
                            <div className="relative">
                              <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                              <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                required
                                value={variant.price}
                                onChange={(e) => updateVariantField(idx, 'price', e.target.value)}
                                placeholder="ej. 999.00"
                                className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-blue-700 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                              />
                            </div>
                          </div>

                          {/* 5. Stock Units (OPTIONAL: Leave empty for Unlimited) */}
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Stock Disponible <span className="text-[10px] text-slate-400 font-normal">(Opcional)</span>
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={variant.stock}
                              onChange={(e) => updateVariantField(idx, 'stock', e.target.value)}
                              placeholder="Opcional (Ilimitado)"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* 6. Cashea Toggle */}
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
                    );
                  })}
                </div>

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
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFE600] text-black px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider border border-amber-400 shadow-xs shrink-0">
                    CASHEA
                  </span>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">Habilitar Pago con Cashea</span>
                    <span className="text-[11px] text-slate-500 font-medium">Permite a los clientes financiar este producto en cuotas con su cuenta Cashea</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasCashea}
                    onChange={(e) => setFormData({ ...formData, hasCashea: e.target.checked })}
                    className="w-5 h-5 text-amber-500 rounded border-amber-300 focus:ring-amber-400 cursor-pointer"
                  />
                </label>
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
            </form>

            {/* 3. FIXED MODAL FOOTER (Always visible, outside scroll container) */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/90 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-200/70 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="product-admin-form"
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

          </div>
        </div>
      )}
    </div>
  );
}
