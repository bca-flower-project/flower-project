import React from "react";
import blackLogo from "./icons/blackLogo.png";


export default function Footer() {
  
  return (

    <div style={{alignItems: "center"}}>
      
      <a href="https://www.ok.community/the-flower-project"> <img id="footerLogo" src={blackLogo} style={{width: "2vw"}}alt="okLogo"id="okLogo"/></a>
      <a href="https://www.ok.community/the-flower-project"><h6>About the Flower Project</h6></a>
    </div>
  );
}
