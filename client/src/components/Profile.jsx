import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import "./Dashboard.css";
import { header, renderheader } from "./Dashboardcontent";
import { Save, User, Shield, Calendars, Plus, X, Trash2 } from "lucide-react";
import Select from "react-select";
import supabase from "../Supabase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const PROFILE_STORAGE_KEY = "currentProfile";

  const [city, setcity] = useState(null);
  const [Experience, setExperience] = useState(null);
  const [activetabs, setactivetabs] = useState("profile");
  const [task, settask] = useState(null);
  const [todos, settoDos] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  const [userInfo, setuserInfo] = useState({
    id: "",
    fullname: "",
    email: "",
    role: "",
    createdAt: "",
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const Country = [
    { value: "India", label: "India" },
    { value: "USA", label: "USA" },
    { value: "Canada", label: "Canada" },
    { value: "Germany", label: "Germany" },
  ];

  const Experiecing = [
    { value: "0-1", label: "0-1 year" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-8", label: "5-8 years" },
    { value: "8-10", label: "8-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  const SkillsWanted = [
    { value: "react", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "SQL", label: "SQL" },
    { value: "Machinelearning", label: "Machine Learning" },
    { value: "uiux", label: "UI&UX" },
    { value: "cybersecurity", label: "Cyber-Security" },
    { value: "mongodb", label: "MongoDB" },
    { value: "java", label: "Java" },
  ];

  const updateskills = header.map((intro) => {
    if (intro.dashboard === "Dashboard") return { dashboard: "Profile" };
    return intro;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("users");
    const storedAdmin = localStorage.getItem("admins");
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setuserInfo({
          id: parsedUser.id || "",
          fullname: parsedUser.fullname || "",
          email: parsedUser.email || "",
          role: parsedUser.role || "",
          createdAt: parsedUser.createdAt || "",
        });
      } catch (error) {
        console.error("Error parsing users:", error);
      }
    } else if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        setuserInfo({
          id: parsedAdmin.id || "",
          fullname: parsedAdmin.fullname || "",
          email: parsedAdmin.email || "",
          role: parsedAdmin.role || "",
          createdAt: parsedAdmin.createdAt || "",
        });
      } catch (error) {
        console.error("Error parsing admins:", error);
      }
    }

    if (savedProfile) {
      try {
        const data = JSON.parse(savedProfile);

        setuserInfo(
          data.userInfo || {
            id: "",
            fullname: "",
            email: "",
            role: "",
            createdAt: "",
          }
        );
        setcity(data.city || null);
        setExperience(data.Experience || null);
        setProfileImage(data.profileImage || null);
        settoDos(data.todos || []);
      } catch (error) {
        console.error("Error parsing saved profile:", error);
      }
    }
  }, []);

  const addSkills = () => {
    if (task) {
      const alreadyAdded = todos.some((t) => t.value === task.value);
      if (alreadyAdded) return;
      settoDos([...todos, task]);
      settask(null);
    }
  };

  const deleteTask = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    settoDos(newTodos);
  };

  const saveChanges = () => {
    if (!userInfo.fullname?.trim()) {
      toast.error("Please enter your full name", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
      return;
    }

    if (!userInfo.email?.trim()) {
      toast.error("Please enter your email", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
      return;
    }

    const updatedUser = {
      ...userInfo,
    };

    const data = {
      userInfo: updatedUser,
      city,
      Experience,
      todos,
      profileImage,
    };

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));

    if (updatedUser.role === "jobseeker") {
      localStorage.setItem("users", JSON.stringify(updatedUser));
      localStorage.removeItem("admins");
    } else if (updatedUser.role === "recruiter") {
      localStorage.setItem("admins", JSON.stringify(updatedUser));
      localStorage.removeItem("users");
    } else {
      localStorage.setItem("users", JSON.stringify(updatedUser));
    }

    localStorage.setItem("useremail", updatedUser.email);

    toast.success("Your data has been saved!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
  };

  const deleteAccount = async () => {
    const ok = window.confirm(
      "This will clear your app data and log you out. Continue?"
    );
    if (!ok) return;

    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }

    localStorage.clear();
    navigate("/Sign");
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

        <button className="explore-btn-1" onClick={saveChanges}>
          <Save /> Save Changes
        </button>
      </div>

      <ToastContainer />

      <div className="tabs-container">
        <button
          className={`tab-btn ${activetabs === "profile" ? "active" : ""}`}
          onClick={() => setactivetabs("profile")}
        >
          Profile
        </button>

        {userInfo.role === "jobseeker" && (
          <button
            className={`tab-btn ${activetabs === "skills" ? "active" : ""}`}
            onClick={() => setactivetabs("skills")}
          >
            Skills
          </button>
        )}

        <button
          className={`tab-btn ${activetabs === "Preferences" ? "active" : ""}`}
          onClick={() => setactivetabs("Preferences")}
        >
          Preferences
        </button>
      </div>

      {activetabs === "profile" && (
        <>
          <div className="profile-card">
            <h2 className="card-title">Personal Information</h2>
            <p className="card-subtitle">Update your profile details</p>

            <div className="profile-top">
              <div className="profile-avatar" onClick={handleAvatarClick}>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="avatar-img"
                    onError={() => setProfileImage(null)}
                  />
                ) : (
                  <span className="avatar-letter">
                    {userInfo.fullname?.trim()?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <div>
                <h3 className="profile-name">{userInfo.fullname}</h3>
                <p className="profile-email">{userInfo.email}</p>
                <span className="profile-badge">{userInfo.role}</span>
              </div>
            </div>

            <div className="profile-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={userInfo.fullname}
                  onChange={(e) =>
                    setuserInfo({ ...userInfo, fullname: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setuserInfo({ ...userInfo, email: e.target.value })
                  }
                />
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
                {userInfo.createdAt
                  ? new Date(userInfo.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </>
      )}

      {userInfo.role === "jobseeker" && activetabs === "skills" && (
        <div className="profile-card">
          <h2 className="card-title">Your Skills</h2>
          <p className="card-subtitle">
            Add skills to get personalized recommendations
          </p>

          <div className="form-group">
            <Select
              className="select-region"
              options={SkillsWanted}
              value={task}
              onChange={settask}
              placeholder="Select a skill to add"
            />

            <button onClick={addSkills} className="add-skill-btn">
              <Plus size={18} /> Add
            </button>

            <ul className="skills-list">
              {todos.map((todo, index) => (
                <li key={index} className="skill-item">
                  {todo.label}
                  <p onClick={() => deleteTask(index)}>
                    <X
                      size={20}
                      color="red"
                      style={{ marginTop: "5px", cursor: "pointer" }}
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activetabs === "Preferences" && (
        <div className="profile-card" style={{ border: "2px red solid" }}>
          <h2 className="card-title" style={{ color: "red" }}>
            Danger Zone
          </h2>

          <div className="information" style={{ background: "#bdbcbc4e" }}>
            <p className="profile-name" id="account-time-text">
              Delete Account
              <span
                style={{
                  fontSize: "14px",
                  color: "#727272",
                  fontWeight: "400",
                }}
              >
                Permanently delete your account and all data
              </span>
            </p>

            <p
              className="profile-name"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <button
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: "red",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontFamily: "Inter",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
                id="delete-btn"
                onClick={deleteAccount}
              >
                <Trash2 size={18} />
                Delete
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;