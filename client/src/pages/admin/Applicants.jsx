import React, { useEffect, useState } from "react";
import { renderheader, header } from "../../components/Dashboardcontent";

function Applicants() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Applicants" };
    return intro;
  });

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const savedApplicants =
      JSON.parse(localStorage.getItem("applicants")) || [];
    setApplicants(savedApplicants);
  }, []);

  return (
    <div>
      {renderheader(updateskills)}

      <div className="applicants-page">
        <p className="overview">Manage all your Applicants here.</p>

        {applicants.length === 0 ? (
          <div className="no-applicants-box">
            <h3>No applicants yet</h3>
            <p>No one has applied for any job yet.</p>
          </div>
        ) : (
          <div className="applicants-list">
            {applicants.map((applicant) => (
              <div key={applicant.applicantId} className="applicant-card">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applicants;
