/**
 * jobApi.js
 *
 * Purpose:
 * - Centralized API layer for all Job-related backend requests
 * - Keeps HTTP logic separate from UI components
 *
 * Benefits:
 * - Cleaner components
 * - Easier maintenance
 * - Single place to update API base URL
 */

import axios from "axios";

/* ---------- Axios Instance ---------- */
/*
  Creates a reusable Axios instance
  - baseURL points to backend server
  - Can be extended later with interceptors (auth, logging, etc.)
*/
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* ---------- API Methods ---------- */

/**
 * Create a new job
 * @param {Object} jobData - Job payload (taskName, priority, payload, etc.)
 */
export const createJob = (jobData) => {
  return API.post("/jobs", jobData);
};

/**
 * Fetch all jobs
 * Used on Jobs dashboard
 */
export const getJobs = () => {
  return API.get("/jobs");
};

/**
 * Fetch a single job by ID
 * Used for search and deep linking
 * @param {number|string} id - Job ID
 */
export const getJobById = (id) => {
  return API.get(`/jobs/${id}`);
};

/**
 * Run a job
 * Triggers backend execution logic
 * @param {number|string} id - Job ID
 */
export const runJob = (id) => {
  return API.post(`/jobs/${id}/run`);
};

/**
 * Update a job (edit functionality)
 * Used when editing job details inline
 * @param {number|string} id - Job ID
 * @param {Object} data - Fields to update
 */
export const updateJob = (id, data) => {
  return API.patch(`/jobs/${id}`, data);
};

/**
 * Delete a job
 * Allowed only when job is completed
 * @param {number|string} id - Job ID
 */
export const deleteJob = (id) => {
  return API.delete(`/jobs/${id}`);
};
