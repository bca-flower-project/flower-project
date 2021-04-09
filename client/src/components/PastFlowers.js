import React from "react";
import { useState, useEffect } from "react";
import { database } from "./fire";

export default function PastFlower(props) {
  //Probably useEffect/API fetch
  const [previousFlower, setPreviousFlower] = useState(null);
  console.log(props.user);
  async function pastFlowers() {
    return database.collection("users").doc(props.user.uid).collection("flower").get("flower")
    }

  useEffect(async () => {
    if (previousFlower === null) {
      setPreviousFlower(await pastFlowers());
    }
  });
  console.log(previousFlower);

  return (
    <div>
      <h1>Your growing garden</h1>
    </div>
  );
}

//to display their past flowers in chronological order, and when they click one it opens up a modal window like how it does in global view
