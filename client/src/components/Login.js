import React from 'react'
import { Form, Button, Card } from "react-bootstrap";


export default function Login() {
    // const emailRef = useRef()
    // const passwordRef = useRef()
    // const passwordConfirmRef = useRef()
    return (
        <div>
            <h1>This is the login page</h1>
            {/* put in login forms here, so we can test database */}
            <Card>
        <Card.Body>
          <h2> Sign Up </h2>
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Button id= 'signUpSubmit' type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>


        </div>
    )
}


//login page will have entry form for inputting username & password & will connect to firebase or mongo for login authentication
//authenticate and login through google and facebook
//modal window for login

//make sure user is logged into entire site, not just one page