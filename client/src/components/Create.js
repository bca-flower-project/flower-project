import React from "react";
import DarkModeNav from "./DarkModeNav";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "../global";
import "../App.css";
import PetalModal from "./PetalModal";
import Nav from "./Nav";

export default function Create(props) {
  return (
    <div className="createWrapper">
      {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
      <div className="createContents">
        <PetalModal
          theme={props.theme === "light" ? lightTheme : darkTheme}
          user={props.user}
        />
        <ThemeProvider theme={props.theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
        </ThemeProvider>
      </div>
    </div>
  );
}
