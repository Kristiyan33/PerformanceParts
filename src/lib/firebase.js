import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Optional: For Firestore database

// Your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkYUtqxOomkxluMt0lg9yCDK_LQZQZN4I",
  authDomain: "performanceparts-d27fd.firebaseapp.com",
  projectId: "performanceparts-d27fd",
  storageBucket: "performanceparts-d27fd.appspot.com", // Fixed typo here
  messagingSenderId: "737817531235",
  appId: "1:737817531235:web:f69997d82515cf0c5cf956"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app); // Optional: For Firestore database
