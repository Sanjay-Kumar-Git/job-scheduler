/**
 * JobsHero Component
 *
 * Purpose:
 * - Acts as the hero section for the Jobs dashboard
 * - Introduces the application
 * - Shows optional live job statistics
 * - Provides primary navigation actions
 *
 * Used in:
 * - JobsPage
 */

import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ---------- Styled Components ---------- */

/**
 * Animated hero wrapper
 * - Glassmorphism background
 * - Smooth entry animation
 */
const HeroWrapper = styled(motion.section)`
  margin-top: 20px;
  margin-bottom: 40px;
  padding: 40px;
  border-radius: 24px;

  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(18px);
  border: 1px solid ${({ theme }) => theme.border};
`;

/* Content container with readable width */
const HeroContent = styled.div`
  max-width: 720px;
`;

/* Main heading */
const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
`;

/* Supporting description */
const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 24px;
`;

/* Stats row */
const Stats = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
`;

/* Individual stat */
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Numeric stat value */
const StatValue = styled.span`
  font-size: 22px;
  font-weight: 700;
`;

/* Stat label */
const StatLabel = styled.span`
  font-size: 13px;
  opacity: 0.7;
`;

/* Action buttons container */
const Actions = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
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

/**
 * JobsHero
 *
 * Props:
 * - onCreateJob → optional callback for create job action
 * - onViewAll → optional callback for view jobs action
 * - stats → optional object { total, running, completed }
 */
const JobsHero = ({ onCreateJob, onViewAll, stats }) => {
  const navigate = useNavigate();

  /**
   * Handles Create Job button click
   * - Uses callback if provided
   * - Otherwise navigates to default route
   */
  const handleCreateJob = () => {
    if (onCreateJob) onCreateJob();
    else navigate("/");
  };

  /**
   * Handles View All Jobs button click
   * - Uses callback if provided
   * - Otherwise navigates to /jobs
   */
  const handleViewAll = () => {
    if (onViewAll) onViewAll();
    else navigate("/jobs");
  };

  return (
    <HeroWrapper
      initial={{ opacity: 0, y: 30 }}   // animation start
      animate={{ opacity: 1, y: 0 }}    // animation end
      transition={{ duration: 0.6 }}   // smooth entrance
    >
      <HeroContent>
        <Title>Job Processing Dashboard</Title>

        <Subtitle>
          Monitor, run, and manage background jobs in real time.
          Track execution status, priority, and lifecycle — all in one place.
        </Subtitle>

        {/* Optional statistics section */}
        {stats && (
          <Stats>
            <StatItem>
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Jobs</StatLabel>
            </StatItem>

            <StatItem>
              <StatValue>{stats.running}</StatValue>
              <StatLabel>Running</StatLabel>
            </StatItem>

            <StatItem>
              <StatValue>{stats.completed}</StatValue>
              <StatLabel>Completed</StatLabel>
            </StatItem>
          </Stats>
        )}

        {/* Action buttons */}
        <Actions>
          <Button onClick={handleCreateJob}>
            Create Job
          </Button>

          <Button onClick={handleViewAll}>
            View All Jobs
          </Button>
        </Actions>
      </HeroContent>
    </HeroWrapper>
  );
};

export default JobsHero;
