/**
 * Reusable animated button component
 *
 * Why this component exists:
 * - Centralizes button styles
 * - Keeps animations consistent
 * - Avoids repeating button logic across the app
 */

import styled from "styled-components";
import { motion } from "framer-motion";
import { scaleIn } from "../animations/motionPresets";

/**
 * Styled motion button
 *
 * - Uses Framer Motion for entry animation
 * - Uses styled-components for theming
 * - `$small` is a transient prop (not passed to DOM)
 */
const StyledButton = styled(motion.button)`
  /* Padding changes based on button size */
  padding: ${({ $small }) => ($small ? "8px 16px" : "12px 26px")};

  /* Fully rounded pill shape */
  border-radius: 999px;
  border: none;

  /* Primary theme color */
  background: ${({ theme }) => theme.primary};
  color: #ffffff;

  font-weight: 600;
  cursor: pointer;

  /* Smooth hover animation */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 0 22px ${({ theme }) => theme.primary};
  }

  /* Disabled state styling */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

/**
 * Button component
 *
 * Props:
 * - children → button text or content
 * - $small → optional smaller size
 * - Any native button props (onClick, disabled, etc.)
 */
const Button = ({ children, ...props }) => {
  return (
    <StyledButton
      variants={scaleIn}  // Entry animation preset
      initial="hidden"    // Initial animation state
      animate="visible"   // Final animation state
      {...props}          // Forward remaining props safely
    >
      {children}
    </StyledButton>
  );
};

export default Button;
