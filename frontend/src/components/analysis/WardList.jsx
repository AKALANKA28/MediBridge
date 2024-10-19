import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WardList = () => {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('/api/ward/'); // Fetch wards from your API
        setWards(response.data);
      } catch (error) {
        console.error('Error fetching wards:', error);
      }
    };

    fetchWards();
  }, []);

  return (
    <div>
      <h2>Wards List</h2>
      <ul>
        {wards.length > 0 ? (
          wards.map((ward) => (
            <li key={ward._id}>
              <h3>Ward Name: {ward.name} (ID: {ward.wardID})</h3>
              <p>Capacity: {ward.capacity}</p>
              <p>Number of Current Patients: {ward.currentPatients.length}</p>
              
              {/* Display list of admitted patients */}
              {ward.currentPatients.length > 0 ? (
                <ul>
                  {ward.currentPatients.map((patientID, index) => (
                    <li key={index}>Patient ID: {patientID}</li>
                  ))}
                </ul>
              ) : (
                <p>No patients admitted in this ward</p>
              )}
            </li>
          ))
        ) : (
          <p>No wards available</p>
        )}
      </ul>
    </div>
  );
};

export default WardList;
