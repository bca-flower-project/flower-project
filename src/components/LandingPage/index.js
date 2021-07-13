import { useContext } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./LandingPage.scss";
import blackflower from "../icons/ok-flower.png";
import blackglobe from "../icons/ok.globe.png";
import spiral from "../icons/spiral.png";
import whiteFlower from "../icons/whiteFlower.png";
import whiteGlobe from "../icons/ok.globe.white.png";
import whiteSpiral from "../icons/whiteSpiral.png";

export default function LandingPage() {
  const { theme } = useContext(AppThemeContext);
  const bits = [
    {
      imgSrc: theme === "dark" ? whiteFlower : blackflower,
      label: "Create",
      to: "/create",
      order: 2,
    },
    {
      imgSrc: theme === "dark" ? whiteSpiral : spiral,
      label: "View",
      to: "/past-flowers",
      order: 1,
    },
    {
      imgSrc: theme === "dark" ? whiteGlobe : blackglobe,
      label: "Connect",
      to: "/global",
      order: 3,
    },
  ];

  return (
    <Container fluid className={`LandingPage ${theme}`}>
      <Row>
        {bits.map(({ imgSrc, label, to, order }) => {
          return (
            <Col key={label} sm={{ order }}>
              <Link to={to}>
                <img src={imgSrc} alt={label} />
                <h2>{label}</h2>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
