import React, { useState, useEffect } from "react";
import "./scanner.scss"; // Ensure the correct path to the CSS file
import Sidebar from "../../components/sidebar/Sidebar"; // Correct Sidebar path
import Navbar from "../../components/navbar/Navbar"; // Correct Navbar path
import { Html5QrcodeScanner } from "html5-qrcode"; // Ensure this package is installed
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls

function Scanner() {
  const [scannedQrUrl, setScannedQrUrl] = useState(null); // Store scanned QR code result (URL)
  const [patientData, setPatientData] = useState(null); // Store fetched patient data
  const [loading, setLoading] = useState(false); // Loading state for patient data
  const [patientName, setPatientName] = useState(""); // Patient Name input
  const [patientNIC, setPatientNIC] = useState(""); // Patient NIC input
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    function success(result) {
      scanner.clear(); // Stop scanning
      setScannedQrUrl(result); // Store the scanned URL result
    }

    function error(err) {
      console.warn("QR code scan error:", err); // Log any errors
    }

    scanner.render(success, error);

    return () => {
      scanner.clear(); // Cleanup on component unmount
    };
  }, []);

  // Fetch patient data when scannedQrUrl changes
  useEffect(() => {
    const fetchPatientData = async () => {
      if (scannedQrUrl) {
        setLoading(true); // Set loading state
  
        try {
          console.log("Scanned QR URL:", scannedQrUrl); // Log the scanned QR URL
  
          // Extract the patient ID from the scanned QR URL
          const patientId = scannedQrUrl.split("/").pop();
          console.log("Extracted Patient ID:", patientId); // Log the extracted patient ID
  
          // Fetch patient profile data using the patient ID
          const response = await axios.get(`http://localhost:8080/patient/${patientId}`);
  
          console.log("API Response:", response.data); // Log the API response data
  
          setPatientData(response.data); // Store patient data in state
  
          // Navigate to the PatientRecords page with the fetched patient data
          navigate("/patientrecords", {
            state: { users: response.data },
          });
        } catch (error) {
          console.error("Error fetching patient profile:", error); // Log the error details
          alert("An error occurred while fetching patient data."); // Alert user
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };
  
    fetchPatientData();
  }, [scannedQrUrl, navigate]);
  

  const handleCheckPatient = async () => {
    if (patientName && patientNIC) {
      setLoading(true); // Set loading state

      try {
        const apiUrl = `http://localhost:8080/patients?name=${encodeURIComponent(patientName)}&nic=${encodeURIComponent(patientNIC)}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          // Navigate to the PatientRecords page with the fetched patient data
          navigate("/patientrecords", {
            state: { users: response.data },
          });
        } else {
          alert("Patient not found.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        alert("An error occurred while fetching patient details.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    } else {
      alert("Please enter both Patient Name and NIC.");
    }
  };

  return (
    <div className="scan-page">
      <Sidebar />
      <div className="scan-container">
        <Navbar />
        <div className="scan-content">
          <h1 className="scan-title">Manage Patient Medical Records</h1>
          <div className="scan-box-container">
            <div className="scan-box">
              <h2>Scan The QR Code</h2>
              <div id="reader"></div> {/* QR code scanner */}
              {loading && <p>Loading patient data...</p>} {/* Loading indicator */}
            </div>

            <div className="scan-box">
              <h2>Enter The Patient Details</h2>
              <form className="patient-form">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Patient NIC"
                  value={patientNIC}
                  onChange={(e) => setPatientNIC(e.target.value)}
                />
                <button
                  type="button"
                  className="scan-button"
                  onClick={handleCheckPatient}
                >
                  Check Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
