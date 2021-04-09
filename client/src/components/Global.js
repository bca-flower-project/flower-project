import React from "react";
import {database} from "./fire"
import {useState, useEffect} from "react"
export default function Global() {
  const [GlobalFlower, setGlobalFlower] = useState(null);
  
  async function flowerGlobe(id) {
    return database.collection("Global").doc(id).get()
    }

  useEffect(async () => {
    if (GlobalFlower === null) {
      setGlobalFlower(await flowerGlobe());
    }
  });
  console.log(GlobalFlower);
  return (
    <div>
      <h1>global view</h1>
    </div>
  );
}
