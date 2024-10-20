import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom'; // This includes all matchers
import PatientRecords from '../pages/Records/PatientRecords'; // Adjust the path as needed


// Mock the useNavigate and useLocation hooks from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('PatientRecords Component', () => {
  let mockNavigate, mockLocation;

  beforeEach(() => {
    mockNavigate = require('react-router-dom').useNavigate;
    mockLocation = require('react-router-dom').useLocation;

    // Mock useNavigate and useLocation for the test
    mockNavigate.mockReturnValue(jest.fn());
    mockLocation.mockReturnValue({
      state: {
        data: {
          user: {
            name: 'John Doe',
            nic: '123456789V',
            email: 'johndoe@example.com',
            imgUrl: 'https://via.placeholder.com/150',
          },
          treatments: [{ id: 1, name: 'Treatment 1' }],
          tests: [{ id: 1, name: 'Lab Test 1' }],
        },
      },
    });
  });

  test('renders patient data correctly', () => {
    render(
      <Router>
        <PatientRecords />
      </Router>
    );

    expect(screen.getByText(/patient medical records/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/123456789v/i)).toBeInTheDocument();
    expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();
    expect(screen.getByAltText('Patient')).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  // test('displays health status bars', () => {
  //   render(
  //     <Router>
  //       <PatientRecords />
  //     </Router>
  //   );

  //   expect(screen.getByText(/Heart Beat/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Blood Pressure/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Sugar/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Haemoglobin/i)).toBeInTheDocument();
  // });
  // test('navigates to treatments page when the treatments button is clicked', () => {
  //   const navigateMock = mockNavigate(); // Call to get the mock function
  
  //   render(
  //     <Router>
  //       <PatientRecords />
  //     </Router>
  //   );
  
  //   const treatmentButton = screen.getByText(/treatments/i);
  //   expect(treatmentButton).toBeInTheDocument(); // Ensure the button is in the document
  
  //   fireEvent.click(treatmentButton); // Trigger the click event
  
  //   // Ensure navigateMock was called with the expected arguments
  //   expect(navigateMock).toHaveBeenCalledWith('/treatment', {
  //     state: {
  //       treatments: [{ id: 1, name: 'Treatment 1' }],
  //       patientId: undefined,
  //     },
  //   });
  // });
  

  // test('navigates to lab tests page when the lab button is clicked', () => {
  //   const navigateMock = mockNavigate();

  //   render(
  //     <Router>
  //       <PatientRecords />
  //     </Router>
  //   );

  //   const labButton = screen.getByText(/lab tests/i);
  //   fireEvent.click(labButton);

  //   expect(navigateMock).toHaveBeenCalledWith('/lab');
  // });

  // test('displays message if patient details are not found', () => {
  //   mockLocation.mockReturnValue({ state: null });

  //   render(
  //     <Router>
  //       <PatientRecords />
  //     </Router>
  //   );

  //   expect(screen.getByText(/patient details not found/i)).toBeInTheDocument();
  // });
});
