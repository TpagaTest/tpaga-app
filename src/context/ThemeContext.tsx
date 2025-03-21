import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "../theme/theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(lightTheme); // Default: light mode

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
