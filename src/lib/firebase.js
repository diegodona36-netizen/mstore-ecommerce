import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBihtpPaMgJZ2Uiq4OlxIX1YYmW_nqJi6M",
  authDomain: "mstore-ae718.firebaseapp.com",
  projectId: "mstore-ae718",
  storageBucket: "mstore-ae718.firebasestorage.app",
  messagingSenderId: "573877944655",
  appId: "1:573877944655:web:50c2b0b1de5b54493d853a",
  measurementId: "G-J2NQY29LTC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
