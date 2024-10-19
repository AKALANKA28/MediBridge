import React, { useState, useEffect } from "react";
import "./scanner.scss"; // Ensure the correct path to the CSS file
import Sidebar from "../../components/sidebar/Sidebar"; // Correct Sidebar path
import Navbar from "../../components/navbar/Navbar"; // Correct Navbar path
import { Html5QrcodeScanner } from "html5-qrcode"; // Ensure this package is installed
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for API calls

function Scanner() {
  const [scannedQrUrl, setScannedQrUrl] = useState(null); // Store scanned QR code result (URL)
  const [loading, setLoading] = useState(false); // Loading state for patient data
  const [patientName, setPatientName] = useState(""); // Patient Name input
  const [patientNIC, setPatientNIC] = useState(""); // Patient NIC input
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    const success = (result) => {
      scanner.clear(); // Stop scanning
      setScannedQrUrl(result); // Store the scanned URL result
    };

    const error = (err) => {
      console.warn("QR code scan error:", err); // Log any errors
    };

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
        setErrorMessage(""); // Clear previous error messages

        try {
          console.log("Scanned QR URL:", scannedQrUrl); // Log the scanned QR URL
          const patientId = scannedQrUrl.split("/").pop(); // Extract patient ID from URL

          // Fetch patient profile data using the patient ID
          const response = await axios.get(
            `http://localhost:8080/patient/${patientId}`
          );

          // Navigate to the PatientRecords page with the fetched patient data
          navigate("/patientrecords", {
            state: { data: response.data }, // Pass fetched data
          });
        } catch (error) {
          console.error("Error fetching patient profile:", error);
          setErrorMessage(
            "Failed to fetch patient data. Please check the QR code."
          );
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchPatientData();
  }, [scannedQrUrl, navigate]);

  // Check patient by name and NIC
  const handleCheckPatient = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading state
    setErrorMessage(""); // Clear previous error messages

    try {
      const apiUrl = `/patient?name=${encodeURIComponent(patientName)}&nic=${encodeURIComponent(patientNIC)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.length > 0) {
        const patientData = response.data[0];

        const user = patientData.user || {}; // Prevent null reference
        const filteredData = {
          id: patientData._id,
          name: user.name || "Unknown",
          email: user.email || "N/A",
          nic: user.nic || "N/A",
          treatments: patientData.treatments || [],
        };

        navigate("/patientrecords", {
          state: { data: filteredData },
        });
      } else {
        setErrorMessage("Patient not found.");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setErrorMessage("Error fetching patient data.");
    } finally {
      setLoading(false); // Set loading to false after fetching
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
              {loading && <p>Loading patient data...</p>}{" "}
              {/* Loading indicator */}
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}{" "}
              {/* Error message */}
            </div>

            <div className="scan-box">
              <h2>Enter The Patient Details</h2>
              <form
                className="patient-form"
                onSubmit={handleCheckPatient}
              >
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
                  type="submit"
                  className="scan-button"
                  disabled={loading} // Disable button when loading
                >
                  Check Patient
                </button>
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
              {/* Error message */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
