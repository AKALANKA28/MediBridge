import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Import arrow icon
import "./login.scss"; // Import CSS for styling
import logo from "../../assets/medibridgelogo.svg"; // Import SVG logo

const MedicalConditions = () => {
  const [surgery1, setSurgery1] = useState("no"); // Default to "no"
  const [surgery2, setSurgery2] = useState("no"); // Default to "no"
  const [surgeryDetails1, setSurgeryDetails1] = useState(""); // Details for the first question
  const [surgeryDetails2, setSurgeryDetails2] = useState(""); // Details for the second question
  const { auth } = useContext(AuthContext); // Get auth context to access user ID
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.put(`/api/user/update/${auth.userId}`, {
        surgery1,
        surgery2,
        surgeryDetails1,
        surgeryDetails2,
      });

      if (response && response.data) {
        // Assuming the response contains updated user information or a success message
        navigate("/"); // Redirect to home page upon success
      } else {
        setErrorMessage("Update failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Update failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle button click for the first surgery question
  const handleSurgery1 = (answer) => {
    setSurgery1(answer);
  };

  // Function to handle button click for the second surgery question
  const handleSurgery2 = (answer) => {
    setSurgery2(answer);
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
        <h2>Medical Conditions</h2>

        {/* First Surgery Question */}
        <div className="question">
          <label>Have you had any surgeries?</label>
          <div className="button-group">
            <button
              className={`bton button-yes ${surgery1 === "yes" ? "active" : ""}`}
              onClick={() => handleSurgery1("yes")}
            >
              Yes
            </button>
            <button
              className={`bton button-no ${surgery1 === "no" ? "active" : ""}`}
              onClick={() => handleSurgery1("no")}
            >
              No
            </button>
          </div>
        </div>
        <input
          type="text"
          className="login-input"
          placeholder="If yes, add some details, separate by a ,"
          value={surgeryDetails1}
          onChange={(e) => setSurgeryDetails1(e.target.value)}
        />

        {/* Second Surgery Question */}
        <div className="question">
          <label>Have you had any surgeries?</label>
          <div className="button-group">
            <button
              className={`bton button-yes ${surgery2 === "yes" ? "active" : ""}`}
              onClick={() => handleSurgery2("yes")}
            >
              Yes
            </button>
            <button
              className={`bton button-no ${surgery2 === "no" ? "active" : ""}`}
              onClick={() => handleSurgery2("no")}
            >
              No
            </button>
          </div>
        </div>
        <input
          type="text"
          className="login-input"
          placeholder="If yes, add some details, separate by a ,"
          value={surgeryDetails2}
          onChange={(e) => setSurgeryDetails2(e.target.value)}
        />

        <button onClick={handleUpdate} className="login-btn">
          {loading ? "Continuing..." : "Continue"} {/* Change button text to "Update" */}
        </button>

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
          Skip for now
          <FaArrowRight style={{ marginLeft: "8px" }} /> {/* Arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default MedicalConditions;
