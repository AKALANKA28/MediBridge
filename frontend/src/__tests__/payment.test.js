import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentForm from './PaymentForm'; // Adjust the import path
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios'); // Mock axios

describe('PaymentForm Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <PaymentForm />
      </Router>
    );
  });

  // Test Case 1: Check if the PaymentForm renders without crashing
  test('renders without crashing', () => {
    expect(screen.getByText(/Payment/i)).toBeInTheDocument();
  });

  // Test Case 2: Verify that the bank name input updates the state correctly
  test('updates bank name input', () => {
    const bankInput = screen.getByLabelText(/Bank Name/i);
    fireEvent.change(bankInput, { target: { value: 'Bank of America' } });
    expect(bankInput.value).toBe('Bank of America');
  });

  // Test Case 3: Ensure card number input formats correctly
  test('formats card number correctly', () => {
    const cardInput = screen.getByLabelText(/Card Number/i);
    fireEvent.change(cardInput, { target: { value: '1234567812345678' } });
    expect(cardInput.value).toBe('1234 5678 1234 5678');
  });

  // Test Case 4: Show error message for empty required fields
  test('shows error message for empty required fields', () => {
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Bank name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Card holder name must contain only letters and spaces/i)).toBeInTheDocument();
    expect(screen.getByText(/Card number must be exactly 16 digits/i)).toBeInTheDocument();
    expect(screen.getByText(/Expiry date must be in MM\/YY format/i)).toBeInTheDocument();
    expect(screen.getByText(/CVV must be 3 or 4 digits/i)).toBeInTheDocument();
  });

  // Test Case 5: Show error for invalid card holder name
  test('shows error for invalid card holder name', () => {
    fireEvent.change(screen.getByLabelText(/Card Holder Name/i), { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/Card holder name must contain only letters and spaces/i)).toBeInTheDocument();
  });

  // Test Case 6: Validate and submit the form correctly
  test('validates and submits form correctly', async () => {
    fireEvent.change(screen.getByLabelText(/Bank Name/i), { target: { value: 'Bank of America' } });
    fireEvent.change(screen.getByLabelText(/Card Holder Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '1234567812345678' } });
    fireEvent.change(screen.getByLabelText(/EXP \(MM\/YY\)/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: '123' } });

    axios.post.mockResolvedValueOnce({ data: { success: true } }); // Mock successful response

    fireEvent.click(screen.getByText(/Continue/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/payment', {
        bankName: 'Bank of America',
        cardHolderName: 'John Doe',
        cardNumber: '1234567812345678',
        exp: '12/25',
        cvv: '123'
      });
      expect(screen.getByText(/Payment submitted successfully/i)).toBeInTheDocument();
    });
  });

  // Test Case 7: Handle API error on form submission
  test('handles API error on form submission', async () => {
    fireEvent.change(screen.getByLabelText(/Bank Name/i), { target: { value: 'Bank of America' } });
    fireEvent.change(screen.getByLabelText(/Card Holder Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Card Number/i), { target: { value: '1234567812345678' } });
    fireEvent.change(screen.getByLabelText(/EXP \(MM\/YY\)/i), { target: { value: '12/25' } });
    fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: '123' } });

    axios.post.mockRejectedValueOnce(new Error('Payment failed')); // Mock API error

    fireEvent.click(screen.getByText(/Continue/i));

    await waitFor(() => {
      expect(screen.getByText(/Failed to submit payment/i)).toBeInTheDocument();
    });
  });

  // Test Case 8: Navigate to another method when link is clicked
  test('navigates to another method when link is clicked', () => {
    const chooseAnotherMethodLink = screen.getByText(/Choose another method/i);
    fireEvent.click(chooseAnotherMethodLink);
    expect(window.location.pathname).toBe('/PaymentOpt'); // Ensure correct navigation path
  });
});
