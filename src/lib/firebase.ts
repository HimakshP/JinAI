// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFq0ttVDfmIApCcVqd6L4EbdxClioXBnA",
  authDomain: "jinai-3ba79.firebaseapp.com",
  projectId: "jinai-3ba79",
  storageBucket: "jinai-3ba79.firebasestorage.app",
  messagingSenderId: "459552721729",
  appId: "1:459552721729:web:ebf9f0d5f5bf84f235efc0",
  measurementId: "G-SL1XNXV0L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);