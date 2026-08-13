import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
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
  console.log(`Iniciando carga de ${PRODUCTS.length} productos a Firestore...`);

  for (const p of PRODUCTS) {
    const productData = {
      name: p.name,
      category: p.category,
      tag: p.tag || "Destacado",
      price: p.price,
      originalPrice: p.originalPrice || null,
      rating: p.rating || 5.0,
      reviewsCount: p.reviewsCount || 128,
      description: p.description || "",
      image: p.image,
      inStock: p.inStock !== false,
      hasCashea: true,
      casheaInitialPercent: 40,
      casheaInstallments: 3,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    console.log(`✓ Producto guardado: ${p.name} (ID: ${docRef.id})`);
  }

  console.log("¡Todos los productos iniciales fueron subidos a Firestore exitosamente!");
  process.exit(0);
}

seedProducts().catch((err) => {
  console.error("Error al subir productos:", err);
  process.exit(1);
});
