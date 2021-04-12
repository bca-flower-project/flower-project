import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import { database } from "./fire";
import "firebase/firestore";
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
        <div key={flower.Aspirations}>
          <h2>{flower.AspirationsColor}</h2>
          <p>{flower.Challenges}</p>
        </div>
      })}
    </div>
    </div>
  );
}

//to display their past flowers in chronological order, and when they click one it opens up a modal window like how it does in global view
