// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "wheeler-32b8c.firebaseapp.com",
  projectId: "wheeler-32b8c",
  storageBucket: "wheeler-32b8c.firebasestorage.app",
  messagingSenderId: "629344412401",
  appId: "1:629344412401:web:74fd305c643cd5d7febf50",
  measurementId: "G-Q8N5VJWDYY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);