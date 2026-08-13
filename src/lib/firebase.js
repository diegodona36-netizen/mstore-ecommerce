import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const db = getFirestore(app);
