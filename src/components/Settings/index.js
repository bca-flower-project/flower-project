import { useContext, useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";
const { database } = fire;

const SettingsPage = () => {
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

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Settings</h1>
          <p>
            Set your birthday and you will recieve a reminder email to create a
            new flower every year on your birthday.
          </p>
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
                    const [_, monthOfBirth, dayOfBirth] =
                      dateOfBirth.split(/[^\d]/);
                    setUserData({
                      ...userData,
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
              <Col xs="auto">
                {!showSuccess && (
                  <Button type="submit" onClick={handleSubmit} className="mt-4">
                    Submit
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
