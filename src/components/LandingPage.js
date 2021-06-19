import React from "react";
import { Link } from "react-router-dom";
import blackflower from "./icons/ok-flower.png";
import blackglobe from "./icons/ok.globe.png";
import spiral from "./icons/spiral.png";
import whiteFlower from "./icons/whiteFlower.png";
import whiteGlobe from "./icons/ok.globe.white.png";
import whiteSpiral from "./icons/whiteSpiral.png";

export default function LandingPage(props) {
  return (
    <div>
      {props.theme === "light" ? (
        <div className="LightLanding">
          <Link to={"/PastFlowers"}>
            <img src={spiral} alt="spiral, nav to past flowers" id="landing" />
          </Link>

          <Link to={"/Create"}>
            <img src={blackflower} alt="flower, nav to create" id="landing" />
          </Link>
          <Link to={"/Global"}>
            <img
              src={blackglobe}
              alt="globe, nav to global"
              id="landingGlobe"
            />
          </Link>
        </div>
      ) : (
        <div className="DarkLanding">
          <Link to={"/PastFlowers"}>
            <img
              src={whiteSpiral}
              alt="spiral, nav to past flowers"
              id="landing"
            />
          </Link>
          <Link to={"/Create"}>
            <img src={whiteFlower} alt="flower, nav to create" id="landing" />
          </Link>
          <Link to={"/Global"}>
            <img
              src={whiteGlobe}
              alt="globe, nav to global"
              id="landingGlobe"
            />
          </Link>
        </div>
      )}
      <div className="landingText">
        <p style={{ paddingLeft: "7vw" }}>Past Flowers</p>
        <p style={{ paddingLeft: "32vw" }}>Create</p>
        <p style={{ paddingLeft: "35vw" }}>Global</p>
      </div>
    </div>
  );
}
