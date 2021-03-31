import { useState, useEffect } from "react";

function Modal(props) {
  const [chosen, setChosen] = useState(null); // what is chosen state
  const [selected, setSelected] = useState(""); // what is selected state
  const [question, setQuestion] = useState(""); //which petal they select determines which questions show

  //fetch 
  //fetch a route on backend, backend is going to hit your api endpoint, that will send back your questionsjson, save your response to state, console.log state 
  const [petal, setPetal] = useState([]);
  //use state for questions for each petal 
  useEffect(() => {
    if (petal.id === "") {
      fetch(`/api`)
        .then((res) => res.json())
        .then((questionsList) => {
          setPetal(questionsList);
        });
    }
  });
//do we need to make it questions.length or id 
  
  return (
    <div
      style={{
        height: "200px",
        width: "200px",
        border: "1px solid black",
        backgroundColor: "pink",
        position: "absolute",
        zIndex: 600,
      }}
    >
      Choose your prompt
      <ul></ul>

      <div>
        {/* <h4>{chosen ? `You guessed ${chosen}` : "Guess a County"}</h4> update header with selected county */}
        {/* {chosen && <h4>{props.fetched.county === chosen ? win() : wrong()}</h4>} */}
        <form onSubmit={submitForm}> 
          <select
            name="question-selection"
            value={selected}
            onChange={handleChange}
          >
            <option value="Question 1">{petal.questionOne}</option>
            <option value="Question 2">{petal.questionTwo}</option>
            <option value="Question 3">{petal.questionThree}</option>
            
          </select>
          
          <textarea placeholder="enter answer here"></textarea>
          <input type="submit" />
        </form>
      </div>
      {/* <button
        onClick={(evt) => {
          props.display(false); // Cancel button
        }}
      >
        Cancel
      </button> */}
    </div>
  );
}

export default Modal;