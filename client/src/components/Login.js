//setting up the  sign up with bootstrap
import React from "react";
import { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "./contexts/AuthContext"
export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // This is so we can receive error's if something is going wrong
  const emailRef = useRef();
  const passwordRef = useRef();

  const [emailVal, setEmailVal] = useState("");
  const [passVal, setPassVal] = useState("");

  function handleInput(evt) {
    if (evt.target.type === "email") {
      setEmailVal(evt.target.value);
    } else {
      setPassVal(evt.target.value);
    }
  }
  console.log(props);
  return (
    <>
      {/* This is creating the signup form  */}
      <Card>
        <Card.Body>
          <h2 text-center mb-4 style={{ color: "black"}}>
            Log In
          </h2>
          {/* {currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          {/* <Form>
            <Form.Group id="email">
              <Form.Label style={{ color: "black"}}>Email</Form.Label>
              <Form.Control
                onChange={handleInput}
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ color: "black"}}>Password</Form.Label>
              <Form.Control
                onChange={handleInput}
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
          </Form> */}
          {/* <Button
            disabled={loading}
            className="w-100"
            style={{ background: "black" }}
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              props.loginPass(emailVal, passVal);
              console.log("submit form");
            }}
          >
            Log In
          </Button> */}
          <Button
            onClick={props.googleLogin}
            className="w-100"
            style={{ background: "black" }}
            type="submit"
          >
            Google Login
          </Button>
          {props.user && <Redirect to="/Dashboard" />}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account?<Link to="/Signup"> Sign Up</Link>
        {/* wrap the words Log In in a <Link> to the log */}
      </div>
    </>
  );
}
