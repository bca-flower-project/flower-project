import React, { useContext } from "react";
import "./Login.scss";
import { Container, Button, Card, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login, facebookLogin } = useContext(AuthContext);

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3 className="text-center">Welcome!</h3>
          <h4 className="text-center">Log In to Create a Flower</h4>

          <p className="text-center">
            <span className="font-italic">
              Reflect on Who You Are & Who You Want to Be Can't do it now?
            </span>
            <br />
            Can't do it now? Join and we'll send you a link you can use later.
          </p>
          <Card>
            <Card.Body>
              <h4 className="text-center mb-4" style={{ color: "black" }}>
                Log In
              </h4>
              <Button
                onClick={login}
                className="w-100"
                style={{ background: "black" }}
                type="submit"
              >
                Google Login
              </Button>
              <Button
                onClick={facebookLogin}
                className="w-100 mt-3"
                style={{ background: "black" }}
                type="submit"
              >
                Facebook Login
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
