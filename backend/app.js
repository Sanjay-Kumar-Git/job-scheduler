/**
 * app.js
 *
 * Purpose:
 * - Creates and configures the Express application
 * - Registers global middleware
 * - Connects route handlers
 *
 * This file does NOT start the server.
 * Server startup happens in server.js
 */

import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes.js";

// Create Express application instance
const app = express();

/* ---------- Global Middleware ---------- */

// Enable Cross-Origin Resource Sharing
// Allows frontend (React app) to talk to backend APIs
app.use(cors());

// Parse incoming JSON request bodies
// Required for POST, PATCH requests
app.use(express.json());

/* ---------- Routes ---------- */

// All job-related APIs are prefixed with /jobs
// Example:
// POST   /jobs
// GET    /jobs
// GET    /jobs/:id
// POST   /jobs/:id/run
// PATCH  /jobs/:id
// DELETE /jobs/:id
app.use("/jobs", jobRoutes);

// Export app for server startup
export default app;
