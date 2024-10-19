import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';

const AddEquipmentForm = () => {
  const [equipmentID, setEquipmentID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEquipment = {
      equipmentID,
      name,
      type,
      status,
    };

    try {
      const response = await axios.post('/api/equipment/addequipment', newEquipment);
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding equipment:', error);
      alert('Error adding equipment');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 500, margin: 'auto', marginTop: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Equipment
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Equipment ID"
            value={equipmentID}
            onChange={(e) => setEquipmentID(e.target.value)}
            required
            variant="outlined"
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            variant="outlined"
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            label="Status"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="In Use">In Use</MenuItem>
            <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Equipment
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AddEquipmentForm;
