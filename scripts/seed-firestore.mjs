import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { PRODUCTS } from "../src/data/products.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnF5n9IaSFXrbuzsRj6qCg-OK01JxpMr0",
  authDomain: "mstore-7b427.firebaseapp.com",
  projectId: "mstore-7b427",
  storageBucket: "mstore-7b427.firebasestorage.app",
  messagingSenderId: "820330414177",
  appId: "1:820330414177:web:a4db020834817a3112ea20",
  measurementId: "G-9M28MV90QV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedProducts() {
  console.log(`🚀 Iniciando subida de ${PRODUCTS.length} productos a la Base de Datos Firebase Firestore (mstore-7b427)...`);
  
  let successCount = 0;
  for (const product of PRODUCTS) {
    const productRef = doc(db, 'products', product.id);
    const payload = {
      name: product.name,
      category: product.category,
      tag: product.tag || '',
      price: product.price,
      oldPrice: product.oldPrice || null,
      rating: product.rating || 5.0,
      reviewsCount: product.reviewsCount || 10,
      hasCashea: product.hasCashea ?? true,
      description: product.description || '',
      image: product.image,
      images: [product.image],
      colors: product.colors || [],
      specs: product.specs || {},
      inStock: product.inStock ?? true,
      isFlashDeal: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      await setDoc(productRef, payload, { merge: true });
      successCount++;
      console.log(`[${successCount}/${PRODUCTS.length}] Guardado: ${product.name} (${product.category})`);
    } catch (err) {
      console.error(`Error guardando ${product.name}:`, err);
    }
  }

  console.log(`\n✅ ¡ÉXITO TOTAL! ${successCount} de ${PRODUCTS.length} productos subidos y sincronizados en la Base de Datos de Firebase.`);
  process.exit(0);
}

seedProducts().catch(err => {
  console.error("Error fatal en seed:", err);
  process.exit(1);
});
