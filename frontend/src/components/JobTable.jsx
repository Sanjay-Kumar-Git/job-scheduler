/**
 * JobTable Component (Desktop View)
 *
 * Purpose:
 * - Displays jobs in a table format
 * - Supports inline editing (Edit → Save / Cancel)
 * - Allows running, deleting jobs based on status
 *
 * Used in:
 * - JobsPage (desktop layout)
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { runJob, deleteJob, updateJob } from "../services/jobApi";
import GlassSelect from "../styles/GlassSelect";
import { VscRunAll } from "react-icons/vsc";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";


/* ---------- Styled Components ---------- */

/**
 * Table container with glassmorphism effect
 */
const TableWrapper = styled.div`
  background: ${({ theme }) => theme.cardBg};
  backdrop-filter: blur(16px);
  border-radius: 20px;
  overflow-x: auto;
`;

/* Base table */
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

/* Table header cell */
const Th = styled.th`
  padding: 14px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-child {
    text-align: center;
  }
`;

/* Table row */
const Tr = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

/* Table data cell */
const Td = styled.td`
  padding: 14px;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  vertical-align: middle;

  &:last-child {
    text-align: center;
  }
`;

/* Clickable task name */
const ClickableTask = styled.span`
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

/* Status badge wrapper */
const StatusWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

/**
 * Status badge
 * - Uses transient prop `$status` to avoid DOM warnings
 */
const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 13px;
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

/* Action buttons container */
const ActionGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

/**
 * Submit button
 * - Water-fill hover animation
 * - Uses theme primary color
 */
const Button = styled.button`
  position: relative;
  padding: 5px 15px;
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

/* Danger action (delete / cancel) */
const DangerButton = styled.button`
  position: relative;
  padding: 5px 15px;
  border-radius: 999px;
  border: none;
  background: transparent;

  color: #d62525ff;
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
    background: #d62525ff;
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

/* Secondary action (edit) */
const SecondaryButton = styled.button`
  position: relative;
  padding: 5px 15px;
  border-radius: 999px;
  border: none;
  background: transparent;

  color: #0dbe13ff;
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
    background: #0dbe13ff;
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

/* Save action (edit) */
const SaveButton = styled.button`
  position: relative;
  padding: 5px 15px;
  border-radius: 999px;
  border: none;
  background: transparent;

  color: #b2be0dff;
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
    background: #b2be0dff;
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

/**
 * EditableInput
 *
 * Purpose:
 * - Used when a job is in edit mode
 * - Replaces task name text with an input
 * - Matches glassmorphism UI & table alignment
 */
const EditableInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  border-radius: 8px;

  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
  font-size: 14px;
  font-weight: 500;

  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}22;
  }
`;

/* ---------- Component ---------- */

const JobTable = ({ jobs, onJobUpdate }) => {
  const navigate = useNavigate();

  /**
   * editingId:
   * - Stores the job id currently being edited
   * - If null → no row is in edit mode
   */
  const [editingId, setEditingId] = useState(null);

  /**
   * editValues:
   * - Holds temporary values while editing
   * - Used before saving to backend
   */
  const [editValues, setEditValues] = useState({
    taskName: "",
    priority: "",
  });

  /**
   * Enable edit mode for a row
   */
  const handleEdit = (job) => {
    setEditingId(job.id);
    setEditValues({
      taskName: job.taskName,
      priority: job.priority,
    });
  };

  /**
   * Save edited values
   * - Sends PATCH request to backend
   * - Exits edit mode on success
   */
  const handleSave = async (id) => {
    try {
      await updateJob(id, editValues);
      setEditingId(null);
      onJobUpdate(); // refresh table data
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  /**
   * Cancel editing
   */
  const handleCancel = () => {
    setEditingId(null);
  };

  /**
   * Run job (only when pending)
   */
  const handleRun = async (id) => {
    await runJob(id);
    onJobUpdate();
  };

  /**
   * Delete job (only when completed)
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await deleteJob(id);
    onJobUpdate();
  };

  return (
    <TableWrapper>
      <Table>
        <thead>
          <tr>
            <Th style={{ width: "80px" }}>ID</Th>
            <Th>Task</Th>
            <Th style={{ width: "120px" }}>Priority</Th>
            <Th style={{ width: "140px", textAlign: "center" }}>Status</Th>
            <Th style={{ width: "220px", textAlign: "center" }}>Actions</Th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <Tr key={job.id}>
              <Td>{job.id}</Td>

              {/* TASK NAME */}
              <Td>
                {editingId === job.id ? (
                  <EditableInput
                    value={editValues.taskName}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        taskName: e.target.value,
                      })
                    }
                    autoFocus
                  />
                ) : (
                  <ClickableTask onClick={() => navigate(`/jobs/${job.id}`)}>
                    {job.taskName}
                  </ClickableTask>
                )}
              </Td>

              {/* PRIORITY */}
              <Td>
                {editingId === job.id ? (
                  <GlassSelect
                    value={editValues.priority}
                    onChange={(value) =>
                      setEditValues({
                        ...editValues,
                        priority: value,
                      })
                    }
                    options={[
                      { label: "Low", value: "Low" },
                      { label: "Medium", value: "Medium" },
                      { label: "High", value: "High" },
                    ]}
                  />
                ) : (
                  job.priority
                )}
              </Td>

              {/* STATUS */}
              <Td>
                <StatusWrapper>
                  <StatusBadge $status={job.status}>{job.status}</StatusBadge>
                </StatusWrapper>
              </Td>

              {/* ACTIONS */}
              <Td>
                <ActionGroup>
                  {editingId === job.id ? (
                    <>
                      <SaveButton onClick={() => handleSave(job.id)}><MdSaveAlt size={20}/></SaveButton>
                      <DangerButton onClick={handleCancel}><MdOutlineCancel size={24}/></DangerButton>
                    </>
                  ) : (
                    <>
                      {job.status === "pending" && (
                        <Button onClick={() => handleRun(job.id)}><VscRunAll size={20}/></Button>
                      )}

                      {job.status !== "running" && (
                        <SecondaryButton onClick={() => handleEdit(job)}>
                          <FaRegEdit size={20}/>
                        </SecondaryButton>
                      )}
                      {job.status === "completed" && (
                        <DangerButton onClick={() => handleDelete(job.id)}>
                          <MdDeleteOutline size={22}/>
                        </DangerButton>
                      )}
                    </>
                  )}
                </ActionGroup>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default JobTable;
