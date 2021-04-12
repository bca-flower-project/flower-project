import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import { database } from "./fire";
import "firebase/firestore";
import Footer from "./Footer";
import DarkModeFooter from "./DarkModeFooter";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "../global";

export default function PastFlower(props) {
  //Probably useEffect/API fetch
 

  return (
    <div className="gardenWrapper">
       {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
       <div className="gardenContents">
          <h1>Your growing garden</h1>
          <ThemeProvider theme={props.theme === "light" ? lightTheme : darkTheme}>
          <>
            <GlobalStyles />

            <footer></footer>
          </>
        </ThemeProvider>
          {props.theme === "dark" ? <DarkModeFooter /> : <Footer />}
      </div>
    </div>
  );
}

//to display their past flowers in chronological order, and when they click one it opens up a modal window like how it does in global view
