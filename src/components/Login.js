import React, { useContext } from "react";
import "./Login.scss";
import { Container, Button, Card, Row } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  return (
    <Container fluid className="loginWrapper">
      <Row className="justify-content-center">
        <div className="col-sm-4">
          <h3>Please sign in!</h3>
          <p>
            Donec aliquam ut urna et congue. Nam vel consequat nibh. Mauris
            rutrum blandit nibh quis consequat. Cras et molestie libero, et
            egestas sapien. Duis sagittis arcu bibendum magna semper congue.
            Vestibulum pharetra urna eu lorem varius porttitor. Vivamus vitae
            convallis risus, non lobortis ante.
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
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
