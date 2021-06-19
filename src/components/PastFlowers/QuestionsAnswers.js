import React from "react";

const QandA = ({ q, a }) => {
  return (
    <>
      <h4>{q}</h4>
      <p>{a}</p>
    </>
  );
};

// petal / question order -> Peaks, challenges, people, principles, powers, aspirations
export default function QuestionsAnswers(props) {
  return (
    <>
      <QandA q={props.peaksQuestion} a={props.peaksAnswer} />
      <QandA q={props.challengesQuestion} a={props.challengesAnswer} />
      <QandA q={props.peopleQuestion} a={props.peopleAnswer} />
      <QandA q={props.principleQuestion} a={props.principleAnswer} />
      <QandA q={props.powersQuestion} a={props.powerAnswer} />
      <QandA q={props.aspirationsQuestion} a={props.aspirationsAnswer} />
    </>
  );
}
