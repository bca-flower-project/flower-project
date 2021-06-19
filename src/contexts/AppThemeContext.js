import { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../global";

import { lightTheme, darkTheme } from "../components/theme";

export const AppThemeContext = createContext();
const AppThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <AppThemeContext.Provider value={{ toggleTheme, theme }}>
        {children}
        <GlobalStyles />
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
};
export default AppThemeProvider;
