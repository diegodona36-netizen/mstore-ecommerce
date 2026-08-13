import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { Plus, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function BannerManager() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      // 1. Upload to Storage
      const storageRef = ref(storage, `banners/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      
      // 2. Get URL
      const downloadURL = await getDownloadURL(storageRef);

      // 3. Save to Firestore
      await addDoc(collection(db, 'banners'), {
        imageUrl: downloadURL,
        storagePath: storageRef.fullPath,
        isActive: true,
        createdAt: serverTimestamp()
      });

      // Refresh list
      fetchBanners();
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("Error al subir la imagen. Verifica el modo de prueba en Firebase.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (banner) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este banner?')) return;

    try {
      // 1. Delete from Storage
      const storageRef = ref(storage, banner.storagePath);
      await deleteObject(storageRef);

      // 2. Delete from Firestore
      await deleteDoc(doc(db, 'banners', banner.id));

      // Refresh list
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
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
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Gestor de Banners</h1>
          <p className="text-slate-500 mt-1">Controla las imágenes del slider principal de la tienda.</p>
        </div>
        
        <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isUploading ? 'Subiendo...' : 'Nuevo Banner'}
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-slate-50">
          {banners.length === 0 ? (
            <div className="col-span-full py-12 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl bg-white">
              <ImageIcon className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No hay banners activos.</p>
              <p className="text-slate-400 text-sm mt-1">Sube una imagen para mostrarla en el inicio.</p>
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
