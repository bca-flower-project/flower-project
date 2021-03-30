import React from "react";
import petal1 from "./images/powers.svg";
import petal2 from "./images/interests.svg";
import petal3 from "./images/people.svg";
import petal4 from "./images/aspirations.svg";
import petal5 from "./images/challenges.svg";
import petal6 from "./images/peaks.svg";
import blank from "./images/blank.svg";
import blanktwo from "./images/blanktwo.svg";
import { useState } from "react";
import flower from "./icons/ok-flower.png";

let petalPic1 = petal1;
let petalPic2 = petal2;
let petalPic3 = petal3;
let petalPic4 = petal4;
let petalPic5 = petal5;
let petalPic6 = petal6;
let box1 = blank;
// let box2 = blanktwo
let outline = flower;

export default function Create(props) {
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
        <img id="flower-outline" src={outline} alt="outline" />
        <div id="flower-wrapper">
          <img id="blank" src={box1} alt="blank" />
        </div>
      </div>
      {/* <div id="flower-wrapper">
      <div class="middle" id="name">
        Name
      </div>
      <div class="flower" id="peaks">
        POWERS 
        <img id="powers" src={petalPic1} alt="petal"/>  
      </div>
      <div class="flower" id="challenges">
        <img id="interests" src={petalPic2} alt="petal"/>
        INTERESTS
      </div>
      <div class="flower" id="people">
        <img id="people" src={petalPic3} alt="petal"/>
        PEOPLE
      </div>
      <div class="flower" id="principles">
        <img id="aspirations" src={petalPic4} alt="petal"/>
        ASPIRATIONS
      </div>
      <div class="flower" id="power">
        <img id="challenges" src={petal5} alt="petal"/>
        CHALLENGES
      </div>
      <div class="flower" id="aspirations">
        <img id="peaks" src={petalPic6} alt="petal"/>
        PEAKS
        </div> */}
      {/* </div> */}
    </div>
  );
}

{
  /* <select name="peaks" onChange = {peaksQuestion}>
<option
<option 
<option
        </select>
        <button onClick = {submitAnswer}> Submit</button> */
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
