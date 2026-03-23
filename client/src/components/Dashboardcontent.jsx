import React, { useEffect, useState } from "react";
import {
  Search,
  ArrowRightFromLine,
  Briefcase,
  Disc2,
  TrendingUp,
  Download,
} from "lucide-react";
import axios from "axios";
import MyChart from "./Mychart";

function SkillList({ skills }) {
  return (
    <ul className="skill-list">
      {skills.map((skill, index) => (
        <li key={index}>
          <span>{skill.name}</span>
          <div className="progress-wrapper">
            <progress value={skill.value} max="100"></progress>
            <span className="percent">{skill.value}%</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Reportcard() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Reports/success_skills_research.pdf";
    link.download = "Skills Employers Demand.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <p
      style={{
        color: "blue",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      onClick={handleDownload}
    >
      Download <Download size={22} />
    </p>
  );
}

export function renderheader(data) {
  const [searchchange, setsearchchange] = useState("");

  const sidecontent = {
    fontFamily: "system-ui, sans-serif",
    fontSize: "25px",
    fontWeight: "500",
    padding: "12px 24px",
  };

  return data.map((intro, index) => (
    <div
      style={{
        backgroundColor: "white",
        height: "70px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
      }}
      key={index}
    >
      <p style={sidecontent} className="dashboard">
        {intro.dashboard}
      </p>

      <div className="search-container">
        <input
          type="text"
          className="search-text"
          value={searchchange}
          onChange={(e) => setsearchchange(e.target.value)}
          placeholder="Search skills, roles..."
        />
        <span className="search-icon">
          <Search size={18} />
        </span>
      </div>
    </div>
  ));
}

export const header = [{ dashboard: "Dashboard" }];

function Dashboardcontent() {
  const threeboxes = {
    width: "373.8px",
    border: "1px solid #eef2f6",
  };

  const [username, setusername] = useState("");
  const [activejobcount, setActivejobcount] = useState("0");
  const [monthlyhires, setMonthlyhires] = useState("0");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const email = localStorage.getItem("useremail");

    if (email) {
      const namepart = email.split("@")[0];
      const cleanName = namepart.replace(/[0-9]/g, "");
      const formatedname =
        cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setusername(formatedname);
    }

    const fetchDashboardCounts = async () => {
      try {
        const jobsRes = await axios.get(`${API_URL}/api/jobsdb`);
        const totalJobs = Array.isArray(jobsRes.data) ? jobsRes.data.length : 0;
        setActivejobcount(String(totalJobs));
        localStorage.setItem("activejobcount", String(totalJobs));

        if (email) {
          const appliedRes = await axios.get(
            `${API_URL}/api/applicants/user/${encodeURIComponent(email)}`
          );
          const totalApplied = Array.isArray(appliedRes.data)
            ? appliedRes.data.length
            : 0;

          setMonthlyhires(String(totalApplied));
          localStorage.setItem("monthlyhires", String(totalApplied));
        }
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchDashboardCounts();
  }, [API_URL]);

  const skillsData = [
    { name: "React", value: 94 },
    { name: "Next.js", value: 68 },
    { name: "Machine Learning", value: 78 },
    { name: "Cybersecurity", value: 45 },
    { name: "Kubernetes", value: 34 },
  ];

  const categorybox = [
    {
      title: "Active Job Listings",
      value: activejobcount,
      footer: "High demand in Remote roles",
      iconsbox: <Briefcase />,
    },
    {
      title: "Applied Jobs",
      value: monthlyhires,
      footer: "Fastest growing: Tech & Design",
      iconsbox: <TrendingUp />,
    },
    {
      title: "Recommended Skills",
      value: "0",
      footer: "Industry-standard Skills",
      iconsbox: <Disc2 />,
    },
  ];

  const graphbox = [
    { title: "Job Market Trend", content: <MyChart /> },
    { title: "Trending Skills", content: <SkillList skills={skillsData} /> },
  ];

  const Industriesbox = [
    {
      title: "Available Reports",
      subhead: "Download detailed analysis reports",
    },
  ];

  const subcategory = [
    {
      downloadname: "Skills Employers Demand",
      reportsdownload: <Reportcard />,
    },
    { downloadname: "Industry Comparison", reportsdownload: <Reportcard /> },
    { downloadname: "Trend Forecast 2026", reportsdownload: <Reportcard /> },
    { downloadname: "Raw Skills Data", reportsdownload: <Reportcard /> },
    { downloadname: "Salary Benchmark Data", reportsdownload: <Reportcard /> },
    { downloadname: "Q4 2025 Market Report", reportsdownload: <Reportcard /> },
  ];

  return (
    <div>
      <div>{renderheader(header)}</div>

      <div
        style={{
          height: "90px",
          width: "100%",
          backgroundColor: "white",
          padding: "17px 18px 10px 10px",
        }}
      >
        <div style={{ padding: "17px 18px 10px 10px" }}>
          <div className="welcome-container">
            <div className="welcome-left">
              <h1 className="welcome-title">
                Welcome, <span className="span-welcome">{username}....</span>
              </h1>
              <p className="welcome-subtitle">
                Here's what's happening in the job market today.
              </p>
            </div>

            <button className="explore-btn">
              Explore Skills <ArrowRightFromLine />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "200px",
          width: "102%",
          backgroundColor: "white",
          padding: "18px 18px 10px 10px",
          marginTop: "6px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {categorybox.map((stat, index) => (
            <div key={index} style={threeboxes} id="marketing-page">
              <h3 className="stat-label">{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <div className="stat-footer-simple">{stat.footer}</div>
              <div className="stat-icon-bg">{stat.iconsbox}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-grid">
          {graphbox.map((graphmodel, index) => (
            <div key={index} className="marketing-page">
              <h3 className="stat-label">{graphmodel.title}</h3>
              <div className="content-area">{graphmodel.content}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          height: "450px",
          width: "100%",
          backgroundColor: "white",
          padding: "17px 18px 10px 10px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
          {Industriesbox.map((industriesmodel, index) => (
            <div
              key={index}
              className="marketing-page"
              style={{
                minHeight: "400px",
                backgroundColor: "white",
                position: "relative",
                bottom: "22px",
                width: "100%",
                border: "1px solid #eef2f6",
              }}
            >
              <h3 className="stat-label">{industriesmodel.title}</h3>
              <p className="subhead">{industriesmodel.subhead}</p>

              <div className="reports-section">
                {subcategory.map((sub, index) => (
                  <div key={index} id="report-card" className="marketing-page">
                    <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Inter",
                        fontSize: "17px",
                      }}
                    >
                      {sub.downloadname}
                    </h3>
                    <div
                      style={{
                        marginTop: "10px",
                        fontFamily: "Inter",
                        fontSize: "16px",
                      }}
                    >
                      {sub.reportsdownload}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboardcontent;