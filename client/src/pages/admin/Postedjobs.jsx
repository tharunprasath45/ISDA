import React, { useEffect, useState } from "react";
import axios from "axios";
import { renderheader, header } from "../../components/Dashboardcontent";
import { Briefcase, MapPin, Building2, Trash2, Wallet } from "lucide-react";

function Postedjobs() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Jobs Posted" };
    return intro;
  });

  const [jobs, setJobs] = useState([]);

  const recruiter = JSON.parse(localStorage.getItem("admins")) || {};
  const recruiterEmail = recruiter.email;

  const fetchPostedJobs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/jobsdb/recruiter/${encodeURIComponent(
          recruiterEmail,
        )}`,
      );
      setJobs(res.data);
      localStorage.setItem("totalposted", res.data.length);
    } catch (error) {
      console.error("Error fetching posted jobs:", error);
    }
  };

  useEffect(() => {
    if (recruiterEmail) {
      fetchPostedJobs();
    }
  }, [recruiterEmail]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobsdb/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      {renderheader(updateskills)}

      <p className="overview">Manage all your posted jobs here.</p>

      <div style={{ marginTop: "20px" }}>
        {jobs.length === 0 ? (
          <div
            className="profile-card"
            style={{ textAlign: "center", padding: "30px" }}
          >
            <h2 className="card-title">No jobs posted yet</h2>
            <p className="card-subtitle">
              Once you post a job, it will appear here.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {jobs.map((job) => (
              <div
                key={job._id}
                className="profile-card"
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: "700",
                        fontFamily: "Inter",
                      }}
                    >
                      {job.jobTitle}
                    </h2>
                    <p
                      style={{
                        margin: "13px 0",
                        color: "#666",
                        fontFamily: "Quicksand",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Building2
                        size={19}
                        style={{ marginRight: "6px", color: "black" }}
                      />
                      {job.companyName}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(job._id)}
                    style={{
                      border: "none",
                      background: "#ffe5e5",
                      color: "#d11a2a",
                      borderRadius: "8px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <p
                  style={{
                    margin: "15px 0",
                    color: "#444",
                    fontFamily: "Quicksand",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MapPin
                    size={19}
                    style={{ marginRight: "6px", color: "black" }}
                  />
                  {job.location}
                </p>

                <p
                  style={{
                    margin: "15px 0",
                    color: "#444",
                    fontFamily: "Quicksand",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Briefcase
                    size={19}
                    style={{ marginRight: "6px", color: "black" }}
                  />
                  {job.employmentType} | {job.experienceLevel}
                </p>

                <p
                  style={{
                    margin: "15px 0",
                    color: "#444",
                    fontFamily: "Quicksand",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Wallet
                    size={19}
                    style={{ marginRight: "6px", color: "black" }}
                  />
                  ₹{job.minSalary} - ₹{job.maxSalary}
                </p>

                <p
                  style={{
                    margin: "15px 0",
                    color: "#444",
                    fontFamily: "Quicksand",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <strong>Category:</strong> {job.category}
                </p>

                <p
                  style={{
                    marginTop: "16px",
                    fontSize: "13px",
                    color: "#888",
                    fontFamily: "Quicksand",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  Posted on: {job.postedAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Postedjobs;
