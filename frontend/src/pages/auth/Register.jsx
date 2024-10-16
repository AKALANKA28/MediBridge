import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./login.scss"; // Import CSS for styling
import logo from "../../assets/medibridgelogo.svg"; // Import SVG logo

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState(""); // Changed from password to NIC
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleRegister = async () => {
    setLoading(true);
    setErrorMessage("");

    // Client-side validation for password matching
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/user/register", {
        email,
        password,
      });
      if (response && response.data) {
        const { token, role, _id } = response.data;
        login(token, role, _id);
        navigate("/"); // Redirect to the home page or dashboard
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Registration failed. Please check your details.");
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

      {/* Right side with registration form */}
      <div className="login-right">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Create a new account</h2>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          disabled={loading}
          className="login-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          disabled={loading}
          className="login-input"
        />

        {/* Password Input with Eye Icon */}
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"} // Show or hide password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={loading}
            className="login-input"
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon */}
          </span>
        </div>


        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <button
          onClick={handleRegister}
          disabled={loading || !email || !password || !confirmPassword}
          className="login-btn"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="or-text">or sign up using</p>
        <div className="social-login">
          <FaFacebook className="social-icon facebook" />
          <FaTwitter className="social-icon twitter" />
        </div>
      </div>
    </div>
  );
};

export default Register;
