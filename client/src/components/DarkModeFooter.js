import React from "react";
import { Link } from "react-router-dom";
import whiteSpiral from './icons/whiteSpiral.png'


export default function DarkModeFooter() {

  return (

    <div id="navbar">
      
       <Link href ="https://www.ok.community/"><img src={whiteSpiral} alt="spiral" id="navspiral"/></Link>
      
    </div>
  );
}

