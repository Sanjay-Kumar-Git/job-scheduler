/**
 * db.js
 *
 * Purpose:
 * - Initializes SQLite database connection
 * - Creates required tables if they don't exist
 * - Safely adds new columns without breaking existing data
 * - Exports a shared database instance
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

/* -------------------------------------------------------------------------- */
/*                            OPEN DATABASE CONNECTION                         */
/* -------------------------------------------------------------------------- */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = await open({
  filename: path.join(__dirname, "../jobs.db"),
  driver: sqlite3.Database,
});

/* -------------------------------------------------------------------------- */
/*                               CREATE TABLE                                 */
/* -------------------------------------------------------------------------- */

await db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    payload TEXT,
    priority TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    completedAt DATETIME
  )
`);

/* -------------------------------------------------------------------------- */
/*                     ADD WEBHOOK STATUS COLUMN (SAFE)                        */
/* -------------------------------------------------------------------------- */
/**
 * SQLite does NOT support "ADD COLUMN IF NOT EXISTS"
 * So we wrap it in try/catch to avoid crashing on restart
 */

try {
  await db.exec(`
    ALTER TABLE jobs
    ADD COLUMN webhookStatus TEXT DEFAULT 'pending'
  `);
} catch (error) {
  // Column already exists → ignore error safely
}

/* -------------------------------------------------------------------------- */
/*                              DEBUG / VERIFY                                */
/* -------------------------------------------------------------------------- */

const rows = await db.all(
  "SELECT name FROM sqlite_master WHERE type='table'"
);

console.log("Tables in DB:", rows);
