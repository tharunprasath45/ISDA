import React, { useState } from "react";
import Select from "react-select";
import { renderheader, header } from "../../components/Dashboardcontent";
import { ArrowRightFromLine, Save } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Jobpost() {
  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Post a Job" };
    return intro;
  });
  const [activetabs, setactivetabs] = useState("jobdetails");
  const [title, setTitle] = useState({
    details: "",
    Locations: "",
    category: "",
    max_range: "",
    min_range: "",
  });
  const [description, setDescription] = useState({
    about: "",
    require: "",
  });
  const [company, setCompany] = useState({
    company_name: "",
    company_website: "",
    about_company: "",
  });
  const [Employment, setEmployment] = useState(null);
  const Employee = [
    { value: "full time", label: "Full time" },
    { value: "part time", label: "Part time" },
    { value: "Contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];
  const [EmploymentLevel, setEmploymentLevel] = useState(null);
  const Employeelevel = [
    { value: "Entry", label: "Entry" },
    { value: "mid", label: "Mid" },
    { value: "senior", label: "Senior" },
  ];

  const handleSaveJob = () => {
    if (
      !title.details ||
      !title.Locations ||
      !title.category ||
      !description.about ||
      !description.require ||
      !company.company_name
    ) {
      // alert("Please fill all required fields before saving");
      toast.warn("Fill all required fields before saving", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const newJob = {
      id: Date.now(),
      jobTitle: title.details,
      location: title.Locations,
      category: title.category,
      minSalary: title.min_range,
      maxSalary: title.max_range,
      employmentType: Employment?.label || "",
      experienceLevel: EmploymentLevel?.label || "",
      description: description.about,
      requirements: description.require,
      companyName: company.company_name,
      companyWebsite: company.company_website,
      aboutCompany: company.about_company,
      postedAt: new Date().toLocaleString(),
    };
    const existingJobs = JSON.parse(localStorage.getItem("postedJobs")) || [];
    const updatedJobs = [...existingJobs, newJob];

    localStorage.setItem("postedJobs", JSON.stringify(updatedJobs));

    const findjob = JSON.parse(localStorage.getItem("jobinsights")) || [];
    const updatefindjobs = [...findjob, newJob];
    
    localStorage.setItem("jobinsights", JSON.stringify(updatefindjobs));

    //alert("Job posted successfully!");
    toast.success("Job posted successfully!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    setTitle({
      details: "",
      Locations: "",
      category: "",
      max_range: "",
      min_range: "",
    });

    setDescription({
      about: "",
      require: "",
    });

    setCompany({
      company_name: "",
      company_website: "",
      about_company: "",
    });

    setEmployment(null);
    setEmploymentLevel(null);
    setactivetabs("jobdetails");
  };

  return (
    <div>
      {renderheader(updateskills)}
      <p className="overview">
        Create a job listing and reach the right candidates.
      </p>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activetabs === "jobdetails" ? "active" : ""}`}
          onClick={() => setactivetabs("jobdetails")}
        >
          Job Details
        </button>

        <button
          className={`tab-btn ${activetabs === "description" ? "active" : ""}`}
          onClick={() => setactivetabs("description")}
        >
          Description
        </button>

        <button
          className={`tab-btn ${activetabs === "company" ? "active" : ""}`}
          onClick={() => setactivetabs("company")}
        >
          Company
        </button>
      </div>
      <button
        className="explore-btn-1"
        style={{ marginLeft: "34%" }}
        onClick={handleSaveJob}
      >
        <Save /> Save Changes
      </button>
      <ToastContainer />

      {activetabs === "jobdetails" && (
        <div className="profile-card">
          <h2 className="card-title">Job Details</h2>
          <p className="card-subtitle">Update your Job details</p>

          <div className="profile-grid">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={title.details}
                onChange={(e) =>
                  setTitle({ ...title, details: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={title.Locations}
                onChange={(e) =>
                  setTitle({ ...title, Locations: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Employment Type</label>
              <Select
                className="select-region"
                options={Employee}
                value={Employment}
                onChange={setEmployment}
                placeholder="Select Employment Type"
              />
            </div>

            <div className="form-group">
              <label>Experience Level</label>
              <Select
                className="select-region"
                options={Employeelevel}
                value={EmploymentLevel}
                onChange={setEmploymentLevel}
                placeholder="Select Experience Type"
              />
            </div>

            <div className="form-group">
              <label>Job Category</label>
              <input
                type="text"
                value={title.category}
                onChange={(e) =>
                  setTitle({ ...title, category: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Salary Range</label>

              <div className="salary-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={title.min_range}
                  onChange={(e) =>
                    setTitle({ ...title, min_range: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Max"
                  value={title.max_range}
                  onChange={(e) =>
                    setTitle({ ...title, max_range: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {activetabs === "description" && (
        <div className="profile-card">
          <h2 className="card-title">Job Description</h2>
          <p className="card-subtitle">Update your Job description</p>
          <div className="form-group">
            <label>Description (or) Responsibilities</label>
            <textarea
              type="text"
              value={description.about}
              onChange={(e) =>
                setDescription({ ...description, about: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label style={{ marginTop: "20px" }}>Requirements</label>
            <textarea
              type="text"
              value={description.require}
              onChange={(e) =>
                setDescription({ ...description, require: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {activetabs === "company" && (
        <div className="profile-card">
          <h2 className="card-title">Company Information</h2>
          <p className="card-subtitle">Update your Company Information</p>
          <div className="profile-grid">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                value={company.company_name}
                onChange={(e) =>
                  setCompany({ ...company, company_name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                value={company.company_website}
                onChange={(e) =>
                  setCompany({ ...company, company_website: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>About Company</label>
              <textarea
                type="text"
                value={company.about_company}
                onChange={(e) =>
                  setCompany({ ...company, about_company: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}

      <p id="arrowrightline">
        {" "}
        Continue <ArrowRightFromLine size={18} />
      </p>
    </div>
  );
}

export default Jobpost;
