import "./App.css";
import { Link, Switch, Route, Redirect } from "react-router-dom";
//import components
import Home from "./components/Home";
import NotFound from './components/NotFound';

import Create from "./components/Create";
import Global from "./components/Global";
import Login from "./components/Login";
import Nav from "./components/Nav";
import PastFlowers from "./components/PastFlowers";

import Dashboard from "./components/Dashboard";
import { Container } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

//darkmode
import DarkModeNav from "./components/DarkModeNav";
import Footer from "./components/Footer";
import DarkModeFooter from "./components/DarkModeFooter";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/theme";
import { GlobalStyles } from "./global";
// create modal
import React, { useState, useEffect } from "react";
import PetalModal from "./components/PetalModal";
import Flower from "./components/Flower.js";
import { auth, googleProvider, database } from "./components/fire.js";
import "./App.css";

import "./App.css";
import { render } from "react-dom";
let provider = new firebase.auth.GoogleAuthProvider();

//write all login functionality on app

function App(props) {
  const [googleUser, setGoogleUser] = useState();
  //useEffect to get if user exists/signed in, then pull info from database based on what user is signed in
  //useeffect will ping db then send back info on what user is logged in
  const [user, setUser] = useState(null);

  let history = useHistory();
  async function googleLogin(props) {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        let userObj = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        await setUser(userObj);
        async function addUser(data) {
          let collection = await database
            .collection("user")
            .doc(user.uid)
            .set(data);
          return await collection.add(data);
        }
        await addUser(userObj);

        history.push("/Create");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
      });
    //you get firebase.auth().currentUser -- keeps the user signed in, if no user - is null. you can call this anywhere firebase is imported!!! just use firebase.auth().currentUser: use as stateful property in components that need auth
  }
  //useEffect will ping db then send back info on what user is logged in

  const [theme, setTheme] = useState("dark");
  //use state for this, starting as false(ie, light mode) and upon pressing button for dark mode, it changes to true. depending on false/true, write ternary which will determine which is rendered based on state
  //function that toggles between themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  console.log(user);
  return (
    <div className="App">
      <Switch>
          <Route
            exact path={"/Global"}
            render={(props) => {
              return <Global user={user} theme={theme}/>;
            }}
          />
          <Route
            exact
            path={"/Create"}
            render={(props) => {
              return (
                <>
                  <Create theme={theme} user={user} />
                </>
              );
            }}
          />
        
          <Route
            exact
            path="/"
            render={(props) => {
              return <Login user={user} googleLogin={googleLogin} />;
            }}
          />
          <Route
           exact path={"/PastFlowers"}
            render={(props) => {
              return <PastFlowers user={user} theme={theme}/>;
            }}
          />
          
        
      </Switch>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />

       <div id="footer" style={{paddingBottom: "10vh"}}>
          <button onClick={toggleTheme}>Toggle Theme</button>
          {theme === "dark" ? <DarkModeFooter /> : <Footer />}
        </div>
      </>
    </ThemeProvider>
  </div>
  
  )}   

  export default App;