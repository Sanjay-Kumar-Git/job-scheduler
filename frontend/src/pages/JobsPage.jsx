/**
 * JobsPage
 *
 * Purpose:
 * - Displays all jobs in table (desktop) and cards (mobile)
 * - Supports filtering, searching by ID, and live status updates
 * - Syncs job search with URL query params
 *
 * Key Features:
 * - Polling for running jobs
 * - Search by Job ID (API-level)
 * - Client-side filtering (status & priority)
 * - Responsive layout (table vs cards)
 */

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../layout/Navbar";
import MobileNavbar from "../layout/MobileNavbar";
import Footer from "../layout/Footer";

import Filters from "../components/Filters";
import JobTable from "../components/JobTable";
import JobCard from "../components/JobCard";
import EmptyState from "../components/EmptyState";

import { getJobs, getJobById } from "../services/jobApi";

/* ---------- Layout Styles ---------- */

/*
  Adds spacing so content doesn't overlap
  fixed navbar and footer
*/
const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 140px;
`;

/*
  Centers content and limits width
*/
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

/*
  Desktop-only container
*/
const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

/*
  Mobile-only container
*/
const MobileOnly = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

/* ---------- Component ---------- */

const JobsPage = () => {
  /* ---------- State ---------- */

  // All jobs fetched from backend
  const [jobs, setJobs] = useState([]);

  // Filter values controlled by Filters component
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    id: "",
  });

  // URL query params (?id=12)
  const [searchParams, setSearchParams] = useSearchParams();

  // Reference to polling interval
  const pollingRef = useRef(null);

  /* ---------- Fetch All Jobs ---------- */
  /**
   * Fetches all jobs from backend
   * Stops polling when no jobs are running
   */
  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);

    const hasRunning = res.data.some((job) => job.status === "running");

    if (!hasRunning && pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  /* ---------- Polling ---------- */
  /**
   * Starts polling backend every 1.5s
   * Used while jobs are running
   */
  const startPolling = () => {
    if (pollingRef.current) return;

    pollingRef.current = setInterval(fetchJobs, 1500);
  };

  /* ---------- Search by ID (Backend) ---------- */
  /**
   * Fetches a single job by ID
   * Used when user searches via Job ID
   */
  const searchById = async (id) => {
    try {
      const res = await getJobById(id);
      setJobs([res.data]);
    } catch {
      alert("Job not found");
      setJobs([]);
    }
  };

  /* ---------- Handle Search Button ---------- */
  /**
   * Handles Search button click
   * - If no ID → show all jobs
   * - If ID → update URL & fetch that job
   */
  const handleSearch = async () => {
    if (!filters.id) {
      setSearchParams({});
      fetchJobs();
      return;
    }

    setSearchParams({ id: filters.id });
    await searchById(filters.id);
  };

  /* ---------- Sync URL → State ---------- */
  /**
   * Reads job ID from URL on page load
   * Ensures refresh/share keeps search state
   */
  useEffect(() => {
    const idFromUrl = searchParams.get("id");

    if (idFromUrl) {
      setFilters((prev) => ({ ...prev, id: idFromUrl }));
      searchById(idFromUrl);
    } else {
      fetchJobs();
    }

    // Cleanup polling on unmount
    return () => pollingRef.current && clearInterval(pollingRef.current);
  }, []);

  /* ---------- Job Actions ---------- */
  /**
   * Called after run/delete/edit actions
   * Keeps UI in sync with backend
   */
  const handleJobUpdate = () => {
    const idFromUrl = searchParams.get("id");

    if (idFromUrl) {
      searchById(idFromUrl);
    } else {
      fetchJobs();
      startPolling();
    }
  };

  /* ---------- Client-Side Filters ---------- */
  /**
   * Filters jobs by status & priority
   * ID filtering is handled via backend
   */
  const filteredJobs = jobs.filter((job) => {
    if (filters.status && job.status !== filters.status) return false;

    if (filters.priority && job.priority !== filters.priority) return false;

    return true;
  });

  return (
    <>
      {/* Top navigation */}
      <Navbar />

      {/* Bottom navigation (mobile) */}
      <MobileNavbar />

      <PageWrapper>
        <Content>
          {/* Filters & Search */}
          <Filters
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />

          {filteredJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DesktopOnly>
                <JobTable jobs={filteredJobs} onJobUpdate={handleJobUpdate} />
              </DesktopOnly>

              <MobileOnly>
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobUpdate={handleJobUpdate}
                  />
                ))}
              </MobileOnly>
            </>
          )}
        </Content>
      </PageWrapper>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default JobsPage;
