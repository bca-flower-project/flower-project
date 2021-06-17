import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppThemeContext } from "../contexts/AppThemeContext";
import "./SiteNav.scss";
import { Container, Row } from "react-bootstrap";

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
    <Container className="SiteNav" fluid>
      <Row>
        <Link to={"/past-flowers"}>
          <img src={spiral} alt="Past Flowers" />
        </Link>
        <Link to={"/create"}>
          <img src={flower} alt="Create" />
        </Link>
        <Link to={"/global"}>
          <img src={globe} alt="Global Flowers" />
        </Link>
      </Row>
    </Container>
  );
};

export default SiteNav;
