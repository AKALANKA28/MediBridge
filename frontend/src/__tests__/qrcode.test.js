import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; // <-- Add this line
import QRCodeScreen from "../components/home/QRCode"; // Adjust the path if necessary
import { AuthContext } from "../context/authContext"; // Adjust the path if necessary
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter

jest.mock("axios");

const mockAuthContext = {
  auth: {
    userId: "123",
  },
};

describe("QRCodeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks before each test
  });

  const renderWithAuthContext = () => {
    return render(
      <Router>
        <AuthContext.Provider value={mockAuthContext}>
          <QRCodeScreen />
        </AuthContext.Provider>
      </Router>
    );
  };

  test("renders loading state initially", () => {
    renderWithAuthContext();

    expect(screen.getByText(/loading qr code/i)).toBeInTheDocument(); // This will now work
  });

  test("renders QR code when fetched successfully", async () => {
    const qrCodeUrl = "http://example.com/qr-code.png";

    const patientInfo = {
      name: "Akalanka Dias",
      dob: "2002-05-28",
      bloodGroup: "O+",
    };

    // Mock the API response
    axios.get.mockResolvedValueOnce({
      data: {
        qrCode: qrCodeUrl,
        patient: patientInfo,
      },
    });

    // Render the component
    await act(async () => {
      renderWithAuthContext();
    });

   

    // Assert the QR code is rendered
    await waitFor(() => {
      expect(screen.getByAltText(/patient qr code/i)).toHaveAttribute(
        "src",
        qrCodeUrl
      );
    });

    // Assert the patient information is rendered
    await waitFor(() => {
      expect(screen.getByText("Akalanka Dias")).toBeInTheDocument();
      expect(screen.getByText("2002-05-28")).toBeInTheDocument();
      expect(screen.getByText("O+")).toBeInTheDocument();
    });
  });
});
