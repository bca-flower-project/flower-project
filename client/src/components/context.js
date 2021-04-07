// import React, { useContext, useState, useEffect } from "react";
// import { auth } from "./firebase";

// const AuthContext = React.createContext();

// //this will be what's imported to other files so that they have access to everything here
// export function useAuth() {
//   return useContext(AuthContext);
// }

// //this is the provider - everything in App.js that is wrapped in this Context component has access to user information
// export function Context({ children }) {
//   //state variables - our logged user & variable to account for loading states
//   const [loggedUser, setLoggedUser] = useState();
//   const [loading, setLoading] = useState(true);

//   //-------------------our basic functions that run this app----------------//

//   //** if you wanted to replace firebase with something else,
//   //** you'd just need to change these fxns

//   function signup(email, password) {
//     return auth.createUserWithEmailAndPassword(email, password);
//   }

//   function login(email, password) {
//     return auth.signInWithEmailAndPassword(email, password);
//   }

//   function logout() {
//     return auth.signOut();
//   }

//   function resetPassword(email) {
//     return auth.sendPasswordResetEmail(email);
//   }
//   //-----------------------------------------------------------------------//

//   //this is what sets the user. it's either the current logged-in user or null
//   //it's inside a useEffect so that this runs only when the component mounts & unsubscribes when we're done
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setLoggedUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   //'value' is prop passed to everything that is wrapped in the context provider (called 'Context') in App.js
//   const value = {
//     loggedUser,
//     login,
//     signup,
//     logout,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }