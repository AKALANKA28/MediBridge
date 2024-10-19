import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaFacebook, FaTwitter } from "react-icons/fa"; // Import social icons
import "./login.scss"; // Import CSS for styling
import logo from "../../assets/medibridgelogo.svg"; // Import SVG logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post("/api/user/login", { email, password });
      if (response && response.data) {
        const { token, role, _id } = response.data;
        login(token, role, _id);
        if (role === "admin") navigate("/");
        else if (role === "patient") navigate("/home");
        else if (role === "doctor") navigate("/");
        else navigate("/");
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left side with image */}
      <div className="login-left">
        <img
          src="https://via.placeholder.com/600x800" // Replace with actual image URL
          alt="login background"
        />
      </div>

      {/* Right side with login form */}
      <div className="login-right">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Login to continue</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          disabled={loading}
          className="login-input"
        />

        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading || !email || !password}
          className="login-btn"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="or-text">or sign up using</p>

        <div className="social-login">
          <FaFacebook className="social-icon facebook" />
          <FaTwitter className="social-icon twitter" />
        </div>
        <button
          onClick={() => navigate("/register")} // Allowing user to skip
          className="skip-btn"
          style={{ position: "absolute", bottom: "20px", right: "20px", fontWeight: "600"}} // Adjust positioning as necessary
        >
          Create a Account
          <FaArrowRight style={{ marginLeft: "8px" }} /> {/* Arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default Login;
