import React from "react";
export default function QuestionsAnswers(props) {
  return (
    <div>
      <div id="quest-answers">
        <h4>Question: {props.peaksQuestion}</h4>
        <p>Answer: {props.PeaksAnswer}</p>
        <h4>Question: {props.aspirationsQuestion}</h4>
        <p>Answer: {props.aspirationsAnswer}</p>
        <h4>Question: {props.peopleQuestion}</h4>
        <p>Answer: {props.peopleAnswer}</p>
        <h4>Question: {props.principlesQuestion}</h4>
        <p>Answer: {props.principlesAnswer}</p>
        <h4>Question: {props.powerQuestion}</h4>
        <p>Answer: {props.powerAnswer}</p>
        <h4>Question: {props.challengesQuestion}</h4>
        <p>Answer: {props.challengesAnswer}</p>
      </div>
    </div>
  );
}
