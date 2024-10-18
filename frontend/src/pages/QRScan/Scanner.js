import React, { useState, useEffect } from "react";
import "./scanner.scss"; // Include the correct path to the CSS file
import Sidebar from "../../components/sidebar/Sidebar"; // Ensure correct path for Sidebar
import Navbar from "../../components/navbar/Navbar"; // Ensure correct path for Navbar
import { Html5QrcodeScanner } from "html5-qrcode"; // Make sure this package is installed

function Scanner() {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    function success(result) {
      scanner.clear(); // Stop scanning after a QR code is read
      setScanResult(result); // Store the scan result
    }

    function error(err) {
      console.warn("QR code scan error:", err); // Log any errors
    }

    scanner.render(success, error);

    // Clean up scanner on component unmount
    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="scan-page">
      <Sidebar />
      <div className="scan-container">
        <Navbar />
        <div className="scan-content">
          <h1 className="scan-title">Manage Patient Medical Records</h1>
          <div className="scan-box-container">
            {/* QR Scanner Container */}
            <div className="scan-box">
              <h2>Scan The QR Code</h2>
              {/* Display scan result if available, otherwise show the QR reader */}
              {scanResult ? (
                <div>
                  Success: <a href={"http://" + scanResult}>{scanResult}</a>
                </div>
              ) : (
                <div id="reader"></div>
              )}
            </div>
            {/* Form to Enter Patient Details */}
            <div className="scan-box">
              <h2>Enter The Patient Details</h2>
              <form className="patient-form">
                <input type="text" placeholder="Patient Name" />
                <button type="submit">Check Patient</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
