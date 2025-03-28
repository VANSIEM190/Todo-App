// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNgF7wljI-tOpZ2CccVSvj2WsA47pY30o",
  authDomain: "users-stacks.firebaseapp.com",
  projectId: "users-stacks",
  storageBucket: "users-stacks.firebasestorage.app",
  messagingSenderId: "693040446625",
  appId: "1:693040446625:web:569e89080d6ec0fee604e0",
  measurementId: "G-D8CN2S4NWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Récupérer l'authentification Firebase
const auth = getAuth(app);
const db = getFirestore(app);


// Exporter l'authentification et les méthodes d'authentification
export { auth, signInWithEmailAndPassword ,  db };