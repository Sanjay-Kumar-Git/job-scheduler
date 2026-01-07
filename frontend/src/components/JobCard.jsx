/**
 * JobCard Component (Mobile View)
 *
 * Purpose:
 * - Displays job details in card format for mobile screens
 * - Allows users to run or delete jobs
 *
 * Used in:
 * - JobsPage (mobile layout)
 */

import styled from "styled-components";
import { runJob, deleteJob } from "../services/jobApi";

/* ---------- Styled Components ---------- */

/**
 * Card container
 * - Glassmorphism style
 * - Used for mobile-friendly layout
 */
const Card = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
`;

/**
 * Row layout for label + value
 */
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
`;

/* Label text */
const Label = styled.span`
  font-weight: 600;
  opacity: 0.7;
`;

/* Value text */
const Value = styled.span`
  font-weight: 500;
`;

/**
 * Status badge
 * - Uses transient prop `$status`
 * - Prevents invalid DOM attributes
 */
const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;

  background: ${({ $status }) =>
    $status === "pending"
      ? "rgba(234,179,8,0.2)"
      : $status === "running"
      ? "rgba(59,130,246,0.2)"
      : "rgba(34,197,94,0.2)"};

  color: ${({ $status }) =>
    $status === "pending"
      ? "#eab308"
      : $status === "running"
      ? "#3b82f6"
      : "#22c55e"};
`;

/* Run button (only for pending jobs) */
const RunButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  width: 100%;
  border-radius: 999px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-weight: 600;
`;

/* Delete button (only for completed jobs) */
const DeleteButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  width: 100%;
  border-radius: 999px;
  border: none;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  font-weight: 600;
`;

/* ---------- Component ---------- */

/**
 * JobCard
 *
 * Props:
 * - job → job object
 * - onJobUpdate → callback to refresh job list
 */
const JobCard = ({ job, onJobUpdate }) => {
  /**
   * Trigger job execution
   */
  const handleRun = async () => {
    try {
      await runJob(job.id);
      onJobUpdate(); // parent re-fetches updated job list
    } catch (err) {
      alert(err.response?.data?.message || "Run failed");
    }
  };

  /**
   * Delete completed job
   */
  const handleDelete = async () => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(job.id);
      onJobUpdate();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Card>
      <Row>
        <Label>ID</Label>
        <Value>{job.id}</Value>
      </Row>

      <Row>
        <Label>Task</Label>
        <Value>{job.taskName}</Value>
      </Row>

      <Row>
        <Label>Priority</Label>
        <Value>{job.priority}</Value>
      </Row>

      <Row>
        <Label>Status</Label>
        <StatusBadge $status={job.status}>
          {job.status}
        </StatusBadge>
      </Row>

      {/* Run action → only when job is pending */}
      {job.status === "pending" && (
        <RunButton onClick={handleRun}>
          Run
        </RunButton>
      )}

      {/* Delete action → only after completion */}
      {job.status === "completed" && (
        <DeleteButton onClick={handleDelete}>
          Delete
        </DeleteButton>
      )}
    </Card>
  );
};

export default JobCard;
