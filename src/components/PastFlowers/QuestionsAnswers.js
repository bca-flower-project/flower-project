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
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const {
    peaksQuestion,
    peaksAnswer,
    challengesQuestion,
    challengesAnswer,
    peopleQuestion,
    peopleAnswer,
    principleQuestion,
    principleAnswer,
    powersQuestion,
    powerAnswer,
    aspirationsQuestion,
    aspirationsAnswer,
    date,
  } = props;
  return (
    <>
      <h3>
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
      </h3>
      <QandA q={peaksQuestion} a={peaksAnswer} />
      <QandA q={challengesQuestion} a={challengesAnswer} />
      <QandA q={peopleQuestion} a={peopleAnswer} />
      <QandA q={principleQuestion} a={principleAnswer} />
      <QandA q={powersQuestion} a={powerAnswer} />
      <QandA q={aspirationsQuestion} a={aspirationsAnswer} />
    </>
  );
}
