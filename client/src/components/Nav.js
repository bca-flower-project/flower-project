import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to={"/Connect"}>Connect</Link>
      <Link to={"/Create"}>Create</Link>
      <Link to={"/Global"}>Global</Link>
      <Link to={"/Login"}>Login</Link>
      <Link to={"/PastFlowers"}>Past Flowers</Link>
      <Link to={"/Profile"}>Profile</Link>
      <Link to={"Settings"}>Settings</Link>
    </div>
  );
}
//we will need some sort of function because the options and positions in the top corners will change:
// ----- on CREATE (create is center) page: past flowers on left /// global on right
//------ on GLOBAL (globe is center) page: past flowers on left // create on right

//---- PAST FLOWERS will just be on create

//react carousel
