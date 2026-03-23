import React, { useEffect, useState } from "react";
import axios from "axios";
import { header, renderheader } from "./Dashboardcontent";
import { CircleStar, MapPin, Trash2 } from "lucide-react";

function Recommendations() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Applied Jobs" };
    return intro;
  });

  const [appliedJob, setAppliedJob] = useState([]);

  const user = JSON.parse(localStorage.getItem("users")) || {};
  const userEmail = user.email;

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/applicants/user/${encodeURIComponent(userEmail)}`
      );
      setAppliedJob(res.data);
      localStorage.setItem("monthlyhires", res.data.length);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchAppliedJobs();
    }
  }, [userEmail]);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_URL}/api/applicants/${jobId}`);
      setAppliedJob((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting applied job:", error);
    }
  };

  const getBadgeClass = (status) => {
    if (status === "Selected") return "selected-text";
    if (status === "Rejected") return "rejected-text";
    return "applied-text";
  };

  return (
    <div>
      {renderheader(updateskills)}

      <div className="applied-jobs-page">
        <p>Track the jobs you've applied for and download your resumes.</p>

        {appliedJob.length === 0 ? (
          <div className="no-applied-jobs">
            <p>No jobs applied yet.</p>
          </div>
        ) : (
          appliedJob.map((job) => (
            <div className="applied-job-card" key={job._id}>
              <div className="applied-job-left">
                <h2>{job.jobTitle}</h2>

                <div className="applied-job-meta">
                  <span
                    className={getBadgeClass(job.status)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <CircleStar
                      size={16}
                      color={
                        job.status === "Selected"
                          ? "green"
                          : job.status === "Rejected"
                          ? "red"
                          : "orange"
                      }
                    />
                    {job.status}
                  </span>

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <MapPin size={15} color="orange" />
                    {job.location || "Unknown location"}
                  </span>
                </div>
              </div>

              <div className="applied-job-right">
                <span className={getBadgeClass(job.status)}>{job.status}</span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="resume-btn"
                    onClick={() => handleDelete(job._id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Recommendations;