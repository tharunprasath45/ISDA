import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { renderheader, header } from "../../components/Dashboardcontent";
import { Trash2 } from "lucide-react";

function Applicants() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Applicants" };
    return intro;
  });

  const [applicants, setApplicants] = useState([]);

  const process = [
    { value: "Applied", label: "Applied" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  const recruiter = JSON.parse(localStorage.getItem("admins")) || {};
  const recruiterEmail = recruiter.email;

const fetchApplicants = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/applicants/recruiter/${encodeURIComponent(recruiterEmail)}`
    );
    setApplicants(res.data);
    localStorage.setItem("totalapplicants", res.data.length); // ← add this
  } catch (error) {
    console.error("Error fetching applicants:", error);
  }
};

  useEffect(() => {
    if (recruiterEmail) {
      fetchApplicants();
    }
  }, [recruiterEmail]);

  const handleStatusChange = async (selected, applicantId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applicants/${applicantId}/status`,
        {
          status: selected.value,
        },
      );

      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === applicantId
            ? { ...applicant, status: selected.value }
            : applicant,
        ),
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

const handleDelete = async (applicantId) => {
  try {
    await axios.delete(`http://localhost:5000/api/applicants/${applicantId}`);
    setApplicants((prev) => {
      const updated = prev.filter((applicant) => applicant._id !== applicantId);
      localStorage.setItem("totalapplicants", updated.length); // ← add this
      return updated;
    });
  } catch (error) {
    console.error("Error deleting applicant:", error);
  }
};
  return (
    <div>
      {renderheader(updateskills)}

      <div className="applicants-page">
        <p className="overview">Manage all your Applicants here.</p>

        {applicants.length === 0 ? (
          <div className="no-applicants-box">
            <h3>No applicants yet</h3>
            <p>No one has applied for your jobs yet.</p>
          </div>
        ) : (
          <div className="applicants-list">
            {applicants.map((applicant) => (
              <div key={applicant._id} className="applicant-card">
                <h3>{applicant.name}</h3>

                <p>
                  <strong>Email:</strong> {applicant.email}
                </p>
                <p>
                  <strong>Applied For:</strong> {applicant.jobTitle}
                </p>
                <p>
                  <strong>Company:</strong> {applicant.companyName}
                </p>
                <p>
                  <strong>Resume:</strong> {applicant.resumeName}
                </p>
                <p>
                  <strong>Applied At:</strong> {applicant.appliedAt}
                </p>

                {applicant.resumeData && (
                  <a
                    href={applicant.resumeData}
                    download={applicant.resumeName}
                    className="download-resume-btn"
                  >
                    Download Resume
                  </a>
                )}

                <Select
                  className="status-select"
                  classNamePrefix="status"
                  options={process}
                  value={
                    process.find((item) => item.value === applicant.status) ||
                    process[0]
                  }
                  onChange={(selected) =>
                    handleStatusChange(selected, applicant._id)
                  }
                />

                <button
                  className="resume-btn"
                  onClick={() => handleDelete(applicant._id)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;
