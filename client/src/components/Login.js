//setting up the  sign up with bootstrap
import React from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "./contexts/AuthContext"
export default function Login(props) {
  const [error, setError] = useState("");
  // This is so we can receive error's if something is going wrong
  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");

  // function handleInput(evt) {
  //   if (evt.target.type === "email") {
  //     setEmailVal(evt.target.value);
  //   } else {
  //     setPassVal(evt.target.value);
  //   }
  // }

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
            {error && <Alert variant="danger">{error}</Alert>}
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
