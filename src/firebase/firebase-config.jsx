// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW1q3sn2nJRazqWGYarJF8nKMlpqqui6Y",
  authDomain: "qwgdatabases.firebaseapp.com",
  databaseURL: "https://qwgdatabases-default-rtdb.firebaseio.com",
  projectId: "qwgdatabases",
  storageBucket: "qwgdatabases.appspot.com",
  messagingSenderId: "641291972981",
  appId: "1:641291972981:web:b633322f4711a7f12a233c",
  measurementId: "G-KJSXVRL3D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { app, auth, database, db };