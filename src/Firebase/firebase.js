// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAtN8IJTVyI2UhFecJPyWIY92ZgCo1Dql8",
  authDomain: "hotelapp-323da.firebaseapp.com",
  projectId: "hotelapp-323da",
  storageBucket: "hotelapp-323da.appspot.com",
  messagingSenderId: "511781411551",
  appId: "1:511781411551:web:a2d9a450970bc21123276a",
  measurementId: "G-BM5VPT88V4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore and Auth instances
export const auth = getAuth(app);

export const db = getFirestore(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export authentication methods and provider
export { googleProvider, signInWithPopup, signOut };
