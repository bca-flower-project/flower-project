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

  console.log(props.user);

  async function pastFlowers() {
    console.log(props.user.uid);
    const ref = database
      .collection("user")
      .doc(props.user.uid)
      .collection("flower");

    setLoading(true);

    await ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      console.log(item.docs);
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
  console.log(previousFlower);

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
                colorTwo={flower.ChallengesColor}
                colorThree={flower.PeopleColor}
                colorFour={flower.PrinciplesColor}
                colorFive={flower.PowerColor}
                colorSix={flower.AspirationsColor}
                width="35vw"
              />
              <QuestionsAnswers
                peaksQuestion={flower.PeakQuestion}
                peaksAnswer={flower.Peaks}
                challengesQuestion={flower.ChallengesQuestion}
                challengesAnswer={flower.Challenges}
                peopleQuestion={flower.PeopleQuestion}
                peopleAnswer={flower.People}
                principleQuestion={flower.PrincipleQuestion}
                principleAnswer={flower.Principles}
                powersQuestion={flower.PowerQuestion}
                powerAnswer={flower.Powers}
                aspirationsQuestion={flower.AspirationQuestion}
                aspirationsAnswer={flower.Aspirations}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
