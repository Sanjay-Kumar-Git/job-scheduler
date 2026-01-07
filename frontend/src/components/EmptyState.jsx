/**
 * EmptyState Component
 *
 * Purpose:
 * - Displayed when there are ZERO jobs
 * - Replaces empty table with a friendly message
 * - Improves UX instead of showing a blank screen
 *
 * Interview Note:
 * - This is a common real-world dashboard pattern
 * - Shows attention to user experience
 */

import styled from "styled-components";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

/* ---------- Layout Wrapper ---------- */
/*
  Wrapper width = 100% so it aligns
  perfectly with JobTable width
*/
const Wrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  padding: 40px 20px;

  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/* ---------- Image ---------- */
/*
  Image max-width matches table visual width
*/
const Image = styled.img`
  width: 100%;
  max-width: 420px;
  margin-bottom: 24px;
  opacity: 0.9;
  border-radius: 50%;
`;

/* ---------- Title ---------- */
const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

/* ---------- Subtitle ---------- */
const Subtitle = styled.p`
  font-size: 14px;
  opacity: 0.75;
  line-height: 2;
  text-align: center;
  max-width: 420px;
`;

/**
 * Submit button
 * - Water-fill hover animation
 * - Uses theme primary color
 */
const Button = styled.button`
  position: relative;
  margin-top: 12px;
  padding: 12px 32px;
  border-radius: 999px;

  border: 1px solid ${({ theme }) => theme.primary};
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

const EmptyState = () => {
  // Access global theme state (light / dark)
  const { isDark } = useTheme();
  const navigate=useNavigate()

  const handleCreateJob = () => {
     navigate("/",{replace:true});
  };

  return (
    <Wrapper>
      {/* Theme-based illustration */}
      <Image
        src={
          isDark
            ? "https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767509349/ChatGPT_Image_Jan_4_2026_12_18_43_PM_zfyyuo.png"
            : "https://res.cloudinary.com/dvf7rhe2l/image/upload/v1767509194/ChatGPT_Image_Jan_4_2026_12_16_08_PM_qf40ru.png"
        }
        alt="No jobs available"
      />

      <Title>No jobs Found</Title>

      <Subtitle>
        No Jobs Found Please
        Create your first job to start processing tasks.
      </Subtitle>
      <Button onClick={handleCreateJob}>Create Job</Button>
    </Wrapper>
  );
};

export default EmptyState;
