/**
 * CreateJobPage
 *
 * Purpose:
 * - Main page for creating a new job
 * - Displays job creation form
 * - Shows a success popup once the job is created
 *
 * Flow:
 * 1. User lands on page
 * 2. Fills JobForm and submits
 * 3. SuccessMessage popup appears
 * 4. User can either:
 *    - View all jobs
 *    - Create another job
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Navbar from "../layout/Navbar";
import MobileNavbar from "../layout/MobileNavbar";
import Footer from "../layout/Footer";

import JobForm from "../components/JobForm";
import SuccessMessage from "../components/SuccessMessage";
import HeroSection from "../components/HeroSection";

/* ---------- Page Layout Styles ---------- */
/*
  Adds top spacing to avoid overlap with fixed navbar
  Adds bottom spacing so footer does not stick to content
*/
const PageWrapper = styled.div`
  padding-top: 140px;
  padding-bottom: 140px;
`;

/*
  Centers content and limits width for readability
*/
const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
`;

/* ---------- Component ---------- */

const CreateJobPage = () => {
  // Tracks whether a job has been successfully created
  const [jobCreated, setJobCreated] = useState(false);

  // Used for programmatic navigation
  const navigate = useNavigate();

  return (
    <>
      {/* Top navigation (desktop) */}
      <Navbar />

      {/* Bottom navigation (mobile only) */}
      <MobileNavbar />

      <PageWrapper>
        <Content>
          {/* Hero / Intro section */}
          <HeroSection />

          {/* Job creation form */}
          <JobForm
            onJobCreated={() => setJobCreated(true)}
          />

          {/* Success popup (shown only after job creation) */}
          {jobCreated && (
            <SuccessMessage
              onViewJobs={() => navigate("/jobs")}
              onCreateAnother={() => setJobCreated(false)}
            />
          )}
        </Content>
      </PageWrapper>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default CreateJobPage;
