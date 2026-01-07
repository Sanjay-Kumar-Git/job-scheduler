/**
 * Navbar
 *
 * Purpose:
 * - Top navigation bar for desktop & tablet
 * - Shows logo, navigation tabs, and theme toggle
 *
 * Behavior:
 * - Changes size and style when user scrolls
 * - Glassmorphism effect for modern UI
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CapsuleTabs from "./CapsuleTabs";
import ThemeToggle from "../components/ThemeToggle";

/* ---------- Outer Nav ---------- */
/*
  Fixed container that keeps navbar always visible at the top
*/
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: center;
`;

/* ---------- Inner Navbar ---------- */
/*
  - Shrinks on scroll for better content visibility
  - Uses transient prop ($scrolled) to avoid DOM warnings
*/
const NavInner = styled.div`
  width: ${({ $scrolled }) => ($scrolled ? "92%" : "100%")};
  margin-top: ${({ $scrolled }) => ($scrolled ? "10px" : "0")};
  padding: ${({ $scrolled }) =>
    $scrolled ? "10px 24px" : "20px 40px"};

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);

  border-radius: ${({ $scrolled }) => ($scrolled ? "16px" : "0")};
  border: 1px solid
    ${({ $scrolled, theme }) =>
      $scrolled ? theme.border : "transparent"};

  transition: all 0.3s ease;
`;

/* ---------- Logo ---------- */
/*
  Clicking logo navigates to home page
*/
const Logo = styled.div`
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
`;

/* ---------- Center Section ---------- */
/*
  Navigation tabs visible only on desktop
*/
const Center = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Right Section ---------- */
/*
  Contains theme toggle
*/
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/* ---------- Component ---------- */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  /**
   * Detects scroll position
   * - When user scrolls down > 40px, navbar shrinks
   */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Nav>
      <NavInner $scrolled={scrolled}>
        {/* Logo navigates to Create Job page */}
        <Logo onClick={() => navigate("/")}>
          JobScheduler
        </Logo>

        {/* Desktop navigation tabs */}
        <Center>
          <CapsuleTabs />
        </Center>

        {/* Theme toggle */}
        <Right>
          <ThemeToggle />
        </Right>
      </NavInner>
    </Nav>
  );
};

export default Navbar;
