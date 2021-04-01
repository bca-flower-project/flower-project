import React from "react";
import { Link } from "react-router-dom";
import whiteFlower from './icons/whiteFlower.png'
import whiteGlobe from './icons/whiteGlobe.png'
import whiteSpiral from './icons/whiteSpiral.png'


export default function DarkModeNav() {

  return (

    <div id="navbar">
      {/* <Link to="/">Home</Link> */}

       <Link to={"/PastFlowers"}><img src={whiteSpiral} id="navspiral"/></Link>
      <Link to={"/Create"}><img src={whiteFlower} id="navflower"/></Link>
      <Link to={"/Global"}><img src={whiteGlobe} id="navglobe"/></Link>
      {/* <Link to={"/Login"}>Login</Link>
     <Link to={"/Connect"}>Connect</Link>
      <Link to={"/Profile"}>Profile</Link>
      <Link to={"Settings"}>Settings</Link> */}
    </div>
  );
}


