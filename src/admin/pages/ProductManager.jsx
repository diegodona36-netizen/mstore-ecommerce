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
  ChevronDown,
  ChevronUp,
  Zap,
  Palette,
  Copy,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// Quick color suggestion presets
const QUICK_COLOR_PRESETS = [
  { name: 'Negro', hex: '#121212' },
  { name: 'Blanco', hex: '#FFFFFF' },
  { name: 'Acero Inox', hex: '#94A3B8' },
  { name: 'Gris', hex: '#475569' },
  { name: 'Titanio', hex: '#948B7D' },
  { name: 'Azul', hex: '#1E3A8A' },
  { name: 'Verde', hex: '#059669' },
  { name: 'Rojo', hex: '#DC2626' },
  { name: 'Dorado', hex: '#D97706' }
];

// Quick version/spec suggestions by category
const QUICK_VERSION_PRESETS = {
  'linea-blanca': ['110V', '220V', '400 Litros', '600 Litros', '12 Kg', '16 Kg', '4 Hornillas', '6 Hornillas'],
  'smartphones': ['128GB', '256GB', '512GB', '1TB', '8GB / 128GB', '12GB / 256GB', '12GB / 512GB'],
  'televisores': ['43"', '50"', '55"', '65"', '75"', '85"'],
  'computacion': ['16GB / 512GB SSD', '16GB / 1TB SSD', '32GB / 1TB SSD'],
  'audio': ['In-Ear', 'Over-Ear', 'Bluetooth', 'Hi-Res'],
  'hogar': ['110V', '220V', 'Estándar'],
  'gaming': ['512GB', '1TB', '2TB', 'Edición Especial']
};

const getSuggestedHex = (name = '') => {
  const n = name.toLowerCase().trim();
  if (n.includes('negro') || n.includes('black') || n.includes('oscuro')) return '#121212';
  if (n.includes('blanco') || n.includes('white') || n.includes('puro')) return '#FFFFFF';
  if (n.includes('inox') || n.includes('acero') || n.includes('plata') || n.includes('silver')) return '#94A3B8';
  if (n.includes('gris') || n.includes('grafito') || n.includes('espacial')) return '#475569';
  if (n.includes('desierto') || n.includes('desert') || n.includes('arena')) return '#C2B280';
  if (n.includes('titanio') || n.includes('natural')) return '#948B7D';
  if (n.includes('azul') || n.includes('blue') || n.includes('marino') || n.includes('medianoche')) return '#1E3A8A';
  if (n.includes('verde') || n.includes('green') || n.includes('oliva') || n.includes('esmeralda')) return '#059669';
  if (n.includes('rojo') || n.includes('red') || n.includes('carmesi')) return '#DC2626';
  if (n.includes('oro') || n.includes('gold') || n.includes('dorado') || n.includes('champan')) return '#D97706';
  if (n.includes('rosa') || n.includes('pink') || n.includes('rose')) return '#F472B6';
  return '#334155';
};

