import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  //get api key from google cloud console for dev/prod envs and place in .env.<env>.local files
  //this is done to keep the google cloud api keys from source control
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const database = firebaseApp.firestore();

const exportable = {
  firestore: firebase.firestore,
  firebaseApp,
  auth,
  googleProvider,
  database,
};

export default exportable;
