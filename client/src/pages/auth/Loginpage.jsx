import React, { useState } from "react";
import icon from "../../assets/icons.png";
import "./Login.css";
import carrerforge from "../../assets/carrerforge.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AUTH_TEXT } from "./Text";
import supabase from "../../Supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.warn(error.message, {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    const user = data?.user;
    const fullname = user?.user_metadata?.fullname || "";
    const role = user?.user_metadata?.role || "";
    const email = user?.email || logindata.email || "";
    const id = user?.id || "";
    const createdAt = new Date().toISOString();

    const loggedInUser = {
      id,
      fullname,
      email,
      role,
      createdAt,
    };

    localStorage.removeItem("users");
    localStorage.removeItem("admins");
    localStorage.removeItem("currentProfile");
    localStorage.removeItem("useremail");

    if (role === "jobseeker") {
      localStorage.setItem("users", JSON.stringify(loggedInUser));
    } else if (role === "recruiter") {
      localStorage.setItem("admins", JSON.stringify(loggedInUser));
    } else {
      localStorage.setItem("users", JSON.stringify(loggedInUser));
    }

    localStorage.setItem("useremail", email);

    toast.success("Login successful!", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/Dashboard");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="grid-overlay" />
        <div className="blob primary-blob" />
        <div className="blob accent-blob" />

        <div className="left-content">
          <div className="brand">
            <div className="brand-icon">
              <img src={icon} alt="icon" style={{ height: "70px" }} />
            </div>
            <img src={carrerforge} alt="careerforge" style={{ height: "40px" }} />
          </div>

          <h1>
            {Welcome}
            <span className="gradient-text"> {Carrer}</span>
          </h1>

          <p>{Access}</p>
        </div>
      </div>

      <div className="right-login">
        <div className="form-box">
          <Link to="/">
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

          <form
            onSubmit={login}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <ToastContainer />

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
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  {showpassword ? "SHOW" : "HIDE"}
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