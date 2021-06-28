import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

console.log({env: process.env})

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const database = firebaseApp.firestore();

const exportable = { firebaseApp, auth, googleProvider, database };

export default exportable;
