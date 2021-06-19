import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { AuthContext } from "../../contexts/AuthContext";
import fire from "../../config/fire";
import BlankFlower from "../BlankFlower";
import QuestionsAnswers from "./QuestionsAnswers";
import "./PastFlowers.scss";

const { database } = fire;

export default function PastFlowers(props) {
  const [previousFlowers, setPreviousFlowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function pastFlowers() {
      const ref = database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower");

      setLoading(true);

      await ref.get().then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setPreviousFlowers(items);
        setLoading(false);
      });
    }

    if (currentUser) {
      pastFlowers();
    }
  }, [currentUser]);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container>
      {previousFlowers.map((flower, index) => {
        const {
          PeaksColor,
          AspirationsColor,
          PeopleColor,
          PrinciplesColor,
          PowersColor,
          ChallengesColor,
          PeaksQuestion,
          Peaks,
          AspirationsQuestion,
          Aspirations,
          PeopleQuestion,
          People,
          PrinciplesQuestion,
          Principles,
          PowersQuestion,
          Powers,
          ChallengesQuestion,
          Challenges,
        } = flower;

        return (
          <Container>
            <Row key={`flower-${index}`} className="flowerRow">
              <div className="col-sm-6">
                <BlankFlower
                  colorOne={PeaksColor}
                  colorTwo={AspirationsColor}
                  colorThree={PeopleColor}
                  colorFour={PrinciplesColor}
                  colorFive={PowersColor}
                  colorSix={ChallengesColor}
                />
              </div>
              <div className="col-sm-6">
                <QuestionsAnswers
                  peaksQuestion={PeaksQuestion}
                  peaksAnswer={Peaks}
                  aspirationsQuestion={AspirationsQuestion}
                  aspirationsAnswer={Aspirations}
                  peopleQuestion={PeopleQuestion}
                  peopleAnswer={People}
                  principleQuestion={PrinciplesQuestion}
                  principleAnswer={Principles}
                  powersQuestion={PowersQuestion}
                  powerAnswer={Powers}
                  challengesQuestion={ChallengesQuestion}
                  challengesAnswer={Challenges}
                />
              </div>
            </Row>
          </Container>
        );
      })}
    </Container>
  );
}
