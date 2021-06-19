import React, { useState, useEffect } from "react";
import fire from "../../config/fire";
import { Container, Row } from "react-bootstrap";
import './Global.scss'

import BlankFlower from "../BlankFlower";

const { database } = fire;

export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function flowerGlobe() {
      const ref = database.collection("Global");

      setLoading(true);

      await ref.get().then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setGlobalFlower(items);
        setLoading(false);
      });
    }
    flowerGlobe();
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container>
      <Row>
        {GlobalFlower.map((flower, index) => {
          return (
            <div className="flower-col col-4 col-lg-2">
              <BlankFlower
                colorOne={flower.PeaksColor}
                colorTwo={flower.AspirationsColor}
                colorThree={flower.PeopleColor}
                colorFour={flower.PrinciplesColor}
                colorFive={flower.PowersColor}
                colorSix={flower.ChallengesColor}
              />
            </div>
          );
        })}
      </Row>
    </Container>
  );
}
