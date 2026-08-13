import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Image as ImageIcon, 
  TrendingUp, 
  ExternalLink, 
  PlusCircle, 
  Layers, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function Dashboard() {
  const [stats, setStats] = useState({
    productsCount: 0,
    bannersCount: 0,
    categoriesCount: CATEGORIES.length - 1, // minus 'todos'
    loading: true
  });

  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Products count
      const prodSnapshot = await getDocs(collection(db, 'products'));
      const prods = prodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Banners count
      const bannerSnapshot = await getDocs(collection(db, 'banners'));

      setStats({
        productsCount: prods.length,
        bannersCount: bannerSnapshot.docs.length,
        categoriesCount: CATEGORIES.length - 1,
        loading: false
      });

      setRecentProducts(prods.slice(0, 5));
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">
            Panel de Control M Store
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            ¡Bienvenido al Administrador!
          </h1>
          <p className="text-blue-100 text-sm">
            Desde este panel puedes controlar el catálogo en vivo, actualizar promociones y cambiar los banners que ven tus clientes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 rounded-xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 text-white"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Ver Tienda en Vivo</span>
          </a>

          <Link
            to="/admin/products"
            className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Gestionar Catálogo</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metric 1: Products */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Productos</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stats.loading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : stats.productsCount}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Disponibles en el catálogo</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Banners */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Banners Activos</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stats.loading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : stats.bannersCount}
            </h3>
            <p className="text-xs text-slate-500 mt-1">Imágenes en el Hero Slider</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Categories */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Categorías Activas</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stats.categoriesCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Secciones de la tienda</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner Action Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900">Slider y Banners Promocionales</h3>
            </div>
            <p className="text-sm text-slate-500">
              Sube las imágenes de las campañas de temporada para que se muestren en la parte superior de la página principal.
            </p>
          </div>

          <Link
            to="/admin/banners"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all border border-slate-200 group"
          >
            <span>Ir al Gestor de Banners</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Action Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900">Inventario y Precios</h3>
            </div>
            <p className="text-sm text-slate-500">
              Modifica precios, añade nuevos smartphones, laptops, televisores o accesorios con sus especificaciones.
            </p>
          </div>

          <Link
            to="/admin/products"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all border border-slate-200 group"
          >
            <span>Ir al Gestor de Productos</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
