import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Switch, Redirect } from "react-router-dom";
import fire from "./config/fire";

import Login from "./components/Login";
import Create from "./components/Create";
import PastFlowers from "./components/PastFlowers";
import Global from "./components/Global";
import LandingPage from "./components/LandingPage";
import SettingsPage from "./components/Settings";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SignupPage from "./components/SignupPage";
import ResetPasswordRequest from "./components/ResetPasswordRequest";
import NewUserExperience from "./components/NewUserExperience";
import RestOfNewUx from "./components/NewUserExperience/RestOfNewUx";

const { database } = fire;

const Routes = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  const getUser = async (user) => {
    if(currentUser) {
      const ref = database.collection("user").doc(user.uid);

      await ref.get().then((item) => {
        setUserData(item.data());
      });
    }
  };

  useEffect(() => {
    getUser(currentUser);
  }, [currentUser]);

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
      key: "edit-flowers",
      path: "/create/:flowerId/edit",
      exact: true,
      render: () => {
        return <Create />;
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
        return <NewUserExperience />;
      },
    },
  ];
  return (
    <>
      {currentUser && (
        <>
          {paths.map((pathInfo) => {
            return <Route exact {...pathInfo} />;
          })}
          <Redirect strict from="/signup" to="/" />
        </>
      )}

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
            path="/login"
            render={() => {
              return <Login />;
            }}
          />
          <Route
            exact
            path="/forgot-password"
            render={() => {
              return <ResetPasswordRequest />;
            }}
          />
          <Route
            exact
            path="/newux"
            render={() => {
              getUser(currentUser);
              if(userData && !userData.completedNewUserExperience) {
                return <RestOfNewUx />
              }
            }}
          />
          <Route
            exact
            path="*"
            render={() => {
              return <LandingPage />;
            }}
          />
        </Switch>
      )}
    </>
  );
};

export default Routes;
