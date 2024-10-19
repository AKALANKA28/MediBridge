import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/table.scss"; // Import the styling

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; // Material UI Button

const WardPatientsTable = () => {
  const [wardID, setWardID] = useState(''); // State to store selected ward
  const [availableWards, setAvailableWards] = useState([]); // State to store available wards
  const [patients, setPatients] = useState([]); // State to store patients
  const [message, setMessage] = useState(''); // State for displaying messages

  // Fetch available wards when the component mounts
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('api/ward/available');
        setAvailableWards(response.data);
      } catch (error) {
        console.error('Error fetching wards', error);
      }
    };
    fetchWards();
  }, []);

  // Fetch patients when a ward is selected
  useEffect(() => {
    const fetchPatients = async () => {
      if (wardID) {
        try {
          const response = await axios.get(`api/ward/${wardID}/patients`);
          setPatients(response.data);
        } catch (error) {
          console.error('Error fetching patients', error);
        }
      }
    };
    fetchPatients();
  }, [wardID]);

  // Discharge a patient
  const dischargePatient = async (patientID) => {
    const confirmed = window.confirm('Are you sure you want to discharge this patient?');
    if (!confirmed) return;

    try {
      const response = await axios.delete(`api/ward/${wardID}/patients/${patientID}`);
      setMessage(response.data.message);
      setPatients(patients.filter(patient => patient.patientID !== patientID)); // Remove discharged patient from the list
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error discharging patient');
    }
  };

  return (
    <div>
      {/* Ward Selection */}
      <div className="ward-selection">
        <label>Select Ward: </label>
        <select
          className="ward-dropdown"
          value={wardID}
          onChange={(e) => setWardID(e.target.value)}
        >
          <option value="">Select a Ward</option>
          {availableWards.map((ward) => (
            <option key={ward.wardID} value={ward.wardID}>
              {ward.name} (Capacity: {ward.capacity - ward.currentPatients.length} remaining)
            </option>
          ))}
        </select>
      </div>

      {/* Message Display */}
      {message && <p className="message">{message}</p>}

      {/* Patients Table */}
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="patient table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Patient ID</TableCell>
              <TableCell className="tableCell">Admission Date</TableCell>
              <TableCell className="tableCell">Discharge Date</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient.patientID}>
                  <TableCell className="tableCell">{patient.patientID}</TableCell>
                  <TableCell className="tableCell">
                    {new Date(patient.admissionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="tableCell">
                    {patient.dischargeDate ? new Date(patient.dischargeDate).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="tableCell">
                    {/* Material UI styled button */}
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => dischargePatient(patient.patientID)}
                      className="discharge-btn"
                    >
                      Discharge
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4">No patients in this ward</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WardPatientsTable;
