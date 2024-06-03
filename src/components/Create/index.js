import { useState, useContext, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-slider-color-picker'

import fire from "../../config/fire";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import "./Create.scss";
import Flower from "./Flower.js";
import { AppThemeContext } from "../../contexts/AppThemeContext.js";

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


const INITIAL_STATE = {
  currentPetal: 0,
  petals: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {} },
};

const Create = (props) => {
  const { theme } = useContext(AppThemeContext);
  const [state, setState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [flowerLoaded, setFlowerLoaded] = useState(false);
  const [color, setColor] = useState({h: 180, s: 100, l: 50, a: 1});
  const location = useLocation();
  var firstFlowerIntroduction = null;
  if(location.state) {
    firstFlowerIntroduction = location.state["firstFlowerIntroduction"];
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const arr = firstFlowerIntroduction ? [
      "What have been the peak moments of your life?",
      "What have been the greatest challenges of your life?",
      "Who has influenced you and how?",
      "What do you care about most and why?",
      "What are your greatest strengths, skills, and joys?",
      "What are your dreams and aspirations?"
    ] : [
      "What were your peak experiences and accomplishments of the past year?",
      "What were your biggest challenges of the past year?",
      "What relationships have been most important to you this year and why?",
      "What did you learn this year about yourself, others, and the world?",
      "How have you grown in the past year?",
      "How do you want to grow this year?"
    ];
    var dupe = {...state};
    for (let [index, val] of arr.entries()) {
      dupe = {
        ...dupe,
        petals: {
          ...dupe.petals,
          [index]: {
            ...dupe.petals[index],
            ["question"]: val,
          },
        },
      }
    }
    setState({...dupe});
  }, []);

  // order should be:
  const QUESTIONS = [
    {
      petal: "Peaks",
      questionOptions: firstFlowerIntroduction ? [
       "What have been the peak moments of your life?"
      ] : [
        "What were your peak experiences and accomplishments of the past year?"
      ],
    },
    {
      petal: "Challenges",
      questionOptions: firstFlowerIntroduction ? [
        "What have been the greatest challenges of your life?"
      ] : [
        "What were your biggest challenges of the past year?"
      ],
    },
    {
      petal: "People",
      questionOptions: firstFlowerIntroduction ? [
        "Who has influenced you and how?"
       ] : [
        "What relationships have been most important to you this year and why?"
      ],
    },
    {
      petal: "Principles",
      questionOptions: firstFlowerIntroduction ? [
        "What do you care about most and why?"
       ] : [
        "What did you learn this year about yourself, others, and the world?"
      ],
    },
    {
      petal: "Powers",
      questionOptions: firstFlowerIntroduction ? [
        "What are your greatest strengths, skills, and joys?"
       ] : [
        "How have you grown in the past year?"
      ],
    },
    {
      petal: "Aspirations",
      questionOptions: firstFlowerIntroduction ? [
        "What are your dreams and aspirations?"
       ] : [
        "How do you want to grow this year?"
      ],
    },
  ];

  function hexToHsl(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    setColor({h: h, s: s, l: l, a: 1});
  }

  function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  const handleChangeColor  = (newColor) => {
    setColor(newColor);
    setPetalValue(currentPetal, "color", hslToHex(newColor["h"], newColor["s"], newColor["l"]));
  };

  // const [location, setLocation] = useState({
  //   latitude: undefined,
  //   longitude: undefined,
  // });

  const { currentUser } = useContext(AuthContext);

  const history = useHistory();

  const { flowerId } = useParams();

  useEffect(() => {
    async function loadFlower() {
      if (!flowerId) {
        return null;
      }

      const ref = database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower")
        .doc(flowerId);

      setLoading(true);

      await ref.get().then((item) => {
        const { rawState, createdAt } = item.data();
        if (rawState?.petals) {
          setState(current => ({ ...current, createdAt, petals: rawState.petals }));
        }
        setLoading(false);
        setFlowerLoaded(true);
      });
    }
    loadFlower();
  }, [flowerId, currentUser.uid]);

  const handleiOS = iOsDevice();

  const { currentPetal, petals } = state;

  useEffect(() => {
    if(petals[currentPetal].color) {
      hexToHsl(petals[currentPetal].color);
    } else {
      setColor({h: 180, s: 100, l: 50, a: 1});
    }
  }, [flowerLoaded, currentPetal]);

  // useEffect(() => {
  //   const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   };

  //   function success(pos) {
  //     const crd = pos.coords;
  //     const { latitude, longitude } = crd;
  //     if (latitude && longitude) {
  //       setLocation({ latitude, longitude });
  //     }
  //   }

  //   function error(err) {
  //     console.log(`ERROR(${err.code}): ${err.message}`);
  //   }

  //   navigator.geolocation.getCurrentPosition(success, error, options);
  // }, [location]);

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
    // ...(Object.values(location).includes(undefined) ? {} : location),
    rawState: state,
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
    // ...(Object.values(location).includes(undefined) ? {} : location),
    createdAt: firestore.Timestamp.now(),
  };

  const rmUndefined = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      if (obj[key] !== undefined) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  };

  const isValid = !Object.values(userFlower).includes(undefined);

  const submitFlower = async () => {
    if (flowerId) {
      const flowerRef = database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower")
        .doc(flowerId);

      await flowerRef.update(rmUndefined(userFlower));

    } else {

      const userFlowerCollection = await database
        .collection("user")
        .doc(currentUser.uid)
        .collection("flower");

      await userFlowerCollection.add(rmUndefined(userFlower));
    }

    if (isValid) {
      const globalFlowerCollection = await database.collection("Global");
      await globalFlowerCollection.add(globalFlower);
    }

    if(firstFlowerIntroduction) {
      history.push("/");
    } else {
      history.push("/past-flowers");
    }
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Container className={`Create ${theme}`}
        style={{
          marginBottom: "100px"
        }}
      >
        <Row>
          <Col className="justify-content-center">
            <Container>
              <Row>
                <Col align="center">
                  <Flower
                    currentPetal={state.currentPetal}
                    setCurrentPetal={(i) => {
                      setState({ ...state, currentPetal: parseInt(i) });
                    }}
                    petals={petals}
                  />
                </Col>
              </Row>
            </Container>

            <h1>{QUESTIONS[currentPetal].petal}</h1>
            <Form.Label>Pick A Color For Your Petal</Form.Label>
            <br/>
            <br/>
            <div className="hue">
              <HueSlider handleChangeColor={handleChangeColor} color={color} />
              <SaturationSlider handleChangeColor={handleChangeColor} color={color} />
              <LightnessSlider handleChangeColor={handleChangeColor} color={color} />
            </div>
            <br />
            <p>{QUESTIONS[currentPetal].questionOptions[0]}</p>
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
                {isValid ? "Submit Flower" : "Save Draft"}
              </Button>
            )}
            {currentPetal === QUESTIONS.length - 1 && !isValid && (
              <Row style={{ color: "red", marginBottom: "1rem" }}>
                <Col>Note: You have not filled out all the petals yet.</Col>
              </Row>
            )}
            {currentPetal !== QUESTIONS.length - 1 && (
              <Row>
                <Col>
                  <span
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      submitFlower();
                    }}
                  >
                    Save {isValid ? "Changes" : "Draft"}
                  </span>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Create;
