import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import Login from './Login';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

// Mock axios
jest.mock('axios');

// Mock navigate function from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  const login = jest.fn(); // Mock login function

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks before each test
  });

  test('renders login form correctly', () => {
    render(
      <AuthContext.Provider value={{ login }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    // Check that the elements are rendered correctly
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login to continue')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('enables the login button only when both email and password are entered', () => {
    render(
      <AuthContext.Provider value={{ login }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Initially, the login button should be disabled
    expect(loginButton).toBeDisabled();

    // Enter email and password
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // The login button should now be enabled
    expect(loginButton).not.toBeDisabled();
  });

  test('shows error message on failed login', async () => {
    axios.post.mockRejectedValueOnce(new Error('Login failed'));

    render(
      <AuthContext.Provider value={{ login }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText('Login failed. Please check your credentials.');
    expect(errorMessage).toBeInTheDocument();
  });

  test('calls login function and navigates on successful login', async () => {
    const mockResponse = {
      data: { token: 'fake_token', role: 'admin', _id: '123' },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <AuthContext.Provider value={{ login }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Enter valid credentials
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'adminpassword' } });

    // Click the login button
    fireEvent.click(loginButton);

    // Check if login was called with correct arguments
    await screen.findByText(/logging in.../i); // Wait for loading state
    expect(login).toHaveBeenCalledWith('fake_token', 'admin', '123');

    // Verify that navigation was called with the correct route
    expect(mockNavigate).toHaveBeenCalledTimes(1); // Ensure it was called
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Check if it navigates to the correct path
  });

  test('navigates correctly based on user role after successful login', async () => {
    const mockResponse = {
      data: { token: 'fake_token', role: 'patient', _id: '123' },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(
      <AuthContext.Provider value={{ login }}>
        <Router>
          <Login />
        </Router>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Enter valid credentials
    fireEvent.change(emailInput, { target: { value: 'patient@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'patientpassword' } });

    // Click the login button
    fireEvent.click(loginButton);

    // Check if login was called with correct arguments
    await screen.findByText(/logging in.../i); // Wait for loading state
    expect(login).toHaveBeenCalledWith('fake_token', 'patient', '123');

    // Verify that navigation was called with the correct route
    expect(mockNavigate).toHaveBeenCalledTimes(1); // Ensure it was called
    expect(mockNavigate).toHaveBeenCalledWith('/'); // Check if it navigates to the correct path for patient
  });
});
