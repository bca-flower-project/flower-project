import { useState, useContext, useEffect } from "react";
import { AppThemeContext } from "../../contexts/AppThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import fire from "../../config/fire";
import { Container, Col, Form, Button, Spinner } from "react-bootstrap";
import "./RestOfNewUx.scss";
import blackGlobe from "../icons/black-globe.png";
import whiteGlobe from "../icons/whiteGlobe.png";
import blackSpiral from "../icons/spiral.png";
import whiteSpiral from "../icons/whiteSpiral.png";
import birthdayFlower from "../icons/birthdayFlower.svg";

const { database } = fire;

export default function RestOfNewUx() {
  const { theme } = useContext(AppThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfBirthSubmitted, setDateOfBirthSubmitted] = useState(false);
  const [goToLocationPage, setGoToLocationPage] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [friendsEmail, setFriendsEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);

    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  const addFriend = async (email) => {
    var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if(email.match(mailformat) && (userData.email != email)) {
      await database.collection("friendRequest").add({
        sender: currentUser.uid,
        senderName: userData.name,
        recipient: email,
        status: 'Pending'
      });
      
      setBadEmail(false);
      setFriendsEmail("");
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      setBadEmail(true);
    }
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    userData.dateOfBirth = `${userData.yearOfBirth}-${userData.monthOfBirth}-${userData.dayOfBirth}`
    await database.collection("user").doc(currentUser.uid).update(userData);

    setDateOfBirthSubmitted(true);
  };

  const handleFinishNewUX = async (e) => {
    e.preventDefault();
    await database.collection("user").doc(currentUser.uid).update({
      ...userData,
      completedNewUserExperience: true
    });

    window.location.reload();
  }

  const handleEmailInput = async (e) => {
    e.preventDefault();
    setFriendsEmail(e.target.value);
  };

  const images = {
    dark: { spiralLogo: whiteSpiral, globeLogo: whiteGlobe },
    light: { spiralLogo: blackSpiral, globeLogo: blackGlobe },
  };

  const { spiralLogo, globeLogo } = images[theme];

  if(userData) {
    if(!dateOfBirthSubmitted && !userData.dateOfBirth) {
      return (
        <Container fluid className={`RestOfNewUx ${theme}`}
          style={{
            marginBottom: "100px"
          }}
        >
          <Col align="center">
            <p className="set-birthday-description">
                Each year, create a Flower to see how you’ve grown and to consider how you want to grow in the coming year.
            </p>
            <Form className="birthday-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "50px"
                }}
            >
                <Form.Row>
                    <Col xs="auto">
                        <Form.Label inline htmlFor="dateOfBirth">
                            Date of Birth
                        </Form.Label>
                        <Form.Control
                            value={userData.dateOfBirth}
                            onChange={(e) => {
                                e.preventDefault();
                                const [yearOfBirth, monthOfBirth, dayOfBirth] = e.target.value.split(/[^\d]/);
                                if((parseInt(yearOfBirth) >= 1900) && (parseInt(monthOfBirth) > 0) && (parseInt(dayOfBirth) > 0)) {
                                  setDateOfBirth(e.target.value);
                                  setUserData({
                                    ...userData,
                                    yearOfBirth,
                                    monthOfBirth,
                                    dayOfBirth
                                  });
                                }
                            }}
                            type="date"
                            className="mb-2"
                            id="dateOfBirth"
                        />
                        <Button
                            className="btn-dark"
                            onClick={handleSubmit}
                            disabled={dateOfBirth == null}
                            >
                            Next &rarr;
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
            <img className="set-birthday-logo" src={spiralLogo} alt="oK Spiral" />
          </Col>
        </Container>
      );
    } else {
      if(!goToLocationPage) {
        return (
          <Container fluid className={`RestOfNewUx ${theme}`}
            style={{
              marginBottom: "100px"
            }}
          >
            <Col align="center">
              <p className="set-add-friend-description">
                Invite two of the people you care about most to tell their own stories. Get reminders on their birthdays to reflect on your relationship.
              </p>
              <div className="email-input-container-parent">
                <div className="email-input-container">
                  <span>Email:</span>
                  <input type="email" value={friendsEmail} onChange={handleEmailInput} class="inp" placeholder="Enter your friends email" required/>
                </div>
                <div className="invite-btn-container" onClick={() => addFriend(friendsEmail)}>
                  <span>Invite</span>
                  <span>&#x229E;</span>
                </div>
              </div>
              {badEmail && <p className="set-bad-email-error">Please enter a valid email address</p> }
              {showSuccess && <p className="set-show-success">Friend Request sent successfully</p> }
              <div className="birthday-logo-container">
                <Button
                    className="btn-dark"
                    onClick={() => setGoToLocationPage(true)}
                    disabled={false}
                    >
                    Next &rarr;
                </Button>
                <img className="set-add-friend-logo" src={birthdayFlower} alt="oK Spiral" />
              </div>
            </Col>
          </Container>
        );
      } else {
        return (
          <Container fluid className={`RestOfNewUx ${theme}`}
            style={{
              marginBottom: "100px"
            }}
          >
          <Col align="center">
            <p className="set-location-description">
            oK meets in person to reflect, deepen our connections, and meet new people. Add your location below so we can invite you to our in person events. None of your information will be visible online.
            </p>
            <Form className="location-container"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "50px"
                }}
            >
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label inline htmlFor="dateOfBirth">
                    Zip code
                  </Form.Label>
                  <Form.Control
                    value={userData.zipcode}
                    onChange={(e) => {
                      e.preventDefault();
                      setUserData({
                        ...userData,
                        zipcode: e.target.value,
                      });
                    }}
                    type="text"
                    className="mb-2"
                    id="zipcode"
                    maxLength="5"
                  />

                  <Button type="submit" onClick={handleFinishNewUX} className="btn-dark">
                  Next &rarr;
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <img className="set-location-logo" src={globeLogo} alt="oK Glboe" />
          </Col>
        </Container>
        )
      }
    }
  } else {
    return (
      <Col align="center">
        <Spinner animation="border" />
      </Col>
    );
  }
}
