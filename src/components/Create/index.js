import { useState, useContext } from "react";
import Modal from "react-modal";
import { HuePicker } from "react-color";
import { AuthContext } from "../../contexts/AuthContext";

import fire from "../../config/fire";
import CreateFlower from "./CreateFlower.js";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./Create.scss";
import Flower from "./Flower.js";

const { database } = fire;

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

const INITIAL_STATE = {
  modalOpen: false,
  currentPetal: 0,
  petals: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
};

const Create = (props) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { currentUser } = useContext(AuthContext);

  const { modalOpen, currentPetal, petals } = state;

  const toggleModal = () => {
    setState({ ...INITIAL_STATE, modalOpen: !modalOpen });
  };

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
  };

  const submitFlower = async () => {
    const userFlowerCollection = await database
      .collection("user")
      .doc(currentUser.uid)
      .collection("flower");

    await userFlowerCollection.add(userFlower);

    const globalFlowerCollection = await database.collection("Global");

    await globalFlowerCollection.add(userFlower);
    toggleModal();
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <CreateFlower onClick={toggleModal} width="45vw" height="auto" />
        </Row>
      </Container>

      <Modal
        id="modalWindow"
        isOpen={modalOpen}
        style={{
          content: {
            width: "70vw",
            height: "70vh",
            left: "14vw",
            right: "14vw",
            top: "17vh",
          },
        }}
      >
        <span className="closeModal" onClick={toggleModal}>
          ✖
        </span>
        <Container style={{ marginTop: "1rem" }}>
          <Row>
            <Col className="text-dark">
              <h1>{QUESTIONS[currentPetal].petal}</h1>
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
              <Button
                className="btn-dark"
                onClick={() => {
                  setState({ ...state, currentPetal: currentPetal - 1 });
                }}
                disabled={currentPetal === 0}
              >
                &larr; Previous
              </Button>
              <Button
                className="btn-dark"
                onClick={() => {
                  setState({ ...state, currentPetal: currentPetal + 1 });
                }}
                disabled={currentPetal === QUESTIONS.length - 1}
              >
                Next &rarr;
              </Button>
              <Button
                className="btn-success"
                onClick={() => {
                  submitFlower();
                }}
                disabled={Object.values(userFlower).includes(undefined)}
              >
                Submit Flower
              </Button>
            </Col>
            <Col>
              <Flower
                setCurrentPetal={(i) => {
                  setState({ ...state, currentPetal: parseInt(i) });
                }}
                petals={petals}
                height="50vh"
                width="auto"
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
};

export default Create;
