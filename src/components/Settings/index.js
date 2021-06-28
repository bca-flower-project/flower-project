import { useContext, useState, useEffect } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import fire from "../../config/fire";
import { AuthContext } from "../../contexts/AuthContext";
const { database } = fire;

const SettingsPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

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
                    setUserData({ ...userData, dateOfBirth: e.target.value });
                  }}
                  type="date"
                  className="mb-2"
                  id="dateOfBirth"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" onClick={handleSubmit} className="mt-4">
                  Submit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
