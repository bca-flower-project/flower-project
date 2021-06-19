import React, { useContext } from "react";
import "./Login.scss";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container className="loginWrapper">
      <Row className="col-6 offset-3 justify-content-center">
        <Col>
          <h1>Please sign in!</h1>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "black" }}>
                Log In
              </h2>
              <Button
                onClick={login}
                className="w-100"
                style={{ background: "black" }}
                type="submit"
              >
                Google Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
