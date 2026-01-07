/**
 * JobForm Component
 *
 * Purpose:
 * - Allows user to create a new background job
 * - Collects task name, priority, and task configuration
 * - Sends data to backend via createJob API
 *
 * Used in:
 * - CreateJobPage
 */

import { useState } from "react";
import styled from "styled-components";
import { createJob } from "../services/jobApi";
import GlassSelect from "../styles/GlassSelect";

/* ---------- Styled Components ---------- */

/**
 * Main form container
 * - Glass-style card
 * - Uses <form> to support submit behavior
 */
const FormCard = styled.form`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
`;

/* Wrapper for each form field */
const Field = styled.div`
  margin-bottom: 26px;
`;

/* Field label */
const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
`;

/* Text input */
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: transparent;
  color: inherit;
`;

/**
 * Row layout for task type + value
 * - Side by side on desktop
 * - Stacked on mobile
 */
const Row = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 2fr;
  gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

/* Radio button group for priority */
const RadioGroup = styled.div`
  display: flex;
  gap: 50px;
`;

/* Radio label */
const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
`;

/* Radio input */
const RadioInput = styled.input`
  accent-color: ${({ theme }) => theme.primary};
  cursor: pointer;
`;

/* ---------- Component ---------- */

/**
 * JobForm
 *
 * Props:
 * - onJobCreated → callback triggered after successful job creation
 */
const JobForm = ({ onJobCreated }) => {
  /* Form state */
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [taskType, setTaskType] = useState("email");
  const [value, setValue] = useState("");

  /**
   * Handle form submit
   * - Prevents page reload
   * - Builds payload object
   * - Calls backend API
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Task-specific payload
    const payload = {
      type: taskType,
      value,
    };

    // API call
    await createJob({
      taskName,
      priority,
      payload,
    });

    // Reset form
    setTaskName("");
    setPriority("Low");
    setTaskType("email");
    setValue("");

    // Notify parent component
    onJobCreated();
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      {/* Task name */}
      <Field>
        <Label>Task Name</Label>
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </Field>

      {/* Priority selection */}
      <Field>
        <Label>Priority</Label>
        <RadioGroup>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="priority"
              value="Low"
              checked={priority === "Low"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Low
          </RadioLabel>

          <RadioLabel>
            <RadioInput
              type="radio"
              name="priority"
              value="Medium"
              checked={priority === "Medium"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Medium
          </RadioLabel>

          <RadioLabel>
            <RadioInput
              type="radio"
              name="priority"
              value="High"
              checked={priority === "High"}
              onChange={(e) => setPriority(e.target.value)}
            />
            High
          </RadioLabel>
        </RadioGroup>
      </Field>

      {/* Task configuration */}
      <Field>
        <Label>Task Configuration</Label>

        <Row>
          {/* Task type selector */}
          <GlassSelect
            value={taskType}
            onChange={setTaskType}
            placeholder="Select task type"
            options={[
              { label: "Send Email", value: "email" },
              { label: "Send SMS", value: "sms" },
              { label: "Webhook URL", value: "webhook" },
              { label: "Notification", value: "notification" },
            ]}
          />

          {/* Dynamic input based on task type */}
          <Input
            placeholder={
              taskType === "email"
                ? "Enter email address"
                : taskType === "sms"
                ? "Enter phone number"
                : taskType === "webhook"
                ? "Enter webhook URL"
                : "Enter message"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </Row>
      </Field>

      {/* Submit */}
      <Button type="submit">Create Job</Button>
    </FormCard>
  );
};

export default JobForm;
