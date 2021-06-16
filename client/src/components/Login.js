import React from "react";
import { Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  return (
    <div className="loginWrapper">
      <div className="login">
        <h1>Please sign in!</h1>
        {/* This is creating the login form  */}
        <Card>
          <Card.Body>
            <h2 text-center mb-4 style={{ color: "black" }}>
              Log In
            </h2>
            <Button
              onClick={props.googleLogin}
              className="w-100"
              style={{ background: "black" }}
              type="submit"
            >
              Google Login
            </Button>
            {props.user && <Redirect to="/LandingPage" />}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
