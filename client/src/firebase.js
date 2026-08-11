// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-over.firebaseapp.com",
  projectId: "mern-over",
  storageBucket: "mern-over.firebasestorage.app",
  messagingSenderId: "570264972708",
  appId: "1:570264972708:web:73d439152a32a78a826531"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);