/**
 * ThemeToggle Component
 *
 * Purpose:
 * - Allows user to switch between Light and Dark themes
 * - Uses global theme context
 *
 * Used in:
 * - Navbar
 */

import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";



/* ---------- Styled Components ---------- */

/**
 * Submit button
 * - Water-fill hover animation
 * - Uses theme primary color
 */
const Button = styled.button`
  position: relative;
  margin-top: 12px;
  padding: 7px 32px;
  border-radius: 999px;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 14px;

  cursor: pointer;
  overflow: hidden;
  isolation: isolate;

  transition: color 0.25s ease, transform 0.15s ease;

  /* Water-fill animation */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.primary};
    border-radius: 999px;

    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.35s ease;

    z-index: -1;
  }

  &:hover {
    color: #ffffff;
  }

  &:hover::before {
    transform: scaleY(1);
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* ---------- Component ---------- */

/**
 * ThemeToggle
 *
 * - Reads current theme from ThemeContext
 * - Toggles theme on button click
 */
const ThemeToggle = () => {
  // Get theme state and toggle function from context
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {/* Show label based on current theme */}
      {isDark ? <MdDarkMode size={30}/> : <MdLightMode size={30}/>}
    </Button>
  );
};

export default ThemeToggle;
