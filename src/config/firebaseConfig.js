import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcDfDXsNOKCj6PV10J_0y_zNYLlmKpUdI",
  authDomain: "chatty-dfeac.firebaseapp.com",
  projectId: "chatty-dfeac",
  storageBucket: "chatty-dfeac.appspot.com",
  messagingSenderId: "232338390762",
  appId: "1:232338390762:web:3c1cdc0e669cda69996193",
  measurementId: "G-DT6MTX0S5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
