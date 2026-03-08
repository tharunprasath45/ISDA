import React, { useState } from "react";
import "./Home.css";
import business from "../../assets/Business_decisions-pik.png";
import icon from "../../assets/icons.png";
import carrerforge from "../../assets/carrerforge.png";
import { Link } from "react-router-dom";

function Home({ buttons, smartcarrer, decision, carrerparagraph }) {
  // const boxhead = {
  //   fontSize:'16px',
  //   fontFamily:'Roboto',
  //   fontWeight:'bolder',
  //   padding:"10px"
  // }
  const boxinline = {
    fontSize: "12.6px",
    fontWeight: "500",
    fontFamily: "Inter",
    marginBottom: "5px",
    lineHeight: "1.5",
    color: "#555",
    position: "relative",
    bottom: "10px",
  };
  const Object1 = [
    {
      CarrerActivity: "Carrer Activity",
      SkillIntelligence: "Skill Intelligence",
      SmartJobMatching: "Smart Job Matching",

      carrerinline:
        " Make informed career decisions with clear role insights, skill expectations, and growth.",
      skillinline:
        "Identify in-demand skills, close gaps faster, and stay aligned with evolving industry.",
      smartinline:
        "Discover opportunities that truly fit your profile, goals, and potential-beyond keywords.",
    },
  ];
  return (
    <div className="maincontainer">
      <div className="half-content">
        <div className="hun-white">
          <img src={icon} style={{ height: "100px" }} />
          <img
            src={carrerforge}
            style={{ height: "50px", marginTop: "20px" }}
          />
          {/* <p style={{marginLeft:'20px',fontSize:'60px'}}>CₐᵣₑₑᵣFₒᵣgₑ</p> */}
        </div>
        <div className="content-white">
          <div className="text-context">
            <div style={{display:'flex', flexDirection:'row',alignItems:'center',gap:'40px'}}>
            <Link to="/login">
              <button className="Explore">{buttons}</button>
            </Link>
          <Link to="/Sign" style={{textDecoration:'none'}}> <p style={{fontFamily:'Inter',fontSize:'17px',color:'#7d7b7b',cursor:'pointer'}}>Start Analyzing</p>
          </Link> </div>
            

            <p className="Smarter">{smartcarrer}</p>
            <p
              style={{
                fontSize: "50px",
                position: "relative",
                bottom: "10px",
                fontFamily: "Inter",
                fontWeight: "700",
              }}
            >
              {decision}
            </p>
            <p
              style={{
                fontSize: "18px",
                fontFamily: "Inter",
                color: "rgb(112, 128, 144)",
                lineHeight: "1.7",
                position: "relative",
                top: "10px",
              }}
            >
              {carrerparagraph}
            </p>
            <div className="last-column">
              {Object1.map((obj, index) => (
                <React.Fragment key={index}>
                  <div className="first-box">
                    <fieldset className="box-fieldset">
                      <legend className="box-legend">
                        {obj.CarrerActivity}
                      </legend>
                      <p style={boxinline}>{obj.carrerinline}</p>
                    </fieldset>
                  </div>
                  <div className="first-box" style={{ marginTop: "50px" }}>
                    <fieldset className="box-fieldset">
                      <legend className="box-legend">
                        {obj.SkillIntelligence}
                      </legend>
                      <p style={boxinline}>{obj.skillinline}</p>
                    </fieldset>
                  </div>
                  <div className="first-box" style={{ marginTop: "100px" }}>
                    <fieldset className="box-fieldset">
                      <legend className="box-legend">
                        {obj.SmartJobMatching}
                      </legend>
                      <p style={boxinline}>{obj.smartinline}</p>
                    </fieldset>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="minhalf-content">
        <img src={business} className="main-image" />
        <img src={icon} className="overlay-icon" />
      </div>
    </div>
  );
}

export default Home;
