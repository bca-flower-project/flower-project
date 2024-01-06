import { useContext, useEffect, useState } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./LandingPage.scss";
import blackflower from "../icons/ok-flower.png";
import blackglobe from "../icons/ok.globe.png";
import spiral from "../icons/spiral.png";
import whiteFlower from "../icons/whiteFlower.png";
import whiteGlobe from "../icons/ok.globe.white.png";
import whiteSpiral from "../icons/whiteSpiral.png";

import Settings from "../Settings";

const { database } = fire;

export default function LandingPage() {
  const { theme } = useContext(AppThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);

    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  const markAsCompletedNewUserExperience = async (user) => {
    await database
      .collection("user")
      .doc(user.uid)
      .update({ completedNewUserExperience: true });
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

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

  if (userData && !userData.completedNewUserExperience) {
    return (
      <Settings
        title="Welcome to the Flower Project"
        submitButtonLabel="Save & Continue"
        afterSubmit={() => {
          markAsCompletedNewUserExperience(currentUser);
          getUser(currentUser)
        }}
      />
    );
  } else {
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
}
