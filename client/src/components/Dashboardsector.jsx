import React, { useState } from "react";
import "./Dashboard.css";
import icon from "../assets/icons.png";
import { LayoutDashboard, Search, TrendingUp, Disc2, User, Settings2, LogOut } from "lucide-react";
import Dashboardcontent from "./Dashboardcontent";
import Skillanalysis from "./Skillanalysis";
import Profile from "./Profile";

function Dashboardsector() {
  const [activeindex, setActiveIndex] = useState(0);

  const navitems = [
    { image: <LayoutDashboard />, label: "Dashboard" },
    { image: <Search />, label: "Skill Analysis" },
    { image: <TrendingUp />, label: "Job Insights" },
    { image: <Disc2 />, label: "Recommendations" },
    { image: <User />, label: "Profile" },
    
  ];

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
            <button className="log"> <LogOut style={{marginTop:'5px'}}/>Logout  </button>
           
          </div>
          
        </div>

        <div className="right-section">
        {activeindex === 0 && <Dashboardcontent />}
        {activeindex === 1 && <Skillanalysis />}
        {activeindex === 4 && <Profile />}
       

        </div>
      </div>
    </div>
  );
}

export default Dashboardsector;
