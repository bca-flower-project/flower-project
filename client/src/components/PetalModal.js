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
        "What have been the peak moments of your life?",
        "What are your biggest accomplishments?",
        "What are your happiest memories?",
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
      petal: "Aspirations",
      questionOptions: [
        "What is your intention for the future?",
        "What are your aspirations?",
        "What are your goals?",
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
  const [peaksPetal, setPeaksPetal] = useState("yellow");
  const [aspirationsPetal, setAspirationsPetal] = useState("yellow");
  const [peoplePetal, setPeoplePetal] = useState("yellow");
  const [principlesPetal, setPrinciplesPetal] = useState("yellow");
  const [powersPetal, setPowersPetal] = useState("yellow");
  const [challengesPetal, setChallengesPetal] = useState("yellow");
  const [selectedQuestion, setSelectedQuestion] = useState([]);

  function handleNextQuestion(evt) {
    // let petalArray = petal
    setSaveChange(evt.target.value);
    setSelected(evt.target.value)
    // console.log(questions[chosen].questionOptions[selectedQuestion])


    let nextQuestion = chosen + 1;
    //if the question # is bigger than the length of the array, it stops bc petals are complete
    if (nextQuestion < questions.length) {
      setChosen(nextQuestion);
    } else {
      setModalIsOpen(false);
    }

    let questArr = selectedQuestion;

    questArr.push(selected);
    console.log(questArr);
    setSelectedQuestion(questArr);

  }

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  console.log(questions[chosen]);

  
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
    // addFlowerQuestions(selectedQuestion);
    console.log(selectedQuestion);
    setModalIsOpen(false);

    // let flowerQuestion = questions.map((questionOptions, index) => {
    //   return { selectedQuestion };
    // });
  }
  const flowerQuestion = questions.map((questionOptions, index) => {
    return { selectedQuestion };
  });

  // when option is selected save it in selected state
  function handleChange(evt) {
    let target = evt.target;
    console.log(target.value);
    console.log(selected);
    setSelected(target.value);

  if (chosen === 0) 
  {setPeaksQuestion(target.value)}
  else if (chosen === 1) 
  {setChallengesQuestion (target.value)}
  else if (chosen === 2)
  {setPeopleQuestion (target.value)
  }
  else if(chosen === 3)
  {setPrinciplesQuestion (target.value)}
  else if (chosen === 4)
  {setPowersQuestion (target.value)}
  else if (chosen === 5) 
  {setAspirationsQuestion (target.value)}

 }



  function handleUserInput(evt) {
    console.log(chosen);
    console.log(userInput);
    if (chosen === 0) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setPeaks(evt.target.value)}
          value={peaks}
        />
      );
    } else if (chosen === 1) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setChallenges(evt.target.value)}
          value={aspirations}
        />
      );
    } else if (chosen === 2) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setPeople(evt.target.value)}
          value={people}
        />
      );
    } else if (chosen === 3) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setPrinciples(evt.target.value)}
          value={principles}
        />
      );
    } else if (chosen === 4) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setPowers(evt.target.value)}
          value={powers}
        />
      );
    } else if (chosen === 5) {
      return (
        <textarea
          placeholder="Enter your response here"
          onChange={(evt) => setAspirations(evt.target.value)}
          value={challenges}
        />
      );
    }
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

  const handleColorChange = (color) => {
    if (chosen === 0) {
      setPeaksPetal(color.hex);
    } else if (chosen === 1) {
      setChallengesPetal(color.hex);
    } else if (chosen === 2) {
      setPeoplePetal(color.hex);
    } else if (chosen === 3) {
      setPrinciplesPetal(color.hex);
    } else if (chosen === 4) {
      setPowersPetal(color.hex);
    } else if (chosen === 5) {
      setAspirationsPetal(color.hex);
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
    ChallengesQuestion: challengesQuestion,
    PeopleQuestion: peopleQuestion,
    PrincipleQuestion: principlesQuestion,
    PowersQuestion: powersQuestion,
    AspirationsQuestion: aspirationsQuestion,
    PeaksColor: peaksPetal,
    ChallengesColor: challengesPetal,
    PeopleColor: peoplePetal,
    PrinciplesColor: principlesPetal,
    PowerColor: powersPetal,
    AspirationsColor: aspirationsPetal,
    Peaks: peaks,
    Challenges: challenges,
    People: people,
    Principles: principles,
    Powers: powers,
    Aspirations: aspirations,
  };
  // console.log([data]);
  console.log(userFlower);
  console.log(props.user);
  
  async function addFlower(data) {
    let collection = await database
      .collection("user")
      .doc(props.user.uid)
      .collection("flower");
    // .doc("Previous Flower")
    // .set(data)
    console.log(data);
    return await collection.add(data);
  }

  async function addGlobalFlower(data) {
    let collection = await database.collection("Global");
    // .doc("globeflowers")
    // .set(data)

    return await collection.add(data);
  }

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
  // console.log(questions[chosen].questionOptions[selectedQuestion])
  return (
    <div>
      <a onClick={setModalIsOpenToTrue} color="black" textDecoration="none">
        <CreateFlower width="45vw" height="auto" />
      </a>
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
            // overflow: "hidden",
          },
        }}
      >
        <button className="button" onClick={setModalIsOpenToFalse}>
          x
        </button>
        <div id="modalwindow">
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
                  return <option value={question}>{question}</option>;
                  // return (
                  //   <div id="dropdown">
                  //   <option value={`Question ${0}`}>{question}</option>
                  //   <option value={`Question ${1}`}>{question}</option>
                  //   <option value={`Question ${2}`}>{question}</option>
                  //   </div>
                  // );
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
              height="40vh"
              width="auto"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PetalModal;
