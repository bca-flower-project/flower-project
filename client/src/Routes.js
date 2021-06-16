import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route } from "react-router-dom";

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
        return <>Create</>;
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
            return <>you are logged out</>;
          }}
        />
      )}
    </>
  );
};

export default Routes;
