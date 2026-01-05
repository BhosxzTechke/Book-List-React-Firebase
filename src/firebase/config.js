// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUi8EKObntLYDP3kgF8IbF6xo9ZWSmJuk",
  authDomain: "book-list-with-firebase-b0d13.firebaseapp.com",
  projectId: "book-list-with-firebase-b0d13",
  storageBucket: "book-list-with-firebase-b0d13.firebasestorage.app",
  messagingSenderId: "377626163476",
  appId: "1:377626163476:web:853bed66e295d3fdb0aa01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
