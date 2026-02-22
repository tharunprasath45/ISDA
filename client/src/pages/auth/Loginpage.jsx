import React, { useState } from "react";
import icon from "../../assets/icons.png";
import "./Login.css";
import carrerforge from "../../assets/carrerforge.png";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AUTH_TEXT } from "./Text";
import supabase from "../../Supabase";

function Loginpage({ Welcome, Carrer, Access, Sign, Dont }) {
  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const icon_size = 16;

  const login = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: logindata.email,
      password: logindata.password,
    });
    if (error) {
      alert(error.message);
    } else {
      console.log("Logged success:", data);
      
      alert("Logged sucess",data);
      navigate("/Dashboard");
     
    }
  };
  return (
    <div className="login-container">
      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="grid-overlay" />
        <div className="blob primary-blob" />
        <div className="blob accent-blob" />

        <div className="left-content">
          <div className="brand">
            <div className="brand-icon">
              <img src={icon} style={{ height: "70px" }} />
            </div>
            <img src={carrerforge} style={{ height: "40px" }} />
          </div>

          <h1>
            {Welcome}
            <span className="gradient-text"> {Carrer}</span>
          </h1>

          <p>{Access}</p>
        </div>
      </div>
      {/* Right panel */}
      <div className="right-login">
        <div className="form-box">
          <Link to="/">
            {" "}
            <p className="back-link">
              <ArrowLeft size={icon_size} style={{ marginTop: "3px" }} />
              {AUTH_TEXT.backToHome}
            </p>
          </Link>
          <p className="subtitle">{Sign}</p>
          <p style={{ color: "#666", marginTop: "12px", fontSize: "16px" }}>
            {Dont}{" "}
            <Link
              to="/Sign"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: "#6366f1",
              }}
            >
              Sign up free
            </Link>
          </p>
          {/* form */}
          <form onSubmit={login} style={{ display: "flex", flexDirection: "column" }}>
            <div className="field">
              <div className="field-header">
                <label>Email</label>
              </div>
              <input
                type="email"
                value={logindata.email}
                onChange={(e) =>
                  setLogindata({ ...logindata, email: e.target.value })
                }
                placeholder="you@gmail.com"
                required
              />
            </div>
            <div className="field">
              <div className="field-header">
                <label>Password</label>
              </div>
              <div className="password-wrapper">
                <input
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={logindata.password}
                  onChange={(e) =>
                    setLogindata({ ...logindata, password: e.target.value })
                  }
                  required
                ></input>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  {showpassword ? (
                   "SHOW"
                  ) : (
                    "HIDE"
                  )}
                </button>
          
                <button
                  type="submit"
                  style={{
                    padding: "16px",
                    color: "#fff",
                    width: "106.2%",
                    marginTop: "36px",
                    backgroundColor: "black",
                    borderRadius: "6px",
                    fontSize: "18px",
                    boxShadow: "#666 solid 1.5px 1px",
                  }}
                  className="Signin"
                  
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
