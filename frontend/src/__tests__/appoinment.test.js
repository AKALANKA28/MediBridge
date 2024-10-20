import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointmentForm from './AppointmentForm'; // Adjust the import path
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock axios

describe('AppointmentForm Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <AppointmentForm />
      </Router>
    );
  });

  // Test Case 1: Check if the AppointmentForm renders without crashing
  test('renders without crashing', () => {
    expect(screen.getByText(/Appointments/i)).toBeInTheDocument();
  });

  // Test Case 2: Verify that the patient name input updates the state correctly
  test('updates patient name input', () => {
    const nameInput = screen.getByPlaceholderText(/Patient Name/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  // Test Case 3: Verify that the address input updates the state correctly
  test('updates address input', () => {
    const addressInput = screen.getByPlaceholderText(/Address/i);
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    expect(addressInput.value).toBe('123 Main St');
  });

  // Test Case 4: Verify that the mobile number input updates the state correctly
  test('updates mobile number input', () => {
    const mobileInput = screen.getByPlaceholderText(/Mobile Number/i);
    fireEvent.change(mobileInput, { target: { value: '1234567890' } });
    expect(mobileInput.value).toBe('1234567890');
  });

  // Test Case 5: Show error message for empty required fields
  test('shows error message for empty required fields', async () => {
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Patient name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Valid mobile number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Doctor selection is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Schedule time is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Treatment type is required/i)).toBeInTheDocument();
  });

  // Test Case 6: Show error for invalid mobile number
  test('shows error for invalid mobile number', () => {
    fireEvent.change(screen.getByPlaceholderText(/Mobile Number/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Valid mobile number is required/i)).toBeInTheDocument();
  });

  // Test Case 7: Validate and submit the form correctly
  test('validates and submits form correctly', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Patient Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText(/Mobile Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/Doctor/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Schedule Time/i), { target: { value: '2024-10-25T10:00' } });
    fireEvent.change(screen.getByLabelText(/Treatment Type/i), { target: { value: 'Counsiling' } });

    axios.post.mockResolvedValueOnce({ data: { success: true } }); // Mock successful response

    fireEvent.click(screen.getByText(/Continue/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/appoinment', {
        name: 'John Doe',
        address: '123 Main St',
        mobileNumber: '1234567890',
        gender: 'Male',
        doctor: 'Dr. Smith',
        scheduleTime: '2024-10-25T10:00',
        treatmentType: 'Counsiling',
      });
      expect(screen.queryByText(/Patient name is required/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Appointment Created!/i)).toBeInTheDocument();
    });
  });

  // Test Case 8: Handle API error on form submission
  test('handles API error on form submission', async () => {
    fireEvent.change(screen.getByPlaceholderText(/Patient Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText(/Mobile Number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Gender/i), { target: { value: 'Male' } });
    fireEvent.change(screen.getByLabelText(/Doctor/i), { target: { value: 'Dr. Smith' } });
    fireEvent.change(screen.getByLabelText(/Schedule Time/i), { target: { value: '2024-10-25T10:00' } });
    fireEvent.change(screen.getByLabelText(/Treatment Type/i), { target: { value: 'Counsiling' } });

    axios.post.mockRejectedValueOnce(new Error('Error creating appointment')); // Mock API error

    fireEvent.click(screen.getByText(/Continue/i));

    await waitFor(() => {
      expect(screen.getByText(/Error creating appointment/i)).toBeInTheDocument();
    });
  });

  // Test Case 9: Ensure selecting gender updates the state correctly
  test('updates gender selection correctly', () => {
    const genderSelect = screen.getByLabelText(/Gender/i);
    fireEvent.change(genderSelect, { target: { value: 'Female' } });
    expect(genderSelect.value).toBe('Female');
  });

  // Test Case 10: Ensure selecting doctor updates the state correctly
  test('updates doctor selection correctly', () => {
    const doctorSelect = screen.getByLabelText(/Doctor/i);
    fireEvent.change(doctorSelect, { target: { value: 'Dr. Jenny' } });
    expect(doctorSelect.value).toBe('Dr. Jenny');
  });

  // Test Case 11: Ensure selecting treatment type updates the state correctly
  test('updates treatment type selection correctly', () => {
    const treatmentSelect = screen.getByLabelText(/Treatment Type/i);
    fireEvent.change(treatmentSelect, { target: { value: 'Medical Test' } });
    expect(treatmentSelect.value).toBe('Medical Test');
  });
});
