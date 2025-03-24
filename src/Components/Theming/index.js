import React, { createContext, useState, useContext } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  applyTheme
} from '@material/material-color-utilities';

// Theme Creator using Material Color Utilities
const generateTheme = (primaryColor, secondaryColor, isDark = false) => {
  // Convert hex colors to ARGB format
  const primaryArgb = argbFromHex(primaryColor);
  
  // Generate a theme using the Material Color Utilities
  const theme = themeFromSourceColor(primaryArgb, [
    { name: 'secondary', value: argbFromHex(secondaryColor), blend: true }
  ]);
  
  // Get the appropriate color scheme based on dark mode
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  
  // Convert the ARGB values back to hex for React Native Paper
  const colorScheme = {
    primary: hexFromArgb(scheme.primary),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    secondary: hexFromArgb(scheme.secondary),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    tertiary: hexFromArgb(scheme.tertiary),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    error: hexFromArgb(scheme.error),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),
    shadow: hexFromArgb(scheme.shadow),
    scrim: hexFromArgb(scheme.scrim),
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    inversePrimary: hexFromArgb(scheme.inversePrimary),
  };

  return {
    ...(!isDark ? MD3LightTheme : MD3DarkTheme),
    colors: {
      ...(!isDark ? MD3LightTheme.colors : MD3DarkTheme.colors),
      ...colorScheme,
    },
  };
};

// Theming Context
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