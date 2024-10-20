import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa"; // Import eye icons
import "./login.scss"; // Import CSS for styling
import logo from "../../assets/medibridgelogo.svg"; // Import SVG logo

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const validateForm = () => {
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return false;
    }

    // Add more password validation if necessary
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must contain letters, numbers, and special characters.");
      return false;
    }

    // NIC format validation (example: must be alphanumeric, 10 characters)
    // const nicRegex = /^[0-9]{9}[vV]$/; // Adjust this regex based on your specific NIC format requirements
    // if (!nicRegex.test(nic)) {
    //   setErrorMessage("NIC must be in the correct format (e.g., 123456789v).");
    //   return false;
    // }

    setErrorMessage(""); // Clear error message if validation passes
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/user/register", {
        name,
        email,
        password,
        role: "patient", // Add the role here
      });
      if (response && response.data) {
        const { token, role, _id } = response.data;
        login(token, role, _id);
        navigate("/patient-details", { state: { userId: _id } }); // Pass user ID
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
          src={require("../../assets/registerImg.jpg")} // Replace with actual image URL
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
          type="text"
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
          disabled={loading || !email || !password || !name}
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
        <button
          onClick={() => navigate("/")} // Allowing user to skip
          className="skip-btn"
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            fontWeight: "600",
          }} // Adjust positioning as necessary
        >
          Login
          <FaArrowRight style={{ marginLeft: "8px" }} /> {/* Arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default Register;
