import { useState, useContext } from "react";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { AuthContext } from "../contexts/AuthContext";

const SignupPage = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
  });

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    message,
  } = state;

  const { doSignup } = useContext(AuthContext);

  const changeHandler = (key) => {
    return ({ target: { value } }) => {
      setState({ ...state, [key]: value });
    };
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const hasError =
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      passwordConfirmation === "" ||
      passwordConfirmation !== password ||
      password.length < 8;

    if (hasError) {
      setState({
        ...state,
        message: (
          <p>
            All fields are required.
            <br />
            Password and confirmation must match.
            <br />
            Password must be at least 8 characters long.
          </p>
        ),
      });
      setTimeout(() => {
        setState({ ...state, message: null });
      }, 3000);

    } else {
      doSignup({ firstName, lastName, email, password }, ({ message }) => {
        setState({ ...state, message });
        setTimeout(() => {
          setState({ ...state, message: null });
        }, 3000);
      });
    }
  };

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3 className="text-center mb-4">Sign Up</h3>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {message && <Alert variant="danger">{message}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    style={
                      message && firstName === ""
                        ? { border: "1px solid red" }
                        : {}
                    }
                    value={state.firstName}
                    onChange={changeHandler("firstName")}
                    type="text"
                    placeholder="Enter First Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={state.lastName}
                    style={
                      message && lastName === ""
                        ? { border: "1px solid red" }
                        : {}
                    }
                    onChange={changeHandler("lastName")}
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    style={
                      message && email === "" ? { border: "1px solid red" } : {}
                    }
                    value={state.email}
                    onChange={changeHandler("email")}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
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
                    value={state.password}
                    onChange={changeHandler("password")}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
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
                    value={state.passwordConfirmation}
                    onChange={changeHandler("passwordConfirmation")}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  style={{ backgroundColor: "black" }}
                  className="btn fw4 no-drag invert"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default SignupPage;
