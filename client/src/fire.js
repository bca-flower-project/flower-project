//  import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyA7mxsDElsxmGLruz5UIcrxywn7KplB1Jw",
//   authDomain: "flower-power-58381.firebaseapp.com",
//   projectId: "flower-power-58381",
//   storageBucket: "flower-power-58381.appspot.com",
//   messagingSenderId: "116787099467",
//   appId: "1:116787099467:web:294ad8615b96aee79b9ace",
//   measurementId: "G-LKTNY8ZMG1",
// };

// let firebaseApp = firebase.initializeApp(firebaseConfig);
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// // const facebookProvider = new firebase.auth.FacebookAuthProvider();
// const auth = firebase.auth;
// const id_token = googleUser.getAuthResponse().id_token


// firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     const credential = result.credential;

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     const credential = error.credential;
//   });
// //you get firebase.auth().currentUser -- keeps the user signed in, if no user - is null. you can call this anywhere firebase is imported!!! just use firebase.auth().currentUser: use as stateful property in components that need auth





// export {firebaseApp, auth, googleProvider}


// //   try {
// //     firebase.initializeApp(firebaseConfig);
// //   } catch (err) {
// //     if (!/already exists/.test(err.message)) {
// //       console.error('Firebase initialization error', err.stack);
// //     }
// //   }
