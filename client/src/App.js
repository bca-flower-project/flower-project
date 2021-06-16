import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import firebase from "firebase/app";
import "firebase/auth";

//import components
import Create from "./components/Create";
import Global from "./components/Global";
import Login from "./components/Login";
import PastFlowers from "./components/PastFlowers";
import LandingPage from "./components/LandingPage";

import { googleProvider, database } from "./components/fire.js";

import Footer from "./components/Footer";
import DarkModeFooter from "./components/DarkModeFooter";
import { lightTheme, darkTheme } from "./components/theme";
import { GlobalStyles } from "./global";

// create modal
import "./App.css";

//write all login functionality on app
function App(props) {
  //useEffect to get if user exists/signed in, then pull info from database based on what user is signed in
  //useeffect will ping db then send back info on what user is logged in
  const [user, setUser] = useState(null);

  let history = useHistory();
  async function googleLogin(props) {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(async (result) => {
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
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log({ errorCode, errorMessage, email, credential, error });
      });
  }

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/Global"
          render={(props) => {
            return <Global user={user} theme={theme} />;
          }}
        />
        <Route
          exact
          path="/Create"
          render={(props) =import React from "react";
> {
            return (
              <>
                <Create theme={theme} user={user} />
              </>
            );
          }}
        />
        <Route
          exact
          path="/PastFlowers"
          render={(props) => {
            return <PastFlowers user={user} theme={theme} />;
          }}
        />
        <Route
          exact
          path="/LandingPage"
          render={(props) => {
            return <LandingPage user={user} theme={theme} />;
          }}
        />
        <Route
          exact
          path="/"
          render={(props) => {
            return <Login user={user} googleLogin={googleLogin} />;
          }}
        />
      </Switch>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <div id="footer" style={{ paddingBottom: "10vh", paddingLeft: "5vw" }}>
          <button onClick={toggleTheme}>Toggle Theme</button>
          {theme === "dark" ? <DarkModeFooter /> : <Footer />}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
