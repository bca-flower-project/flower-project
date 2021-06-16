import React, { useContext } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container className="loginWrapper">
      <h1>Please sign in!</h1>
      <Card>
        <Card.Body>
          <h2 text-center mb-4 style={{ color: "black" }}>
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
    </Container>
  );
}
