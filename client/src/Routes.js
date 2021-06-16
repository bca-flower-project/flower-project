import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route } from "react-router-dom";

import Login from './components/Login'
import PetalModal from './components/PetalModal'
const Routes = () => {
  const { currentUser } = useContext(AuthContext);

  const paths = [
    {
      key: "global-flowers",
      path: "/global",
      render: () => {
        return <>GLOBAL</>;
      },
    },
    {
      key: "create-flowers",
      path: "/create",
      render: () => {
        return <PetalModal />;
      },
    },
    {
      key: "past-flowers",
      path: "/past-flowers",
      render: () => {
        return <>PastFlowers</>;
      },
    },
    {
      key: "homepage",
      path: "/",
      render: () => {
        return <>Reset in process</>;
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
