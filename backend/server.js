/**
 * server.js
 *
 * Purpose:
 * - Loads environment variables
 * - Starts the Express server
 *
 * This file is responsible ONLY for starting the server.
 * App configuration lives in app.js
 */

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import app from "./app.js";

// ✅ Use environment port for production, fallback for local
const PORT = process.env.PORT || 5000;

/**
 * Start the HTTP server
 * Once running, backend APIs will be available
 * Example: http://localhost:5000/jobs
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
