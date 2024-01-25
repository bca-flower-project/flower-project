import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { AuthContext } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function ResetPasswordRequest() {
  const { requestReset } = useContext(AuthContext);
  const [state, setState] = useState({ email: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeHandler = (key) => {
    return ({ target: { value } }) => {
      setState({ ...state, [key]: value });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    requestReset(
      email,
      () => {
        setSuccess(true);
      },
      ({ message }) => {
        setState({ ...state, message });
        setTimeout(() => {
          setState({ ...state, message: null });
        }, 3000);
      }
    );
  };

  const { email, message } = state;

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3 className="text-center mb-3">Request Password Reset</h3>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4" style={{ color: "black" }}>
                Enter your email here and you will be sent reset instructions
              </h4>
              <Form onSubmit={handleSubmit}>
                {message && <Alert variant="danger">{message}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={state.email}
                    onChange={changeHandler("email")}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                {!success && (
                  <Button
                    className="btn fw4 no-drag invert"
                    style={{ background: "black" }}
                    type="submit"
                  >
                    Request Reset
                  </Button>
                )}
                {success && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Check your email to reset your password.
                  </p>
                )}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
