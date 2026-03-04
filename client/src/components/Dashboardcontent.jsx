import React, { useEffect, useState } from "react";

import {
  Search,
  ArrowRightFromLine,
  Briefcase,
  Disc2,
  TrendingUp,
  Download,
} from "lucide-react";
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
    link.download = "Skills Employers Demand .pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* <div>
        <h3>Q4 2025 Market Report</h3>
        <p>PDF - 2.4 MB</p>
      </div>
<a 
  href="/reports/success_skills_research.pdf" 
  download="Q4_2025_Market_Report.pdf"
>
  Download
</a> */}

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
    </>
  );
}

//Render method:

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

//
// dashboardcontent:

function Dashboardcontent() {
  const threeboxes = {
    width: "373.8px",
    border: "1px solid #eef2f6",
  };

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
      value: "0",
      footer: "High demand in Remote roles",
      iconsbox: <Briefcase />,
    },
    {
      title: "Monthly Hires",
      value: "0",
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
      downloadname: "Skills Employers Demand ",
      reportsdownload: <Reportcard />,
    },
    { downloadname: "Industry Comparison", reportsdownload: <Reportcard /> },
    { downloadname: "Trend Forecast 2026", reportsdownload: <Reportcard /> },
    { downloadname: "Raw Skills Data", reportsdownload: <Reportcard /> },
    { downloadname: "Salary Benchmark Data", reportsdownload: <Reportcard /> },
    { downloadname: "Q4 2025 Market Report", reportsdownload: <Reportcard /> },
  ];

  const [username, setusername] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("useremail");
    if (email) {
      const namepart = email.split("@")[0];
      const cleanName = namepart.replace(/[0-9]/g, "");
      const formatedname =
        cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setusername(formatedname);
    }
  }, []);

  return (
    <div>
      {/* header section */}
      <div>{renderheader(header)}</div>

      {/* Welcome section */}

      <div
        style={{
          height: "90px",
          width: "100%",
          backgroundColor: "white",
          padding: "17px 18px 10px 10px",
        }}
      >
        {/* borderBottom:'1px solid black' */}
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

      {/* 3-boxes section */}
      {/* borderBottom:'1px solid black' */}
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
          {/* <div style={threeboxes} id='marketing-page'></div>
            <div style={threeboxes}></div>
            <div style={threeboxes}></div> */}

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

      {/* graph */}
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {graphbox.map((graphmodel, index) => (
            <div key={index} className="marketing-page">
              <h3 className="stat-label">{graphmodel.title}</h3>
              <div>{graphmodel.graph}</div>
              <div className="content-area">{graphmodel.content}</div>
            </div>
          ))}
        </div>
      </div>

      {/* analysis reports */}

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
              {/* sub-box */}

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
