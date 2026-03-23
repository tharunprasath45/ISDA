import React, { useState } from "react";
import "./Dashboard.css";
import { header, renderheader } from "./Dashboardcontent";
import { Search } from "lucide-react";
import EMPTY_IMAGE from "../assets/searchimage.svg";

function Skillanalysis() {
  const [searchanalysis, setsearchanalysis] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Skill Analysis" };
    return intro;
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSearch = async () => {
    if (!searchanalysis.trim()) return;

    setHasSearched(true);
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const res = await fetch(
        `${API_URL}/api/jobs?what=${encodeURIComponent(
          searchanalysis
        )}&page=1&limit=10`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");

      setJobs(data.results || []);
    } catch (e) {
      setError(e.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setsearchanalysis(value);

    if (!value.trim()) {
      setJobs([]);
      setError("");
      setLoading(false);
      setHasSearched(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const showEmptyImage = !hasSearched;
  const showNoResults = hasSearched && !loading && !error && jobs.length === 0;

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div>{renderheader(updateskills)}</div>

      <div style={{ padding: "25px", backgroundColor: "#ffffff" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search roles (ex: data analyst, python developer...)"
              className="search-skill"
              value={searchanalysis}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />

            <Search size={28} style={{ color: "gray" }} />

            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "Inter",
                background: "#fff",
                border: "1px solid #ccc",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {error && (
            <p style={{ color: "red", marginTop: "12px", fontFamily: "Inter" }}>
              {error}
            </p>
          )}
        </div>
      </div>

      <div style={{ padding: "30px" }}>
        {showEmptyImage && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "30px",
              border: "1px solid #eef2f6",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
            }}
          >
            <img
              src={EMPTY_IMAGE}
              alt="Search illustration"
              style={{ width: "320px", maxWidth: "90%" }}
            />
            <h3
              style={{
                margin: 0,
                fontFamily: "Inter",
                color: "#111827",
                fontWeight: "600",
              }}
            >
              Start searching to view job results
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: "Inter",
                color: "#6b7280",
                fontWeight: "400",
              }}
            >
              Example: <b>data analyst</b>, <b>python developer</b>
            </p>
          </div>
        )}

        {showNoResults && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "22px",
              border: "1px solid #eef2f6",
              fontFamily: "Inter",
              color: "#111827",
            }}
          >
            No jobs found for <b>{searchanalysis}</b>. Try a different role.
          </div>
        )}

        {jobs.map((job, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "18px",
              border: "1px solid #eef2f6",
              transition: "0.3s",
              boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 25px rgba(0,0,0,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.04)";
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontFamily: "Inter",
                fontWeight: "600",
                color: "#111827",
              }}
            >
              {job.title}
            </h3>

            <p
              style={{
                margin: "8px 0",
                color: "#4b5563",
                fontFamily: "Inter",
                fontSize: "14px",
              }}
            >
              {job.company} • {job.location}
            </p>

            <p
              style={{
                color: "#6b7280",
                fontSize: "13px",
                fontFamily: "Inter",
              }}
            >
              {job.category}
            </p>

            <a
              href={job.redirect_url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                textDecoration: "none",
                fontFamily: "Inter",
                fontWeight: "500",
                color: "#6366f1",
              }}
            >
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skillanalysis;