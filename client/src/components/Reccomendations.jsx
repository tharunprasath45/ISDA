import React, { useEffect, useState } from 'react'
import { header, renderheader } from "./Dashboardcontent";
import { Briefcase, CircleStar, Delete, Download, MapPin, Trash2 } from 'lucide-react';

function Reccomendations() {
  const updateskills = header.map((intro)=>{
    if(intro.dashboard === "Dashboard") return {dashboard :"Applied Jobs"}
  return intro
});
 const [appliedJob, setAppliedJob] = useState([]);
useEffect(()=>{
  const jobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  setAppliedJob(jobs)
}, []);
// const handleResumeClick = (job) => {
//     if (!job.resumeData) {
//       alert("No resume found");
//       return;
//     }

//     window.open(job.resumeData, "_blank");
//   };


// delete option
  const handleDelete = (jobId) => {
    const updatedJobs = appliedJob.filter(
      (job) => String(job.id) !== String(jobId)
    );

    setAppliedJob(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div>
      {renderheader(updateskills)}
 <div className="applied-jobs-page">
     
      <p>Track the jobs you've applied for and download your resumes.</p>

      {appliedJob.length === 0 ? (
        <div className="no-applied-jobs">
          <p>No jobs applied yet.</p>
        </div>
      ) : (
        appliedJob.map((job) => (
          <div className="applied-job-card" key={job.id}>
            <div className="applied-job-left">
              <h2>{job.jobTitle}</h2>
              <div className="applied-job-meta">
                <span>
                   <CircleStar  size={16} style={{display:'flex',color:'green'}}/>
                  Applied
                </span>
                <span>
                  <MapPin size={15} color='orange' />
                  {job.location || "Unknown location"}
                </span>
              </div>
            </div>

            <div className="applied-job-right">
              <span className="applied-badge">Applied</span>
              {/* <button className="resume-btn" onClick={()=>handleResumeClick(job)}>
                <Download size={16} />
                Resume
              </button> */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
               <button className="resume-btn" onClick={()=>handleDelete(job.id)}>
                <Trash2 size={14} />
                Delete
              </button></div>
           
            </div>
            
              
             
           
          </div>
        ))
      )}
    </div>
  

    </div>
  )
}

export default Reccomendations
