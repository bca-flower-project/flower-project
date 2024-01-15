import { useContext } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./LandingPage.scss";
import blackLogo from "../icons/blackLogo.png";
import whiteLogo from "../icons/whiteLogo.png";

export default function LandingPage() {
  const { theme } = useContext(AppThemeContext);

  const images = {
    dark: { okLogo: whiteLogo },
    light: { okLogo: blackLogo },
  };

  const { okLogo } = images[theme];

  return (
    <Container fluid className={`LandingPage ${theme}`}>
      <Col align="center">
        <img className="ok-logo" src={okLogo} alt="oK.community" />
        <br/>
        <br/>
        <p className="ok-logo-headline">
          Our Stories | Our Future
        </p>
        <p className="ok-logo-description">
          oK is a community for people to share their stories and deepen their connections with the people they care for most.
        </p>
        <br/>
        <br/>
        <Row align="center" className="session-container">
          <div className="session-btn join-btn">
            <Link to={"/signup"}>
              Join
            </Link>
          </div>
          <div className="session-btn login-btn">
            <Link to={"/login"}>
              Login
            </Link>
          </div>
        </Row>
        <br/>
        <br/>
        <div className="learn-more-btn">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.ok.community"
          >
            Learn More
          </a>
        </div>
      </Col>
    </Container>
  );
}
