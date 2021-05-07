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
import Modal from "react-modal";

export default function PastFlower(props) {
  const [previousFlower, setPreviousFlower] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const setModalIsOpenToTrue = (evt) => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  function showPastFlowInfo(evt) {
    setModalIsOpen(true)
  }

  return (
    <div className="gardenWrapper">
      {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
      <div className="gardenContents">
        <br></br>
        <br></br>
        <br></br>
        {/* <h1>Your growing garden</h1> */}
        {previousFlower.map((flower, index) => {
          return (
            <div>
              <div className="pastModal">
              <a
                onClick={setModalIsOpenToTrue}
                color="black"
                textDecoration="none"
              >
                <BlankFlower
                  colorOne={flower.PeaksColor}
                  colorTwo={flower.AspirationsColor}
                  colorThree={flower.PeopleColor}
                  colorFour={flower.PrinciplesColor}
                  colorFive={flower.PowerColor}
                  colorSix={flower.ChallengesColor}
                  width="20vw"
                />
              </a>
              </div>

              <Modal 
              id="flower-modal"
               isOpen={modalIsOpen}
               style={{
                 content: {
                  //  background: props.theme.body,
                   width: "70vw",
                   height: "70vh",
                   left: "14vw",
                   right: "14vw",
                   top: "17vh",
                 },
               }}
              >
               
                <button className="button" onClick={setModalIsOpenToFalse}>
                  x
                </button>
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
              </Modal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
