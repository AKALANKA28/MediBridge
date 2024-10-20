import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Ensure this is added for jest-dom matchers
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/auth/Login";

// Mock axios
jest.mock("axios");

const mockLogin = jest.fn();

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>,
    renderOptions
  );
};

describe("Login Component", () => {
  const providerProps = {
    value: { login: mockLogin },
  };

  beforeEach(() => {
    mockLogin.mockClear();
    axios.post.mockClear();
  });

  

  test("renders login form correctly", () => {
    renderWithContext(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );

    // Check if elements render correctly
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login to continue/i)).toBeInTheDocument();

    // Use getByRole to target the button specifically
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();

    expect(screen.getByText(/or sign up using/i)).toBeInTheDocument();
    expect(screen.getByText(/Remember me/i)).toBeInTheDocument();
  });




  test("handles login with valid credentials", async () => {
    renderWithContext(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );

    // Simulate user entering valid credentials
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "validuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "ValidPassword123" },
    });

    // Use getByRole to specifically click the login button
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Check if the "Logging in..." text appears
    expect(screen.getByText(/Logging in.../i)).toBeInTheDocument();
  });




  test("shows error message on invalid login credentials", async () => {
    // Mock the failed login response from axios
    axios.post.mockRejectedValue(new Error("Login failed"));

    // Render the Login component with the necessary context and routing
    renderWithContext(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );

    // Simulate user entering invalid email and password
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "invaliduser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "WrongPassword123" },
    });

    // Simulate the user clicking the Login button
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Wait for the error message to appear in the DOM
    await waitFor(() =>
      expect(
        screen.getByText(/Login failed. Please check your credentials./i)
      ).toBeInTheDocument()
    );
  });




  test("displays error for incorrect email format", () => {
    // Render the Login component with the necessary context and routing
    renderWithContext(
      <Router>
        <Login />
      </Router>,
      { providerProps }
    );

    // Get the email input and login button elements
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    // Simulate entering an invalid email format
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    expect(loginButton).toBeDisabled(); // Invalid email should disable the button

    // Simulate entering a valid email format
    fireEvent.change(emailInput, {
      target: { value: "validuser@example.com" },
    });
    expect(loginButton).toBeDisabled(); // Button should still be disabled without a password
  });
});
