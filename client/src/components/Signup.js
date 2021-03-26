// setting up the  sign up with bootstrap
// import React from "react";
// import { useRef } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useState } from "react";
// export default function Signup() {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const passwordConfirmRef = useRef();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   // This is so we can recieve error's if something is going wrong
//   async function handleSubmit(e) {
//     e.preventDefault();
//     //Password setup incorrect error
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return MediaStreamError("Passwords do not match");
//     }//Failure to create an account error
//     try {
//       setError("");
//       setLoading(true);
//       await signup(emailRef.current.value, passwordRef.current.value);
//     } catch {
//       setError("Failed to create an account");
//     }
//     setLoading(false);
//   }
//   return (
//     <> 
//     {/* This is creating the signup form  */}
//       <Card>
//         <Card.Body>
//           <h2> Sign Up </h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control type="password" ref={passwordConfirmRef} required />
//             </Form.Group>
//             <Button disabled={loading} id="signUpSubmit" type="submit">
//               Sign Up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div id="already">Already have an account? Log In</div>
//     </>
//   );
// }
