import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QRCodeScreen.scss";
import Header from "../mobileHeader/Header";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed

const QRCodeScreen = () => {
  const { auth } = useAuth(); // Get auth object from context
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state
  const [patientInfo, setPatientInfo] = useState(null); // State for patient information

  const userId = auth.userId; // Use authenticated user's ID

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const qrResponse = await axios.get(
          `http://192.168.1.159:8080/patient/generate-qr/${userId}`
        );
        console.log("QR Code Response Data:", qrResponse.data);

        // Use the QR code directly from the response
        setQrCode(qrResponse.data.qrCode);
        setPatientInfo(qrResponse.data.patient); // Assuming patient info is returned here

        setLoading(false); // Set loading to false after fetching the QR code
      } catch (error) {
        console.error("Error fetching QR code:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchQRCode();
  }, []);

  console.log("QR Code for Image:", qrCode);

  return (
    <div className="qr-code-screen-container">
    <Header />

    <div className="qr-code-display-container">
      {loading ? (
        <p className="qr-code-loading-text">Loading QR code...</p>
      ) : qrCode ? (
        <>
          <img className="qr-code-image" src={qrCode} alt="Patient QR Code" />
          {patientInfo && (
            <div className="patient-info">
              <p><strong>Name:</strong> {patientInfo.name}</p>
              <p><strong>Age:</strong> {patientInfo.age}</p>
              <p><strong>Gender:</strong> {patientInfo.gender}</p>
              <p><strong>Blood Type:</strong> {patientInfo.blood}</p>
              <p><strong>Health ID:</strong> {patientInfo.healthId}</p>
            </div>
          )}
        </>
      ) : (
        <p className="qr-code-error-text">Failed to load QR code.</p>
      )}
    </div>
  </div>
  );
};

export default QRCodeScreen;
