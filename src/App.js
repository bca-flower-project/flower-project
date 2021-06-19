import React from "react";
import { Switch } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import AppThemeProvider from "./contexts/AppThemeContext";
import Routes from "./Routes";
import Layout from "./components/Layout";

const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <Switch>
          <Layout>
            <Routes />
          </Layout>
        </Switch>
      </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
