import { useContext, useEffect } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./FirstFlowerIntroduction.scss";
import blackFlower from "../icons/black-flower.png";
import whiteFlower from "../icons/whiteFlower.png";

export default function FirstFlowerIntroduction() {
  const { theme } = useContext(AppThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = {
    dark: { flowerLogo: whiteFlower },
    light: { flowerLogo: blackFlower },
  };

  const { flowerLogo } = images[theme];

  return (
    <Container fluid className={`FirstFlowerIntroduction ${theme}`}
      style={{
        marginBottom: "150px"
      }}
    >
      <Col align="center">
        <br/>
        <p className="create-flower-headline">
          Welcome!
        </p>
        <p className="create-flower-description">
          Begin by telling your story. At oK, we use Flowers to help us reflect on who we are and who we want to be. They can always be added to later.
        </p>
        <br/>
        <br/>
        <div className="create-flower-logo-container">
          <Link
            className="create-flower-logo-caption"
            to={
              {pathname:"/create",
              state: { "firstFlowerIntroduction": true }}
            }
          >
            <div className="create-flower-logo-inner-container">
              <p>Create a Flower</p>
              <img className="create-flower-logo" src={flowerLogo} alt="Create a Flower" />
            </div>
          </Link>
        </div>
      </Col>
    </Container>
  );
}
