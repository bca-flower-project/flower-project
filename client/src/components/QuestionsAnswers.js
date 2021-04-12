import React from "react";

export default function QuestionsAnswers(props) {
  return (
    <div>
      <ul id="quest-answers">
        <li>Question: {props.peaksQuestion}</li>
        <li>Answer:{props.peaksAnswer}</li>
        <li>Question: {props.aspirationsQuestion}</li>
        <li>Answer:{props.aspirationsAnswer}</li>
        <li>Question: {props.peopleQuestion}</li>
        <li>Answer:{props.peopleAnswer}</li>
        <li>Question: {props.principlesQuestion}</li>
        <li>Answer:{props.principlesAnswer}</li>
        <li>Question: {props.powerQuestion}</li>
        <li>Answer:{props.powerAnswer}</li>
        <li>Question: {props.challengesQuestion}</li>
        <li>Answer:{props.challengesAnswer}</li>
      </ul>
    </div>
  );
}
