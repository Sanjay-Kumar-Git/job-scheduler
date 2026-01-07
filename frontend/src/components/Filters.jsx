/**
 * Filters Component
 *
 * Purpose:
 * - Allows users to filter jobs by status, priority, or job ID
 * - Uses glass-style dropdowns for premium UI
 * - Triggers search explicitly using a button
 *
 * Used in:
 * - JobsPage
 */

import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motionPresets";
import GlassSelect from "../styles/GlassSelect";

/* ---------- Layout Wrapper ---------- */
/* Animated container for all filter controls */
const Wrapper = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  /* Stack fields vertically on mobile */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ---------- Individual Field ---------- */
/* Wraps label + input/select */
const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

/* Field label styling */
const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  opacity: 0.8;
`;

/* Job ID input */
const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: inherit;
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

const Filters = ({ filters, setFilters, onSearch }) => {
  return (
    <Wrapper
      variants={fadeUp}     // shared fade-up animation
      initial="hidden"
      animate="visible"
    >
      {/* Status Filter */}
      <Field>
        <Label>Status</Label>
        <GlassSelect
          value={filters.status || undefined}
          onChange={(value) =>
            setFilters({ ...filters, status: value })
          }
          options={[
            { label: "All", value: undefined },
            { label: "Pending", value: "pending" },
            { label: "Running", value: "running" },
            { label: "Completed", value: "completed" },
          ]}
        />
      </Field>

      {/* Priority Filter */}
      <Field>
        <Label>Priority</Label>
        <GlassSelect
          value={filters.priority || undefined}
          onChange={(value) =>
            setFilters({ ...filters, priority: value })
          }
          options={[
            { label: "All", value: undefined },
            { label: "Low", value: "Low" },
            { label: "Medium", value: "Medium" },
            { label: "High", value: "High" },
          ]}
        />
      </Field>

      {/* Job ID Filter */}
      <Field>
        <Label>Job ID</Label>
        <Input
          type="number"
          placeholder="Enter ID"
          value={filters.id}
          onChange={(e) =>
            setFilters({ ...filters, id: e.target.value })
          }
        />
      </Field>

      {/* Explicit Search Trigger */}
      <Button onClick={onSearch}>
        Search
      </Button>
    </Wrapper>
  );
};

export default Filters;
