import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  orderBy, 
  query 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Plus, Trash2, Image as ImageIcon, Loader2, Link as LinkIcon, Upload } from 'lucide-react';

// Client-side image compressor to avoid needing Firebase Storage paid plans
const compressImage = (file, maxWidth = 1600, maxHeight = 700, quality = 0.8) => {
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

        // Compress as WebP / JPEG
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const q = query(collection(db, 'banners'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedBanners = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBanners(fetchedBanners);
    } catch (error) {
      console.error("Error fetching banners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Compress image in browser
      const compressedDataUrl = await compressImage(file, 1600, 700, 0.82);

      // 2. Save directly to Firestore (Free, no Storage plan required)
      await addDoc(collection(db, 'banners'), {
        imageUrl: compressedDataUrl,
        isActive: true,
        createdAt: serverTimestamp()
      });

      // Refresh list
      fetchBanners();
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Error al procesar la imagen. Intenta de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddByUrl = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsUploading(true);
    try {
      await addDoc(collection(db, 'banners'), {
        imageUrl: urlInput.trim(),
        isActive: true,
        createdAt: serverTimestamp()
      });
      setUrlInput('');
      setShowUrlModal(false);
      fetchBanners();
    } catch (error) {
      console.error("Error saving banner URL:", error);
      alert("Error al guardar el banner.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (banner) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este banner?')) return;

    try {
      await deleteDoc(doc(db, 'banners', banner.id));
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Error al eliminar el banner.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Gestor de Banners</h1>
          <p className="text-slate-500 mt-1 text-sm">Controla las imágenes del slider principal de la tienda.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Add by URL */}
          <button
            onClick={() => setShowUrlModal(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
            <span>Por Enlace URL</span>
          </button>

          {/* Upload File */}
          <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95">
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{isUploading ? 'Procesando...' : 'Subir Foto'}</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Añadir Banner por URL</h3>
            <form onSubmit={handleAddByUrl} className="space-y-4">
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://ejemplo.com/banner.jpg"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUrlModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700"
                >
                  {isUploading ? 'Guardando...' : 'Añadir Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50">
          {banners.length === 0 ? (
            <div className="col-span-full py-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl bg-white">
              <ImageIcon className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No hay banners activos en la base de datos.</p>
              <p className="text-slate-400 text-xs mt-1">La tienda está mostrando los banners de muestra. Sube uno nuevo para personalizarla.</p>
            </div>
          ) : (
            banners.map((banner) => (
              <div key={banner.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                <div className="aspect-[21/9] relative bg-slate-100">
                  <img 
                    src={banner.imageUrl} 
                    alt="Banner Promocional" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={() => handleDelete(banner)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transform scale-90 group-hover:scale-100 transition-all shadow-lg"
                      title="Eliminar Banner"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
