/**
 * ThemeContext
 *
 * Purpose:
 * - Manages global light / dark theme state
 * - Persists theme preference in localStorage
 * - Integrates with styled-components ThemeProvider
 *
 * Used in:
 * - App root (wraps entire application)
 */

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";

/**
 * Create a context to store theme state
 */
const ThemeContext = createContext();

/**
 * Custom hook for consuming theme context
 * - Makes context usage cleaner across components
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * ThemeContextProvider
 *
 * Wraps the application and provides:
 * - isDark → current theme state
 * - toggleTheme → function to switch theme
 */
export const ThemeContextProvider = ({ children }) => {
  /* Track whether dark mode is enabled */
  const [isDark, setIsDark] = useState(false);

  /**
   * Load theme preference from localStorage
   * - Runs only once on initial render
   * - Ensures theme persists across page reloads
   */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  /**
   * Toggle between light and dark themes
   * - Updates state
   * - Saves preference to localStorage
   */
  const toggleTheme = () => {
    setIsDark((prev) => {
      const nextTheme = !prev;
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };

  return (
    /**
     * ThemeContext.Provider
     * - Exposes theme state & toggle function to components
     */
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {/* 
        styled-components ThemeProvider
        - Injects theme object into all styled components
      */}
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
