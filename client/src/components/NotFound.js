import React from "react";
import Login from "./Login";

export default function NotFound(props) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>You've Been Logged Out</h1>
      <Login user={props.user} googleLogin={props.googleLogin} />
    </div>
  );
}

// if user types in something that the url doesn't recognize, it will take them to this page.
