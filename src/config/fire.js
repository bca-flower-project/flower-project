import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6djif4tfrSdgIxX7iMXF9DLn8nxCh6w4",
  authDomain: "flowers-community.firebaseapp.com",
  projectId: "flowers-community",
  storageBucket: "flowers-community.appspot.com",
  messagingSenderId: "197280515331",
  appId: "1:197280515331:web:cf5b5942df3873f1481536"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const database = firebaseApp.firestore();

const exportable = { firebaseApp, auth, googleProvider, database };

export default exportable;
