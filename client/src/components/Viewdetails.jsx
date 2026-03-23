import React, { useEffect, useState } from "react";
import "./Viewdetails.css";
import axios from "axios";
import {
  MapPin,
  Building2,
  Clock3,
  Briefcase,
  IndianRupee,
  Globe,
  Layers3,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function Viewdetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [openresumecart, setResumeCart] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setPageLoading(true);
        const res = await axios.get(`${API_URL}/api/jobsdb/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null);
      } finally {
        setPageLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, API_URL]);

  const handleclick = () => {
    setResumeCart(true);
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      alert("Resume file is too large. Please upload a file smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const handleApply = async () => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }

    if (!job) {
      alert("Job not found");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("users")) || {};

    const userEmail =
      storedUser.email || storedUser.userEmail || storedUser.mail || "";

    const userName =
      storedUser.fullname ||
      storedUser.name ||
      storedUser.username ||
      "Unknown User";

    if (!userEmail) {
      console.log("users from localStorage:", storedUser);
      alert("User email not found. Please login again.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        setLoading(true);

        const applicantData = {
          userId: String(storedUser.id || storedUser._id || userEmail),
          userEmail: String(userEmail),

          recruiterId: String(
            job.recruiterId || job.recruiterEmail || "No Recruiter"
          ),
          recruiterEmail: String(job.recruiterEmail || "No Recruiter Email"),

          jobId: String(job._id),

          name: String(userName),
          email: String(userEmail),
          jobTitle: String(job.jobTitle || "Untitled Job"),
          companyName: String(job.companyName || "Unknown Company"),
          location: String(job.location || "Unknown location"),
          resumeName: String(resumeFile.name || ""),
          resumeData: String(reader.result || ""),
          appliedAt: new Date().toLocaleString(),
          status: "Applied",
        };

        console.log("Sending applicant data:", applicantData);

        await axios.post(`${API_URL}/api/applicants`, applicantData);

        alert("Applied successfully");
        setResumeCart(false);
        setResumeFile(null);
      } catch (error) {
        console.error("Error applying job:", error.response?.data || error);
        alert(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Failed to apply job"
        );
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(resumeFile);
  };

  return (
    <div className="job-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      {pageLoading ? (
        <div className="no-jobs-box">
          <h2>Loading job...</h2>
          <p>Please wait while we fetch the job details.</p>
        </div>
      ) : !job ? (
        <div className="no-jobs-box">
          <h2>Job not found</h2>
          <p>This job may have been removed or is no longer available.</p>
        </div>
      ) : (
        <div className="job-layout">
          <div className="job-top-box">
            <div className="job-top-left">
              <div className="job-icon-box">
                <Building2 size={34} />
              </div>

              <div>
                <h1>{job.jobTitle}</h1>
                <div className="top-meta">
                  <span>
                    <Briefcase size={16} />
                    {job.employmentType || "Not specified"}
                  </span>
                  <span>
                    <MapPin size={16} />
                    {job.location || "Unknown location"}
                  </span>
                  <span>
                    <Layers3 size={16} />
                    {job.category || "General"}
                  </span>
                </div>
                <p className="company-line">
                  <Building2 size={16} />
                  {job.companyName || "Unknown company"}
                </p>
              </div>
            </div>

            <div className="job-top-right">
              <button className="apply-btn-new" onClick={handleclick}>
                Apply Now
              </button>
            </div>

            {openresumecart && (
              <div className="resume-overlay">
                <div className="resume-popup">
                  <h2 className="resume-title">Upload Resume</h2>

                  <label className="resume-upload-box">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      hidden
                    />
                    <div className="upload-icon">⬆</div>
                    <p className="upload-text">
                      Drag your resume here or click to upload
                    </p>
                    <p className="upload-subtext">
                      Acceptable file types: PDF, DOC, DOCX
                    </p>
                  </label>

                  {resumeFile && (
                    <p className="selected-file">
                      ✅ Selected: {resumeFile.name}
                    </p>
                  )}

                  <div className="resume-actions">
                    <button
                      className="resume-cancel-btn"
                      onClick={() => {
                        setResumeCart(false);
                        setResumeFile(null);
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </button>

                    <button
                      className="resume-apply-btn"
                      onClick={handleApply}
                      disabled={loading}
                    >
                      {loading ? "Applying..." : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="job-content-grid">
            <div className="left-column">
              <div className="detail-box">
                <h2>About this job</h2>
                <p>{job.description || "No description provided."}</p>
              </div>

              <div className="detail-box">
                <h2>Responsibilities</h2>
                <ul>
                  {job.description ? (
                    job.description
                      .split(".")
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => <li key={index}>{item.trim()}</li>)
                  ) : (
                    <li>No responsibilities added.</li>
                  )}
                </ul>
              </div>

              <div className="detail-box">
                <h2>Requirements</h2>
                <ul>
                  {job.requirements ? (
                    job.requirements
                      .split(".")
                      .filter((item) => item.trim() !== "")
                      .map((item, index) => <li key={index}>{item.trim()}</li>)
                  ) : (
                    <li>No requirements added.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="right-column">
              <div className="side-box">
                <h3>Salary</h3>
                <p className="salary-text">
                  <IndianRupee size={18} />
                  {job.minSalary || "0"} - {job.maxSalary || "0"}
                </p>
              </div>

              <div className="side-box">
                <h3>Quick Info</h3>
                <div className="info-item">
                  <BadgeCheck size={16} />
                  <span>
                    Experience: {job.experienceLevel || "Not specified"}
                  </span>
                </div>
                <div className="info-item">
                  <Briefcase size={16} />
                  <span>Type: {job.employmentType || "Not specified"}</span>
                </div>
                <div className="info-item">
                  <Clock3 size={16} />
                  <span>Posted: {job.postedAt || "Recently"}</span>
                </div>
                <div className="info-item">
                  <Layers3 size={16} />
                  <span>Category: {job.category || "General"}</span>
                </div>
              </div>

              <div className="side-box">
                <h3>About Company</h3>
                <p className="company-about">
                  {job.aboutCompany || "No company description available."}
                </p>

                {job.companyWebsite ? (
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="company-link-btn"
                  >
                    <Globe size={16} />
                    Visit Website
                  </a>
                ) : (
                  <button className="company-link-btn disabled-link" disabled>
                    No Website
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewdetails;