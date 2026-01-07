/**
 * Footer
 *
 * Purpose:
 * - Displays a simple, consistent footer across the app
 * - Shows project name, author, and current year
 *
 * Design:
 * - Glassmorphism style using backdrop blur
 * - Sticks visually to the bottom of content (not fixed)
 */

import styled from "styled-components";

/* ---------- Footer Wrapper ---------- */
/*
  Acts as the outer container for the footer.
  - Full width
  - Centered content
  - Glassy background with border on top
*/
const FooterWrapper = styled.footer`
  width: 100%;
  margin-top: 60px;
  padding: 20px 16px;

  display: flex;
  justify-content: center;

  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border-top: 1px solid ${({ theme }) => theme.border};
`;

/* ---------- Footer Content ---------- */
/*
  Constrains footer content width
  Keeps text centered and readable on large screens
*/
const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
`;

/* ---------- Component ---------- */

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        {/* Dynamic year prevents manual updates */}
        Job Scheduler • Built by Sanjay • © {new Date().getFullYear()}
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
