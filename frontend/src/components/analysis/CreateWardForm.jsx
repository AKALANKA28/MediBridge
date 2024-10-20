import React, { useState } from 'react';
import axios from 'axios';

// Utility function to generate a unique ward ID
const generateWardId = () => {
  return `W${Math.floor(Math.random() * 10000)}`; // Generates a ward ID like W1234
};

const CreateWardForm = () => {
  const [wardData, setWardData] = useState({
    wardId: '', // Ward ID will be generated
    name: '',
    capacity: '',
    patients: [] // Empty array since patients will be added later manually
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWardData({
      ...wardData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWardData = {
      ...wardData,
      wardID: generateWardId(), // Generate ward ID before sending to backend
    };

    try {
      const response = await axios.post('/api/ward/add', newWardData);
      console.log('Ward created:', response.data);
      setWardData({ wardID: '', name: '', capacity: '', patients: [] }); // Reset form
    } catch (error) {
      console.error('Error creating ward:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Ward ID:</label>
        <input
          type="text"
          name="id"
          value={wardData.id}
          readOnly // Make this read-only since it's generated automatically
        />
      </div>
      <div>
        <label>Ward Name:</label>
        <input
          type="text"
          name="name"
          value={wardData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={wardData.capacity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Ward</button>
    </form>
  );
};

export default CreateWardForm;
