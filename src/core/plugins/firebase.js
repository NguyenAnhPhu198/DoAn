// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: "tomoniglobal.appspot.com",
  messagingSenderId: "817597473112",
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-8V8BM5F5XD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
