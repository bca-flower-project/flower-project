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
export default function SendFlowerQuestionsAnswers(props) {
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
    prompt,
    answer,
    date,
    from,
     category
  } = props;
  return (
    <>
      <div
        className="flower-description"
      >
        <h3 className="send-flower-date">
            {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
        </h3>
        <h4>{category === "sent-flowers" ? `To ${from}` : `From ${from}`}</h4>
      </div>
      { prompt ? <QandA q={prompt} a={answer} /> : <></>}
    </>
  );
}
