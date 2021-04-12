import React from "react";
//import { Link } from "react-router-dom";
import blackLogo from "./icons/blackLogo.png";


export default function Footer() {
  
  return (

    <div>
      
      <a href="https://www.ok.community/the-flower-project"> <img id="footerLogo" src={blackLogo} style={{width: "2vw"}}alt="okLogo"id="okLogo"/></a>
      <a href="https://www.ok.community/the-flower-project"><h6 style={{textDecoration: "none", color: "black"}}>About</h6></a>
      
    </div>
  );
}
