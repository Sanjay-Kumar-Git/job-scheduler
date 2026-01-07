/**
 * App
 *
 * Purpose:
 * - Root component of the application
 * - Sets up theme handling, global styles, and routing
 *
 * Responsibilities:
 * - Provides ThemeContext to entire app
 * - Applies global CSS styles
 * - Defines application routes
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeContextProvider } from "./context/ThemeContext";
import GlobalStyles from "./styles/GlobalStyles";

import CreateJobPage from "./pages/CreateJobPage";
import JobsPage from "./pages/JobsPage";
import NotFound from './pages/NotFound'

/* ---------- Component ---------- */

const App = () => {
  return (
    /**
     * ThemeContextProvider
     * - Manages light/dark theme state
     * - Wraps entire app so theme is accessible everywhere
     */
    <ThemeContextProvider>
      {/* Global CSS rules (reset, typography, theme colors) */}
      <GlobalStyles />

      {/* React Router configuration */}
      <BrowserRouter>
        <Routes>
          {/* Create Job page */}
          <Route path="/" element={<CreateJobPage />} />

          {/* Jobs dashboard page */}
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