export const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('todos');
  const [expandedRows, setExpandedRows] = useState({});

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom Color Input State
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#121212');

  // Custom Version Input State
  const [customVersionTitle, setCustomVersionTitle] = useState('');

  // Simplified Product Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'linea-blanca',
    tag: '',
    description: '',
    inStock: true,
    hasCashea: true,
    isFlashDeal: false,
    casheaInitialPercent: 40,
    casheaInstallments: 3,
    hasVariants: false,
    basePrice: '',
    baseStock: '',
    colors: [], // [{ name: 'Negro Mate', hex: '#121212' }]
    variants: [], // [{ id: 'var_1', title: '128GB', price: 899, stock: 10, hasCashea: true }]
    image: '',
    additionalImages: [] // ['url1', 'url2']
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
      category: 'linea-blanca',
      tag: '',
      description: '',
      inStock: true,
      hasCashea: true,
      isFlashDeal: false,
      casheaInitialPercent: 40,
      casheaInstallments: 3,
      hasVariants: false,
      basePrice: '',
      baseStock: '',
      colors: [
        { name: 'Negro Mate', hex: '#121212' },
        { name: 'Acero Inox', hex: '#94A3B8' }
      ],
      variants: [],
      image: '',
      additionalImages: []
    });
    setCustomColorName('');
    setCustomColorHex('#121212');
    setCustomVersionTitle('');
    setSelectedFile(null);
    setPreviewUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    let parsedColors = [];
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      parsedColors = product.colors.map(c => {
        if (typeof c === 'object' && c.name) return { name: c.name, hex: c.hex || getSuggestedHex(c.name) };
        return { name: String(c), hex: getSuggestedHex(String(c)) };
      });
    } else if (Array.isArray(product.variants) && product.variants.some(v => v.color)) {
      const uniqueColors = Array.from(new Set(product.variants.map(v => v.color).filter(Boolean)));
      parsedColors = uniqueColors.map(cName => ({ name: cName, hex: getSuggestedHex(cName) }));
    }

    const hasVars = Array.isArray(product.variants) && product.variants.length > 0;
    const parsedVariants = hasVars ? product.variants.map((v, i) => ({
      id: v.id || `var_${Date.now()}_${i}`,
      title: v.title || Object.values(v.options || {}).join(' / ') || [v.ram, v.storage].filter(Boolean).join(' / ') || `Versión ${i + 1}`,
      price: v.price !== undefined ? v.price : (product.price || ''),
      stock: v.stock !== undefined && v.stock !== null ? v.stock : '',
      hasCashea: v.hasCashea !== false
    })) : [];

    // Parse additional images (exclude main image to avoid duplicate)
    let addImgs = [];
    if (Array.isArray(product.images) && product.images.length > 1) {
      addImgs = product.images.slice(1);
    }

    setFormData({
      name: product.name || '',
      category: product.category || 'linea-blanca',
      tag: product.tag || '',
      description: product.description || '',
      inStock: product.inStock !== false,
      hasCashea: product.hasCashea !== false,
      isFlashDeal: product.isFlashDeal || false,
      casheaInitialPercent: product.casheaInitialPercent || 40,
      casheaInstallments: product.casheaInstallments || 3,
      hasVariants: hasVars,
      basePrice: product.price || '',
      baseStock: product.stock || '',
      colors: parsedColors,
      variants: parsedVariants,
      image: product.image || '',
      additionalImages: addImgs
    });
    setCustomColorName('');
    setCustomColorHex('#121212');
    setCustomVersionTitle('');
    setSelectedFile(null);
    setPreviewUrl(product.image || '');
    setIsModalOpen(true);
  };

  // -------------------------------------------------------------
  // COLOR HANDLERS (SIMPLE & FULLY CUSTOMIZABLE)
  // -------------------------------------------------------------
  const handleAddCustomColor = () => {
    const name = customColorName.trim();
    if (!name) return;
    if (formData.colors.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      setCustomColorName('');
      return;
    }

    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name, hex: customColorHex }]
    }));
    setCustomColorName('');
  };

  const handleAddPresetColor = (preset) => {
    if (formData.colors.some(c => c.name.toLowerCase() === preset.name.toLowerCase())) return;
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: preset.name, hex: preset.hex }]
    }));
  };

  const handleRemoveColor = (cIdx) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== cIdx)
    }));
  };

  const handleUpdateColorHex = (cIdx, hex) => {
    setFormData(prev => {
      const updated = [...prev.colors];
      updated[cIdx] = { ...updated[cIdx], hex };
      return { ...prev, colors: updated };
    });
  };

  // -------------------------------------------------------------
  // VARIANT / VERSION HANDLERS (SIMPLE LIST)
  // -------------------------------------------------------------
  const handleAddVersion = (titleToAdd) => {
    const title = (titleToAdd || customVersionTitle).trim();
    if (!title) return;
    if (formData.variants.some(v => v.title.toLowerCase() === title.toLowerCase())) {
      setCustomVersionTitle('');
      return;
    }

    const defaultPrice = formData.variants.length > 0 ? formData.variants[0].price : formData.basePrice || '';
    const newVar = {
      id: `var_${Date.now()}_${formData.variants.length + 1}`,
      title: title,
      price: defaultPrice,
      stock: '',
      hasCashea: true
    };

    setFormData(prev => ({
      ...prev,
      hasVariants: true,
      variants: [...prev.variants, newVar]
    }));
    setCustomVersionTitle('');
  };

  const handleRemoveVariant = (vIdx) => {
    const updated = formData.variants.filter((_, i) => i !== vIdx);
    setFormData(prev => ({
      ...prev,
      variants: updated,
      hasVariants: updated.length > 0
    }));
  };

  const handleUpdateVariantField = (vIdx, field, val) => {
    setFormData(prev => {
      const updated = [...prev.variants];
      updated[vIdx] = { ...updated[vIdx], [field]: val };
      return { ...prev, variants: updated };
    });
  };

  const handleCopyFirstPrice = () => {
    if (formData.variants.length === 0) return;
    const firstPrice = formData.variants[0].price;
    if (!firstPrice && firstPrice !== 0) {
      alert("Ingresa un precio en la primera versión para copiarlo a todas.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map(v => ({ ...v, price: firstPrice }))
    }));
  };

  // Additional Images Gallery Handlers
  const handleAddAdditionalImage = () => {
    setFormData(prev => ({
      ...prev,
      additionalImages: [...prev.additionalImages, '']
    }));
  };

  const handleUpdateAdditionalImage = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.additionalImages];
      updated[index] = value;
      return { ...prev, additionalImages: updated };
    });
  };

  const handleRemoveAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  // Image Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Por favor ingresa el nombre del producto.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = previewUrl || formData.image;
      if (!finalImageUrl) {
        finalImageUrl = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
      }

      let cleanVariants = [];
      let finalPrice = 0;
      let finalStock = null;

      if (formData.hasVariants && formData.variants.length > 0) {
        cleanVariants = formData.variants.map((v, i) => {
          const rawStock = v.stock !== '' && v.stock !== undefined && v.stock !== null ? parseInt(v.stock) : null;
          return {
            id: v.id || `var_${Date.now()}_${i}`,
            title: v.title || `Versión ${i + 1}`,
            price: parseFloat(v.price) || 0,
            stock: isNaN(rawStock) ? null : rawStock,
            hasCashea: v.hasCashea !== false
          };
        });

        const variantPrices = cleanVariants.map(v => v.price).filter(p => p > 0);
        finalPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : 0;
      } else {
        finalPrice = parseFloat(formData.basePrice) || 0;
        finalStock = formData.baseStock !== '' ? parseInt(formData.baseStock) : null;
      }

      // Format clean images array (Main image first, followed by valid additional images)
      const validExtraImages = (formData.additionalImages || []).map(s => s.trim()).filter(Boolean);
      const finalImagesList = [finalImageUrl, ...validExtraImages];

      // Convert simple variants into options array for universal storefront compatibility
      const optionsArray = (formData.hasVariants && cleanVariants.length > 0)
        ? [{ name: 'Versión', values: cleanVariants.map(v => v.title) }]
        : [];

      const productPayload = {
        name: formData.name.trim(),
        category: formData.category,
        price: finalPrice,
        stock: finalStock,
        tag: formData.tag.trim(),
        description: formData.description.trim(),
        inStock: formData.inStock,
        hasCashea: formData.hasCashea,
        isFlashDeal: formData.isFlashDeal || false,
        casheaInitialPercent: parseInt(formData.casheaInitialPercent) || 40,
        casheaInstallments: parseInt(formData.casheaInstallments) || 3,
        colors: formData.colors || [],
        options: optionsArray,
        variants: cleanVariants,
        image: finalImageUrl,
        images: finalImagesList,
        rating: editingProduct?.rating || 5.0,
        reviewsCount: editingProduct?.reviewsCount || 1,
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productPayload);
      } else {
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

  const categoryPresets = QUICK_VERSION_PRESETS[formData.category] || QUICK_VERSION_PRESETS['linea-blanca'];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">
            Administra tus productos, colores y precios de forma rápida y sencilla.
          </p>
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
                  <th className="py-3.5 px-4">Colores / Versiones</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredProducts.map((p) => {
                  const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
                  const variants = hasVariants ? p.variants : [];
                  const variantsCount = variants.length;
                  const colorsCount = Array.isArray(p.colors) ? p.colors.length : 0;

                  // Price calculation with range support
                  const variantPrices = hasVariants 
                    ? variants.map(v => parseFloat(v.price) || 0).filter(pr => pr > 0)
                    : [parseFloat(p.price) || 0];

                  const minPrice = variantPrices.length > 0 ? Math.min(...variantPrices) : (parseFloat(p.price) || 0);
                  const maxPrice = variantPrices.length > 0 ? Math.max(...variantPrices) : (parseFloat(p.price) || 0);
                  const hasPriceRange = minPrice !== maxPrice;

                  // Stock calculation
                  const hasExplicitStockCounts = hasVariants && variants.some(v => v.stock !== null && v.stock !== undefined);
                  const totalStockUnits = hasVariants && hasExplicitStockCounts
                    ? variants.reduce((acc, v) => acc + (parseInt(v.stock) || 0), 0)
                    : p.stock !== null && p.stock !== undefined ? p.stock : null;

                  const isExpanded = !!expandedRows[p.id];

                  return (
                    <React.Fragment key={p.id}>
                      <tr className={`hover:bg-slate-50/70 transition-colors ${isExpanded ? 'bg-blue-50/30' : ''}`}>
                        {/* Image & Name */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden p-1 flex items-center justify-center">
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

                        {/* Price */}
                        <td className="py-3 px-4">
                          {hasPriceRange ? (
                            <div>
                              <div className="font-black text-blue-700 text-xs sm:text-sm">
                                ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                              </div>
                              <div className="text-[10px] font-bold text-slate-400">Rango de precio</div>
                            </div>
                          ) : (
                            <div>
                              <div className="font-black text-slate-900">${minPrice.toFixed(2)} USD</div>
                            </div>
                          )}
                        </td>

                        {/* Cashea Status */}
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

                        {/* Colors / Variants Preview */}
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            {hasVariants ? (
                              <button
                                onClick={() => toggleRowExpand(p.id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-200 transition-all shadow-xs"
                              >
                                <Layers className="w-3.5 h-3.5 text-blue-600" />
                                <span>{variantsCount} {variantsCount === 1 ? 'versión' : 'versiones'}</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Modelo Único</span>
                            )}

                            {colorsCount > 0 && (
                              <div className="flex items-center gap-1 pt-0.5">
                                {p.colors.slice(0, 4).map((c, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className="w-2.5 h-2.5 rounded-full border border-slate-300 shadow-2xs inline-block"
                                    style={{ backgroundColor: typeof c === 'object' ? c.hex : getSuggestedHex(c) }}
                                    title={typeof c === 'object' ? c.name : c}
                                  />
                                ))}
                                {colorsCount > 4 && (
                                  <span className="text-[9px] text-slate-400 font-bold">+{colorsCount - 4}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="py-3 px-4">
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

                      {/* EXPANDABLE INLINE DRAWER FOR VARIANTS */}
                      {isExpanded && hasVariants && (
                        <tr className="bg-slate-50/80 border-y border-slate-200">
                          <td colSpan="7" className="p-4 sm:p-6">
                            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-blue-600" />
                                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                                    Versiones y Precios de "{p.name}"
                                  </span>
                                </div>
                                <span className="text-xs font-bold text-slate-500">
                                  {totalStockUnits !== null ? (
                                    <>Stock Total: <strong className="text-slate-900">{totalStockUnits} unidades</strong></>
                                  ) : (
                                    <strong className="text-emerald-600">Stock Continuo</strong>
                                  )}
                                </span>
                              </div>

                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr className="text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-100">
                                      <th className="py-2 px-3">#</th>
                                      <th className="py-2 px-3">Versión / Capacidad</th>
                                      <th className="py-2 px-3">Precio Venta</th>
                                      <th className="py-2 px-3">Stock Físico</th>
                                      <th className="py-2 px-3">Cashea</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-medium">
                                    {variants.map((v, vIdx) => {
                                      const vPrice = parseFloat(v.price) || parseFloat(p.price) || 0;
                                      return (
                                        <tr key={v.id || vIdx} className="hover:bg-slate-50/50">
                                          <td className="py-2 px-3 font-bold text-slate-400">{vIdx + 1}</td>
                                          <td className="py-2 px-3 font-extrabold text-slate-900">
                                            <span className="px-2 py-0.5 bg-slate-100 rounded-md">
                                              {v.title || 'Versión'}
                                            </span>
                                          </td>
                                          <td className="py-2 px-3 font-black text-blue-700">
                                            ${vPrice.toFixed(2)} USD
                                          </td>
                                          <td className="py-2 px-3 font-bold text-slate-700">
                                            {v.stock !== null && v.stock !== undefined && v.stock !== '' ? `${v.stock} unid.` : 'Ilimitado'}
                                          </td>
                                          <td className="py-2 px-3">
                                            {v.hasCashea !== false ? (
                                              <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                                                Cashea ✓
                                              </span>
                                            ) : (
                                              <span className="text-slate-400 text-[10px]">Contado</span>
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

      {/* ========================================================================= */}
      {/* MODAL: CREAR / EDITAR PRODUCTO (ULTRA SIMPLIFICADO)                       */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            
            {/* 1. FIXED HEADER */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50/80 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Completa los datos del producto de forma rápida y sencilla
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. SCROLLABLE BODY */}
            <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Product Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Nevera Samsung 600L Inverter o iPhone 16 Pro Max"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Categoría *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c.id !== 'todos').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Promotional Tag */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Etiqueta Promocional <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="ej. OFERTA TOP, 10 AÑOS GARANTÍA"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

              </div>

              {/* Product Image & Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-slate-700">
                    Foto Principal del Producto *
                  </label>
                  <button
                    type="button"
                    onClick={handleAddAdditionalImage}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar otra foto (opcional)</span>
                  </button>
                </div>
                
                {/* Main Image */}
                <div className="flex items-center gap-4 p-3 border border-slate-200 rounded-2xl bg-slate-50/50">
                  <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-1 shrink-0 shadow-xs">
                    {previewUrl || formData.image ? (
                      <img
                        src={previewUrl || formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row gap-2">
                    <label className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 cursor-pointer shadow-xs active:scale-95 transition-all shrink-0">
                      <Upload className="w-3.5 h-3.5 text-blue-600" />
                      <span>Subir Foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="O pega una URL de la imagen principal..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                {/* Additional Gallery Images */}
                {formData.additionalImages && formData.additionalImages.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-600">Fotos adicionales (Galería):</span>
                    {formData.additionalImages.map((extraImg, imgIdx) => (
                      <div key={imgIdx} className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          type="url"
                          value={extraImg}
                          onChange={(e) => handleUpdateAdditionalImage(imgIdx, e.target.value)}
                          placeholder={`URL de foto adicional ${imgIdx + 2} (ej. vista trasera, caja)...`}
                          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditionalImage(imgIdx)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors text-xs font-bold"
                          title="Quitar foto"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION: COLORES DEL PRODUCTO (SIMPLE Y PERSONALIZABLE)       */}
              {/* ------------------------------------------------------------- */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-700" />
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Colores Disponibles
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Personaliza los tonos para que el cliente los elija
                  </span>
                </div>

                {/* Input para agregar color personalizado */}
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center">
                    <label 
                      className="w-9 h-9 rounded-xl border-2 border-slate-300 cursor-pointer overflow-hidden flex items-center justify-center shrink-0 shadow-2xs hover:scale-105 transition-transform"
                      style={{ backgroundColor: customColorHex }}
                      title="Toca para elegir el tono en la paleta"
                    >
                      <input
                        type="color"
                        value={customColorHex}
                        onChange={(e) => setCustomColorHex(e.target.value)}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={customColorName}
                    onChange={(e) => {
                      setCustomColorName(e.target.value);
                      const auto = getSuggestedHex(e.target.value);
                      if (auto !== '#334155') setCustomColorHex(auto);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomColor();
                      }
                    }}
                    placeholder="Escribe un color (ej. Titanio Azul, Acero Inox, Blanco)..."
                    className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />

                  <button
                    type="button"
                    onClick={handleAddCustomColor}
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 shrink-0"
                  >
                    + Agregar
                  </button>
                </div>

                {/* Sugerencias Rápidas */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  <span className="text-[11px] font-bold text-slate-400">Rápidos:</span>
                  {QUICK_COLOR_PRESETS.map((p, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleAddPresetColor(p)}
                      className="px-2 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 transition-all active:scale-95 flex items-center gap-1 shadow-2xs"
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: p.hex }} />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>

                {/* Lista de Colores Activos */}
                {formData.colors.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-slate-200/60">
                    {formData.colors.map((c, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
                      >
                        <label 
                          className="w-4 h-4 rounded-full border border-slate-300 cursor-pointer overflow-hidden shrink-0 hover:scale-110 transition-transform relative"
                          style={{ backgroundColor: c.hex }}
                          title="Toca para cambiar el tono exacto"
                        >
                          <input
                            type="color"
                            value={c.hex}
                            onChange={(e) => handleUpdateColorHex(cIdx, e.target.value)}
                            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                          />
                        </label>

                        <span className="text-xs font-bold text-slate-900">{c.name}</span>

                        <button
                          type="button"
                          onClick={() => handleRemoveColor(cIdx)}
                          className="p-0.5 text-slate-400 hover:text-red-600 rounded transition-colors text-xs font-bold ml-0.5"
                          title="Eliminar color"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION: PRECIO Y VERSIONES (ULTRA SIMPLE)                    */}
              {/* ------------------------------------------------------------- */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Precio e Inventario
                    </span>
                  </div>

                  {!formData.hasVariants ? (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, hasVariants: true }))}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all shadow-2xs active:scale-95"
                    >
                      + ¿Tiene diferentes versiones/tamaños?
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, hasVariants: false, variants: [] }))}
                      className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
                    >
                      Volver a precio único
                    </button>
                  )}
                </div>

                {/* Si NO tiene versiones -> Precio Directo */}
                {!formData.hasVariants ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                        Precio de Venta ($ USD) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          required={!formData.hasVariants}
                          value={formData.basePrice}
                          onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                          placeholder="ej. 750.00"
                          className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-blue-700 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                        Stock Físico <span className="text-[10px] text-slate-400 font-normal">(Opcional)</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.baseStock}
                        onChange={(e) => setFormData({ ...formData, baseStock: e.target.value })}
                        placeholder="Opcional (Ilimitado)"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                    </div>
                  </div>
                ) : (
                  /* Si TIENE versiones -> Lista simple de versiones */
                  <div className="space-y-3">
                    
                    {/* Input rápido para agregar versión */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={customVersionTitle}
                        onChange={(e) => setCustomVersionTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddVersion();
                          }
                        }}
                        placeholder="Escribe la versión o capacidad (ej. 128GB, 256GB / 110V, 220V / 55 pulg)..."
                        className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddVersion()}
                        className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 shrink-0"
                      >
                        + Agregar Versión
                      </button>
                    </div>

                    {/* Sugerencias Rápidas según la categoría */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-slate-400">Sugerencias:</span>
                      {categoryPresets.map((pVal, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleAddVersion(pVal)}
                          className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-lg text-xs font-bold transition-all shadow-2xs active:scale-95"
                        >
                          + {pVal}
                        </button>
                      ))}
                    </div>

                    {/* Tabla de Versiones */}
                    {formData.variants.length > 0 ? (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-800">
                            Versiones Registradas ({formData.variants.length})
                          </span>

                          <button
                            type="button"
                            onClick={handleCopyFirstPrice}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                            title="Copia el precio de la primera fila a todas las demás"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copiar 1er precio a todas</span>
                          </button>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                                <th className="py-2.5 px-3">Versión / Capacidad</th>
                                <th className="py-2.5 px-3 w-40">Precio ($ USD) *</th>
                                <th className="py-2.5 px-3 w-32">Stock</th>
                                <th className="py-2.5 px-3 w-28">Cashea</th>
                                <th className="py-2.5 px-3 text-right w-12"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium">
                              {formData.variants.map((v, vIdx) => (
                                <tr key={v.id || vIdx} className="hover:bg-slate-50/60 transition-colors">
                                  {/* Title */}
                                  <td className="py-2 px-3 font-black text-slate-900">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-100 font-extrabold text-xs">
                                      {v.title}
                                    </span>
                                  </td>

                                  {/* Price */}
                                  <td className="py-2 px-3">
                                    <div className="relative">
                                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                      <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        required
                                        placeholder="0.00"
                                        value={v.price}
                                        onChange={(e) => handleUpdateVariantField(vIdx, 'price', e.target.value)}
                                        className="w-full pl-6 pr-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-blue-700 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                                      />
                                    </div>
                                  </td>

                                  {/* Stock */}
                                  <td className="py-2 px-3">
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="Ilimitado"
                                      value={v.stock}
                                      onChange={(e) => handleUpdateVariantField(vIdx, 'stock', e.target.value)}
                                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                                    />
                                  </td>

                                  {/* Cashea */}
                                  <td className="py-2 px-3">
                                    <label className="inline-flex items-center gap-1 cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={v.hasCashea !== false}
                                        onChange={(e) => handleUpdateVariantField(vIdx, 'hasCashea', e.target.checked)}
                                        className="w-3.5 h-3.5 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                                      />
                                      <span className="text-[11px] font-bold text-slate-700">Aplica</span>
                                    </label>
                                  </td>

                                  {/* Delete */}
                                  <td className="py-2 px-3 text-right">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveVariant(vIdx)}
                                      className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                                      title="Quitar versión"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">
                        No has agregado versiones todavía. Escribe una versión arriba o toca una de las sugerencias.
                      </p>
                    )}

                  </div>
                )}

              </div>

              {/* Cashea Toggle & Flash Deal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Cashea Toggle */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#FFE600] text-black px-2 py-0.5 rounded text-[9px] font-black uppercase border border-amber-400 shadow-2xs">
                      CASHEA
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">Acepta Cashea</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.hasCashea}
                    onChange={(e) => setFormData({ ...formData, hasCashea: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded border-amber-300 focus:ring-amber-400 cursor-pointer"
                  />
                </div>

                {/* Flash Deal */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-extrabold text-slate-900">Oferta Relámpago</span>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.isFlashDeal || false}
                    onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  Descripción Corta <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles clave o garantía del producto..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
                />
              </div>

              {/* In Stock */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="inStock" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                  Disponible para compra inmediata
                </label>
              </div>

            </form>

            {/* 3. FIXED FOOTER */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-200/70 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                form="product-form"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-50"
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
};

export default ProductManager;
