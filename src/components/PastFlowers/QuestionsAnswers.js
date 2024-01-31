import React from "react";

const QandA = ({ q, a }) => {
  return (
    <>
      <h4 className="flower-question">{q}</h4>
      <p className="flower-answer">{a}</p>
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
      <h3 className="flower-date">
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
      </h3>
      { peaksQuestion ? <QandA q={peaksQuestion} a={peaksAnswer} /> : <></>}
      { challengesQuestion ? <QandA q={challengesQuestion} a={challengesAnswer} /> : <></>}
      { peopleQuestion ? <QandA q={peopleQuestion} a={peopleAnswer} /> : <></>}
      { principleQuestion ? <QandA q={principleQuestion} a={principleAnswer} /> : <></>}
      { powersQuestion ? <QandA q={powersQuestion} a={powerAnswer} /> : <></>}
      { aspirationsQuestion ? <QandA q={aspirationsQuestion} a={aspirationsAnswer} /> : <></>}
    </>
  );
}
