import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import { AuthContext } from "../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function Login() {
  const { googleLogin, passwordLogin } = useContext(AuthContext);
  const [state, setState] = useState({ email: "", password: "" });

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
    passwordLogin(email, password, ({ message }) => {
      setState({ ...state, message });
      setTimeout(() => {
        setState({ ...state, message: null });
      }, 3000);
    });
  };

  const { email, password, message } = state;

  return (
    <Container fluid className="loginWrapper"
      style={{
        marginBottom: "100px"
      }}
    >
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3 className="text-center">Welcome!</h3>
          <h4 className="text-center">Login to Create a Flower</h4>
          <p className="text-center">
            <span className="font-italic">
              Reflect on Who You Are & Who You Want to Be
            </span>
            <br />
            Can't do it now? Join and we'll send you a link you can use later.
          </p>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4" style={{ color: "black" }}>
                Login
              </h4>
              <Button
                onClick={googleLogin}
                className="w-100"
                style={{ background: "black" }}
                type="submit"
              >
                Google Login
              </Button>
              <hr />
              <h4 className="text-center mb-4" style={{ color: "black" }}>
                Email & Password Login
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
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={state.password}
                    onChange={changeHandler("password")}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  className="btn fw4 no-drag invert"
                  style={{ background: "black" }}
                  type="submit"
                >
                   Login
                </Button>
              </Form>
              <p className="mt-3">
                <Link style={{ color: "black" }} to="/signup">
                  Create an Account
                </Link>{" "}
                |{" "}
                <Link style={{ color: "black" }} to="/forgot-password">
                  Forgot Password
                </Link>
              </p>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
