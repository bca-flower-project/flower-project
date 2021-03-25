import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA7mxsDElsxmGLruz5UIcrxywn7KplB1Jw",
  authDomain: "flower-power-58381.firebaseapp.com",
  projectId: "flower-power-58381",
  storageBucket: "flower-power-58381.appspot.com",
  messagingSenderId: "116787099467",
  appId: "1:116787099467:web:294ad8615b96aee79b9ace",
  measurementId: "G-LKTNY8ZMG1",
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const auth = firebase.auth;

export {firebaseApp, auth, googleProvider, facebookProvider}


//   try {
//     firebase.initializeApp(firebaseConfig);
//   } catch (err) {
//     if (!/already exists/.test(err.message)) {
//       console.error('Firebase initialization error', err.stack);
//     }
//   }
