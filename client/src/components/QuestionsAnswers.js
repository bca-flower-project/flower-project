import React from "react";
export default function QuestionsAnswers(props) {
  return (
    <div>
      <div id="quest-answers">
        <div id="quest-one">
          <h4>Question: {props.peaksQuestion}</h4>
          <p>Answer: {props.peaksAnswer}</p>
          <h4>Question: {props.aspirationsQuestion}</h4>
          <p>Answer: {props.aspirationsAnswer}</p>
          <h4>Question: {props.peopleQuestion}</h4>
          <p>Answer: {props.peopleAnswer}</p>
        </div>
        <div id="quest-two">
          <h4>Question: {props.principleQuestion}</h4>
          <p>Answer: {props.principleAnswer}</p>
          <h4>Question: {props.powersQuestion}</h4>
          <p>Answer: {props.powerAnswer}</p>
          <h4>Question: {props.challengesQuestion}</h4>
          <p>Answer: {props.challengesAnswer}</p>
        </div>
      </div>
    </div>
  );
}
