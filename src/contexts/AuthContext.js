import { createContext, useState, useEffect } from "react";
import fire from "../config/fire";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const AuthContext = createContext({});
const { googleProvider, database } = fire;

const AuthProvider = ({ children }) => {
  const auth = fire.auth();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [dataFetched, setDataFetched] = useState(false);

  const logout = () => {
    auth.signOut().then((x) => {
      // history.push("/");
      // window.location.reload();
    });
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;

        let userObj = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        async function addUser(data) {
          await database
            .collection("user")
            .doc(user.uid)
            .set(data, { merge: true });
        }
        await addUser(userObj);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log({ errorCode, errorMessage, email, credential, error });
      });
  };

  const passwordLogin = (email, password, onError) => {
    fire.auth().signInWithEmailAndPassword(email.toLowerCase(), password).catch(onError);
  };

  // const updateUserEmail = (email) => {
  //   const user = auth.currentUser;
  //   user.providerData.forEach((profile) => {
  //     if(profile.providerId == "google.com") {
  //       console.log("Cannot change email when logged in with Google");
  //       return false;
  //     }
  //   });
  //   user.updateEmail(email).then(() => {
  //     return true;
  //   }).catch((error) => {
  //     console.log(error.message);
  //   });
  // }

  const updateUserPassword = (np, onSuccess, onError) => {
    auth.currentUser
    .updatePassword(np)
    .then(onSuccess)
    .catch(onError);
  }

  const requestReset = (email, onSuccess, onError) => {
    fire
      .auth()
      .sendPasswordResetEmail(email, { url: process.env.REACT_APP_RESET_REDIRECT_URL })
      .then(onSuccess)
      .catch(onError);
  };

  const doSignup = async (
    { firstName, lastName, email, password },
    handleError
  ) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email.toLowerCase(), password)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        await user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });

        await database
          .collection("user")
          .doc(user.uid)
          .set(
            {
              name: `${firstName} ${lastName}`,
              email: user.email.toLowerCase(),
              uid: user.uid,
            },
            { merge: true }
          );
        await auth.currentUser.reload();
      })
      .catch(handleError);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setCurrentUser(userAuth);
      if(!dataFetched) {
        setDataFetched(true);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  if(dataFetched) { 
    return (
      <AuthContext.Provider
        value={{
          requestReset,
          doSignup,
          passwordLogin,
          currentUser,
          googleLogin,
          logout,
          // updateUserEmail,
          updateUserPassword
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  } else {
    return (
      <Spinner animation="border" />
    );
  } 
};

export default AuthProvider;
