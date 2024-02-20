import { useContext, useEffect, useState } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./NewUserExperience.scss";
import blackflower from "../icons/ok-flower.png";
import blackglobe from "../icons/ok.globe.png";
import spiral from "../icons/spiral.png";
import whiteFlower from "../icons/whiteFlower.png";
import whiteGlobe from "../icons/ok.globe.white.png";
import whiteSpiral from "../icons/whiteSpiral.png";

import FirstFlowerIntroduction from "./FirstFlowerIntroduction";
import RestOfNewUx from "./RestOfNewUx";

const { database } = fire;

export default function NewUserExperience() {
  const { theme } = useContext(AppThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [firstFlowerExists, setFirstFlowerExists] = useState();
  const [closeNewUxBanner, setCloseBanner] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getUser = async (user) => {
    const ref2 = await database
    .collection("user")
    .doc(currentUser.uid)
    .collection("flower").get();
    
    if (!ref2.empty) {
      setFirstFlowerExists(true);
    } else {
      setFirstFlowerExists(false);
    }
    
    const ref = database.collection("user").doc(user.uid);
    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  const closeBanner = async () => {
    await database
      .collection("user")
      .doc(currentUser.uid)
      .update({
        ...userData,
        closeNewUxBanner: true
      });

      setCloseBanner(true);
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

  const bits = [
    {
      imgSrc: theme === "dark" ? whiteFlower : blackflower,
      label: "Create",
      to: "/create-home",
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

  if(userData) {
    if (!userData.completedNewUserExperience) {
      if(firstFlowerExists) {
        return <RestOfNewUx />
      } else {
        return (
          <FirstFlowerIntroduction/>
        );
      }
    } else {
      return (
        <Container fluid className={`NewUserExperience ${theme}`}
          style={{
            marginBottom: "100px"
          }}
        >
          { 
            (!userData.closeNewUxBanner && !closeNewUxBanner) && <div className="new-ux-banner">
              <p>This is your home.</p>
              <p>Here you can <b>View</b> and edit your Flowers</p>
              <p><b>Create</b> new ones, and see your <b>Connections</b></p>
              <p>Learn about our in person events and get more resources on our <b>About</b> page</p>
              <p onClick={closeBanner} className="close-new-ux-banner">Close ^</p>
            </div> 
          }
          <div className="logos-container">
            {bits.map(({ imgSrc, label, to, order }) => {
              return (
                <Col key={label} sm={{ order }}
                  style={{
                    marginBottom: "50px" 
                  }}
                >
                  <Link to={to}>
                    <img className={`home-logos-${label}`} src={imgSrc} alt={label} />
                    <h2 className="home-logos-caption">{label}</h2>
                  </Link>
                </Col>
              );
            })}
          </div>
        </Container>
      );
    }
  } else {
    return (
      <Col align="center">
        <Spinner animation="border" />
      </Col>
    );
  }
}
