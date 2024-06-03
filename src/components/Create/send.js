import { useState, useContext, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { HueSlider, SaturationSlider, LightnessSlider } from 'react-slider-color-picker'

import fire from "../../config/fire";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import "./Send.scss";
import { AppThemeContext } from "../../contexts/AppThemeContext.js";
import SendFlower from "./SendFlower.js";

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
  fromName: null,
  fromEmail: null,
  fromUid: null,
  toName: null,
  toUid: null,
  firstPetalColor: "#EA12C6",
  secondPetalColor: "#F0BF22",
  prompt: "You can use this flower to express gratitude for your friend, capture shared memories, and wish them well. What have you done together that you want to remember? What have they done that you want to celebrate? How do you feel they’ve grown in the past year?",
  answer: null
};

const Send = (props) => {
  const { theme } = useContext(AppThemeContext);
  const [state, setState] = useState(INITIAL_STATE);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [badRecipient, setBadRecipient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flowerLoaded, setFlowerLoaded] = useState(false);
  const [colorFirstPetal, setColorFirstPetal] = useState({h: 180, s: 100, l: 50, a: 1});
  const [colorSecondPetal, setColorSecondPetal] = useState({h: 180, s: 100, l: 50, a: 1});
  const [viewFriends, setViewFriends] = useState({
    contents: []
  });
  const [oldViewFriends, setOldViewFriends] = useState({
    contents: []
  });
  const [firstRender, setFirstRender] = useState(false);
  const [friendSearch, setFriendSearch] = useState("");
  const [displayViewFriends, setDisplayViewFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const location = useLocation();
  var _selectedFriend;
  if(location.state) {
    _selectedFriend = {};
    _selectedFriend.name = location.state["name"];
    _selectedFriend.uid = location.state["uid"];
  }


  useEffect(() => {
    if(_selectedFriend) {
      setSelectedFriend(_selectedFriend);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function friendsList() {
      const ref = database.collection("user").doc(currentUser.uid).collection("friends");

      await ref.get().then((item) => {
        const items = item.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setViewFriends({
          contents: items
        });

        setOldViewFriends({
          contents: items
        });
      });
    }

    friendsList();
  }, []);

  useEffect(() => {
    if(firstRender) {
      const timeOutId = setTimeout(async () => {
        const friends = oldViewFriends.contents;

        var result = friends.filter(function (el) {
          if(el.name.toLowerCase().includes(friendSearch.toLowerCase())) {
            return el;
          }
        });
        
        setViewFriends({
          contents: result
        });
        if(friendSearch.length > 0) setDisplayViewFriends(true);
      }, 1000);

      return () => {
        setDisplayViewFriends(false);
        clearTimeout(timeOutId)
      };

    } else {
      setFirstRender(true);
    }
  }, [friendSearch]);

  const handleFriendSearch = async (e) => {
    e.preventDefault();
    setFriendSearch(e.target.value);
  };

  const handleFriendSelect = (friend) => {
    setDisplayViewFriends(false);
    setFriendSearch("");
    setSelectedFriend(friend);
  };

  const getTableContent = (obj) => {
    if(obj && (obj.contents.length > 0) && (friendSearch.length > 0)) {
      return (
        obj.contents.map(function (item, i) {
          return (
            <div className="friend-search-container friend-select" onClick={() => handleFriendSelect({uid: item.uid, name: item.name})}>
              <span>{item.name}</span>
            </div>
          )
        })
      );
    } else if (obj && (obj.contents.length == 0) && (friendSearch.length > 0)) {
      return <div className="friend-search-container">
        No Friends Found
      </div>
    }
  };

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);

    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

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

    // setColor({h: h, s: s, l: l, a: 1});
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

  const handleChangeColorFirstPetal  = (newColor) => {
    setColorFirstPetal(newColor);
    setState({
        ...state,
        firstPetalColor: hslToHex(newColor["h"], newColor["s"], newColor["l"])
    })
  };

  const handleChangeColorSecondPetal  = (newColor) => {
    setColorSecondPetal(newColor);
    setState({
        ...state,
        secondPetalColor: hslToHex(newColor["h"], newColor["s"], newColor["l"])
    })
  };

  const handleTextInput = (text) => {
    setState({
        ...state,
        answer: text
    });
  }

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

  const userFlower = {
    // ...(Object.values(location).includes(undefined) ? {} : location),
    rawState: state,
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

  const submitFlower = async () => {
    // if (flowerId) {
    //   const flowerRef = database
    //     .collection("user")
    //     .doc(currentUser.uid)
    //     .collection("flower")
    //     .doc(flowerId);

    //   await flowerRef.update(rmUndefined(userFlower));

    // } else {
        if(!selectedFriend) {
            setBadRecipient(true);
            window.scrollTo(0, 0);
        } else {
          await database
          .collection("user").doc(currentUser.uid).collection("sentFlowers").add({
              ...state,
              fromName: userData.name,
              fromEmail: userData.email,
              fromUid: userData.uid,
              toName: selectedFriend.name,
              toUid: selectedFriend.uid,
              createdAt: firestore.Timestamp.now()
          });
          history.push("/past-flowers");
        }
    // }
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Container className={`Send ${theme}`}
        style={{
          marginBottom: "100px"
        }}
      >
        <Row>
          <Col className="justify-content-center">
            <Container>
              <Row>
                <Col align="center">
                    <div className="email-input-container-parent">
                        <div className="email-input-container">
                            <span>Choose Friend:</span>
                            <input type="text" value={friendSearch} onChange={handleFriendSearch}  class="inp" placeholder="Type your friend's name here" required/>
                        </div>
                        {badRecipient && <p className="set-bad-email-error">Please add a friend to send this flower to.</p> }
                    </div>
                    {displayViewFriends && <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "25px"
                      }}
                    >
                      {getTableContent(viewFriends)}
                    </div>}
                    {selectedFriend && <div
                      style={{
                        color: "green",
                        marginBottom: "25px"
                      }}
                    >
                      {`Sending flower to ${selectedFriend.name}`}
                    </div>}
                    <SendFlower
                        firstPetalColor={state.firstPetalColor}
                        secondPetalColor={state.secondPetalColor}
                    />
                </Col>
              </Row>
            </Container>

            <br/>
            <br/>
            <div className="color-picker-container">
                <div className="first-color-picker">
                    <p><i>Choose 1st Petal Color</i></p>
                    <div className="hue">
                        <HueSlider handleChangeColor={handleChangeColorFirstPetal} color={colorFirstPetal} />
                        <SaturationSlider handleChangeColor={handleChangeColorFirstPetal} color={colorFirstPetal} />
                        <LightnessSlider handleChangeColor={handleChangeColorFirstPetal} color={colorFirstPetal} />
                    </div>
                </div>
                <div className="second-color-picker">
                    <p><i>Choose 2nd Petal Color</i></p>
                    <div className="hue">
                        <HueSlider handleChangeColor={handleChangeColorSecondPetal} color={colorSecondPetal} />
                        <SaturationSlider handleChangeColor={handleChangeColorSecondPetal} color={colorSecondPetal} />
                        <LightnessSlider handleChangeColor={handleChangeColorSecondPetal} color={colorSecondPetal} />
                    </div>
                </div>
            </div>
            <br />
            {<p className="prompt">{INITIAL_STATE.prompt}</p>}
            <br />
            <Form.Control
              style={{
                border: theme === "dark" ? "2px solid white" : "2px solid black",
                backgroundColor: "transparent",
                borderRadius: 0,
                color: theme === "dark" ? "white" : "black"
              }}
              onChange={(e) => {
                e.preventDefault();
                handleTextInput(e.target.value);
              }}
              value={state["answer"] || ""}
              as="textarea"
              rows={10}
              placeholder="Write your message here..."
            />
            <br />
          </Col>
        </Row>
        <div className="send-container">
            {(state["answer"] != null) && (
                <div
                    className="send"
                    onClick={() => {
                        submitFlower();
                    }}
                >
                Send
                </div>
            )}
        </div>
      </Container>
    </>
  );
};

export default Send;
