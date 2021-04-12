import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import { database } from "./fire";
import "firebase/firestore";
import BlankFlower from "./BlankFlower";
import QuestionsAnswers from "./QuestionsAnswers";

export default function PastFlower(props) {
  //Probably useEffect/API fetch
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
    <div>
      {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
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
            />
            <QuestionsAnswers
              peaksQuestion={flower.PeaksQuestion}
              peaksAnswer={flower.Peaks}
              aspirationsQuestion={flower.aspirationsQuestion}
              aspirationsAnswer={flower.Aspirations}
              peopleQuestion={flower.peopleQuestion}
              peopleAnswer={flower.People}
              principlesQuestion={flower.principlesQuestions}
              principlesAnswer={flower.Principles}
              powerQuestion={flower.powerQuestion}
              powerAnswer={flower.Power}
              challengesQuestion={flower.challengesQuestion}
              challengesAnswer={flower.Challenges}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
}

//to display their past flowers in chronological order, and when they click one it opens up a modal window like how it does in global view

//TO GET TEXT DISPLAYING WITHIN FLOWER (CLICK FLOWER, MODAL POPS UP WITH QUESTIONS AND ANSWERS) ---
//do same as onclick for createflower, wrap in <a> </a>, set modal with either function or call to component Questions Answers
