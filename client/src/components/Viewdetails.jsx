import React, { useEffect, useState } from "react";
import "./Viewdetails.css";
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

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobinsights")) || [];
    const selectedJob = savedJobs.find(
      (item) => String(item.id) === String(id),
    );
    setJob(selectedJob || null);
  }, [id]);

  const [openresumecart, setResumeCart] = useState(false);
  const handleclick = () => {
    setResumeCart(true);
  };
  const [resumeFile, setResumeFile] = useState(null);
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };
  const handleApply = () => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("users")) || {};
    const storedAdmin = JSON.parse(localStorage.getItem("admins")) || {};

    const reader = new FileReader();

    reader.onload = () => {
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

      const newAppliedJob = {
        ...job,
        applicantName: storedUser.fullname || "Unknown User",
        email: storedAdmin.email || "No Email",
        resumeName: resumeFile.name,
        resumeData: reader.result,
        appliedAt: new Date().toLocaleString(),
      };

      appliedJobs.push(newAppliedJob);
      localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

      // ---------------- Recruiter side ----------------
      const applicants = JSON.parse(localStorage.getItem("applicants")) || [];

      const newApplicant = {
        applicantId: Date.now(),
        name: storedUser.fullname || "Unknown User",
        email: storedAdmin.email || "No Email",
        jobId: job.id,
        jobTitle: job.jobTitle || "Untitled Job",
        companyName: job.companyName || "Unknown Company",
        resumeName: resumeFile.name,
        resumeData: reader.result,
        appliedAt: new Date().toLocaleString(),
      };
      applicants.push(newApplicant);
      localStorage.setItem("applicants", JSON.stringify(applicants));

      alert("Applied successfully");
      setResumeCart(false);
      setResumeFile(null);
    };

    reader.readAsDataURL(resumeFile);
  };

  return (
    <div className="job-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Back
      </button>

      {!job ? (
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
                      accept=".pdf,.docx"
                      onChange={handleResumeChange}
                      hidden
                    />
                    <div className="upload-icon">⬆</div>
                    <p className="upload-text">
                      Drag your resume here or click to upload
                    </p>
                    <p className="upload-subtext">
                      Acceptable file types: PDF, DOCX
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
                    >
                      Cancel
                    </button>

                    <button className="resume-apply-btn" onClick={handleApply}>
                      Apply
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
