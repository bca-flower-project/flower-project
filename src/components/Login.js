import React, { useContext } from "react";
import "./Login.scss";
import { Container, Button, Card, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className='col-sm-4'>
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
        </div>
      </Row>
    </Container>
  );
}
