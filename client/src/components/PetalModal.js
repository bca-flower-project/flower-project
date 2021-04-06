import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Create } from "react";
import { HuePicker } from "react-color";
import App from "../App";
import Flower from "./Flower.js";
import "../App.css";

function PetalModal(props) {
  const questions = [
    {
      petal: "Peaks",
      questionOptions: [
        //array of possible questions
        "What have been the peak moments of your life?",
        "What are your biggest accomplishments?",
        "What are your happiest memories?",
      ],
    },
    {
      petal: "Aspirations",
      questionOptions: [
        "What is your intention for the future?",
        "What are your aspirations?",
        "What are your goals?",
      ],
    },
    {
      petal: "People",
      questionOptions: [
        "Who do you care about the most?",
        "Who are the people that care for you?",
        "Who are the most influential people in your life?",
      ],
    },
    {
      petal: "Principles",
      questionOptions: [
        "What are your principles?",
        "What do you care about most in life?",
        "What are your most deeply held beliefs?",
      ],
    },
    {
      petal: "Powers",
      questionOptions: [
        "What do you feel you are good at?",
        "What do you love to do?",
        "What are your powers?",
      ],
    },
    {
      petal: "Challenges",
      questionOptions: [
        "What do you struggle with the most?",
        "What are the biggest challenges you've faced?",
        "What have been the hardest times of your life?",
      ],
    },
  ];
  const [chosen, setChosen] = useState(0); // what is chosen state
  const [selected, setSelected] = useState(""); // what is selected state
  //const [question, setQuestion] = useState(""); //which petal they select determines which questions show
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);

  function handleNextQuestion() {
    // let petalArray = petal

    let nextQuestion = chosen + 1;
    //if the question # is bigger than the length of the array, it stops bc petals are complete
    //petal[chosen] = {
    // question[chosen]
    // answer[chosen]
    //  color[chosen]
    // }
    //^^this will go to firestore
    if (nextQuestion < questions.length) {
      setChosen(nextQuestion);
    } else {
      setModalIsOpen(false);
    }
  }

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  console.log(questions[1]);

  // when submitted... update chosen state with currently selected
  function submitForm(evt) {
    evt.preventDefault();
    setChosen(selected);
  }

  // when option is selected save it in selected state
  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }
  //
  //fetch
  // save your response to state, console.log state

  //use this array, set as intermediate variable, push to it and then set it in state again to save all of it
  const [petal, setPetal] = useState([]);
  //use state for questions for each petal
  useEffect(() => {
    if (petal === "peaks") {
      fetch(`/api`)
        .then((res) => res.json())
        .then((questionsList) => {
          setPetal(questionsList);
        });
    }
  });

  const [colorPicked, setColorPicked] = useState("yellow");
  const handleColor = (evt) => {
    // setColorPicked({fill: color.hex})
    setColorPicked(evt.target.value);
  };

  const handleColorChange = (color, evt) => {
    setColorPicked(color.hex);
    console.log(color.hex);
  };
  function showSubmit() {
    if (chosen !== 5) {
      return (
        <input
          style={{ display: "none" }}
          type="submit"
          value="Submit Flower"
        />
      );
    } else {
      return <input type="submit" value="Submit Flower" />;
    }
  }
  //do we need to make it questions.length or id
  console.log(props.theme);
  return (
    <>
      <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>

      <Modal 
        isOpen={modalIsOpen}
        style={{ content: { background: props.theme.body , width: "70vw", height: "70vh", left: "14vw", right: "14vw", top: "17vh" }}}
      >
        <button className="button" onClick={setModalIsOpenToFalse}>
          x
        </button>
        <div className="question-text">
          <h1>{`Select a reflection question for ${questions[chosen].petal}`}</h1>
          <form onSubmit={submitForm}>
            <select
              className="button"
              name="question-selection"
              value={selected}
              onChange={handleChange}
            >
              {questions[chosen].questionOptions.map((question, index) => {
                return <option value={`Question ${index}`}>{question}</option>;
              })}
            </select>
            <br></br>
            <textarea
              className="placeholder"
              placeholder="enter your answer here"
            ></textarea>
            <br></br>
            {showSubmit()}
          </form>
          <br></br>
          <button className="button" onClick={handleNextQuestion}>
            Next Petal
          </button>
        </div>
        <div id="hue">
          <HuePicker
            height="300px"
            width="18px"
            onChange={handleColorChange}
            direction="vertical"
            pointer="none"
          />
          <div id="flower-wrapper">
          <Flower color={colorPicked}
          /></div>
        </div>
      </Modal>
    </>
  );
}

export default PetalModal;
