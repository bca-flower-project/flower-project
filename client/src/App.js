import "./App.css";
import { Link, Switch, Route, Redirect } from "react-router-dom";
//import components
import Home from "./components/Home";
import Profile from "./components/Profile";
import Connect from "./components/Connect";
import Create from "./components/Create";
import Global from "./components/Global";
import Login from "./components/Login";
import Nav from "./components/Nav";
import PastFlowers from "./components/PastFlowers";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { firebaseApp, auth, googleProvider } from "./components/fire";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
let provider = new firebase.auth.GoogleAuthProvider();

function App() {
  //Buttons can live on thew pages and pass props but the main functionality must be in app.js
  const [user, setUser] = useState(null);
  let history = useHistory();
  function loginPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userObj) => {
        // Signed in
        setUser(userObj);
        // ...
        history.push("/Dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  function googleLogin() {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
        console.log(errorMessage);
      });
  }
  function SignupPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userObj) => {
        // Signed in
        setUser(userObj);
        // ...
        history.push("/Dashboard");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  // function signIn() {
  //   if email doesnt exist and passwords match setSignedIn()
  // }
  console.log(user);
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Container className="d-flex align-items-center justify-content-center ">
          <div className="w-100 " style={{ maxWidth: "400px" }}>
            <Route
              exact
              path={"/Dashboard"}
              render={(props) => {
                return <Dashboard user={user} />;
              }}
            />
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Login
                    loginPass={loginPass}
                    user={user}
                    googleLogin={googleLogin}
                  />
                );
              }}
            />
            <Route
              path={"/Signup"}
              render={(props) => {
                return (
                  <Signup
                    SignupPass={SignupPass}
                    user={user}
                    googleLogin={googleLogin}
                  />
                );
              }}
            />
            <Route path={"/Home"} component={Home} />
            <Route path={"/Profile"} component={Profile} />
            <Route path={"/Connect"} component={Connect} />
            <Route path={"/Create"} component={Create} />
            <Route path={"/Global"} component={Global} />
            <Route
              path={"/Login"}
              render={(props) => {
                return (
                  <Login
                    loginPass={loginPass}
                    user={user}
                    googleLogin={googleLogin}
                  />
                );
              }}
            />
            <Route path={"/PastFlowers"} component={PastFlowers} />
            <Route path={"/Settings"} component={Settings} />
          </div>
        </Container>
      </Switch>
    </div>
  );
}
export default App;

//manage user login in app. pass props to whatever page we need to use them too
