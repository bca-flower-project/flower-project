import { useState, useContext, useEffect } from "react";
import { HuePicker } from "react-color";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import fire from "../../config/fire";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import "./Create.scss";
import Flower from "./Flower.js";

const { database, firestore } = fire;

const iOsDevice = () => {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
};

// order should be:
const QUESTIONS = [
  {
    petal: "Peaks",
    questionOptions: [
      "What were your peaks this year?",
      "What have been the peak moments of your life?",
      "What are your biggest accomplishments?",
      "What are your happiest memories?",
    ],
  },
  {
    petal: "Challenges",
    questionOptions: [
      "What were your challenges this year?",
      "What do you struggle with the most?",
      "What are the biggest challenges you've faced?",
      "What have been the hardest times of your life?",
    ],
  },
  {
    petal: "People",
    questionOptions: [
      "Who made an impact on you this year?",
      "Who do you care about the most?",
      "Who are the people that care for you?",
      "Who are the most influential people in your life?",
    ],
  },
  {
    petal: "Principles",
    questionOptions: [
      "What did you learn this year?",
      "What are your principles?",
      "What do you care about most in life?",
      "What are your most deeply held beliefs?",
    ],
  },
  {
    petal: "Powers",
    questionOptions: [
      "How do you feel you've grown this year?",
      "What do you feel you are good at?",
      "What do you love to do?",
      "What are your powers?",
    ],
  },
  {
    petal: "Aspirations",
    questionOptions: [
      "What are your aspirations for the coming year?",
      "What is your intention for the future?",
      "What are your aspirations?",
      "What are your goals?",
    ],
  },
];

const INITIAL_STATE = {
  currentPetal: 0,
  petals: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
};

const Create = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });
  const [showError, setShowError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const history = useHistory();

  const handleiOS = iOsDevice();

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
        setLocation({ latitude, longitude });
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
    ...(Object.values(location).includes(undefined) ? {} : location),
    createdAt: firestore.Timestamp.now(),
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
    ...(Object.values(location).includes(undefined) ? {} : location),
    createdAt: firestore.Timestamp.now(),
  };

  const submitFlower = async () => {
    if (Object.values(userFlower).includes(undefined)) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      const userFlowerCollection = await database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower");

      await userFlowerCollection.add(userFlower);

      const globalFlowerCollection = await database.collection("Global");

      await globalFlowerCollection.add(globalFlower);
      history.push("/past-flowers");
    }
  };

  return (
    <>
      <Container className="Create">
        <Row>
          <Col className="justify-content-center">
            <Container>
              <Row>
                <Col></Col>
                <Col align="center">
                  <Flower
                    currentPetal={state.currentPetal}
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
            <Form.Label>Click to choose petal color</Form.Label>
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
              value={petals[currentPetal].question}
              onChange={(e) => {
                e.preventDefault();
                setPetalValue(currentPetal, "question", e.target.value);
              }}
            >
              <option selected={!petals[currentPetal].question} disabled>
                Please select a question below
              </option>
              {QUESTIONS[currentPetal].questionOptions.map(
                (question, index) => {
                  return (
                    <option
                      key={question}
                      value={question}
                      selected={petals[currentPetal.question] === question}
                    >
                      {question}
                    </option>
                  );
                }
              )}
              {handleiOS && <optgroup></optgroup>}
            </Form.Control>
            <br />
            <Form.Control
              onChange={(e) => {
                e.preventDefault();
                setPetalValue(currentPetal, "answer", e.target.value);
              }}
              value={petals[currentPetal].answer || ""}
              as="textarea"
              rows={3}
              placeholder="Answer here..."
            />
            <br />
            <br />
          </Col>
        </Row>
        {showError && (
          <Row style={{ color: "red", marginBottom: "1rem" }}>
            <Col>
              Please choose a question, answer and color for each petal before
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
