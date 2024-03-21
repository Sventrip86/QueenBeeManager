// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCqP4yxZfyG4JrCT0HLyJ92xcW3AjkoX48",
  authDomain: "queenbee-889de.firebaseapp.com",
  projectId: "queenbee-889de",
  storageBucket: "queenbee-889de.appspot.com",
  messagingSenderId: "702681297202",
  appId: "1:702681297202:web:46e391b03709bfe610a72b"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
