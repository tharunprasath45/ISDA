import React, { useEffect, useState } from "react";
import "./jobinsights.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { renderheader, header } from "./Dashboardcontent";
import {
  Bookmark,
  MapPin,
  Briefcase,
  IndianRupee,
  Building2,
} from "lucide-react";

function Jobinsights() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Find your Job" };
    return intro;
  });

  const [findjobs, setFindJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobsdb");
      setFindJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="jobinsights-page">
      <div>{renderheader(updateskills)}</div>

      <div className="jobinsights-top">
        <p className="jobinsights-subtext">
          Browse the latest openings and view job details in a clean, modern
          layout.
        </p>
      </div>

      <div className="job-wrapper">
        {loading ? (
          <div className="empty-card">
            <h2>Loading jobs...</h2>
          </div>
        ) : findjobs.length === 0 ? (
          <div className="empty-card">
            <h2>No jobs posted yet</h2>
            <p>Once a recruiter posts a job, it will appear here.</p>
          </div>
        ) : (
          <div className="job-grid">
            {findjobs.map((findjob) => (
              <div key={findjob._id} className="job-card">
                <div className="job-card-header">
                  <div className="job-company-block">
                    <div className="job-logo-circle">
                      <span>
                        {findjob.companyName?.charAt(0)?.toUpperCase() || "C"}
                      </span>
                    </div>

                    <div className="job-company-info">
                      <h4 className="job-company-name">
                        {findjob.companyName || "Company Name"}
                      </h4>
                      <p className="job-location">
                        <MapPin size={15} />
                        {findjob.location || "Location not provided"}
                      </p>
                    </div>
                  </div>

                  <button className="bookmark-circle" type="button">
                    <Bookmark size={18} />
                  </button>
                </div>

                <div className="job-main-content">
                  <h2 className="job-title">
                    {findjob.jobTitle || "Job Title"}
                  </h2>

                  <div className="job-meta-line">
                    <span>
                      <Briefcase size={15} />
                      {findjob.employmentType || "Full-time"}
                    </span>
                    <span>
                      <Building2 size={15} />
                      {findjob.experienceLevel || "Mid Level"}
                    </span>
                  </div>

                  <div className="job-tags">
                    <span className="job-tag">{findjob.category || "IT"}</span>
                    <span className="job-tag">
                      {findjob.employmentType || "Full-time"}
                    </span>
                    <span className="job-tag">
                      {findjob.experienceLevel || "Mid"}
                    </span>
                  </div>

                  <p className="job-description-preview">
                    {findjob.description
                      ? findjob.description.slice(0, 120) + "..."
                      : "No description available for this role."}
                  </p>
                </div>

                <div className="job-card-footer">
                  <p className="job-salary">
                    <IndianRupee size={18} />
                    {findjob.minSalary || "40000"} -{" "}
                    {findjob.maxSalary || "60000"}
                    <span> /month</span>
                  </p>

                  <div className="job-action-buttons">
                    <Link to={`/ViewDetails/${findjob._id}`}>
                      <button className="job-btn view-btn" type="button">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobinsights;
