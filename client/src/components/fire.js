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
  measurementId: "G-DS4Q87HB28"
};
const firebaseApp = firebase.initializeApp(credentials);
const auth = firebase.auth;
const googleProvider = new firebase.auth.GoogleAuthProvider()
const database = firebaseApp.firestore()
export { firebaseApp, auth, googleProvider, database}
// let firebaseApp = firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged(function(user) {

// let user = firebase.auth().currentUser;
// let name, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
// }
// if (user != null) {
//   user.providerData.forEach(function (profile) {
//     console.log("Sign-in provider: " + profile.providerId);
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//     console.log("  Email: " + profile.email);
//     console.log("  Photo URL: " + profile.photoURL);
//   });
// }

