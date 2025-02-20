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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();