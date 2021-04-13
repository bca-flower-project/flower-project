import React from "react";
import { Route } from "react-router-dom";
import blank from "./images/blank.svg";
import CreateFlower from "./CreateFlower.js";
import { useState, useEffect } from "react";
import outline from "./icons/ok-flower.png";
import DarkModeNav from "./DarkModeNav";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "../global";
import "../App.css";
import PetalModal from "./PetalModal";
import Nav from "./Nav";
import Footer from "./Footer";
import DarkModeFooter from "./DarkModeFooter";

export default function Create(props) {
  // const [theme, setTheme] = useState("light");
  const [display, setDisplay] = useState(false); // is the modal displayed or not
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="createWrapper">
      {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
      <div className="createContents">
        <h1>Create!!!</h1>

        <PetalModal
          theme={props.theme === "light" ? lightTheme : darkTheme}
          user={props.user}
        />
        {/* <button onClick={setModalIsOpen(true)}>Show Modal</button> */}
        {/* <button disabled={props.disabledState} onClick={() => {props.setDisabled(false); props.display(true)}} >Show Modal</button> Activates guess modal */}
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