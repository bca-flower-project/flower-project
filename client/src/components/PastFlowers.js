import React from "react";
import { useState, useEffect } from 'react';
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
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
      {props.theme === "dark" ? <DarkModeNav  /> : <Nav />}
      <h1>Your growing garden</h1>
      {flowers.map((flowerItem, index) => {
        return (
          <h1>return the svgs here</h1>
        )
      })}
    </div>
  );
}

//to display their past flowers in chronological order, and when they click one it opens up a modal window like how it does in global view
