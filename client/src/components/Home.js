import React from "react";
import { Link } from "react-router-dom";
import whiteFlower from './icons/whiteFlower.png'
import whiteGlobe from './icons/whiteGlobe.png'
import whiteSpiral from './icons/whiteSpiral.png'
import HomeFooter from './HomeFooter';

export default function Home() {
  return (
    <div id="homenav">
      <Link to={"/PastFlowers"}><img src={whiteSpiral} alt="spiral" id="navspiral"/></Link>
      <Link to={"/Create"}><img src={whiteFlower} alt="flower" id="navflower"/></Link>
      <Link to={"/Global"}><img src={whiteGlobe} alt="globe" id="navglobe"/></Link>
      <HomeFooter/>
    </div>
  );
}
