import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

// const credentials = {
//   apiKey: "AIzaSyA7mxsDElsxmGLruz5UIcrxywn7KplB1Jw",
//   databaseURL: "https://flower-power-58381-default-rtdb.firebaseio.com",
//   authDomain: "flower-power-58381.firebaseapp.com",
//   projectId: "flower-power-58381",
//   storageBucket: "flower-power-58381.appspot.com",
//   messagingSenderId: "116787099467",
//   appId: "1:116787099467:web:fa9197347738dbf39b9ace",
//   measurementId: "G-DS4Q87HB28",
// };
//
const credentials = {
  apiKey: "AIzaSyCyW5EKjdoVB-ek0KMrFgCffl9iPFGHE6A",
  authDomain: "flowers-project-a8d03.firebaseapp.com",
  projectId: "flowers-project-a8d03",
  storageBucket: "flowers-project-a8d03.appspot.com",
  messagingSenderId: "119023758281",
  appId: "1:119023758281:web:d20360e27d3d8f8724d618"
};
const firebaseApp = firebase.initializeApp(credentials);

const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const database = firebaseApp.firestore();

const exportable = { firebaseApp, auth, googleProvider, database };

export default exportable;
