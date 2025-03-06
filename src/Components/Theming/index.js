import React, { createContext, useState, useContext } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Function to Generate Theme Based on Primary & Secondary Colors
const generateTheme = (primaryColor, secondaryColor, isDark = false) => {
  return {
    ...(!isDark ? MD3LightTheme : MD3DarkTheme),
    colors: {
      ...(!isDark ? MD3LightTheme.colors : MD3DarkTheme.colors),
      primary: primaryColor,
      secondary: secondaryColor,
      background: isDark ? '#121212' : '#ffffff',
      text: isDark ? '#ffffff' : '#000000',
    },
  };
};

// Create Context for Theming
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState('#00696C');
  const [secondaryColor, setSecondaryColor] = useState('#4A6363');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const updateColors = (primary, secondary) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
  };

  const theme = generateTheme(primaryColor, secondaryColor, isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, updateColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to Use Theme
export const useTheme = () => useContext(ThemeContext);
