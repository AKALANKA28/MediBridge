import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LabForm from '../pages/admin/lab/LabForm'; // Adjust the path as needed

// Mock axios to handle post requests
jest.mock('axios');

describe('LabForm Component', () => {
  let mockAlert;

  beforeEach(() => {
    // Mock window.alert
    mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up mocks after each test
    jest.clearAllMocks();
  });

  it('should display required field alerts when patientId is missing', async () => {
    const { getByLabelText, getByText } = render(<LabForm initialData={null} />);

    // Fill in the form without patientId
    fireEvent.change(getByLabelText(/Lab Test ID/i), { target: { value: '123' } });
    fireEvent.change(getByLabelText(/Test Name/i), { target: { value: 'Blood Test' } });
    fireEvent.change(getByLabelText(/Test Results/i), { target: { value: 'Positive' } });
    fireEvent.change(getByLabelText(/Date/i), { target: { value: '2024-10-15' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Normal test' } });

    fireEvent.click(getByText(/Submit/i));

    // Check if the error alert was shown
    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith('Patient ID is required')
    );
  });

  it('handles API errors gracefully', async () => {
    axios.post.mockRejectedValue(new Error('API error'));

    const { getByLabelText, getByText } = render(<LabForm initialData={null} patientId="patient123" />);

    // Fill in the form
    fireEvent.change(getByLabelText(/Lab Test ID/i), { target: { value: '123' } });
    fireEvent.change(getByLabelText(/Test Name/i), { target: { value: 'Blood Test' } });
    fireEvent.change(getByLabelText(/Test Results/i), { target: { value: 'Positive' } });
    fireEvent.change(getByLabelText(/Date/i), { target: { value: '2024-10-15' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Normal test' } });

    fireEvent.click(getByText(/Submit/i));

    // Check if the error alert was shown
    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith('Failed to add lab test')
    );
  });

  it('submits the form successfully', async () => {
    axios.post.mockResolvedValue({ data: { message: 'Lab test added successfully' } });

    const { getByLabelText, getByText } = render(<LabForm initialData={null} patientId="patient123" />);

    // Fill in the form
    fireEvent.change(getByLabelText(/Lab Test ID/i), { target: { value: '123' } });
    fireEvent.change(getByLabelText(/Test Name/i), { target: { value: 'Blood Test' } });
    fireEvent.change(getByLabelText(/Test Results/i), { target: { value: 'Positive' } });
    fireEvent.change(getByLabelText(/Date/i), { target: { value: '2024-10-15' } });
    fireEvent.change(getByLabelText(/Description/i), { target: { value: 'Normal test' } });

    fireEvent.click(getByText(/Submit/i));

    // Check if the success alert was shown
    await waitFor(() =>
      expect(mockAlert).toHaveBeenCalledWith('Lab test added successfully')
    );
  });
});
