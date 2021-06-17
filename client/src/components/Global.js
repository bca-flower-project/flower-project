import React from "react";
import fire from "../config/fire";
import { useState, useEffect } from "react";
import BlankFlower from "./BlankFlower";

const { database } = fire;

export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('ok')

  async function flowerGlobe() {
    const ref = database.collection("Global");

    setLoading(true);
    console.log('ok')

    await ref.get().then((item) => {
      console.log('ok')

      const items = item.docs.map((doc) => doc.data());
      setGlobalFlower(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    console.log('o2')

    flowerGlobe();
  }, []);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="globalWrapper">
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
