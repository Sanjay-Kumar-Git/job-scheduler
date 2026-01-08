/**
 * server.js
 *
 * Purpose:
 * - Loads environment variables
 * - Starts the Express server
 * - Verifies environment variables are loaded correctly
 */

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import app from "./app.js";

// 🔴 CRITICAL DEBUG LOG (DO NOT SKIP)
console.log("🔍 Loaded WEBHOOK_URL:", process.env.WEBHOOK_URL);

// ✅ Use environment port for production, fallback for local
const PORT = process.env.PORT || 5000;

/**
 * Start the HTTP server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
