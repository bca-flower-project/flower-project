import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const credentials = {
  apiKey: "AIzaSyA7mxsDElsxmGLruz5UIcrxywn7KplB1Jw",
  authDomain: "flower-power-58381.firebaseapp.com",
  projectId: "flower-power-58381",
  storageBucket: "flower-power-58381.appspot.com",
  messagingSenderId: "116787099467",
  appId: "1:116787099467:web:fa9197347738dbf39b9ace",
  measurementId: "G-DS4Q87HB28"
};
const firebaseApp = firebase.initializeApp(credentials);
const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider()
//const database = firebaseApp.database()
export { firebaseApp, auth, googleProvider}
// let firebaseApp = firebase.initializeApp(firebaseConfig);

