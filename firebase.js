// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Add Firebase Authentication
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "flashcardsa-564e2.firebaseapp.com",
  projectId: "flashcardsa-564e2",
  storageBucket: "flashcardsa-564e2.appspot.com",
  messagingSenderId: "682879637354",
  appId: "1:682879637354:web:7e06e71b00993d89ceb713",
  measurementId: "G-Y7370R6KQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Initialize Firebase Auth with the app instance
export { db, auth };