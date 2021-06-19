import { useContext } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { Link } from "react-router-dom";
import { Container, Row  } from "react-bootstrap";
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
      imgSrc: theme === "dark" ? whiteSpiral : spiral,
      label: "View",
      to: "/past-flowers",
    },
    {
      imgSrc: theme === "dark" ? whiteFlower : blackflower,
      label: "Create",
      to: "/create",
    },
    {
      imgSrc: theme === "dark" ? whiteGlobe : blackglobe,
      label: "Connect",
      to: "/global",
    },
  ];

  return (
    <Container fluid className={`LandingPage ${theme}`}>
      <Row>
        {bits.map(({ imgSrc, label, to }) => {
          return (
            <div className="col-sm-3">
              <Link to={to}>
                <img src={imgSrc} alt={label} />
                <h2>{label}</h2>
              </Link>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
