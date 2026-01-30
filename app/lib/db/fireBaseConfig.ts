// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvBFVFgQwXw22P9zkKCiVzzfPEkHbsJI8",
  authDomain: "demofirebase-88754.firebaseapp.com",
  projectId: "demofirebase-88754",
  storageBucket: "demofirebase-88754.firebasestorage.app",
  messagingSenderId: "364106357607",
  appId: "1:364106357607:web:b85fe17a687b5b1f246dc2",
  measurementId: "G-7BQ98KFWDN"
} as const;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics };