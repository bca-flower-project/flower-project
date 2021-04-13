import React from "react";
import { Link } from "react-router-dom";
import blackflower from "./icons/black-flower.png";
import blackglobe from "./icons/black-globe.png";
import spiral from "./icons/spiral.png";
import HomeFooter from './HomeFooter';

export default function Home() {
  return (
    <div id="homenav">
      <Link to={"/PastFlowers"}>
        <img src={spiral} id="navspiral" />
      </Link>
      <Link to={"/Create"}>
        <img src={blackflower} id="navflower" />
      </Link>
      <Link to={"/Global"}>
        <img src={blackglobe} id="navglobe" />
      </Link>
      <HomeFooter/>
    </div>
  );
}
