import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar"; // Ensure Sidebar path is correct
import Navbar from "../../components/navbar/Navbar";
import './PatientRecords.scss'; // Assuming custom styles for the page

const PatientRecords = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const data = location.state?.data; // Retrieve patient data from navigation state

  // Extract patient information from the data structure
  const patient = data?.user || data; // Adjust based on how data is structured
  const treatments = data?.treatments || []; // Ensure it's an array for mapping

  // Add your filtering criteria for treatments here
  const filteredTreatments = treatments.filter(treatment => treatment.status === "active"); // Example condition

  // Handlers for navigation
  const handleTreatmentClick = () => {
    navigate('/treatment'); // Navigate to the Treatments page
  };

  const handleLabClick = () => {
    navigate('/lab'); // Navigate to the Lab Tests page
  };
  console.log('Patient Image URL:', patient.imgUrl);
  console.log('Patient Data:', data);

  return (
    <div className="patient-records-page">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="patient-info-container">
          <div className="header">
            <h2>Patient Medical Records</h2>
          </div>
          <div className="patient-info-box">
            {/* Patient Info */}
            {patient ? (
              <div className="patient-info">
                <img src= {patient.imgUrl} alt="Patient" className="patient-pic" />
                <div className="patient-details">
                  <h3>About Patient</h3>
                  <p>Name: {patient.name}</p>
                  <p>NIC: {patient.nic}</p>
                  <p>Email: {patient.email}</p>
                  {/* Add other patient details if needed */}
                </div>
              </div>
            ) : (
              <p>Patient details not found.</p>
            )}

            {/* Links to Treatments and Lab Tests */}
            <div className="treatments-labs">
              <button onClick={handleTreatmentClick} className="treatment-button">
                Treatments
              </button>
              <button onClick={handleLabClick} className="lab-button">
                Lab Tests
              </button>
            </div>

            {/* Health Status (Example Data) */}
            <div className="health-status">
              <div className="status-item">
                <span>Heart Beat</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '93%' }}></div>
                </div>
              </div>
              <div className="status-item">
                <span>Blood Pressure</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '89%' }}></div>
                </div>
              </div>
              <div className="status-item">
                <span>Sugar</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="status-item">
                <span>Haemoglobin</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Treatments List */}
            {treatments.length > 0 ? (
              <div className="treatments-list">
                <h3>Treatments</h3>
                {treatments.map((treatment) => (
                  <div key={treatment._id} className="treatment-item">
                    <p>Treatment Name: {treatment.treatment_Name}</p>
                    <p>Doctor ID: {treatment.doctor_Name}</p>
                    <p>Date: {new Date(treatment.date).toLocaleDateString()}</p>
                    <p>Description: {treatment.description}</p>
                    <p>Status: {treatment.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No treatments found.</p>
            )}

            {/* Filtered Treatments List */}
            {filteredTreatments.length > 0 ? (
              <div className="filtered-treatments-list">
                <h3>Active Treatments</h3>
                {filteredTreatments.map((treatment) => (
                  <div key={treatment._id} className="treatment-item">
                    <p>Treatment Name: {treatment.treatment_Name}</p>
                    <p>Doctor ID: {treatment.doctor_Name}</p>
                    <p>Date: {new Date(treatment.date).toLocaleDateString()}</p>
                    <p>Description: {treatment.description}</p>
                    <p>Status: {treatment.status}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No active treatments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
