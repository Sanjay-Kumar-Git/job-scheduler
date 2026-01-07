/**
 * jobService.js
 *
 * Purpose:
 * - Handles all database operations related to jobs
 * - Acts as a bridge between controllers and SQLite database
 *
 * Layer:
 * Controllers → Services (this file) → Database
 */

import { db } from "../database/db.js";

/* -------------------------------------------------------------------------- */
/*                               CREATE JOB                                   */
/* -------------------------------------------------------------------------- */
/**
 * Inserts a new job into the database
 *
 * @param {Object} job
 * @param {string} job.taskName  - Name of the job
 * @param {Object} job.payload   - Optional payload (stored as JSON string)
 * @param {string} job.priority  - Job priority (low / medium / high)
 *
 * @returns {number} Newly created job ID
 */
export const insertJob = async ({ taskName, payload, priority }) => {
  const status = "pending"; // default status for all new jobs

  const result = await db.run(
    `
    INSERT INTO jobs (taskName, payload, priority, status)
    VALUES (?, ?, ?, ?)
    `,
    [
      taskName,
      payload ? JSON.stringify(payload) : null, // safely store JSON
      priority,
      status,
    ]
  );

  return result.lastID; // SQLite auto-generated ID
};

/* -------------------------------------------------------------------------- */
/*                               FETCH JOBS                                   */
/* -------------------------------------------------------------------------- */
/**
 * Fetches jobs with optional filters
 *
 * @param {Object} filters
 * @param {string} filters.status   - Optional job status filter
 * @param {string} filters.priority - Optional priority filter
 *
 * @returns {Array} List of jobs
 */
export const fetchJobs = async ({ status, priority }) => {
  // Base query always true → allows dynamic AND conditions
  let query = "SELECT * FROM jobs WHERE 1=1";
  const params = [];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (priority) {
    query += " AND priority = ?";
    params.push(priority);
  }

  return await db.all(query, params);
};

/* -------------------------------------------------------------------------- */
/*                            FETCH JOB BY ID                                 */
/* -------------------------------------------------------------------------- */
/**
 * Fetches a single job by ID
 *
 * @param {number} id - Job ID
 * @returns {Object|null} Job object or null if not found
 */
export const fetchJobById = async (id) => {
  return await db.get(
    "SELECT * FROM jobs WHERE id = ?",
    [id]
  );
};

/* -------------------------------------------------------------------------- */
/*                            UPDATE JOB STATUS                               */
/* -------------------------------------------------------------------------- */
/**
 * Updates job status
 *
 * Used when:
 * - Job starts running
 * - Job completes execution
 *
 * @param {number} id        - Job ID
 * @param {string} status    - New status (running / completed)
 * @param {boolean} completed - Whether job is completed
 */
export const updateJobStatus = async (
  id,
  status,
  completed = false
) => {
  if (completed) {
    // Final state → also update completed timestamp
    await db.run(
      `
      UPDATE jobs
      SET status = ?,
          completedAt = CURRENT_TIMESTAMP,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [status, id]
    );
  } else {
    // Intermediate state (running)
    await db.run(
      `
      UPDATE jobs
      SET status = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [status, id]
    );
  }
};

/* -------------------------------------------------------------------------- */
/*                              DELETE JOB                                    */
/* -------------------------------------------------------------------------- */
/**
 * Deletes a job by ID
 *
 * @param {number} id - Job ID
 */
export const deleteJobById = async (id) => {
  return await db.run(
    "DELETE FROM jobs WHERE id = ?",
    [id]
  );
};

/* -------------------------------------------------------------------------- */
/*                              UPDATE JOB                                    */
/* -------------------------------------------------------------------------- */
/**
 * Updates editable job fields
 *
 * Used for inline editing from frontend
 *
 * @param {number} id - Job ID
 * @param {Object} data
 * @param {string} data.taskName
 * @param {string} data.priority
 *
 * @returns {number} Number of rows updated (0 = not found)
 */
export const updateJobById = async (
  id,
  { taskName, priority }
) => {
  const result = await db.run(
    `
    UPDATE jobs
    SET taskName = ?,
        priority = ?,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [taskName, priority, id]
  );

  return result.changes; // SQLite rows affected
};
