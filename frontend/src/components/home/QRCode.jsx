import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./QRCodeScreen.scss";
import Header from "../mobileHeader/Header";

const QRCodeScreen = () => {
  const qrData = "Digital Health Card Data"; // Data that will be encoded in the QR code
  const healthCardInfo = {
    name: "John Doe",
    dob: "January 1, 1985",
    bloodType: "O+",
    healthID: "H12345678",
    insurance: "MediCare",
    emergencyContact: "Jane Doe - 1234567890"
  };

  return (
    <div className="qr-code-screen">
      <Header/>
      {/* Health Card Information Section */}
      <div className="health-card">
        <h3>Health Card Details</h3>
        <p><strong>Name:</strong> {healthCardInfo.name}</p>
        <p><strong>Date of Birth:</strong> {healthCardInfo.dob}</p>
        <p><strong>Blood Type:</strong> {healthCardInfo.bloodType}</p>
        <p><strong>Health ID:</strong> {healthCardInfo.healthID}</p>
        <p><strong>Insurance:</strong> {healthCardInfo.insurance}</p>
        <p><strong>Emergency Contact:</strong> {healthCardInfo.emergencyContact}</p>
      </div>

      {/* QR Code Section */}
      <div className="qr-code-container">
        <QRCodeCanvas value={qrData} size={256} />
        <p>{qrData}</p>
      </div>
    </div>
  );
};

export default QRCodeScreen;
