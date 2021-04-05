import React from "react";
import { Route } from "react-router-dom";
import blank from "./images/blank.svg";
import Flower from "./Flower.js";
import { useState, useEffect } from "react";
import outline from "./icons/ok-flower.png";
import DarkModeNav from "./DarkModeNav";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "../global";
import "../App.css";
import PetalModal from "./PetalModal";
import { HuePicker } from "react-color";
import CustomPointer from './CustomPicker'

export default function Create(props) {
  // const [theme, setTheme] = useState("light");
  const [display, setDisplay] = useState(false); // is the modal displayed or not
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //function that toggles between themes
  // const toggleTheme = () => {
  //   if (props.theme === "light") {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  const [pickQuestions, setPickQuestions] = useState();

  //this will set question to one chosen with on submit later on
  const [peaksQuestion, setPeaksQuestion] = useState();
  const [challengesQuestion, setChallengesQuestion] = useState();
  const [peopleQuestion, setPeopleQuestion] = useState();
  const [principlesQuestion, setPrinciplesQuestion] = useState();
  const [powerQuestion, setPowerQuestion] = useState();
  const [aspirationsQuestion, setAspirationsQuestion] = useState();

  // function ColorPicker {
  const [colorPicked, setColorPicked] = useState("yellow");
  
  // const handleColor = (evt) => {
  //   // setColorPicked({fill: color.hex})
  //   setColorPicked(evt.target.value);
  // };
  
  // const handleColorChange = (color, evt) => {
  //   setColorPicked(color.hex);
  //   console.log(color.hex);
  // };
 

  return (
    <div>
      <h1>Create!!!</h1>

      <PetalModal theme={props.theme === "light" ? lightTheme : darkTheme}/>
      {/* <button onClick={setModalIsOpen(true)}>Show Modal</button> */}
      {/* <button disabled={props.disabledState} onClick={() => {props.setDisabled(false); props.display(true)}} >Show Modal</button> Activates guess modal */}
      <ThemeProvider theme={props.theme === "light" ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />

          <footer></footer>
        </>
      </ThemeProvider>

<HuePicker 
slider= {CustomPointer}
pointer= {CustomPointer}/>


      {/* <CirclePicker
        onChange={props.handleColorChange}
       
        colors={[
          "#f44336",
          "#e91e63",
          "#9c27b0",
          "#673ab7",
          "#3f51b5",
          "#2196f3",
          "#03a9f4",
          "#00bcd4",
          "#009688",
        ]}
      /> */}
      <div id="flower-wrapper">
        <Flower color={colorPicked} 
        />
      </div>
    </div>
  );
}

//style as JS object (stored in state), pass style object through and use it and target it
//color choices in array(store in state), pass array through to petals - in petal SVG, we can escape to javascript (props.color[0], props.color[1],etc)

//when create is clicked, first petal is zoomed in.
//user is prompted to select one of 3 questions from drop down menu -> when selected
//will be either button or text area (within/outlined as a flex box? questions will always be top section: text area always below. this way all petals are equal size/proportions)

//next button/onsubmit brings you to next prompt + saves the info from last petal

//https://css-tricks.com/the-shapes-of-css/#cone-shape-via-omid-rasouli
//petals should be Indexed
//get higher res image where when you click, it will zoom in on individual petal
//then do transitional animation to rotate to next petal -> on click, rotate 60 degrees
//then zoom out to final flower ---- able to design/color after?? not while typing in individual petal

//360/6 60 degrees per rotation
//z index for image in the background, each think is clicking on the link, on top of the picture so it brings us to there and we can fill it out

//or do 6 divs with the tv screen shape , rotate them each individially
