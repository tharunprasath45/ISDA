import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import icon from "../assets/icons.png";
import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Disc2,
  User,
  Users,
  LogOut,
  SquarePlus,
  BriefcaseBusiness,
} from "lucide-react";
import Dashboardcontent from "./Dashboardcontent";
import Skillanalysis from "./Skillanalysis";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import supabase from "../Supabase";
import Reccomendations from "./Reccomendations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Jobinsights from "./Jobinsights";
import RecuiterDashboard from "../pages/admin/RecruiterDashboard";
import Jobpost from "../pages/admin/Jobpost";
import Postedjobs from "../pages/admin/Postedjobs";
import Applicants from "../pages/admin/Applicants";

function Dashboardsector() {
  const [activeindex, setActiveIndex] = useState(0);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.removeItem("users");
    localStorage.removeItem("admins");
    localStorage.removeItem("useremail");
    localStorage.removeItem("activejobcount");
    localStorage.removeItem("monthlyhires");

    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/login");
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("users")) || null;
      const storedAdmin = JSON.parse(localStorage.getItem("admins")) || null;

      if (storedAdmin?.role === "recruiter") {
        setUserRole("recruiter");
        setActiveIndex(0);
      } else if (storedUser?.role === "jobseeker") {
        setUserRole("jobseeker");
        setActiveIndex(0);
      } else {
        const sessionRole = data.session.user?.user_metadata?.role || "";

        if (sessionRole === "recruiter") {
          setUserRole("recruiter");
          setActiveIndex(0);
        } else if (sessionRole === "jobseeker") {
          setUserRole("jobseeker");
          setActiveIndex(0);
        } else {
          navigate("/login");
        }
      }
    };

    checkUser();
  }, [navigate]);

  const jobseekerNavItems = [
    { image: <LayoutDashboard />, label: "Dashboard" },
    { image: <User />, label: "Profile" },
    { image: <Search />, label: "Skill Analysis" },
    { image: <TrendingUp />, label: "Browse Jobs" },
    { image: <Disc2 />, label: "Applied Jobs" },
  ];

  const recruiterNavItems = [
    { image: <LayoutDashboard />, label: "Dashboard" },
    { image: <User />, label: "Profile" },
    { image: <SquarePlus />, label: "Post Jobs" },
    { image: <BriefcaseBusiness />, label: "Jobs Posted" },
    { image: <Users />, label: "Applicants" },
  ];

  const navitems =
    userRole === "recruiter" ? recruiterNavItems : jobseekerNavItems;

  return (
    <div className="total-width">
      <div className="grid-template">
        <div className="left-section">
          <img src={icon} style={{ height: "70px" }} alt="icon" />
          <hr style={{ width: "100%", marginTop: "20px" }} />

          <div className="menu-container">
            {navitems.map((item, index) => (
              <div
                key={index}
                className={`menu-item ${activeindex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span>{item.image}</span>
                <span>{item.label}</span>
              </div>
            ))}

            <button className="log" onClick={handleLogout}>
              <LogOut style={{ marginTop: "5px" }} />
              Logout
            </button>

            <ToastContainer />
          </div>
        </div>

        <div className="right-section">
          {userRole === "jobseeker" && (
            <>
              {activeindex === 0 && <Dashboardcontent />}
              {activeindex === 1 && <Profile />}
              {activeindex === 2 && <Skillanalysis />}
              {activeindex === 3 && <Jobinsights />}
              {activeindex === 4 && <Reccomendations />}
            </>
          )}

          {userRole === "recruiter" && (
            <>
              {activeindex === 0 && <RecuiterDashboard />}
              {activeindex === 1 && <Profile />}
              {activeindex === 2 && <Jobpost />}
              {activeindex === 3 && <Postedjobs />}
              {activeindex === 4 && <Applicants />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboardsector;