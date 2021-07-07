import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Create from "./components/Create";
import PastFlowers from "./components/PastFlowers";
import Global from "./components/Global";
import LandingPage from "./components/LandingPage";
import SettingsPage from "./components/Settings";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SignupPage from './components/SignupPage'

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
      key: "privacy-policy",
      path: "/privacy-policy",
      render: () => {
        return <PrivacyPolicy />;
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
      key: "settings-page",
      path: "/settings",
      render: () => {
        return <SettingsPage />;
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
        return <LandingPage />;
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
        <Switch>
          <Route
            exact
            path="/privacy-policy"
            render={() => {
              return <PrivacyPolicy />;
            }}
          />
          <Route
            exact
            path="/signup"
            render={() => {
              return <SignupPage />;
            }}
          />
          <Route
            exact
            path="/forgot-password"
            render={() => {
              return <p>Password Reset Form Here</p>;
            }}
          />
          <Route
            exact
            path="*"
            render={() => {
              return <Login />;
            }}
          />
        </Switch>
      )}
    </>
  );
};

export default Routes;
