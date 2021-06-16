import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppThemeContext } from "../contexts/AppThemeContext";
import blackflower from "./icons/black-flower.png";
import blackglobe from "./icons/black-globe.png";
import blackspiral from "./icons/spiral.png";
import whiteFlower from "./icons/whiteFlower.png";
import whiteGlobe from "./icons/whiteGlobe.png";
import whiteSpiral from "./icons/whiteSpiral.png";

const SiteNav = () => {
  const { theme } = useContext(AppThemeContext);

  const images = {
    dark: { spiral: whiteSpiral, globe: whiteGlobe, flower: whiteFlower },
    light: { spiral: blackspiral, globe: blackglobe, flower: blackflower },
  };

  const { spiral, globe, flower } = images[theme];

  return (
    <div id="navbar">
      <Link to={"/past-flowers"}>
        <img src={spiral} alt="spiral, nav to past flowers" id="navspiral" />
      </Link>
      <Link to={"/create"}>
        <img src={flower} alt="flower, nav to create" id="navflower" />
      </Link>
      <Link to={"/global-flowers"}>
        <img src={globe} alt="globe, nav to global" id="navglobe" />
      </Link>
    </div>
  );
};

export default SiteNav;
