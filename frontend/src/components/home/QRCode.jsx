import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QRCodeScreen.scss";
import Header from "../mobileHeader/Header";
import { useAuth } from "../../context/authContext"; // Adjust the path as needed
import { FiDownload, FiShare2 } from "react-icons/fi"; // Icons for download and share
import logo from "../../assets/logo.svg"; // Non-SVG example

const QRCodeScreen = () => {
  const { auth } = useAuth();
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [patientInfo, setPatientInfo] = useState(null);

  const userId = auth.userId;

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const qrResponse = await axios.get(`/patient/generate-qr/${userId}`);
        setQrCode(qrResponse.data.qrCode);
        setPatientInfo(qrResponse.data.patient);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching QR code:", error);
        setLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  // Function to handle downloading the QR code as an image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png"; // Filename for the downloaded image
    link.click();
  };

  // Function to handle sharing the QR code using Web Share API
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QR Code",
          text: "Here is my vaccination QR code.",
          url: qrCode, // Sharing the URL of the QR code image
        });
      } catch (error) {
        console.error("Error sharing the QR code:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="qr-code-screen-container">
      <Header />
      
      <div className="qr-card-container">
        <div className="qr-header">
          <p style={{ fontSize: "12px" }}>
            Please show this QR code to staff members to access your vital
            medical information, including medical conditions, treatments, and
            lab test details.
          </p>
        </div>

        <div className="qr-card">
        <img src={logo} className="qr-logo" /> {/* Add this line */}

          <div className="patient-info-section">
            {patientInfo && (
              <>
                <p style={{ marginBottom: "10px" }}>
                  <strong>MediBridge Digital Health Card</strong>
                </p>
                <p>
                  <strong>Name:</strong>  {patientInfo.name}C K D Nethmina Akalanka Dias
                </p>
                <p>
                  <strong>Date of Birth:</strong> {patientInfo.dob}28-04-2002
                </p>
                <p>
                  {/* <strong>Gender:</strong> {patientInfo.gender}Male
                  <span style={{ margin: "0 40px" }}></span> */}
                  <strong>Blood Group:</strong> {patientInfo.bloodGroup}O+
                </p>
              </>
            )}
          </div>

          <div className="qr-code-container">
            {loading ? (
              <p>Loading QR code...</p>
            ) : qrCode ? (
              <img
                src={qrCode}
                alt="Patient QR Code"
                className="qr-code-image"
              />
            ) : (
              <p>Failed to load QR code.</p>
            )}
          </div>

          {/* <div className="qr-buttons">
            <button className="download-button">Download SMART® Health Card</button>
            <button className="print-button">Download Printable PDF</button>
          </div> */}
        </div>

        <div className="qr-info">
          <p>
            <strong>What is a MediBridge Health Card?</strong>
          </p>
          <ul>
            <li>Holds your important medical and lab report data</li>
            <li>
              Can be scanned to verify that the information has not been
              tampered with
            </li>
            <li>
              <b>Dont forget</b>- Your QR code contains sensitive health
              information. Only share it with trusted parties to protect your
              privacy.
            </li>
          </ul>
        </div>
      </div>
      {/* Footer with download and share buttons */}
      <footer className="qr-footer">
        <button className="footer-btn" onClick={handleDownload}>
          <FiDownload size={22} color={"#0076C1"} /> Save as Image
        </button>
        <button className="footer-btn" onClick={handleShare}>
          <FiShare2 size={22} color={"#0076C1"} /> Share
        </button>
      </footer>
    </div>
  );
};

export default QRCodeScreen;
