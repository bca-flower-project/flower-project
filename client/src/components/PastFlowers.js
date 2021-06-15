import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import { database } from "./fire";
import "firebase/firestore";
import BlankFlower from "./BlankFlower";
import QuestionsAnswers from "./QuestionsAnswers";
import Footer from "./Footer";
import DarkModeFooter from "./DarkModeFooter";


export default function PastFlower(props) {
  const [previousFlower, setPreviousFlower] = useState([]);
  const [loading, setLoading] = useState(false);
  async function pastFlowers() {
    const ref = database
      .collection("user")
      .doc(props.user.uid)
      .collection("flower");

    setLoading(true);

    await ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setPreviousFlower(items);
      setLoading(false);
    });
  }
  useEffect(async () => {
    pastFlowers();
  }, []);
  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="gardenWrapper">
           {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
            <div className="gardenContents">
      <br></br>
      <br></br>
      <br></br>
        <h1>Your growing garden</h1>
        {previousFlower.map((flower, index) => {
          return (
            <div>
              <BlankFlower
                colorOne={flower.PeaksColor}
                colorTwo={flower.AspirationsColor}
                colorThree={flower.PeopleColor}
                colorFour={flower.PrinciplesColor}
                colorFive={flower.PowerColor}
                colorSix={flower.ChallengesColor}
                width="35vw"
              />
              <QuestionsAnswers
                peaksQuestion={flower.PeakQuestion}
                peaksAnswer={flower.Peaks}
                aspirationsQuestion={flower.AspirationQuestion}
                aspirationsAnswer={flower.Aspirations}
                peopleQuestion={flower.PeopleQuestion}
                peopleAnswer={flower.People}
                principleQuestion={flower.PrincipleQuestion}
                principleAnswer={flower.Principles}
                powersQuestion={flower.PowerQuestion}
                powerAnswer={flower.Powers}
                challengesQuestion={flower.ChallengesQuestion}
                challengesAnswer={flower.Challenges}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
