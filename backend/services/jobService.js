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
export const insertJob = async ({ taskName, payload, priority }) => {
  const status = "pending";

  const result = await db.run(
    `
    INSERT INTO jobs (taskName, payload, priority, status, webhookStatus)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      taskName,
      payload ? JSON.stringify(payload) : null,
      priority,
      status,
      "pending",
    ]
  );

  return result.lastID;
};

/* -------------------------------------------------------------------------- */
/*                               FETCH JOBS                                   */
/* -------------------------------------------------------------------------- */
export const fetchJobs = async ({ status, priority }) => {
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
export const fetchJobById = async (id) => {
  return await db.get(
    "SELECT * FROM jobs WHERE id = ?",
    [id]
  );
};

/* -------------------------------------------------------------------------- */
/*                            UPDATE JOB STATUS                               */
/* -------------------------------------------------------------------------- */
export const updateJobStatus = async (id, status, completed = false) => {
  if (completed) {
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
/*                         UPDATE WEBHOOK STATUS                               */
/* -------------------------------------------------------------------------- */
export const updateWebhookStatus = async (id, status) => {
  await db.run(
    `
    UPDATE jobs
    SET webhookStatus = ?,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
    `,
    [status, id]
  );
};

/* -------------------------------------------------------------------------- */
/*                              DELETE JOB                                    */
/* -------------------------------------------------------------------------- */
export const deleteJobById = async (id) => {
  return await db.run(
    "DELETE FROM jobs WHERE id = ?",
    [id]
  );
};

/* -------------------------------------------------------------------------- */
/*                              UPDATE JOB                                    */
/* -------------------------------------------------------------------------- */
export const updateJobById = async (id, { taskName, priority }) => {
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

  return result.changes;
};
