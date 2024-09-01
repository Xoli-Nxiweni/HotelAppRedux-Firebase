import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtN8IJTVyI2UhFecJPyWIY92ZgCo1Dql8",
  authDomain: "hotelapp-323da.firebaseapp.com",
  projectId: "hotelapp-323da",
  storageBucket: "hotelapp-323da.appspot.com",
  messagingSenderId: "511781411551",
  appId: "1:511781411551:web:a2d9a450970bc21123276a",
  measurementId: "G-BM5VPT88V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
