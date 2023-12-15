// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc-U7gMn3B1ssOe9umxr7OjnK5ap0fx5k",
  authDomain: "alphabi-gif-generator-d1acd.firebaseapp.com",
  projectId: "alphabi-gif-generator-d1acd",
  storageBucket: "alphabi-gif-generator-d1acd.appspot.com",
  messagingSenderId: "1052515095581",
  appId: "1:1052515095581:web:649e4f6d40c2cd4337a2f4"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth }