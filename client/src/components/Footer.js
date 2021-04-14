import React from "react";
//import { Link } from "react-router-dom";
import blackLogo from "./icons/blackLogo.png";

export default function Footer() {
  return (
    
      <a href="https://www.ok.community/the-flower-project">
        {" "}
        <img
          src={blackLogo}
          style={{ width: "5vw" }}
          alt="okLogo"
          id="okLogo"
        />
      </a>
   
  );
}
