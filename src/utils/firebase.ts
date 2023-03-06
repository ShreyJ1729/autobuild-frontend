// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmNelMfAIBv3P7jmxxCT1C0pbubEspOAY",
  authDomain: "autobase-waitlist.firebaseapp.com",
  databaseURL: "https://autobase-waitlist-default-rtdb.firebaseio.com",
  projectId: "autobase-waitlist",
  storageBucket: "autobase-waitlist.appspot.com",
  messagingSenderId: "814102426882",
  appId: "1:814102426882:web:b40762c95509f423a83e1b",
  measurementId: "G-K1K88LREW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db, ref, set, push, analytics };