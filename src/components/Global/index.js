import React, { useState, useEffect } from "react";
import fire from "../../config/fire";
import { Container, Row, Col } from "react-bootstrap";
import "./Global.scss";

import BlankFlower from "../BlankFlower";

const { database } = fire;

export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function flowerGlobe() {
      const ref = database.collection("Global").orderBy("createdAt");

      setLoading(true);

      await ref.get().then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setGlobalFlower(items);
        setLoading(false);
      });
    }
    flowerGlobe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center">Coming Soon...</h2>
        </Col>
      </Row>
      <Row>
        {GlobalFlower.map((flower, index) => {
          return (
            <div className="flower-col col-4 col-lg-2">
              <BlankFlower
                colorOne={flower.PeaksColor}
                colorTwo={flower.ChallengesColor}
                colorThree={flower.PeopleColor}
                colorFour={flower.PrinciplesColor}
                colorFive={flower.PowersColor}
                colorSix={flower.AspirationsColor}
              />
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
