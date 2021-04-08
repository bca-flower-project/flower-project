import React from "react";
import { useState, useEffect } from 'react';

export default function PastFlower() {
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
