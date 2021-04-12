import React from "react";
//import { Link } from "react-router-dom";
import whiteLogo from './icons/whiteLogo.png';


export default function DarkModeFooter() {
 
  return (

    <div>
      
      <a href="https://www.ok.community/the-flower-project"> <img id="footerLogo" src={whiteLogo} style={{width: "2vw"}}alt="okLogo"id="okLogo"/></a>
      <a href="https://www.ok.community/the-flower-project"><h6 style={{textDecoration: "none", color: "white"}}>About</h6></a>
      
    </div>
  );
}

