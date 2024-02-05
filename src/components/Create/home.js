import { useContext, useEffect, useState } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";

import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./Home.scss";
import blackflower from "../icons/ok-flower.png";
import birthdayFlower from "../icons/birthdayFlower.svg";
import whiteFlower from "../icons/whiteFlower.png";

const { database } = fire;

export default function CreateHome() {
  const { theme } = useContext(AppThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getUser = async (user) => {
    // const ref2 = await database
    // .collection("user")
    // .doc(currentUser.uid)
    // .collection("flower").get();
    
    // if (!ref2.empty) {
    //   setFirstFlowerExists(true);
    // } else {
    //   setFirstFlowerExists(false);
    // }
    
    const ref = database.collection("user").doc(user.uid);
    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

  const bits = [
    {
      imgSrc: theme === "dark" ? whiteFlower : blackflower,
      label: "Create",
      to: "/create",
      order: 1,
    },
    {
      imgSrc: birthdayFlower,
      label: "Send",
      to: "/send",
      order: 2,
    },
  ];


    return (
    <Container fluid className={`Home ${theme}`}
        style={{
        marginBottom: "100px"
        }}
    >
        <Row>
        {bits.map(({ imgSrc, label, to, order }) => {
            return (
            <Col 
                key={label} sm={{ order }}
                style={{
                marginBottom: "50px" 
                }}
            >
                <Link to={to}>
                    <img className="home-logos" src={imgSrc} alt={label} />
                    <h2 className="home-logos-caption">{label}</h2>
                </Link>
            </Col>
            );
        })}
        </Row>
    </Container>
    );
}
