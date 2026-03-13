import React, { useState } from "react";
import "./Recruiter.css";
import { renderheader, header } from "../../components/Dashboardcontent";
import { CircleArrowOutUpRight } from "lucide-react";

function RecuiterDashboard() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Dashboard" };
  });

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

  return (
    <>
      {" "}
      <div>
        {renderheader(updateskills)}
        <p className="overview">
          Overview of your job postings and applicants.
        </p>
      </div>
      {/*  */}
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
              <p
                className="stat-value"
                value={stats}
                onChange={(e) => setStats(e.target.value)}
              >
                {stat.value}
              </p>
              <div className="stat-footer-simple">{stat.footer}</div>
              <div
                className="stat-icon-bg"
                onMouseEnter={() => setClickbox(index)}
                onMouseLeave={() => setClickbox(null)}
                //  style={{color: stat.color}}
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
