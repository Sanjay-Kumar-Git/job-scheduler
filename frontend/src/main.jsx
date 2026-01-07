/**
 * Application Entry Point
 *
 * Purpose:
 * - Bootstraps the React application
 * - Mounts the root App component to the DOM
 *
 * This file runs exactly once when the app loads.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* ---------- Create React Root ---------- */
/*
  React 18 uses createRoot instead of ReactDOM.render
  This enables concurrent features and better performance
*/
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

/* ---------- Render Application ---------- */
/*
  React.StrictMode:
  - Runs extra checks in development
  - Helps identify side effects and deprecated patterns
  - Does NOT affect production builds
*/
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
