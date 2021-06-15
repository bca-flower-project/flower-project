import { useState, useEffect, Redirect } from "react";
import Modal from "react-modal";
import { Create } from "react";
import { HuePicker, CirclePicker } from "react-color";
import App from "../App";
import Flower from "./Flower.js";
import "../App.css";
import { database } from "./fire";
import CreateFlower from "./CreateFlower.js";

function PetalModal(props) {
  const questions = [
    {
      petal: "Peaks",
      questionOptions: [
        //array of possible questions
        "Please select a question below",
        "What have been the peak moments of your life?",
        "What are your biggest accomplishments?",
        "What are your happiest memories?",
      ],
    },
    {
      petal: "Aspirations",
      questionOptions: [
        "Please select a question below",
        "What is your intention for the future?",
        "What are your aspirations?",
        "What are your goals?",
      ],
    },
    {
      petal: "People",
      questionOptions: [
        "Please select a question below",
        "Who do you care about the most?",
        "Who are the people that care for you?",
        "Who are the most influential people in your life?",
      ],
    },
    {
      petal: "Principles",
      questionOptions: [
        "Please select a question below",
        "What are your principles?",
        "What do you care about most in life?",
        "What are your most deeply held beliefs?",
      ],
    },
    {
      petal: "Powers",
      questionOptions: [
        "Please select a question below",
        "What do you feel you are good at?",
        "What do you love to do?",
        "What are your powers?",
      ],
    },
    {
      petal: "Challenges",
      questionOptions: [
        "Please select a question below",
        "What do you struggle with the most?",
        "What are the biggest challenges you've faced?",
        "What have been the hardest times of your life?",
      ],
    },
  ];

  const [chosen, setChosen] = useState(0); // what is chosen state
  const [selected, setSelected] = useState(0); // what is selected state
  //const [question, setQuestion] = useState(""); //which petal they select determines which questions show
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [chosenColor, setChosenColor] = useState([]);
  //state for the answers to each question
  const [userInput, setUserInput] = useState("");
  const [peaks, setPeaks] = useState("");
  const [aspirations, setAspirations] = useState("");
  const [people, setPeople] = useState("");
  const [principles, setPrinciples] = useState("");
  const [powers, setPowers] = useState("");
  const [challenges, setChallenges] = useState("");
  const [saveChange, setSaveChange] = useState();
  //state for the questions for each petal
  const [peaksQuestion, setPeaksQuestion] = useState("");
  const [aspirationsQuestion, setAspirationsQuestion] = useState("");
  const [peopleQuestion, setPeopleQuestion] = useState("");
  const [principlesQuestion, setPrinciplesQuestion] = useState("");
  const [powersQuestion, setPowersQuestion] = useState("");
  const [challengesQuestion, setChallengesQuestion] = useState("");
  //state color for petals
  const [peaksPetal, setPeaksPetal] = useState("white");
  const [aspirationsPetal, setAspirationsPetal] = useState("white");
  const [peoplePetal, setPeoplePetal] = useState("white");
  const [principlesPetal, setPrinciplesPetal] = useState("white");
  const [powersPetal, setPowersPetal] = useState("white");
  const [challengesPetal, setChallengesPetal] = useState("white");
  const [selectedQuestion, setSelectedQuestion] = useState([]);

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

  function handleNextQuestion(evt) {
    // let petalArray = petal
    setSaveChange(evt.target.value);
    setSelected(evt.target.value);

    let nextQuestion = chosen + 1;
    //if the question # is bigger than the length of the array, it stops bc petals are complete
    if (nextQuestion < questions.length) {
      setChosen(nextQuestion);
    } else {
      setModalIsOpen(false);
    }

    let questArr = selectedQuestion;

    questArr.push(selected);
    setSelectedQuestion(questArr);
  }

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  function handleChange(evt) {
    let target = evt.target;
    setSelected(target.value);
  }

  // when submitted... update chosen state with currently selected
  function submitForm(evt) {
    evt.preventDefault();
    setChosen(0);
    addFlower(userFlower);
    addGlobalFlower(userFlower);
    setModalIsOpen(false);
  }
  const flowerQuestion = questions.map((questionOptions, index) => {
    return { selectedQuestion };
  });

  // when option is selected save it in selected state
  function handleChange(evt) {
    let target = evt.target;

    setSelected(target.value);

    if (chosen === 0) {
      setPeaksQuestion(target.value);
    } else if (chosen === 1) {
      setAspirationsQuestion(target.value);
    } else if (chosen === 2) {
      setPeopleQuestion(target.value);
    } else if (chosen === 3) {
      setPrinciplesQuestion(target.value);
    } else if (chosen === 4) {
      setPowersQuestion(target.value);
    } else if (chosen === 5) {
      setChallengesQuestion(target.value);
    }
  }

  function handleUserInput(evt) {
    if (chosen === 0) {
      return (
        <textarea
          onChange={(evt) => setPeaks(evt.target.value)}
          value={peaks}
        />
      );
    } else if (chosen === 1) {
      return (
        <textarea
          onChange={(evt) => setAspirations(evt.target.value)}
          value={aspirations}
        />
      );
    } else if (chosen === 2) {
      return (
        <textarea
          onChange={(evt) => setPeople(evt.target.value)}
          value={people}
        />
      );
    } else if (chosen === 3) {
      return (
        <textarea
          onChange={(evt) => setPrinciples(evt.target.value)}
          value={principles}
        />
      );
    } else if (chosen === 4) {
      return (
        <textarea
          onChange={(evt) => setPowers(evt.target.value)}
          value={powers}
        />
      );
    } else if (chosen === 5) {
      return (
        <textarea
          onChange={(evt) => setChallenges(evt.target.value)}
          value={challenges}
        />
      );
    }
  }

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

  const handleColorChange = (color) => {
    if (chosen === 0) {
      setPeaksPetal(color.hex);
    } else if (chosen === 1) {
      setAspirationsPetal(color.hex);
    } else if (chosen === 2) {
      setPeoplePetal(color.hex);
    } else if (chosen === 3) {
      setPrinciplesPetal(color.hex);
    } else if (chosen === 4) {
      setPowersPetal(color.hex);
    } else if (chosen === 5) {
      setChallengesPetal(color.hex);
    }
  };

  //setting state to move through past flowers
  const [chosenPastFlower, setChosenPastFlower] = useState(0);
  function handlePastFlower() {
    let nextPastFlower = chosenPastFlower + 1;
    if (nextPastFlower < userFlower.length) {
      setChosenPastFlower(nextPastFlower);
    }
  }

  let userFlower = {
    PeakQuestion: peaksQuestion,
    AspirationQuestion: aspirationsQuestion,
    PeopleQuestion: peopleQuestion,
    PrincipleQuestion: principlesQuestion,
    PowerQuestion: powersQuestion,
    ChallengesQuestion: challengesQuestion,
    PeaksColor: peaksPetal,
    AspirationsColor: aspirationsPetal,
    PeopleColor: peoplePetal,
    PrinciplesColor: principlesPetal,
    PowerColor: powersPetal,
    ChallengesColor: challengesPetal,
    Peaks: peaks,
    Aspirations: aspirations,
    People: people,
    Principles: principles,
    Powers: powers,
    Challenges: challenges,
  };

  async function addFlower(data) {
    let collection = await database
      .collection("user")
      .doc(props.user.uid)
      .collection("flower");

    return await collection.add(data);
  }

  async function addGlobalFlower(data) {
    let collection = await database.collection("Global");

    return await collection.add(data);
  }

  return (
    <div>
      <div className="createflowerwrapper">
        <a onClick={setModalIsOpenToTrue} color="black" textDecoration="none">
          <CreateFlower width="45vw" height="auto" />
        </a>
      </div>
      <Modal
        id="modalWindow"
        isOpen={modalIsOpen}
        style={{
          content: {
            background: props.theme.body,
            width: "70vw",
            height: "70vh",
            left: "14vw",
            right: "14vw",
            top: "17vh",
          },
        }}
      >
        <button className="button" onClick={setModalIsOpenToFalse}>
          x
        </button>
        <div id="modalwindow">
          <div className="question-text">
            <h1>{`${questions[chosen].petal}`}</h1>

            <form onSubmit={submitForm}>
              <select
                className="button"
                name="question-selection"
                value={selected}
                onChange={handleChange}
              >
                {questions[chosen].questionOptions.map((question, index) => {
                  return <option value={question}>{question}</option>;
                })}
              </select>
              <br></br>
              {handleUserInput()}
              <br></br>
              {showSubmit()}
            </form>
            <br></br>
            <button
              type="submit"
              className="button"
              onClick={handleNextQuestion}
            >
              Next Petal
            </button>
            <HuePicker
              id={`hue-${chosen}`}
              className="hue"
              height="18px"
              width="300px"
              onChange={handleColorChange}
              direction="horizontal"
              pointer="none"
            />
          </div>
          <div id="flower">
            <Flower
              colorOne={peaksPetal}
              colorTwo={aspirationsPetal}
              colorThree={peoplePetal}
              colorFour={principlesPetal}
              colorFive={powersPetal}
              colorSix={challengesPetal}
              height="50vh"
              width="auto"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PetalModal;
