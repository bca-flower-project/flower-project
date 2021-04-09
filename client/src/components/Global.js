import React from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";

export default function Global(props) {
  return (
    <div>
      {props.theme === "dark" ? <DarkModeNav  /> : <Nav />}
      <h1>global view</h1>
    </div>
  );
}
