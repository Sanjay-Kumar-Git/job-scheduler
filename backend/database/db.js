/**
 * db.js
 *
 * Purpose:
 * - Initializes SQLite database connection
 * - Creates required tables if they don't exist
 * - Exports a shared database instance
 *
 * Why SQLite?
 * - Lightweight
 * - File-based
 * - Perfect for demos, assignments, and local job schedulers
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

/* -------------------------------------------------------------------------- */
/*                            OPEN DATABASE CONNECTION                         */
/* -------------------------------------------------------------------------- */
/**
 *
 * Opens (or creates) the SQLite database file
 * - filename: local database file
 * - driver: sqlite3 driver
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const db = await open({
  filename: path.join(__dirname, "../jobs.db"),
  driver: sqlite3.Database,
});

/* -------------------------------------------------------------------------- */
/*                               CREATE TABLE                                 */
/* -------------------------------------------------------------------------- */
/**
 * Creates the `jobs` table if it does not exist
 *
 * Table columns:
 * - id          : unique job identifier
 * - taskName    : name of the job/task
 * - payload     : optional JSON data (stored as string)
 * - priority    : job priority (low / medium / high)
 * - status      : pending | running | completed
 * - createdAt   : job creation timestamp
 * - updatedAt   : last update timestamp
 * - completedAt : completion timestamp
 */
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
/*                              DEBUG / VERIFY                                */
/* -------------------------------------------------------------------------- */
/**
 * Logs existing tables in the database
 * Useful during development to confirm table creation
 */
const rows = await db.all(
  "SELECT name FROM sqlite_master WHERE type='table'"
);
console.log(rows);
