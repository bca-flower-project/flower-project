import { useState, useEffect } from "react";
import Modal from 'react-modal';
//import Create from './Create';

function PetalModal(props) {
  const questions = [
    {
      petal: "Peaks",
      questionOptions: [
        //array of possible questions
         "What have been the peak moments of your life?",
         "What are your biggest accomplishments?",
         "What are your happiest memories?" 
      ],
    },
    {
      petal: "Pspirations",
      questionOptions: [
        "What is your intention for the future?",
        "What are your aspirations?",
        "What are your goals?"
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
        "What are your most deeply held beliefs?"
      ],
    },
    {
      petal: "Powers",
      questionOptions: [
        "What do you feel you are good at?",
        "What do you love to do?",
        "What are your powers?"
      ],
    },
    {
      petal: "Challenges",
      questionOptions: [
        "What do you struggle with the most?",
        "What are the biggest challenges you've faced?",
        "What have been the hardest times of your life?"
      ],
    },
    
  ];
  const [chosen, setChosen] = useState(0); // what is chosen state
  const [selected, setSelected] = useState(""); // what is selected state
  //const [question, setQuestion] = useState(""); //which petal they select determines which questions show
  const [modalIsOpen, setModalIsOpen] = useState(false)

function handleNextPetal() {
    
    let nextPetal = chosen + 1;
    //if the question # is bigger than the length of the array, it stops bc petals are complete
    if (nextPetal < questions.length) {
      setChosen(nextPetal);
    } else {
      setModalIsOpen(false)
    }
  }

  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
  }
  const setModalIsOpenToFalse=()=>{
    setModalIsOpen(false)
  }
  console.log(questions[1])

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


  //fetch 
  //fetch a route on backend, backend is going to hit your api endpoint, that will send back your questionsjson, save your response to state, console.log state 
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
//do we need to make it questions.length or id 
  
  return (
    <>
      <button onClick={setModalIsOpenToTrue}>Click to Open Modal</button>

      
      <Modal isOpen={modalIsOpen}>  
          <button onClick={setModalIsOpenToFalse}>x</button>
          <div className="question-text">
          <h1>{`Select a reflection question for ${questions[chosen].petal}`}</h1>
          <form onSubmit={submitForm}>
            <select
            name="question-selection"
            value={selected}
            onChange={handleChange}
            >
              {questions[chosen].questionOptions.map((question, index) => {
                return (
                  <option value={`Question ${index}`}>{question}</option>
                )
              })
            }
            </select><br></br>
            <textarea placeholder="enter your answer here"></textarea><br></br>
            <input type="submit"/>
          </form><br></br>
          <button onClick={handleNextPetal}>Next Petal</button>

             
          </div>
            {/* text area */}



          
      </Modal>
    
    </>
  );
}


export default PetalModal;