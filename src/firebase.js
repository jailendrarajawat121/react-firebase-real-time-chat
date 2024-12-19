// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZVNdiprrTcNOMvwm7-gGDwm8FZWFEWe0",
  authDomain: "trusted-network-dev.firebaseapp.com",
  projectId: "trusted-network-dev",
  storageBucket: "trusted-network-dev.firebasestorage.app",
  messagingSenderId: "306986753286",
  appId: "1:306986753286:web:c072b210c2796808cf5287",
  measurementId: "G-TPBCB6MDQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);