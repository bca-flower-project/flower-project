import React from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import {database} from "./fire";
import {useState, useEffect} from "react";
import Footer from "./Footer";
import DarkModeFooter from "./DarkModeFooter";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "../global";

export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState(null);
  
  
  return (
    <div className="globalWrapper">
      {props.theme === "dark" ? <DarkModeNav  /> : <Nav />}
      <div className="globalContents">
      
      <h1>Global view</h1>
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
