import React, { useState } from "react";
import icon from "../../assets/icons.png";
import carrerforge from "../../assets/carrerforge.png";
import { CircleCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./Signup.css";
import supabase from "../../Supabase";
function Signuppage() {
  const points = [
    "Access real-time skill demand data",
    "Personalized career recommendations",
    "Industry-relevant learning paths",
    "Track your growth and progress",
  ];
  const [signuppage, setSignuppage] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showpassword, setshowpassword] = useState(false);
  const icon_size = 16;

  const signup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      fullname: signuppage.fullname,
      email: signuppage.email,
      password: signuppage.password,
    });
    if (error) {
      alert(error.message);
    } else {
      localStorage.setItem("users",
        JSON.stringify({
          fullname: signuppage.fullname,
          email: signuppage.email,
          role:'User',
          createdAt: new Date().toISOString(),
        })
      );
      console.log("Signup success:", data);
      alert("Account created successfully!");
    }
  };

  return (
    <div>
      <div className="login-container-1">
        {/* Right PANEL */}
        <div className="login-right">
          <div className="grid-overlay" />
          <div className="blob primary-blob" />
          <div className="blob accent-blob" />

          <div className="left-content-1">
            <div className="brand-1">
              <div className="brand-icon-1">
                <img src={icon} style={{ height: "70px" }} />
              </div>
              <img src={carrerforge} style={{ height: "40px" }} />
            </div>
            <h1>
              Start your journey to
              <span className="gradient-text-1"> career success</span>
            </h1>

            <p>
              Join thousands of professionals making smarter career decisions.
            </p>
            <div className="badgepoint">
              {points.map((text, index) => (
                <p key={index}>
                  <CircleCheck size={20} />
                  <span>{text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* left content */}
        <div className="leftlogin-panel">
          <div className="right-login">
            <div className="form-back">
              <Link to="/">
                {" "}
                <p className="back-link">
                  {" "}
                  <ArrowLeft size={icon_size} style={{ marginTop: "3px" }} />
                  Back to home
                </p>
              </Link>
              <p className="subtitle">Create your account</p>
              <p style={{ color: "#666", marginTop: "12px", fontSize: "16px" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#6366f1",
                  }}
                >
                  Sign in
                </Link>
              </p>
              <form
                onSubmit={signup}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="field-1">
                  <div className="field-header">
                    <label>Full Name</label>
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={signuppage.fullname}
                    onChange={(e) =>
                      setSignuppage({ ...signuppage, fullname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="field-1">
                  <div className="field-header-1">
                    <label>Email</label>
                  </div>
                  <input
                    type="email"
                    value={signuppage.email}
                    onChange={(e) =>
                      setSignuppage({ ...signuppage, email: e.target.value })
                    }
                    placeholder="you@gmail.com"
                    required
                  />
                </div>
                <div className="field-1">
                  <div className="field-header">
                    <label>Password</label>
                  </div>
                  <div className="password-wrapper">
                    <input
                      type={showpassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={signuppage.password}
                      onChange={(e) =>
                        setSignuppage({
                          ...signuppage,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password-1"
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
                        width: "75.3%",
                        marginTop: "36px",
                        backgroundColor: "black",
                        borderRadius: "6px",
                        fontSize: "18px",
                        boxShadow: "#666 solid 1.5px 1px",
                      }}
                      className="Signin"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
