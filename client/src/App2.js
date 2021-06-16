import React, { useState } from "react";
import { Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/theme";
import AuthProvider from "./contexts/AuthContext";
import Routes from "./Routes";
import Layout from "./Layout";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <Switch>
          <Layout>
            <Routes />
          </Layout>
        </Switch>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
