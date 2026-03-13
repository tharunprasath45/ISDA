import React, { useEffect, useState } from "react";
import "./jobinsights.css";
import { renderheader, header } from "./Dashboardcontent";
import { Bookmark, MapPin } from "lucide-react";

function Jobinsights() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Find your Job" };
    return intro;
  });

  const [findjobs, setFindJobs] = useState([]);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobinsights")) || [];
    setFindJobs(savedJobs);
  }, []);

  return (
    <div className="total-width-1">
      <div>{renderheader(updateskills)}</div>
      <p className="overview">View and apply to the latest job postings.</p>

      <div className="job-wrapper">
        {findjobs.length === 0 ? (
          <div className="profile-card empty-card">
            <h2 className="card-title">No jobs posted yet</h2>
            <p className="card-subtitle">
              Once a recruiter posts a job, it will appear here.
            </p>
          </div>
        ) : (
          <div className="job-grid">
            {findjobs.map((findjob) => (
              <div key={findjob.id} className="job-card">
                <div className="job-top">
                  <div className="job-company-block">
                    <div className="job-logo-circle">
                      <span>
                        {findjob.companyName?.charAt(0)?.toUpperCase() || "C"}
                      </span>
                    </div>

                    <div>
                      <h4 className="job-company-name">
                        {findjob.companyName}
                      </h4>
                      <p className="job-location">
                        <MapPin color="black" size={15} />
                        {findjob.location || "Location not provided"}
                      </p>
                    </div>
                  </div>

                  <button className="bookmark-circle">
                    <Bookmark size={18} />
                  </button>
                </div>

                <h2 className="job-title">{findjob.jobTitle}</h2>

                <div className="job-tags">
                  <span className="job-tag">
                    {findjob.employmentType || "Full-time"}
                  </span>
                  <span className="job-tag">
                    {findjob.experienceLevel || "Mid"}
                  </span>
                </div>

                <div className="job-card-bottom">
                  <p className="job-salary">
                    ₹{findjob.minSalary || "40000"} - ₹
                    {findjob.maxSalary || "60000"}
                    <span> /month</span>
                  </p>

                  <button className="job-btn">View Details</button>
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
