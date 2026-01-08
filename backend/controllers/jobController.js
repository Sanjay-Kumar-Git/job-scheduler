/**
 * jobController.js
 *
 * Purpose:
 * - Handles HTTP requests and responses
 * - Manages job lifecycle
 * - Triggers webhook on completion
 */

import {
  insertJob,
  fetchJobs,
  fetchJobById,
  updateJobStatus,
  deleteJobById,
  updateJobById,
  updateWebhookStatus,
} from "../services/jobService.js";

import { triggerWebhook } from "../services/webhookService.js";

/* -------------------------------------------------------------------------- */
/*                               CREATE JOB                                   */
/* -------------------------------------------------------------------------- */
export const createJob = async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    if (!taskName || !priority) {
      return res.status(400).json({
        message: "taskName and priority are required",
      });
    }

    const jobId = await insertJob({
      taskName,
      payload,
      priority,
    });

    console.log("✅ Job created with ID:", jobId);

    res.status(201).json({
      message: "Job created successfully",
      jobId,
    });
  } catch (error) {
    console.error("❌ Create job error:", error.message);
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               GET ALL JOBS                                 */
/* -------------------------------------------------------------------------- */
export const getJobs = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const jobs = await fetchJobs({ status, priority });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                               GET JOB BY ID                                */
/* -------------------------------------------------------------------------- */
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await fetchJobById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                                RUN JOB                                     */
/* -------------------------------------------------------------------------- */
export const runJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await fetchJobById(id);

    console.log("▶️ Run job requested for ID:", id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status !== "pending") {
      return res.status(400).json({
        message: `Job already ${job.status}`,
      });
    }

    // Mark job as running
    await updateJobStatus(id, "running");
    console.log("⏳ Job marked as RUNNING");

    res.json({ message: "Job started" });

    // 🔴 SIMULATED BACKGROUND EXECUTION
    setTimeout(async () => {
      console.log("⏰ setTimeout fired for job ID:", id);

      try {
        // Mark job completed
        await updateJobStatus(id, "completed", true);
        console.log("✅ Job marked as COMPLETED");

        const webhookPayload = {
          jobId: job.id,
          taskName: job.taskName,
          status: "completed",
          priority: job.priority,
          payload: job.payload ? JSON.parse(job.payload) : null,
          completedAt: new Date(),
        };

        console.log("📤 Sending webhook payload:", webhookPayload);

        try {
          await triggerWebhook(webhookPayload);
          console.log("✅ Webhook SUCCESS");
          await updateWebhookStatus(id, "success");
        } catch (webhookError) {
          console.error("❌ Webhook FAILED");
          await updateWebhookStatus(id, "failed");
        }

      } catch (err) {
        console.error("❌ Background job error:", err.message);
      }
    }, 3000);

  } catch (error) {
    console.error("❌ Run job error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                               DELETE JOB                                   */
/* -------------------------------------------------------------------------- */
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await fetchJobById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.status === "running") {
      return res.status(400).json({
        message: "Cannot delete a running job",
      });
    }

    await deleteJobById(id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                               UPDATE JOB                                   */
/* -------------------------------------------------------------------------- */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, priority } = req.body;

    if (!taskName || !priority) {
      return res.status(400).json({
        message: "taskName and priority are required",
      });
    }

    const updatedRows = await updateJobById(id, {
      taskName,
      priority,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};
