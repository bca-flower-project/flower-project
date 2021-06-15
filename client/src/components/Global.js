import React from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import { database } from "./fire";
import { useState, useEffect } from "react";
import BlankFlower from "./BlankFlower";
import "firebase/firestore";
import Footer from "./Footer";
import DarkModeFooter from "./DarkModeFooter";


export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState([]);
  const [loading, setLoading] = useState(false);


  async function flowerGlobe() {

    const ref = database.collection("Global");

    setLoading(true);

    await ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setGlobalFlower(items);
      setLoading(false);
    });
  }
  useEffect(async () => {
    flowerGlobe();
  }, []);
  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="globalWrapper">
      {props.theme === "dark" ? <DarkModeNav /> : <Nav />}
      <div className="globalContents">
      {GlobalFlower.map((flower, index) => {
        return (
          <div>
            <BlankFlower
              colorOne={flower.PeaksColor}
              colorTwo={flower.AspirationsColor}
              colorThree={flower.PeopleColor}
              colorFour={flower.PrinciplesColor}
              colorFive={flower.PowerColor}
              colorSix={flower.ChallengesColor}
              width="10vw"
            />
          </div>
        );
      })}

      </div>
    </div>
  );
}
