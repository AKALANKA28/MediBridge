import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import QRCodeScreen from "./QRCode"; // Adjust the path if necessary
import { AuthContext } from "../../context/authContext"; // Adjust the path if necessary

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

  test("renders loading state initially", () => {
    render(
      <AuthContext.Provider value={mockAuthContext}>
        <QRCodeScreen />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/loading qr code/i)).toBeInTheDocument();
  });

  test("renders QR code when fetched successfully", async () => {
    const qrCodeUrl = "http://example.com/qr-code.png";
    const patientInfo = {
      name: "John Doe",
      dob: "01-01-1990",
      bloodGroup: "O+",
    };

    axios.get.mockResolvedValueOnce({
      data: {
        qrCode: qrCodeUrl,
        patient: patientInfo,
      },
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <QRCodeScreen />
      </AuthContext.Provider>
    );

    // Wait for the QR code to load
    await waitFor(() => {
      expect(screen.getByAltText(/patient qr code/i)).toHaveAttribute("src", qrCodeUrl);
    });

    expect(screen.getByText(/medi bridge digital health card/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  test("handles error when fetching QR code", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <QRCodeScreen />
      </AuthContext.Provider>
    );

    // Wait for the loading state to change
    await waitFor(() => {
      expect(screen.getByText(/failed to load qr code/i)).toBeInTheDocument();
    });
  });

  test("handles download button click", async () => {
    const qrCodeUrl = "http://example.com/qr-code.png";
    const patientInfo = {
      name: "John Doe",
      dob: "01-01-1990",
      bloodGroup: "O+",
    };

    axios.get.mockResolvedValueOnce({
      data: {
        qrCode: qrCodeUrl,
        patient: patientInfo,
      },
    });

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <QRCodeScreen />
      </AuthContext.Provider>
    );

    // Wait for the QR code to load
    await waitFor(() => {
      expect(screen.getByAltText(/patient qr code/i)).toHaveAttribute("src", qrCodeUrl);
    });

    // Mocking the download action
    const downloadButton = screen.getByText(/save as image/i);
    fireEvent.click(downloadButton);

    expect(document.createElement("a").download).toBe("qr-code.png");
  });
});
