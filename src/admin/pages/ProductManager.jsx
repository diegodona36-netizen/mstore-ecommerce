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
  AlertTriangle,
  Zap,
  Sparkles,
  Sliders,
  Tag,
  Wand2,
  Palette
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

// COMMON COLOR PRESETS (VISUAL SWATCHES ONLY - NO PRICE VARIANCE)
const COMMON_COLOR_PRESETS = [
  { name: 'Negro Mate', hex: '#121212' },
  { name: 'Blanco Puro', hex: '#FFFFFF' },
  { name: 'Acero Inoxidable', hex: '#94A3B8' },
  { name: 'Gris Espacial', hex: '#475569' },
  { name: 'Titanio Natural', hex: '#948B7D' },
  { name: 'Azul Medianoche', hex: '#1E3A8A' },
  { name: 'Titanio Desierto', hex: '#C2B280' },
  { name: 'Verde Esmeralda', hex: '#059669' },
  { name: 'Rojo Carmesí', hex: '#DC2626' }
];

// Helper to auto-suggest hex code from color name
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
  if (n.includes('oro') || n.includes('gold') || n.includes('champan') || n.includes('champán')) return '#D97706';
  if (n.includes('rosa') || n.includes('pink') || n.includes('rose')) return '#F472B6';
  return '#334155';
};

// HARDWARE / SPEC PRESETS (THESE VARY THE PRICE)
const CATEGORY_SMART_PRESETS = {
  'linea-blanca': [
    { label: '⚡ Voltaje (110V / 220V)', name: 'Voltaje', values: ['110V', '220V'] },
    { label: '🧊 Capacidad (Litros)', name: 'Capacidad', values: ['400 Litros', '600 Litros'] },
    { label: '🧺 Capacidad Carga (Kg)', name: 'Capacidad', values: ['12 Kg', '16 Kg', '20 Kg'] },
    { label: '🔥 Hornillas (Cocinas)', name: 'Hornillas', values: ['4 Hornillas', '6 Hornillas'] },
    { label: '❄️ Capacidad BTU (Aires)', name: 'Capacidad BTU', values: ['12.000 BTU', '18.000 BTU', '24.000 BTU'] }
  ],
  'smartphones': [
    { label: '💾 Almacenamiento', name: 'Almacenamiento', values: ['128GB', '256GB', '512GB', '1TB'] },
    { label: '⚡ Memoria RAM', name: 'Memoria RAM', values: ['8GB', '12GB', '16GB'] }
  ],
  'televisores': [
    { label: '📺 Pulgadas de Pantalla', name: 'Pulgadas', values: ['43"', '50"', '55"', '65"', '75"'] },
    { label: '✨ Tecnología de Panel', name: 'Tecnología', values: ['4K Crystal UHD', 'QLED 4K', 'OLED 4K'] }
  ],
  'computacion': [
    { label: '⚡ Memoria RAM', name: 'Memoria RAM', values: ['16GB', '32GB', '64GB'] },
    { label: '💾 Almacenamiento SSD', name: 'Almacenamiento', values: ['512GB SSD', '1TB SSD', '2TB SSD'] },
    { label: '🧠 Procesador', name: 'Procesador', values: ['Intel Core i7', 'Intel Core i9', 'Apple M3 Pro'] }
  ],
  'audio': [
    { label: '📶 Conectividad', name: 'Conectividad', values: ['Bluetooth 5.3', 'Con Cable Hi-Res'] },
    { label: '🎧 Tipo', name: 'Tipo', values: ['In-Ear', 'Over-Ear'] }
  ],
  'hogar': [
    { label: '⚡ Voltaje (110V / 220V)', name: 'Voltaje', values: ['110V', '220V'] },
    { label: '💨 Potencia', name: 'Potencia', values: ['1000W', '1500W'] }
  ],
  'gaming': [
    { label: '💾 Almacenamiento', name: 'Almacenamiento', values: ['512GB SSD', '1TB SSD', '2TB SSD'] },
    { label: '🎮 Edición', name: 'Edición', values: ['Estándar', 'Edición Limitada'] }
  ]
};

