/**
 * jobRoutes.js
 *
 * Purpose:
 * - Defines all REST API endpoints related to jobs
 * - Maps HTTP routes to controller functions
 *
 * Architecture:
 * Client → Routes → Controllers → Services → Database
 */

import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  runJob,
  deleteJob,
  updateJob
} from "../controllers/jobController.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                CREATE JOB                                  */
/* -------------------------------------------------------------------------- */
/**
 * POST /jobs
 * Creates a new job
 *
 * Body:
 * {
 *   taskName: string,
 *   payload?: object,
 *   priority: string
 * }
 */
router.post("/", createJob);

/* -------------------------------------------------------------------------- */
/*                                GET ALL JOBS                                */
/* -------------------------------------------------------------------------- */
/**
 * GET /jobs
 * Fetches all jobs
 *
 * Optional Query Params:
 * - status
 * - priority
 */
router.get("/", getJobs);

/* -------------------------------------------------------------------------- */
/*                               GET JOB BY ID                                */
/* -------------------------------------------------------------------------- */
/**
 * GET /jobs/:id
 * Fetches a single job by its ID
 */
router.get("/:id", getJobById);

/* -------------------------------------------------------------------------- */
/*                                RUN A JOB                                   */
/* -------------------------------------------------------------------------- */
/**
 * POST /jobs/:id/run
 * Starts execution of a pending job
 *
 * - Changes status from "pending" → "running"
 * - Completes asynchronously in background
 */
router.post("/:id/run", runJob);

/* -------------------------------------------------------------------------- */
/*                               DELETE A JOB                                 */
/* -------------------------------------------------------------------------- */
/**
 * DELETE /jobs/:id
 * Deletes a job
 *
 * Rules:
 * - Running jobs cannot be deleted
 * - Only pending or completed jobs are allowed
 */
router.delete("/:id", deleteJob);

/* -------------------------------------------------------------------------- */
/*                               UPDATE A JOB                                 */
/* -------------------------------------------------------------------------- */
/**
 * PATCH /jobs/:id
 * Updates editable job fields
 *
 * Body:
 * {
 *   taskName: string,
 *   priority: string
 * }
 */
router.patch("/:id", updateJob);

/* -------------------------------------------------------------------------- */

export default router;
