/**
 * jobController.js
 *
 * Purpose:
 * - Acts as the controller layer in MVC architecture
 * - Handles HTTP requests and responses
 * - Delegates database logic to jobService
 * - Manages job lifecycle (create, run, update, delete)
 */

import {
  insertJob,
  fetchJobs,
  fetchJobById,
  updateJobStatus,
  deleteJobById,
  updateJobById
} from "../services/jobService.js";

import { triggerWebhook } from "../services/webhookService.js";

/* -------------------------------------------------------------------------- */
/*                               CREATE JOB                                   */
/* -------------------------------------------------------------------------- */
/**
 * POST /jobs
 * - Creates a new job
 * - Initial status is set to "pending"
 */
export const createJob = async (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    // Basic validation
    if (!taskName || !priority) {
      return res.status(400).json({
        message: "taskName and priority are required",
      });
    }

    // Insert job into database
    const jobId = await insertJob({
      taskName,
      payload,
      priority,
    });

    res.status(201).json({
      message: "Job created successfully",
      jobId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
      error: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                               GET ALL JOBS                                 */
/* -------------------------------------------------------------------------- */
/**
 * GET /jobs
 * - Fetches all jobs
 * - Supports optional filtering by status and priority
 */
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
/**
 * GET /jobs/:id
 * - Fetches a single job by ID
 */
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await fetchJobById(id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                                RUN JOB                                     */
/* -------------------------------------------------------------------------- */
/**
 * POST /jobs/:id/run
 *
 * Flow:
 * 1. Check job exists
 * 2. Allow execution only if status is "pending"
 * 3. Update status to "running"
 * 4. Simulate async execution using setTimeout
 * 5. Mark job as "completed"
 * 6. Trigger webhook on completion
 */
export const runJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await fetchJobById(id);

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

    res.json({ message: "Job started" });

    // Simulate background processing
    setTimeout(async () => {
      try {
        // Mark job as completed
        await updateJobStatus(id, "completed", true);

        // Trigger webhook after completion
        await triggerWebhook({
          jobId: job.id,
          taskName: job.taskName,
          status: "completed",
          priority: job.priority,
          payload: job.payload ? JSON.parse(job.payload) : null,
          completedAt: new Date(),
        });
      } catch (err) {
        console.error("Background job error:", err.message);
      }
    }, 3000);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                               DELETE JOB                                   */
/* -------------------------------------------------------------------------- */
/**
 * DELETE /jobs/:id
 * - Deletes a job
 * - Prevents deletion if job is currently running
 */
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
/**
 * PATCH /jobs/:id
 * - Updates job fields (taskName, priority)
 * - Used for inline edit feature in frontend
 */
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, priority } = req.body;

    // Validation
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
    console.error("Update error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};
