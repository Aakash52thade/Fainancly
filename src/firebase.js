// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'; //this auth for google login
import {getFirestore, doc, setDoc} from 'firebase/firestore'; //this is for login throw email;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2tk9V02ckdtNyl-gj4kTQ26KdHOdRY_s",
  authDomain: "fainance-a97a3.firebaseapp.com",
  projectId: "fainance-a97a3",
  storageBucket: "fainance-a97a3.firebasestorage.app",
  messagingSenderId: "460745778994",
  appId: "1:460745778994:web:68d457be431f584a10992b",
  measurementId: "G-TSEMG3C3M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};