// Helper: Cartesian product of option values
function generateCartesianMatrix(optionsList, existingVariants = []) {
  const validOptions = optionsList.filter(o => o.name && Array.isArray(o.values) && o.values.length > 0);
  if (validOptions.length === 0) return [];

  const cartesian = (arrays) => arrays.reduce((acc, curr) => 
    acc.flatMap(d => curr.map(e => [d, e].flat())), [[]]
  );

  const valuesArrays = validOptions.map(o => o.values);
  const combinations = cartesian(valuesArrays);

  return combinations.map((combo, idx) => {
    const optionsMap = {};
    validOptions.forEach((opt, optIdx) => {
      optionsMap[opt.name] = combo[optIdx];
    });

    const title = combo.join(' / ');

    // Match existing variant to preserve entered price and stock
    const match = existingVariants.find(v => {
      if (v.title === title) return true;
      if (v.options && Object.keys(optionsMap).every(k => v.options[k] === optionsMap[k])) return true;
      return false;
    });

    return {
      id: match?.id || `var_${Date.now()}_${idx}`,
      title: title,
      options: optionsMap,
      price: match?.price !== undefined ? match.price : '',
      stock: match?.stock !== undefined ? match.stock : '',
      hasCashea: match?.hasCashea !== undefined ? match.hasCashea : true
    };
  });
}

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

  // Dynamic Form State
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
    hasOptions: false,
    basePrice: '',
    baseStock: '',
    colors: [], // Visual Swatches [{ name: 'Negro Mate', hex: '#121212' }]
    options: [], // Specs that vary price [{ name: 'Voltaje', values: ['110V', '220V'] }]
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
      category: 'linea-blanca',
      tag: '',
      description: '',
      inStock: true,
      hasCashea: true,
      isFlashDeal: false,
      casheaInitialPercent: 40,
      casheaInstallments: 3,
      hasOptions: false,
      basePrice: '',
      baseStock: '',
      colors: [
        { name: 'Negro Mate', hex: '#121212' },
        { name: 'Acero Inoxidable', hex: '#94A3B8' }
      ],
      options: [],
      variants: [],
      image: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);

    let parsedColors = [];
    let parsedOptions = [];
    let parsedVariants = [];
    let hasOpts = false;

    // Parse Colors (Visual Swatches)
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      parsedColors = product.colors.map(c => {
        if (typeof c === 'object' && c.name) return { name: c.name, hex: c.hex || getSuggestedHex(c.name) };
        return { name: String(c), hex: getSuggestedHex(String(c)) };
      });
    } else if (Array.isArray(product.variants) && product.variants.some(v => v.color)) {
      const uniqueColors = Array.from(new Set(product.variants.map(v => v.color).filter(Boolean)));
      parsedColors = uniqueColors.map(cName => ({ name: cName, hex: getSuggestedHex(cName) }));
    }

    // Parse Hardware / Price Options
    if (Array.isArray(product.options) && product.options.length > 0) {
      // Filter out Color from price options if it was previously there
      parsedOptions = product.options.filter(o => !o.name.toLowerCase().includes('color'));
      parsedVariants = Array.isArray(product.variants) ? product.variants : [];
      hasOpts = parsedOptions.length > 0;
    } else if (Array.isArray(product.variants) && product.variants.length > 0) {
      const detectedOptions = [];
      if (product.variants.some(v => v.ram)) {
        const uniqueRams = Array.from(new Set(product.variants.map(v => v.ram).filter(Boolean)));
        if (uniqueRams.length > 0) detectedOptions.push({ id: 'opt_ram', name: 'Memoria RAM', values: uniqueRams });
      }
      if (product.variants.some(v => v.storage)) {
        const uniqueStorages = Array.from(new Set(product.variants.map(v => v.storage).filter(Boolean)));
        if (uniqueStorages.length > 0) detectedOptions.push({ id: 'opt_storage', name: 'Almacenamiento', values: uniqueStorages });
      }

      parsedOptions = detectedOptions;
      parsedVariants = product.variants.map((v, i) => ({
        id: v.id || `var_${Date.now()}_${i}`,
        title: v.title || [v.ram, v.storage].filter(Boolean).join(' / ') || `Variante ${i + 1}`,
        options: v.options || {
          ...(v.ram ? { 'Memoria RAM': v.ram } : {}),
          ...(v.storage ? { 'Almacenamiento': v.storage } : {})
        },
        price: v.price !== undefined ? v.price : (product.price || ''),
        stock: v.stock !== undefined && v.stock !== null ? v.stock : '',
        hasCashea: v.hasCashea !== undefined ? v.hasCashea : (product.hasCashea !== false)
      }));
      hasOpts = parsedVariants.length > 0;
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
      hasOptions: hasOpts,
      basePrice: product.price || '',
      baseStock: product.stock || '',
      colors: parsedColors,
      options: parsedOptions,
      variants: parsedVariants,
      image: product.image || ''
    });
    setSelectedFile(null);
    setPreviewUrl(product.image || '');
    setIsModalOpen(true);
  };

  // -------------------------------------------------------------
  // COLOR SWATCH BUILDER HANDLERS (VISUAL ONLY)
  // -------------------------------------------------------------
  const addColorSwatch = (colorName, hexVal) => {
    const name = colorName.trim();
    if (!name) return;
    if (formData.colors.some(c => c.name.toLowerCase() === name.toLowerCase())) return;

    const hex = hexVal || getSuggestedHex(name);
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name, hex }]
    }));
  };

  const removeColorSwatch = (cIdx) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== cIdx)
    }));
  };

  const updateColorHex = (cIdx, hex) => {
    setFormData(prev => {
      const updated = [...prev.colors];
      updated[cIdx] = { ...updated[cIdx], hex };
      return { ...prev, colors: updated };
    });
  };

  // -------------------------------------------------------------
  // DYNAMIC OPTION BUILDER HANDLERS (PRICE-VARYING SPECS)
  // -------------------------------------------------------------
  const addOptionBlock = () => {
    const newOption = {
      id: `opt_${Date.now()}_${formData.options.length + 1}`,
      name: '',
      values: []
    };
    setFormData(prev => ({
      ...prev,
      hasOptions: true,
      options: [...prev.options, newOption]
    }));
  };

  // 1-Click Smart Preset Injector
  const handleApplyPreset = (preset) => {
    const existingIdx = formData.options.findIndex(o => o.name.toLowerCase() === preset.name.toLowerCase());
    let updatedOptions = [...formData.options];

    if (existingIdx >= 0) {
      const mergedValues = Array.from(new Set([...updatedOptions[existingIdx].values, ...preset.values]));
      updatedOptions[existingIdx] = { ...updatedOptions[existingIdx], values: mergedValues };
    } else {
      updatedOptions.push({
        id: `opt_${Date.now()}_${updatedOptions.length + 1}`,
        name: preset.name,
        values: [...preset.values]
      });
    }

    const newVariants = generateCartesianMatrix(updatedOptions, formData.variants);
    setFormData(prev => ({
      ...prev,
      hasOptions: true,
      options: updatedOptions,
      variants: newVariants
    }));
  };

  const removeOptionBlock = (optIdx) => {
    const updatedOptions = formData.options.filter((_, i) => i !== optIdx);
    const newVariants = generateCartesianMatrix(updatedOptions, formData.variants);
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
      hasOptions: updatedOptions.length > 0,
      variants: newVariants
    }));
  };

  const updateOptionName = (optIdx, name) => {
    const updatedOptions = [...formData.options];
    updatedOptions[optIdx] = { ...updatedOptions[optIdx], name };
    const newVariants = generateCartesianMatrix(updatedOptions, formData.variants);
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
      variants: newVariants
    }));
  };

  const addOptionValue = (optIdx, rawVal) => {
    const trimmed = rawVal.trim();
    if (!trimmed) return;
    const currentValues = formData.options[optIdx]?.values || [];
    if (currentValues.includes(trimmed)) return;

    const updatedOptions = [...formData.options];
    updatedOptions[optIdx] = {
      ...updatedOptions[optIdx],
      values: [...currentValues, trimmed]
    };

    const newVariants = generateCartesianMatrix(updatedOptions, formData.variants);
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
      variants: newVariants
    }));
  };

  const removeOptionValue = (optIdx, valIdx) => {
    const updatedOptions = [...formData.options];
    updatedOptions[optIdx] = {
      ...updatedOptions[optIdx],
      values: updatedOptions[optIdx].values.filter((_, i) => i !== valIdx)
    };

    const newVariants = generateCartesianMatrix(updatedOptions, formData.variants);
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
      variants: newVariants
    }));
  };

  const updateVariantField = (varIdx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.variants];
      updated[varIdx] = { ...updated[varIdx], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const removeVariantRow = (varIdx) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== varIdx)
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

      if (formData.hasOptions && formData.variants.length > 0) {
        cleanVariants = formData.variants.map((v, i) => {
          const rawStock = v.stock !== '' && v.stock !== undefined && v.stock !== null ? parseInt(v.stock) : null;
          return {
            id: v.id || `var_${Date.now()}_${i}`,
            title: v.title || `Variante ${i + 1}`,
            options: v.options || {},
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
        options: formData.hasOptions ? formData.options : [],
        variants: cleanVariants,
        image: finalImageUrl,
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

  const activeCategoryPresets = CATEGORY_SMART_PRESETS[formData.category] || CATEGORY_SMART_PRESETS['linea-blanca'];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Catálogo de Productos</h1>
          <p className="text-slate-500 text-sm mt-1">
            Administra Línea Blanca, Televisores y Tecnología con precios directos o matriz de variantes.
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
                  <th className="py-3.5 px-4">Colores / Variantes</th>
                  <th className="py-3.5 px-4">Stock Total</th>
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
                              <div className="text-[10px] font-bold text-slate-400">Rango según modelo</div>
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
                                <span>{variantsCount} {variantsCount === 1 ? 'modelo' : 'modelos'}</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
                              </button>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Modelo Único</span>
                            )}

                            {colorsCount > 0 && (
                              <div className="flex items-center gap-1">
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
                              title="Editar Producto y Variantes"
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
                                    Desglose de Variantes de "{p.name}"
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
                                      <th className="py-2 px-3">Especificación / Modelo</th>
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
                                              {v.title || Object.values(v.options || {}).join(' / ') || 'Variante'}
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
      {/* MODAL: CREAR / EDITAR PRODUCTO                                            */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            
            {/* 1. FIXED TOP HEADER */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50/80 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Los colores son visuales (no varían precio). Las especificaciones (Voltaje, Pulgadas, etc.) dictan la matriz.
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

            {/* 2. SCROLLABLE FORM BODY */}
            <form id="product-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Product General Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ej. Nevera Samsung Side by Side Inverter 600L"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
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
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                    Etiqueta Promocional <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="ej. OFERTA TOP, INVERTER, 10 AÑOS MOTOR"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

              </div>

              {/* Product Image Box */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
                  Fotografía Principal del Producto
                </label>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/50">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden p-2 shrink-0 shadow-xs">
                    {previewUrl || formData.image ? (
                      <img
                        src={previewUrl || formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Package className="w-8 h-8 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl font-bold text-xs text-slate-700 cursor-pointer shadow-xs active:scale-95 transition-all">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>Subir Imagen desde el Equipo</span>
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
                      placeholder="O pega una URL directa de la imagen (https://...)"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION: COLORES DISPONIBLES (ESTÉTICOS - NO AFECTAN PRECIO)  */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-slate-700" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Colores y Acabados Disponibles
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    (Selección visual en la tienda — no altera el precio)
                  </span>
                </div>

                {/* Color presets chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-slate-600 mr-1">Sugeridos:</span>
                  {COMMON_COLOR_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addColorSwatch(preset.name, preset.hex)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 transition-all active:scale-95 shadow-2xs"
                    >
                      <span 
                        className="w-3 h-3 rounded-full border border-slate-300 inline-block shrink-0" 
                        style={{ backgroundColor: preset.hex }} 
                      />
                      <span>+ {preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* Active Selected Colors */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {formData.colors.map((c, cIdx) => (
                    <div 
                      key={cIdx} 
                      className="inline-flex items-center gap-2 p-1.5 pl-2.5 bg-white border border-slate-200 rounded-xl shadow-xs"
                    >
                      {/* Color Picker label */}
                      <label 
                        className="relative w-5 h-5 rounded-full border border-slate-300 cursor-pointer overflow-hidden shrink-0 flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: c.hex }}
                        title="Haz clic para personalizar el tono exacto"
                      >
                        <input
                          type="color"
                          value={c.hex}
                          onChange={(e) => updateColorHex(cIdx, e.target.value)}
                          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        />
                      </label>

                      <span className="text-xs font-extrabold text-slate-900">{c.name}</span>

                      <button
                        type="button"
                        onClick={() => removeColorSwatch(cIdx)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded-md text-xs font-bold transition-colors"
                        title="Quitar este color"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* SECTION: PRECIO DIRECTO O VARIACIONES DE HARDWARE (MATRIZ)    */}
              {/* ------------------------------------------------------------- */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 space-y-5">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-blue-600" />
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                        Especificaciones y Precio de Venta
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ingresa el precio directo o agrega variaciones de hardware (Voltaje, Capacidad, Pulgadas...) que alteren el costo.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addOptionBlock}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs active:scale-95 self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar Opción de Precio</span>
                  </button>
                </div>

                {/* 1-CLICK SMART PRESET BUTTONS FOR ACTIVE CATEGORY */}
                <div className="space-y-1.5 bg-blue-50/60 p-3 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-1.5 text-blue-900 font-extrabold text-xs">
                    <Wand2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Sugerencias rápidas para esta categoría (1 Clic):</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {activeCategoryPresets.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 text-slate-700 hover:text-white border border-blue-200 hover:border-blue-600 text-xs font-bold transition-all shadow-2xs active:scale-95 flex items-center gap-1"
                      >
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* If NO dynamic options added -> Show Direct Price and Stock */}
                {(!formData.hasOptions || formData.options.length === 0) ? (
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      Precio de Venta Directo
                    </div>
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
                            required={!formData.hasOptions || formData.options.length === 0}
                            value={formData.basePrice}
                            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                            placeholder="ej. 899.00"
                            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-blue-700 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
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
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* OPTIONS LIST */
                  <div className="space-y-4">
                    {formData.options.map((opt, optIdx) => (
                      <div 
                        key={opt.id || optIdx}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                            Opción {optIdx + 1}: {opt.name || 'Sin definir'}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeOptionBlock(optIdx)}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Eliminar opción</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {/* Option Name */}
                          <div>
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Nombre de la Especificación *
                            </label>
                            <input
                              type="text"
                              required
                              value={opt.name}
                              onChange={(e) => updateOptionName(optIdx, e.target.value)}
                              placeholder="ej. Voltaje, Capacidad, Pulgadas..."
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                          </div>

                          {/* Option Values (Tags) */}
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-extrabold text-slate-700 mb-1">
                              Valores de Especificación * <span className="text-[10px] text-slate-400 font-normal">(Presiona Enter o coma para añadir)</span>
                            </label>

                            <div className="flex items-center gap-1.5 flex-wrap p-2 bg-slate-50 rounded-xl border border-slate-200 min-h-[42px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                              {opt.values.map((v, vIdx) => (
                                <span 
                                  key={vIdx} 
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-2xs animate-fadeIn"
                                >
                                  <span>{v}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeOptionValue(optIdx, vIdx)}
                                    className="hover:text-red-300 text-[10px] ml-0.5 font-black"
                                    title="Quitar valor"
                                  >
                                    ✕
                                  </button>
                                </span>
                              ))}

                              <input
                                type="text"
                                placeholder={opt.values.length === 0 ? "Escribe ej. 110V, 220V y presiona Enter..." : "+ Agregar valor..."}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ',') {
                                    e.preventDefault();
                                    addOptionValue(optIdx, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                                onBlur={(e) => {
                                  if (e.currentTarget.value) {
                                    addOptionValue(optIdx, e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                                className="flex-1 min-w-[150px] text-xs font-semibold outline-none bg-transparent py-1 px-1 text-slate-900 placeholder:text-slate-400"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* VARIANT MATRIX TABLE                                          */}
                {/* ------------------------------------------------------------- */}
                {formData.hasOptions && formData.variants.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                          Matriz de Precios e Inventario ({formData.variants.length})
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                        Define el precio individual por modelo de hardware
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                            <th className="py-3 px-4">Modelo / Especificación</th>
                            <th className="py-3 px-4 w-44">Precio ($ USD) *</th>
                            <th className="py-3 px-4 w-36">Stock Físico</th>
                            <th className="py-3 px-4 w-32">Cashea</th>
                            <th className="py-3 px-4 text-right w-16"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {formData.variants.map((v, vIdx) => (
                            <tr key={v.id || vIdx} className="hover:bg-slate-50/60 transition-colors">
                              {/* Title / Combination */}
                              <td className="py-2.5 px-4 font-black text-slate-900">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200/80 font-extrabold text-xs">
                                  {v.title}
                                </span>
                              </td>

                              {/* Price Input */}
                              <td className="py-2.5 px-4">
                                <div className="relative">
                                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    required
                                    placeholder="0.00"
                                    value={v.price}
                                    onChange={(e) => updateVariantField(vIdx, 'price', e.target.value)}
                                    className="w-full pl-6 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-blue-700 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                                  />
                                </div>
                              </td>

                              {/* Stock Input */}
                              <td className="py-2.5 px-4">
                                <input
                                  type="number"
                                  min="0"
                                  placeholder="Ilimitado"
                                  value={v.stock}
                                  onChange={(e) => updateVariantField(vIdx, 'stock', e.target.value)}
                                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                                />
                              </td>

                              {/* Cashea Toggle */}
                              <td className="py-2.5 px-4">
                                <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={v.hasCashea !== false}
                                    onChange={(e) => updateVariantField(vIdx, 'hasCashea', e.target.checked)}
                                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                                  />
                                  <span className="text-[11px] font-bold text-slate-700">Aplica</span>
                                </label>
                              </td>

                              {/* Delete row */}
                              <td className="py-2.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => removeVariantRow(vIdx)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Eliminar esta combinación"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>

              {/* GLOBAL CASHEA TOGGLE */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-[#FFE600] text-black px-2.5 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider border border-amber-400 shadow-xs shrink-0">
                    CASHEA
                  </span>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">Habilitar Pago con Cashea</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Permite a los clientes financiar este producto en cuotas con su cuenta Cashea
                    </span>
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

              {/* FLASH SALE TOGGLE */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">Incluir en Ofertas Relámpago (Flash Sale)</span>
                    <span className="text-[11px] text-slate-500 font-medium">Muestra este equipo en el carrusel de ofertas destacadas en la portada</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFlashDeal || false}
                    onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                    className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>

              {/* Stock Toggle */}
              <div className="flex items-center gap-3 pt-1">
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

            {/* 3. FIXED BOTTOM FOOTER */}
            <div className="flex items-center justify-end gap-3 p-4 sm:p-6 border-t border-slate-200 bg-slate-50/80 shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-200/70 transition-colors"
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
