// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgG8gyOe0h15Cmyc8zhdeFc6vpb5OhRLE",
  authDomain: "kasir-anjay.firebaseapp.com",
  projectId: "kasir-anjay",
  storageBucket: "kasir-anjay.firebasestorage.app",
  messagingSenderId: "678789432079",
  appId: "1:678789432079:web:dc2226ccf8daa04b5ab47a",
  measurementId: "G-CYXV3PRXJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);