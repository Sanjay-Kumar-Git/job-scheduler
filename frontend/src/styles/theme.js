/**
 * Theme Definitions
 *
 * Purpose:
 * - Defines design tokens for light and dark themes
 * - Used by styled-components ThemeProvider
 *
 * Why this approach?
 * - Centralizes colors and UI values
 * - Makes theme switching simple and consistent
 * - Avoids hardcoded colors across components
 */

/* ---------- Light Theme ---------- */
/*
  Designed for bright environments
  Uses soft backgrounds with strong text contrast
*/
export const lightTheme = {
  background: "#f6f7fb",                 // App background color
  cardBg: "rgba(255, 255, 255, 0.75)",   // Glass card background
  text: "#1f2937",                       // Primary text color
  border: "rgba(0, 0, 0, 0.12)",         // Subtle borders
  primary: "#4338ca",                    // Brand / action color
};

/* ---------- Dark Theme ---------- */
/*
  Designed for low-light environments
  Uses darker surfaces with soft text contrast
*/
export const darkTheme = {
  background: "#0f172a",                 // App background color
  cardBg: "rgba(15, 23, 42, 0.75)",       // Glass card background
  text: "#e5e7eb",                       // Primary text color
  border: "rgba(255, 255, 255, 0.12)",   // Light borders for dark UI
  primary: "#4f46e5",                    // Brand / action color
};
