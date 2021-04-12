import React from "react";
import Nav from "./Nav";
import DarkModeNav from "./DarkModeNav";
import {database} from "./fire";
import {useState, useEffect} from "react";

export default function Global(props) {
  const [GlobalFlower, setGlobalFlower] = useState(null);
  
  async function flowerGlobe(id) {
    return await database.collection("Global").doc(id).get()
    }

  useEffect(async () => {
    if (GlobalFlower === null) {
      setGlobalFlower(await flowerGlobe());
    }
  });
  console.log(GlobalFlower);
  return (
    <div>
      {props.theme === "dark" ? <DarkModeNav  /> : <Nav />}
      <h1>global view</h1>
    </div>
  );
}
