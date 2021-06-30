import { useState, useContext, useEffect } from "react";
import { HuePicker } from "react-color";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import firebase from "firebase";

import fire from "../../config/fire";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import "./Create.scss";
import Flower from "./Flower.js";

const { database } = fire;

// order should be:
const QUESTIONS = [
  {
    petal: "Peaks",
    questionOptions: [
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

const INITIAL_STATE = {
  currentPetal: 0,
  petals: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
};

const Create = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const { currentPetal, petals } = state;

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      const { latitude, longitude } = crd;
      if (latitude && longitude) {
        setLocation({  latitude, longitude });
      }
    }

    function error(err) {
      console.log(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [location]);

  const setPetalValue = (petalIdx, key, value) => {
    setState({
      ...state,
      petals: {
        ...state.petals,
        [petalIdx]: {
          ...state.petals[petalIdx],
          [key]: value,
        },
      },
    });
  };

  const getPetalValueByUnknownIndex = (name, key) => {
    const idx = QUESTIONS.findIndex((q) => {
      return q.petal === name;
    });
    return petals[idx][key];
  };

  const getPetalValues = (name) => {
    return {
      [`${name}Question`]: getPetalValueByUnknownIndex(name, "question"),
      [`${name}Color`]: getPetalValueByUnknownIndex(name, "color"),
      [`${name}`]: getPetalValueByUnknownIndex(name, "answer"),
    };
  };

  const userFlower = {
    ...getPetalValues("Peaks"),
    ...getPetalValues("Aspirations"),
    ...getPetalValues("People"),
    ...getPetalValues("Principles"),
    ...getPetalValues("Powers"),
    ...getPetalValues("Challenges"),
    ...location,
    createdAt: firebase.firestore.Timestamp.now(),
  };

  const {
    PeaksColor,
    AspirationsColor,
    PeopleColor,
    PrinciplesColor,
    PowersColor,
    ChallengesColor,
  } = userFlower;

  const globalFlower = {
    PeaksColor,
    AspirationsColor,
    PeopleColor,
    PrinciplesColor,
    PowersColor,
    ChallengesColor,
    ...location,
    createdAt: firebase.firestore.Timestamp.now(),
  };

  const submitFlower = async () => {
    const userFlowerCollection = await database
      .collection("user")
      .doc(currentUser.uid)
      .collection("flower");

    await userFlowerCollection.add(userFlower);

    const globalFlowerCollection = await database.collection("Global");

    await globalFlowerCollection.add(globalFlower);
    history.push("/past-flowers");
  };

  return (
    <>
      {/*<pre style={{color: 'red'}}>{JSON.stringify(location)}</pre>*/}
      <Container className="Create">
        <Row>
          <Col classname="justify-content-center">
            <Container>
              <Row>
                <Col></Col>
                <Col>
                  <Flower
                    setCurrentPetal={(i) => {
                      setState({ ...state, currentPetal: parseInt(i) });
                    }}
                    petals={petals}
                  />
                </Col>
                <Col></Col>
              </Row>
            </Container>

            <h1>{QUESTIONS[currentPetal].petal}</h1>
            <Form.Label>Click to choose a color</Form.Label>
            <HuePicker
              className="hue"
              height="30px"
              width="100%"
              onChange={({ hex }) => {
                setPetalValue(currentPetal, "color", hex);
              }}
              direction="horizontal"
              pointer="none"
            />
            <br />
            <Form.Control
              as="select"
              onChange={(e) => {
                e.preventDefault();
                setPetalValue(currentPetal, "question", e.target.value);
              }}
            >
              <option
                value={false}
                disabled
                selected={!petals[currentPetal].question}
              >
                Please select a question below
              </option>
              {QUESTIONS[currentPetal].questionOptions.map(
                (question, index) => {
                  return (
                    <option
                      selected={petals[currentPetal].question === question}
                      key={question}
                      value={question}
                    >
                      {question}
                    </option>
                  );
                }
              )}
            </Form.Control>
            <br />
            <Form.Label>Answer:</Form.Label>
            <Form.Control
              onChange={(e) => {
                e.preventDefault();
                setPetalValue(currentPetal, "answer", e.target.value);
              }}
              value={petals[currentPetal].answer || ""}
              as="textarea"
              rows={3}
            />
            <br />

            <br />
          </Col>
        </Row>
        {currentPetal === QUESTIONS.length - 1 &&
          Object.values(userFlower).includes(undefined) && (
            <Row
              style={{ color: "red", marginBottom: "1rem", textAlign: "right" }}
            >
              <Col>
                Please choose a question, answer and color for each step before
                submitting your flower.
              </Col>
            </Row>
          )}
        <Row className="buttonRow">
          <Col>
            <Button
              className="btn-dark"
              onClick={() => {
                setState({ ...state, currentPetal: currentPetal - 1 });
              }}
              disabled={currentPetal === 0}
            >
              &larr; Previous
            </Button>
          </Col>
          <Col className="right-button">
            {currentPetal !== QUESTIONS.length - 1 && (
              <Button
                className="btn-dark"
                onClick={() => {
                  setState({ ...state, currentPetal: currentPetal + 1 });
                }}
                disabled={currentPetal === QUESTIONS.length - 1}
              >
                Next &rarr;
              </Button>
            )}
            {currentPetal === QUESTIONS.length - 1 && (
              <Button
                className="btn-success"
                onClick={() => {
                  submitFlower();
                }}
                disabled={Object.values(userFlower).includes(undefined)}
              >
                Submit Flower
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Create;
