import { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

/* ---------- Overlay (Desktop only) ---------- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  @media (max-width: 768px) {
    position: static;
    background: none;
    backdrop-filter: none;
  }
`;

/* ---------- Card / Modal ---------- */

const Wrapper = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 24px;
  padding: 40px;
  text-align: center;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    margin: 24px auto;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 34px;
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 15px;
  opacity: 0.75;
  margin-bottom: 28px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* ---------- Buttons ---------- */

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

const SuccessMessage = ({ onViewJobs, onCreateAnother }) => {
  // Prevent background scroll on desktop
  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "auto");
    }
  }, []);

  return (
    <Overlay>
      <Wrapper
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <IconWrapper>
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            ✓
          </motion.span>
        </IconWrapper>

        <Title>Job Created Successfully</Title>
        <Message>
          Your job has been added to the processing queue.  
          You can monitor its progress or create another job.
        </Message>

        <ButtonGroup>
          <Button onClick={onViewJobs}>
            View Jobs
          </Button>

          <Button onClick={onCreateAnother}>
            Create Another Job
          </Button>
        </ButtonGroup>
      </Wrapper>
    </Overlay>
  );
};

export default SuccessMessage;
