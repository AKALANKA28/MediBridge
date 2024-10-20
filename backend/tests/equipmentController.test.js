const request = require('supertest');
const express = require('express');
const app = express();

// Import the equipmentRoutes and controller
const equipmentRoutes = require('../routes/analysis/equipmentRoutes');

// Set up the app with the routes
app.use(express.json());
app.use('/api/equipment', equipmentRoutes);  // Use the actual route paths

// Mock the Equipment model
jest.mock('../models/analysis/EquipmentModel');

// Import the Equipment model
const Equipment = require('../models/analysis/EquipmentModel');

// Sample data for testing
const mockEquipment = [
  { equipmentID: '001', name: 'MRI', type: 'Imaging', status: 'Available' },
  { equipmentID: '002', name: 'X-Ray', type: 'Imaging', status: 'In Use' },
];

describe('GET /api/equipment/equipment', () => {

  // Test case for fetching all equipment
  it('should fetch all equipment', async () => {
    // Mock Equipment.find to return mock equipment data
    Equipment.find = jest.fn().mockResolvedValue(mockEquipment);

    const response = await request(app).get('/api/equipment/equipment');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Expect 2 equipment items
    expect(response.body[0].equipmentID).toBe('001');
  });

  // Test case for handling errors (e.g., database failure)
  it('should return 500 if there is an error fetching equipment', async () => {
    // Mock Equipment.find to simulate an error
    Equipment.find = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/equipment/equipment');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error fetching equipment data');
  });
});
