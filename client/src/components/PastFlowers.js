import React from "react";
import { useState, useEffect } from 'react';
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";

export default function PastFlower(props) {
  //Probably useEffect/API fetch
  const [flowers, setFlowers] =useState([])

  useEffect(() => {
    if (flowers.length !== 0) {
      fetch('/api')
      .then((res) => res.json())
      .then((usersFlowers) => {
        setFlowers(usersFlowers);
      })
    }
  });
  flowers && 
      flowers.forEach((object) => {
        console.log(flowers)
        
      })


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
