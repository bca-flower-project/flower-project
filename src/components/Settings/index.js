import { useContext, useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";
const { database } = fire;

const SettingsPage = ({
  submitButtonLabel = "Save",
  afterSubmit,
  title = "Settings",
  introText = "Choose the day of your birth and receive a reminder each year to create a Flower. Provide a US zipcode and help visualize the world of flowers.",
}) => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const getUser = async (user) => {
    const ref = database.collection("user").doc(user.uid);

    await ref.get().then((item) => {
      setUserData(item.data());
    });
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

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
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
