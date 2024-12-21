// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS7mmB6urHW6Wsitj2fyKJip5ROP3d6hI",
  authDomain: "react-firebase-real-time-3acbe.firebaseapp.com",
  projectId: "react-firebase-real-time-3acbe",
  storageBucket: "react-firebase-real-time-3acbe.firebasestorage.app",
  messagingSenderId: "526426830514",
  appId: "1:526426830514:web:dec79625fe8746529c7bab",
  measurementId: "G-MKVP850EDV",
  databaseURL: "https://react-firebase-real-time-3acbe-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);