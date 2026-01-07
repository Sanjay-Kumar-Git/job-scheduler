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
import  Loader  from "../components/Loader";

import { getJobs, getJobById } from "../services/jobApi";

/* ---------- Layout Styles ---------- */

const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 140px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

/* ---------- Component ---------- */

const JobsPage = () => {
  /* ---------- State ---------- */

  const [jobs, setJobs] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    id: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const pollingRef = useRef(null);

  // ✅ NEW: loading state
  const [loading, setLoading] = useState(true);

  /* ---------- Fetch All Jobs ---------- */
  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await getJobs();
      setJobs(res.data);

      const hasRunning = res.data.some(
        (job) => job.status === "running"
      );

      if (!hasRunning && pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Polling ---------- */
  const startPolling = () => {
    if (pollingRef.current) return;

    pollingRef.current = setInterval(fetchJobs, 1500);
  };

  /* ---------- Search by ID (Backend) ---------- */
  const searchById = async (id) => {
    setLoading(true);

    try {
      const res = await getJobById(id);
      setJobs([res.data]);
    } catch {
      alert("Job not found");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Handle Search Button ---------- */
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
  useEffect(() => {
    const idFromUrl = searchParams.get("id");

    if (idFromUrl) {
      setFilters((prev) => ({ ...prev, id: idFromUrl }));
      searchById(idFromUrl);
    } else {
      fetchJobs();
    }

    return () => pollingRef.current && clearInterval(pollingRef.current);
  }, []);

  /* ---------- Job Actions ---------- */
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
  const filteredJobs = jobs.filter((job) => {
    if (filters.status && job.status !== filters.status) return false;
    if (filters.priority && job.priority !== filters.priority) return false;
    return true;
  });

  return (
    <>
      <Navbar />
      <MobileNavbar />

      <PageWrapper>
        <Content>
          <Filters
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
          />

          {/* ✅ LOADER HANDLING */}
          {loading ? (
            <Loader />
          ) : filteredJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <DesktopOnly>
                <JobTable
                  jobs={filteredJobs}
                  onJobUpdate={handleJobUpdate}
                />
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

      <Footer />
    </>
  );
};

export default JobsPage;
