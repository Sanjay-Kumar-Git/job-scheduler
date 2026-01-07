/**
 * GlobalStyles
 *
 * Purpose:
 * - Defines global CSS rules for the entire application
 * - Ensures consistent styling, typography, and theming
 * - Applied once at the root of the app
 *
 * Why use createGlobalStyle?
 * - Allows global CSS while still respecting theme values
 * - Avoids traditional CSS files
 * - Keeps styles colocated with React logic
 */

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* ---------- CSS Reset ---------- */
  /*
    Removes default browser margins & paddings
    Ensures consistent box sizing across elements
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* ---------- Body Styles ---------- */
  /*
    - Uses theme-based background & text color
    - Smooth transition when switching themes
  */
  body {
    font-family: "Inter", Arial, sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};

    transition: background 0.3s ease, color 0.3s ease;
    overflow-x: hidden;
  }

  /* ---------- Buttons ---------- */
  /*
    Ensures buttons inherit font styles
    Cursor pointer improves UX
  */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* ---------- Links ---------- */
  /*
    Removes default underline
    Keeps links theme-aware
  */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* ---------- Visibility Helpers ---------- */
  /*
    Utility classes to control visibility
    without writing media queries repeatedly
  */

  /* Hide desktop-only content on mobile */
  @media (max-width: 768px) {
    .desktop-only {
      display: none !important;
    }
  }

  /* Hide mobile-only content on desktop */
  @media (min-width: 769px) {
    .mobile-only {
      display: none !important;
    }
  }
`;

export default GlobalStyles;
