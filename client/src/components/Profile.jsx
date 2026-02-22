import React, { useEffect, useState } from "react";
import "./Profile.css";
import "./Dashboard.css";
import { header, renderheader } from "./Dashboardcontent";
import { Save, User, Shield, Calendars, Plus } from "lucide-react";
import Select from "react-select";

function Profile() {
  const [city, setcity] = useState(null);

  const Country = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "Germany", label: "Germany" },
  ];
  const [Experience, setExperience] = useState(null);
  const Experiecing = [
    { value: "0-1", label: "0-1 year" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-8", label: "5-8 years" },
    { value: "8-10", label: "8-10 years" },
    { value: "10+", label: "10+ years" },
  ];
  const [userInfo, setuserInfo] = useState({
    fullname: "",
    email: "",
    role: "",
    createdAt: "",
  });
  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      setuserInfo(JSON.parse(storedUser));
    }
  }, []);

  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Profile" };
    return intro;
  });
  const [activetabs, setactivetabs] = useState("profile");
  
  const[task, settask] = useState(null);
  const[todos,settoDos] = useState([]);

  const addSkills =()=>{
    if(task){
      const alreadyAdded = todos.some((t) => t.value === task.value);
  if (alreadyAdded) return;
        settoDos([...todos, task]);
    settask(null);
   
    }
    else{
      console.log("No skill selected"); 
    }
     const deleteTask = (index)=>{
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      settoDos(newTodos);
    }
    const alreadyAdded = todos.some((t) => t.value === task.value);
  if (alreadyAdded) return;

 
  }
 const SkillsWanted = [
  {value: "react", label:'React'},
  {value: "Node.js", label:'Node.js'},
   {value: "SQL", label:'SQL'},
  {value: "Machinelearning", label:'Machine Learning'},
   {value: "uiux", label:'UI&UX'},
  {value: "cybersecurity", label:'Cyber-Security'},
   {value: "mongodb", label:'MongoDB'},
  {value: "java", label:'Java'},
 ]
  return (
    <div className="total-width-1">
      <div>{renderheader(updateskills)}</div>
      <div className="profile-container">
        <div className="profile-text">
          <p className="profile-head">
            <User color="#5b5b5b" size={28} /> Profile Settings
          </p>
          <p className="profile-subhead">Manage your account and preferences</p>
        </div>

        <button className="explore-btn-1">
          <Save /> Save Changes
        </button>
      </div>
      {/* sub-active-btns */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activetabs === "profile" ? "active" : ""}`}
          onClick={() => setactivetabs("profile")}
        >
          Profile
        </button>

        <button
          className={`tab-btn ${activetabs === "skills" ? "active" : ""}`}
          onClick={() => setactivetabs("skills")}
        >
          Skills
        </button>

        <button
          className={`tab-btn ${activetabs === "Preferences" ? "active" : ""}`}
          onClick={() => setactivetabs("Preferences")}
        >
          Preferences
        </button>
      </div>
      {/* personal information */}
      {activetabs === "profile" && (
        <>
          <div className="profile-card">
            <h2 className="card-title">Personal Information</h2>
            <p className="card-subtitle">Update your profile details</p>

            {/* Profile Header Row */}
            <div className="profile-top">
              <div className="profile-avatar">
                {userInfo.fullname?.[0]?.toUpperCase()}
              </div>

              <div>
                <h3 className="profile-name">{userInfo.fullname}</h3>
                <p className="profile-email">{userInfo.email}</p>
                <span className="profile-badge">{userInfo.role}</span>
              </div>
            </div>

            {/* Form Grid */}
            <div className="profile-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={userInfo.fullname} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={userInfo.email} />
              </div>

              <div className="form-group">
                <label>Location</label>
                <Select
                  className="select-region"
                  options={Country}
                  value={city}
                  onChange={setcity}
                  placeholder="Select Location"
                />
              </div>

              <div className="form-group">
                <label>Experience Level</label>
                <Select
                  className="select-region"
                  options={Experiecing}
                  value={Experience}
                  onChange={setExperience}
                  placeholder="Select Experience"
                />
              </div>
            </div>
          </div>
          {/* account information */}
          <div className="profile-card">
            <p className="card-title" id="card">
              <Shield />
              Account Information
            </p>
            <div className="information">
              <p className="profile-name" id="account-time-text">
                Account Created
              </p>
              <p
                className="profile-name"
                style={{
                  color: "green",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                <Calendars color="black" size={22} />
                Joined on{" "}
                {userInfo.createdAt &&
                  new Date(userInfo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </>
      )}
      {/* skills interest */}
      {activetabs === "skills" && (
        <div className="profile-card">
              <h2 className="card-title">Your Skills</h2>
            <p className="card-subtitle">Add skills to get personalized recommendations</p>
            <div className="form-group">
                <Select 
                  className="select-region"
                  options={SkillsWanted}
                  value={task}
                  onChange={settask}
                  placeholder="Select a skill to add"/>
                  <button onClick={addSkills} className="add-skill-btn"><Plus size={18} /> Add</button>
                  <ul className="skills-list">
                  {todos.map((todo, index)=>(
                    <li key={index} className="skill-item">{todo.label }
                    <button onClick={()=>deleteTask(index)}>delete</button></li>
                  ))}
                  </ul>
              </div>

        </div>
      )}
    </div>
  );
}

export default Profile;
