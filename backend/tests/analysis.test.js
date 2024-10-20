const request = require('supertest');
const express = require('express');
const app = express();

// Import the routes and controllers
const patientVisitsRoutes = require('../routes/analysis/analysisRoutes');

// Set up the app with routes
app.use(express.json());
app.use('/api/analysis', patientVisitsRoutes);  // Use the actual route paths

// Mock the PatientVisit model
jest.mock('../models/analysis/PatientVisitModel');

// Import the PatientVisit model
const PatientVisit = require('../models/analysis/PatientVisitModel');

// Sample data for testing
const mockVisits = [
  { patientID: '12345', visitDate: new Date(), department: 'Cardiology', type: 'Checkup' },
  { patientID: '67890', visitDate: new Date(), department: 'Neurology', type: 'Emergency' }
];

describe('GET /api/analysis/visits', () => {

  // Test case for fetching all patient visits
  it('should fetch all patient visits without any filters', async () => {
    // Mock PatientVisit.find to return mock visits
    PatientVisit.find = jest.fn().mockResolvedValue(mockVisits);

    const response = await request(app).get('/api/analysis/visits');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2); // Expect 2 visits
    expect(response.body[0].patientID).toBe('12345');
  });

  // Test case for filtering patient visits by department
  it('should filter visits by department', async () => {
    // Mock PatientVisit.find to return filtered visits
    PatientVisit.find = jest.fn().mockResolvedValue([mockVisits[0]]);

    const response = await request(app)
      .get('/api/analysis/visits?department=Cardiology');  // Filter by department

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // Expect 1 visit for Cardiology
    expect(response.body[0].department).toBe('Cardiology');
  });

  // Test case for filtering patient visits by date range
  it('should filter visits by date range', async () => {
    // Mock PatientVisit.find to return filtered visits
    PatientVisit.find = jest.fn().mockResolvedValue([mockVisits[0]]);

    const response = await request(app)
      .get('/api/analysis/visits?startDate=2024-01-01&endDate=2024-12-31');  // Filter by date range

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // Expect 1 visit in the date range
  });

  // Test case for handling errors (e.g., database failure)
  it('should return 500 if there is an error fetching patient visits', async () => {
    // Mock PatientVisit.find to simulate an error
    PatientVisit.find = jest.fn().mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/api/analysis/visits');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error fetching patient visits');
  });
});
