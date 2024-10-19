import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './PatientRecords.scss';

const PatientRecords = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const patient = data?.user || data;
  const treatments = data?.treatments || [];
  const tests = data?.tests || [];

  // Handlers for navigation
  const handleTreatmentClick = () => {
    // Navigate to the Treatments page with treatment details and patientId
    navigate('/treatment', {
      state: {
        treatments,
        patientId: patient?.id || patient?.patientId // Adjust based on how patient ID is structured
      }
    });
  };

  const handleLabClick = () => {
    navigate('/lab');
  };

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
            {patient ? (
              <div className="patient-info">
                <img src={patient.imgUrl} alt="Patient" className="patient-pic" />
                <div className="patient-details">
                  <h3>About Patient</h3>
                  <p>Name: {patient.name}</p>
                  <p>NIC: {patient.nic}</p>
                  <p>Email: {patient.email}</p>
                </div>
              </div>
            ) : (
              <p>Patient details not found.</p>
            )}
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
            {/* Additional Health Status and Treatment Display Logic */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
