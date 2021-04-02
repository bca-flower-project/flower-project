import "./App.css";
import { Link, Switch, Route } from "react-router-dom";
//import components
import Home from "./components/Home";
import Profile from "./components/Profile";
import Connect from "./components/Connect";
import Create from "./components/Create";
import Global from "./components/Global";
import Login from "./components/Login";
import Nav from "./components/Nav";
import DarkModeNav from "./components/DarkModeNav";
import PastFlowers from "./components/PastFlowers";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import React, { useState, useEffect } from "react";
import PetalModal from './components/PetalModal';
import Flower from './components/Flower'
import { firebaseApp, auth, googleProvider } from "./fire.js";

//darkmode

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/theme";
import { GlobalStyles } from "./global";
import "./App.css";

//write all login functionality on app

function App() {
  const [googleUser, setGoogleUser] = useState();
  //useEffect to get if user exists/signed in, then pull info from database based on what user is signed in
  //useEffect will ping db then send back info on what user is logged in
  const [colorPicked, setColorPicked] = useState("yellow");
  
  const handleColor = (evt) => {
    // setColorPicked({fill: color.hex})
    setColorPicked(evt.target.value);
    
  };

  const handleColorChange = (color, evt) => {
    setColorPicked(color.hex);
    console.log(color.hex);
  };

  const [theme, setTheme] = useState("light");
  //use state for this, starting as false(ie, light mode) and upon pressing button for dark mode, it changes to true. depending on false/true, write ternary which will determine which is rendered based on state
  //function that toggles between themes
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  function googleLogin(props) {
    firebaseApp
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
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

  return (
    <div className="App">
      {theme === "dark" ? <DarkModeNav /> : <Nav />}

      <button onClick={toggleTheme}>Toggle Theme</button>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route path={"/Profile"} component={Profile} />
        <Route path={"/Connect"} component={Connect} />
        <Route
          path={"/Create"}
          render={(props) => {
            
            return <><Create theme={theme} />
            <Flower color={props.colorPicked}/> 
         </> }}
          
        />
        <Route path={"/Global"} component={Global} />
        <Route path={"/Signup"} component={Signup} />
        <Route path={"/Login"} component={Login} />
        <Route path={"/PastFlowers"} component={PastFlowers} />
        <Route path={"/Settings"} component={Settings} />
      </Switch>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />

          <footer></footer>
        </>
      </ThemeProvider>
    </div>
  );
}
export default App;

//manage user login in app. pass props to whatever page we need to use them too
