import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Create from "./components/Create";
import PastFlowers from "./components/PastFlowers";
import Global from "./components/Global";
// import LandingPage from "./components/LandingPage";
const Routes = () => {
  const { currentUser } = useContext(AuthContext);

  const paths = [
    {
      key: "global-flowers",
      path: "/global",
      render: () => {
        return <Global />;
      },
    },
    {
      key: "create-flowers",
      path: "/create",
      render: () => {
        return <Create />;
      },
    },
    {
      key: "past-flowers",
      path: "/past-flowers",
      render: () => {
        return <PastFlowers />;
      },
    },
    {
      key: "homepage",
      path: "/",
      render: () => {
        return <Create />;
      },
    },
  ];
  return (
    <>
      {currentUser &&
        paths.map((pathInfo) => {
          return <Route exact {...pathInfo} />;
        })}
      {!currentUser && (
        <Route
          path="*"
          render={() => {
            return <Login />;
          }}
        />
      )}
    </>
  );
};

export default Routes;
