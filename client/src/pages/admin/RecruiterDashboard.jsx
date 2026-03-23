import React, { useState, useEffect } from "react";
import "./Recruiter.css";
import { renderheader, header } from "../../components/Dashboardcontent";
import { CircleArrowOutUpRight } from "lucide-react";
import axios from "axios";

function RecuiterDashboard() {
  const updateskills = header
    .map((intro) => {
      if (intro.dashboard === "Dashboard") {
        return { dashboard: "Dashboard" };
      }
      return null;
    })
    .filter(Boolean);

  const threeboxes = {
    width: "373.8px",
    border: "1px solid #eef2f6",
  };

  const [clickbox, setClickbox] = useState(null);

  const [stats, setStats] = useState([
    {
      title: "Job Posted",
      value: 0,
      footer: "Active Job Listings",
      color: "#6772ff",
      iconsbox: <CircleArrowOutUpRight color="#6772ff" className="icon-data" />,
    },
    {
      title: "Total Applicants",
      value: 0,
      footer: "Candidate Applications",
      color: "black",
      iconsbox: <CircleArrowOutUpRight color="black" className="icon-data" />,
    },
    {
      title: "Total Hired",
      value: 0,
      footer: "Recruitment Success",
      color: "#00CE71",
      iconsbox: <CircleArrowOutUpRight color="#00CE71" className="icon-data" />,
    },
  ]);

  useEffect(() => {
    const recruiter = JSON.parse(localStorage.getItem("admins")) || {};
    const recruiterEmail = recruiter.email;

    if (!recruiterEmail) return;

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchCounts = async () => {
      try {
        const jobsRes = await axios.get(
          `${API_URL}/api/jobsdb/recruiter/${encodeURIComponent(recruiterEmail)}`
        );
        const totalPosted = jobsRes.data.length;

        const applicantsRes = await axios.get(
          `${API_URL}/api/applicants/recruiter/${encodeURIComponent(
            recruiterEmail
          )}`
        );
        const totalApplicants = applicantsRes.data.length;

        const totalHired = applicantsRes.data.filter(
          (a) => a.status === "Selected"
        ).length;

        setStats((prev) =>
          prev.map((stat) => {
            if (stat.title === "Job Posted") {
              return { ...stat, value: totalPosted };
            }
            if (stat.title === "Total Applicants") {
              return { ...stat, value: totalApplicants };
            }
            if (stat.title === "Total Hired") {
              return { ...stat, value: totalHired };
            }
            return stat;
          })
        );
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <div>
        {renderheader(updateskills)}
        <p className="overview">
          Overview of your job postings and applicants.
        </p>
      </div>

      <div
        style={{
          height: "200px",
          width: "102%",
          backgroundColor: "white",
          padding: "5px 18px 10px 10px",
          marginTop: "3px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                ...threeboxes,
                border:
                  clickbox === index
                    ? `2px solid ${stat.color}`
                    : "1px solid #eef2f6",
              }}
              id="marketing-page"
            >
              <h3 className="stat-label">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <div className="stat-footer-simple">{stat.footer}</div>
              <div
                className="stat-icon-bg"
                onMouseEnter={() => setClickbox(index)}
                onMouseLeave={() => setClickbox(null)}
              >
                {stat.iconsbox}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecuiterDashboard;