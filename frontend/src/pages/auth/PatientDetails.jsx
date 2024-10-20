import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./login.scss";
import logo from "../../assets/medibridgelogo.svg";
import { FaArrowRight } from "react-icons/fa";

const PatientDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId; // Get the user ID passed from the Register component
  console.log( "name",userId);
  
  const [nic, setNic] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!nic || !mobile || !dob || !gender) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Send a PUT request to update user details
      const response = await axios.put(`http://localhost:8080/api/user/update/${userId}`, {
        nic,
        mobile,
        dob,
        gender,
        userId
      }
    );

      if (response.status === 200) {
        console.log("User details updated successfully:", response.data);
        navigate("/"); // Navigate to the next screen after successful update
      } else {
        setErrorMessage("Failed to update user details. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating user details. Please try again.");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img
          src="https://via.placeholder.com/600x800" // Replace with actual image URL
          alt="patient details background"
        />
      </div>

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
            // disabled={loading || !nic || !mobile || !dob || !gender}
            className="login-btn"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </div>
        
        <button
          onClick={() => navigate("/")} // Allowing user to skip
          className="skip-btn1"
          style={{ position: "absolute", bottom: "20px", right: "20px", fontWeight: "600"}} // Adjust positioning as necessary
        >
          Skip for now
          <FaArrowRight style={{ marginLeft: "8px" }} /> {/* Arrow icon */}
        </button>
        <button
          onClick={() => navigate("/medical-conditions")} // Allowing user to skip
          className="skip-btn2"
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
