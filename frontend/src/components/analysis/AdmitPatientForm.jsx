import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';

const AdmitPatientForm = () => {
  const [wardID, setWardID] = useState('');
  const [availableWards, setAvailableWards] = useState([]);
  const [patientID, setPatientID] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [message, setMessage] = useState('');

  // Fetch available wards on component mount
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get('api/ward/available');
        console.log('Wards fetched:', response.data);
        setAvailableWards(response.data);
      } catch (error) {
        console.error('Error fetching wards', error);
      }
    };

    fetchWards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`api/ward/${wardID}/admit`, {
        patientID,
        admissionDate,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', padding: '20px',marginTop:'20px', boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admit Patient
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="ward-select-label">Ward</InputLabel>
          <Select
            labelId="ward-select-label"
            value={wardID}
            onChange={(e) => setWardID(e.target.value)}
            label="Ward"
          >
            <MenuItem value="">
              <em>Select a Ward</em>
            </MenuItem>
            {availableWards.map((ward) => (
              <MenuItem key={ward.wardID} value={ward.wardID}>
                {ward.name} (Capacity: {ward.capacity - ward.currentPatients.length} remaining)
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Patient ID"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={patientID}
          onChange={(e) => setPatientID(e.target.value)}
        />

        <TextField
          label="Admission Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
          value={admissionDate}
          onChange={(e) => setAdmissionDate(e.target.value)}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
          Admit Patient
        </Button>
      </form>

      {message && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AdmitPatientForm;
