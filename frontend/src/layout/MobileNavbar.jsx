/**
 * MobileNavbar
 *
 * Purpose:
 * - Displays bottom navigation for mobile devices only
 * - Reuses the same CapsuleTabs component used in desktop navbar
 *
 * Design Decisions:
 * - Fixed at the bottom for thumb-friendly navigation
 * - Hidden on desktop to avoid duplicate navigation
 * - Glassmorphism styling for visual consistency
 */

import styled from "styled-components";
import CapsuleTabs from "./CapsuleTabs";

/* ---------- Outer Wrapper ---------- */
/*
  - Fixed to bottom of the screen
  - Full width
  - Centers the navigation capsule horizontally
  - Visible ONLY on mobile screens
*/
const Wrapper = styled.div`
  position: fixed;
  bottom: 16px;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: center;

  /* Hide mobile navbar on tablets & desktops */
  @media (min-width: 769px) {
    display: none;
  }
`;

/* ---------- Inner Container ---------- */
/*
  - Holds CapsuleTabs
  - Rounded pill shape
  - Glassy background with blur
*/
const Inner = styled.div`
  padding: 8px;
  border-radius: 999px;

  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.border};
`;

/* ---------- Component ---------- */

const MobileNavbar = () => {
  return (
    <Wrapper>
      <Inner>
        {/* Reusing the same tab navigation for mobile */}
        <CapsuleTabs />
      </Inner>
    </Wrapper>
  );
};

export default MobileNavbar;
