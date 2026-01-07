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
  // Read webhook URL from environment variables
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  // Safety check: webhook is optional
  if (!WEBHOOK_URL) {
    console.error("Webhook URL missing");
    return;
  }

  try {
    // Send POST request to external service
    await axios.post(WEBHOOK_URL, data);

    console.log("Webhook triggered successfully");
  } catch (error) {
    // Log error but DO NOT crash job execution
    console.log(`Webhook failed: ${error.message}`);
  }
};
