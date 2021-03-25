<<<<<<< HEAD
import React from 'react';
import petal from './images/petal.svg';

let petalPic = petal; 

export default function Create() {



    return (
        <div>
        

          
            <h1>Create!!!</h1>
            <div class="middle" id="name">Name</div>
            <div class="petal" id="peaks"><img src={petalPic} alt="petal"/>Peaks</div>
            <div class="petal" id="challenges"><img src={petalPic} alt="petal"/>Challenges</div>
            <div class="petal" id="people"><img src={petalPic} alt="petal"/>People</div>
            <div class="petal" id="principles"><img src={petalPic} alt="petal"/>Principles</div>
            <div class="petal" id="power"><img src={petalPic} alt="petal"/>Power</div>
            <div class="petal" id="aspirations"><img src={petalPic} alt="petal"/>Aspirations</div>
        </div>
    )
}




// Peaks
// What have been the peak moments of your life?
// What are your biggest accomplishments?
// What are your happiest memories?


// Challenges
// What have been the hardest times of your life?
// What are the biggest challenges you've faced?
// What do you struggle with the most?

// People
// Who are the most influential people in your life?
// Who are the people that care for you?
// Who do you care about the most?

// Principles
// What are your most deeply held beliefs?
// What do you care about most in life?
// What are your principles?

// Powers
// What do you feel you are good at?
// What do you love to do?
// What are your powers?

// Aspirations
// What is your intention for the future?
// What are your aspirations?
// What are your goals?


















//when create is clicked, first petal is zoomed in. 
//user is prompted to select one of 3 questions from drop down menu -> when selected 
=======
import React from "react";

export default function Create() {
  return (
    <div>
      <h1>Create!!!</h1>
      <div class="middle" id="name">
        Name
      </div>
      <div class="teardrop" id="peaks">
        Peaks
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
>>>>>>> 2578fd910873dc36f32813305ff5156ce472efa8
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
