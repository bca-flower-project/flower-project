import React from "react";

export default function QuestionsAnswers(props) {
  return (
    <div>
      <div id="quest-answers">
        <h3>Question: {props.peaksQuestion}</h3>
        <p>Answer: {props.peaksAnswer}</p>
        <h3>Question: {props.aspirationsQuestion}</h3>
        <p>Answer: {props.aspirationsAnswer}</p>
        <h3>Question: {props.peopleQuestion}</h3>
        <p>Answer: {props.peopleAnswer}</p>
        <h3>Question: {props.principlesQuestion}</h3>
        <p>Answer: {props.principlesAnswer}</p>
        <h3>Question: {props.powerQuestion}</h3>
        <p>Answer: {props.powerAnswer}</p>
        <h3>Question: {props.challengesQuestion}</h3>
        <p>Answer: {props.challengesAnswer}</p>
      </div>
    </div>
  );
}
