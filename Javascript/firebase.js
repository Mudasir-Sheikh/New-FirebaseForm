// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { doc, setDoc, getFirestore, getDoc, addDoc, collection, getDocs, deleteDoc ,updateDoc  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA63guYlu-RcWeEiX0K3e_SN0xS2v1QGJ0",
  authDomain: "fir-quiz-2dbe3.firebaseapp.com",
  projectId: "fir-quiz-2dbe3",
  storageBucket: "fir-quiz-2dbe3.appspot.com",
  messagingSenderId: "134488776526",
  appId: "1:134488776526:web:84087a05afce67c28bc81f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Create a root reference
const storage = getStorage(app);


export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // signOut,
  doc,
  updateDoc ,
  setDoc,
  db,
  getDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL

}