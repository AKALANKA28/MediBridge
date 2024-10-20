const request = require('supertest');
const express = require('express');
const app = express();

// Import the routes and controllers
const wardRoutes = require('../routes/analysis/wardRoutes');

// Set up the app with the routes
app.use(express.json());
app.use('/api/ward', wardRoutes);  // Use the actual route paths

// Mock the Ward model
jest.mock('../models/analysis/WardModel');

// Import the Ward model
const Ward = require('../models/analysis/WardModel');

// Sample data for testing
const mockWards = [
  { wardID: '001', name: 'General Ward', capacity: 10, currentPatients: [{ patientID: '123', admissionDate: new Date() }] },
  { wardID: '002', name: 'ICU', capacity: 5, currentPatients: [{ patientID: '456', admissionDate: new Date() }] },
  { wardID: '003', name: 'Maternity', capacity: 8, currentPatients: [] },
];

describe('GET /api/ward/kpis', () => {
  // Test case for fetching KPI data
  it('should fetch the correct KPI data', async () => {
    // Mock Ward.find to return mockWards
    Ward.find = jest.fn().mockResolvedValue(mockWards);

    const response = await request(app).get('/api/ward/kpis');

    expect(response.status).toBe(200);
    expect(response.body.totalWards).toBe(3); // Expect 3 wards
    expect(response.body.availableBeds).toBe(21); // Total capacity (23) - Total admitted patients (3) = 20 available beds
    expect(response.body.totalAdmittedPatients).toBe(2); // Expect 3 admitted patients
    expect(response.body.patientAdmissionRate).toBe(2); // Expect 1 patient admitted today (based on mock data)
  });

  // Test case for handling errors (e.g., database failure)
  it('should return 500 if there is an error fetching KPI data', async () => {
    // Mock Ward.find to simulate an error
    Ward.find = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/ward/kpis');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error fetching KPI data');
  });
});
