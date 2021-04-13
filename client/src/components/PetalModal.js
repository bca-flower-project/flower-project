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
  const [selected, setSelected] = useState(0); // what is selected state
  //const [question, setQuestion] = useState(""); //which petal they select determines which questions show
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const [chosenColor, setChosenColor] = useState([]);
  //state to save userInput for each input of the petals
  const [userInput, setUserInput] = useState("");
  const [peaks, setPeaks] = useState("");
  const [aspirations, setAspirations] = useState("");
  const [people, setPeople] = useState("");
  const [principles, setPrinciples] = useState("");
  const [powers, setPowers] = useState("");
  const [challenges, setChallenges] = useState("");
  const [saveChange, setSaveChange] = useState();
  //state color for petals
  const [peaksPetal, setPeaksPetal] = useState("yellow");
  const [aspirationsPetal, setAspirationsPetal] = useState("yellow");
  const [peoplePetal, setPeoplePetal] = useState("yellow");
  const [principlesPetal, setPrinciplesPetal] = useState("yellow");
  const [powersPetal, setPowersPetal] = useState("yellow");
  const [challengesPetal, setChallengesPetal] = useState("yellow");
  // const [selectedQuestion, setSelectedQuestion] = useState(0);

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
    setModalIsOpen(false);
  }

  // function changeAndQuestion(){
  // // when option is selected save it in selected state
  //     function handleChange(evt) {
  //       let target = evt.target;
  //       setSelected(target.value);
  //       console.log(selected.stringify())
  //     } 
  //     function questionSelected (evt) {
  //       //onClick map over the array of questionOptions for the chosen petal and take the one clicked one and puts it in new array [selected]
  //     }
  // }
  
 

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
          onChange={(evt) => setAspirations(evt.target.value)}
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
          onChange={(evt) => setChallenges(evt.target.value)}
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

  //const [colorPicked, setColorPicked] = useState("");

  // const handleColor = (evt) => {
  // //   // setColorPicked({fill: color.hex})
  //  setColorPicked(evt.target.value);
  // //   // setPeaksPetal(evt.target.value);
  // // }; principles powers challengesks
  // };

  //create custom colorpicker component

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
    PeakQuestion: questions[chosen].questionOptions[selected],
    AspirationsQuestion: questions[chosen].selected,
    PeopleQuestion: questions[chosen].selected,
    PrincipleQuestion: questions[chosen].selected,
    PowerQuestion: questions[chosen].selected,
    ChallengesQuestion: questions[chosen.selected],
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
  // console.log([data]);
  console.log(userFlower);
  console.log(props.user);
  console.log(questions[chosen].questionOptions[selected])
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
      {/* <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button> */}
      <a onClick={setModalIsOpenToTrue} color="black" textDecoration="none">
        <CreateFlower width="45vw" height="auto" />
        {/* <button onClick={setModalIsOpenToTrue}>Create</button> </CreateFlower> */}
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
            {/* <form onSubmit={evt => {submitForm(evt)}}> */}
            <form onSubmit={submitForm}>
              <select
                className="button"
                name="question-selection"
                value={selected}
                onChange={handleChange}
              >
                {questions[chosen].questionOptions.map((question, index) => {
                  return (
                    <div id="dropdown">
                    <option value={`Question ${0}`}>{question}</option>
                    <option value={`Question ${1}`}>{question}</option>
                    <option value={`Question ${2}`}>{question}</option>
                    </div>
                  );
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

            {/* 
            {questions[chosen].colorOptions.map((color, index) => {
              return <option value={`Color ${index}`}>{color.hex}</option>;
            })} */}
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
