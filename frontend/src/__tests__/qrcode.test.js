import React, { act } from "react";
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import '@testing-library/jest-dom';  // <-- Add this line
import QRCodeScreen from "../components/home/QRCode"; // Adjust the path if necessary
import { AuthContext } from "../context/authContext"; // Adjust the path if necessary
import axios from 'axios';

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
    expect(screen.getByText(/loading qr code/i)).toBeInTheDocument(); // This will now work
  });


//   test("renders QR code when fetched successfully", async () => {
//     const qrCodeUrl = "http://example.com/qr-code.png";
//     const patientInfo = {
//       name: "John Doe",
//       dob: "01-01-1990",
//       bloodGroup: "O+",
//     };
  
//     // Mock the API response
//     axios.get.mockResolvedValueOnce({
//       data: {
//         qrCode: qrCodeUrl,
//         patient: patientInfo,
//       },
//     });
  
//     // Render the component
//     await act(async () => {
//       render(
//         <AuthContext.Provider value={mockAuthContext}>
//           <QRCodeScreen />
//         </AuthContext.Provider>
//       );
//     });
  
//     // Assert the QR code is rendered
//     await waitFor(() => {
//       expect(screen.getByAltText(/patient qr code/i)).toHaveAttribute("src", qrCodeUrl);
//     });
  
//     // Assert the patient information is rendered
//     await waitFor(() => {
//       expect(screen.getByText(/john doe/i)).toBeInTheDocument();
//       expect(screen.getByText(/01-01-1990/i)).toBeInTheDocument();
//       expect(screen.getByText(/O\+/i)).toBeInTheDocument();
//     });
//   });

});
