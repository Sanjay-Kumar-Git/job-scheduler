/**
 * webhookService.js
 *
 * Purpose:
 * - Sends job completion data to an external system
 * - Simulates real-world integrations like Slack, Zapier, or monitoring services
 *
 * This file is triggered when a job completes successfully.
 */

import axios from "axios";

/**
 * Triggers an external webhook with job data
 *
 * @param {Object} data
 * - Contains jobId, taskName, status, priority, payload, completedAt
 */
export const triggerWebhook = async (data) => {
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  // 🔴 CRITICAL DEBUG LOG
  console.log("Webhook URL being used:", WEBHOOK_URL);

  // Safety check: webhook is optional
  if (!WEBHOOK_URL) {
    throw new Error("WEBHOOK_URL is missing in environment variables");
  }

  try {
    await axios.post(WEBHOOK_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000, // avoid hanging forever
    });

    console.log("✅ Webhook triggered successfully");
  } catch (error) {
    console.error(
      "❌ Webhook request failed:",
      error.response?.status,
      error.message
    );

    // IMPORTANT: rethrow error so controller can mark webhookStatus = failed
    throw error;
  }
};
