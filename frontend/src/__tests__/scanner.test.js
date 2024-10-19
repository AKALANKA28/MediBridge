import React from "react"; // Ensure React is imported
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Scanner from "../pages/QRScan/Scanner";
import axios from "axios";

// Mocking the axios module
jest.mock("axios");

const renderScanner = () => {
  return render(
    <Router>
      <Scanner />
    </Router>
  );
};

beforeEach(() => {
  jest.clearAllMocks(); // Clear any previous mocks
});

// test("renders Scanner component with necessary elements", () => {
//   renderScanner();
//   expect(screen.getByText(/Manage Patient Medical Records/i)).toBeInTheDocument();
//   expect(screen.getByText(/Scan The QR Code/i)).toBeInTheDocument();
//   expect(screen.getByText(/Enter The Patient Details/i)).toBeInTheDocument();
// });

test("fetches patient data on successful scan", async () => {
  // Mock response from API
  const mockData = {
    _id: "1",
    name: "Jane Doe",
    user: { name: "Jane Doe", email: "jane@example.com", nic: "123456789V" },
    treatments: [],
  };
  
  axios.get.mockResolvedValueOnce({ data: mockData });

  renderScanner();

  // Simulate filling in the form
  fireEvent.change(screen.getByPlaceholderText(/Patient Name/i), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Patient NIC/i), {
    target: { value: "123456789V" },
  });
  fireEvent.click(screen.getByText(/Check Patient/i));

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      `/patient?name=${encodeURIComponent("Jane Doe")}&nic=${encodeURIComponent("123456789V")}`
    );
  });
});


// test("displays error message when fetching patient data fails", async () => {
//   // Mock an error response from the API
//   axios.get.mockRejectedValueOnce(new Error("Network Error"));

//   // Render the Scanner component
//   renderScanner(); // Ensure this function is correctly set up

//   // Simulate form submission
//   fireEvent.click(screen.getByText(/Check Patient/i));

//   // Wait for the error message to appear in the DOM
//   await waitFor(() => {
//     // Use debug to inspect the current DOM state
//     screen.debug(); // This will log the current state of the DOM

//     // Assert that the error message is in the document
//     expect(screen.getByText(/Error fetching patient data/i)).toBeInTheDocument();
//   });
// });

// test("displays an error message if patient not found", async () => {
//   // Mock response with no patient found
//   axios.get.mockResolvedValueOnce({ data: [] });

//   // Use act to wrap any state updates and effects
//   await act(async () => {
//     renderScanner();
//   });

//   // Simulate filling in the form
//   fireEvent.change(screen.getByPlaceholderText(/Patient Name/i), {
//     target: { value: "Unknown" },
//   });
//   fireEvent.change(screen.getByPlaceholderText(/Patient NIC/i), {
//     target: { value: "000000000V" },
//   });
//   fireEvent.click(screen.getByText(/Check Patient/i));

//   // Wait for the error message to appear in the DOM
//   await waitFor(() => {
//     expect(screen.getByText(/Patient not found/i)).toBeInTheDocument();
//   });
// });