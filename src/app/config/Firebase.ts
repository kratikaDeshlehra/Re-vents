// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import {  getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: "https://revents-585b6-default-rtdb.asia-southeast1.firebasedatabase.app",
  authDomain: "revents-585b6.firebaseapp.com",
  projectId: "revents-585b6",
  storageBucket: "revents-585b6.firebasestorage.app",
  messagingSenderId: "557492671078",
  appId: "1:557492671078:web:8e2f5a098acbc3046ad3a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);

export const auth=getAuth(app);

export const fb=getDatabase(app);

