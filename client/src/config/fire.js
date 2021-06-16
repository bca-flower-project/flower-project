import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const credentials = {
  apiKey: "AIzaSyA7mxsDElsxmGLruz5UIcrxywn7KplB1Jw",
  databaseURL: "https://flower-power-58381-default-rtdb.firebaseio.com",
  authDomain: "flower-power-58381.firebaseapp.com",
  projectId: "flower-power-58381",
  storageBucket: "flower-power-58381.appspot.com",
  messagingSenderId: "116787099467",
  appId: "1:116787099467:web:fa9197347738dbf39b9ace",
  measurementId: "G-DS4Q87HB28",
};
const firebaseApp = firebase.initializeApp(credentials);
const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const database = firebaseApp.firestore();

const exportable = { firebaseApp, auth, googleProvider, database };

export default exportable;
