import React from "react";

export default function Create(props) {
const [pickQuestions, setPickQuestions] = useState()

//this will set question to one chosen with on submit later on
const [peaksQuestion, setPeaksQuestion] = useState()
const [challengesQuestion, setChallengesQuestion] = useState()
const [peopleQuestion, setPeopleQuestion] = useState()
const [principlesQuestion, setPrinciplesQuestion] = useState()
const [powerQuestion, setPowerQuestion] = useState()
const [aspirationsQuestion, setAspirationsQuestion] = useState()

  return (
    <div>
      <h1>Create!!!</h1>
      <div class="middle" id="name">
        Name
      </div>
      <div class="teardrop" id="peaks">
        Peaks 
        {/* <select name="peaks" onChange = {peaksQuestion}>
<option
<option 
<option
        </select>
        <button onClick = {submitAnswer}> Submit</button> */}
      </div>
      <div class="teardrop" id="challenges">
        Challenges
      </div>
      <div class="teardrop" id="people">
        People
      </div>
      <div class="teardrop" id="principles">
        Principles
      </div>
      <div class="teardrop" id="power">
        Power
      </div>
      <div class="teardrop" id="aspirations">
        Aspirations
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
