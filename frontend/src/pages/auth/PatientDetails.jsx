import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss"; // Import CSS for styling
import logo from "../../assets/medibridgelogo.svg"; // Import SVG logo
import { FaArrowRight } from "react-icons/fa"; // Import the arrow icon

const PatientDetails = () => {
  const [nic, setNic] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    // You can add further validation if necessary
    if (!nic || !mobile || !dob || !gender) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Assuming you're saving the details to your context or API
    // For example: savePatientDetails({ nic, mobile, dob, gender });

    navigate("/nextScreen"); // Navigate to the next screen after successful entry
  };

  return (
    <div className="login-page">
      {/* Left side with image */}
      <div className="login-left">
        <img
          src="https://via.placeholder.com/600x800" // Replace with actual image URL
          alt="patient details background"
        />
      </div>

      {/* Right side with patient details form */}
      <div className="login-right">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Enter Patient Details</h2>
        <input
          type="text"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          placeholder="NIC"
          required
          disabled={loading}
          className="login-input"
        />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          required
          disabled={loading}
          className="login-input"
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
          required
          disabled={loading}
          className="login-input"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          disabled={loading}
          className="login-input"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="login-options">
          <button
            onClick={handleContinue}
            disabled={loading || !nic || !mobile || !dob || !gender}
            className="login-btn"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
        
        {/* Skip button positioned at the bottom right */}
        <button
          onClick={() => navigate("/nextScreen")} // Allowing user to skip
          className="skip-btn"
          style={{ position: "absolute", bottom: "20px", right: "20px", fontWeight: "600"}} // Adjust positioning as necessary
        >
          Skip for now
          <FaArrowRight style={{ marginLeft: "8px" }} /> {/* Arrow icon */}

        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
