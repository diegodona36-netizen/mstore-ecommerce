import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";
import path from "path";

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

async function seedBanners() {
  console.log("Iniciando carga de banners a Firebase Firestore...");

  const banners = [
    {
      file: "banner_smartphone.jpg",
      alt: "Galaxy S24 Ultra Flagship 2026 - M Store"
    },
    {
      file: "banner_smarttv.jpg",
      alt: "Smart TVs OLED y Entretenimiento - M Store"
    },
    {
      file: "banner_laptop.jpg",
      alt: "Laptops y Creatividad Pro - M Store"
    }
  ];

  for (const b of banners) {
    const filePath = path.join(process.cwd(), "public", "banners", b.file);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

    console.log(`Subiendo banner: ${b.file} (${Math.round(fileBuffer.length / 1024)} KB)...`);

    const docRef = await addDoc(collection(db, "banners"), {
      imageUrl: base64Data,
      alt: b.alt,
      isActive: true,
      createdAt: serverTimestamp()
    });

    console.log(`✓ Banner ${b.file} registrado con ID: ${docRef.id}`);
  }

  console.log("¡Todos los banners fueron subidos exitosamente a Firestore!");
  process.exit(0);
}

seedBanners().catch((err) => {
  console.error("Error al subir banners a Firebase:", err);
  process.exit(1);
});
