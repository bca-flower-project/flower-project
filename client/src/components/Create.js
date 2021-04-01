import React from "react";
import {Route} from "react-router-dom";
import blank from "./images/blank.svg";
import {App} from 'react';
// import {Create} from 'react';
// import { ReactComponent as Petal } from "./images/petal.svg";
// import { ReactComponent as Blank } from "./images/blank.svg";
import blanktwo from "./images/blanktwo.svg";
import { useState, useEffect } from "react";
import flower from "./icons/ok-flower.png";
import '../App.css';
// import FlowerImg from "./FlowerImg";
import PetalModal from "./PetalModal";
// import Flower from "./Flower";
// import Petal from './Petal';
let box1 = blank;

export default function Create(props) {
  
  const [display, setDisplay] = useState(false); // is the modal displayed or not
  const [modalIsOpen, setModalIsOpen] = useState(false);



  const [pickQuestions, setPickQuestions] = useState();

  //this will set question to one chosen with on submit later on
  const [peaksQuestion, setPeaksQuestion] = useState();
  const [challengesQuestion, setChallengesQuestion] = useState();
  const [peopleQuestion, setPeopleQuestion] = useState();
  const [principlesQuestion, setPrinciplesQuestion] = useState();
  const [powerQuestion, setPowerQuestion] = useState();
  const [aspirationsQuestion, setAspirationsQuestion] = useState();

  return (
    <div>
      <h1>Create!!!</h1>
      <div id="flower-outer">
        {/* <img id="flower-outline" src={outline} alt="outline" /> */}
        <div id="flower-wrapper">
          
        </div>
        <PetalModal theme={props.theme} />
      </div>
    </div>
  );
}








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
