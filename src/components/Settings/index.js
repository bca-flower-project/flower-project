import { useContext, useState, useEffect } from "react";
import { Container, Row, Form, Col, Button, Alert } from "react-bootstrap";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { AppThemeContext } from "../../contexts/AppThemeContext";
const { database } = fire;

const SettingsPage = ({
  submitButtonLabel = "Save",
  afterSubmit,
  title = "Settings",
  introText = "Choose the day of your birth and receive a reminder each year to create a Flower. Provide a US zipcode and help visualize the world of flowers.",
}) => {
  const { theme } = useContext(AppThemeContext);
  const { currentUser, updateUserPassword } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordUpdateSuccess, setShowPasswordUpdateSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);

    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

  const passwordChangeHandler = (key) => {
    return ({ target: { value } }) => {
      if(key == "password") {
        setPassword(value);
      } else {
        setPasswordConfirmation(value);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await database.collection("user").doc(currentUser.uid).update(userData);
    setShowSuccess(true);

    if (afterSubmit) {
      afterSubmit();
    }

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handlePasswordUpdateSubmit = async (e) => {
    e.preventDefault();

    const hasError =
      password === "" ||
      passwordConfirmation === "" ||
      passwordConfirmation !== password ||
      password.length < 8;

    if (hasError) {
      setMessage(
        <p>
          All fields are required.
          <br />
          Password and confirmation must match.
          <br />
          Password must be at least 8 characters long.
        </p>
      );
      // setTimeout(() => {
      //   setState({ ...state, message: null });
      // }, 3000);

    } else {
      updateUserPassword(
        password,
        () => {
          setMessage(null);
          setShowPasswordUpdateSuccess(true);
        },
        ({ message }) => {
          setMessage(message);
        }
      );
      
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>{title}</h1>
          <p>{introText}</p>
          <Form>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label inline htmlFor="dateOfBirth">
                  Date of Birth
                </Form.Label>
                <Form.Control
                  value={userData.dateOfBirth}
                  onChange={(e) => {
                    e.preventDefault();
                    const dateOfBirth = e.target.value;
                    const [yearOfBirth, monthOfBirth, dayOfBirth] =
                      dateOfBirth.split(/[^\d]/);
                    setUserData({
                      ...userData,
                      yearOfBirth,
                      monthOfBirth,
                      dayOfBirth,
                      dateOfBirth,
                    });
                  }}
                  type="date"
                  className="mb-2"
                  id="dateOfBirth"
                />
              </Col>
            </Form.Row>
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

                {!showSuccess && (
                  <Button type="submit" onClick={handleSubmit} className="mt-4">
                    {submitButtonLabel}
                  </Button>
                )}

                {showSuccess && (
                  <p
                    style={{
                      marginTop: "2.5rem",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    Saved
                  </p>
                )}
              </Col>
            </Form.Row>
          </Form>
          <br/>
          <br/>
          <h5>Update Password</h5>
          <Form className="align-items-center">
            {message && <Alert variant="danger">{message}</Alert>}
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  style={
                    message &&
                    (password === "" ||
                      password !== passwordConfirmation ||
                      password.length < 8)
                      ? { border: "1px solid red" }
                      : {}
                  }
                  value={password}
                  onChange={passwordChangeHandler("password")}
                  type="password"
                  className="mb-2"
                  placeholder="Password"
                />
                </Col>
            </Form.Row>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  style={
                    message &&
                    (passwordConfirmation === "" ||
                      password !== passwordConfirmation ||
                      password.length < 8)
                      ? { border: "1px solid red" }
                      : {}
                  }
                  value={passwordConfirmation}
                  onChange={passwordChangeHandler("passwordConfirmation")}
                  type="password"
                  className="mb-2"
                  placeholder="Confirm Password"
                />
                </Col>
            </Form.Row>
            {!showPasswordUpdateSuccess && (
              <Button type="submit" onClick={handlePasswordUpdateSubmit} className="mt-4">
                Update
              </Button>
            )}

            {showPasswordUpdateSuccess && (
              <p
                style={{
                  marginTop: "2.5rem",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Updated Password
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
