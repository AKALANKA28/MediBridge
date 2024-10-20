import React from "react";
import "@testing-library/jest-dom"; // Correct import
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router  } from "react-router-dom"; // Import BrowserRouter
import Register from "../pages/auth/Register"; // Adjust the import path as needed
import { AuthContext } from "../context/authContext"; // Adjust path for AuthContext
import axios from "axios";
// import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

jest.mock("axios");

describe("Register Component", () => {
  const mockLogin = jest.fn();
  
  const renderWithAuthContext = () => {
    return render(
      <Router>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <Register />
        </AuthContext.Provider>
      </Router>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register successfully with valid inputs", async () => {
    axios.post.mockResolvedValue({
      data: {
        token: "mockToken",
        role: "patient",
        _id: "mockId",
      },
    });

    renderWithAuthContext();

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("mockToken", "patient", "mockId");
      // expect(screen.getByText("Registering...")).toBeInTheDocument(); // Ensure it finds the text
    });
  });


  // test("should show error message when fields are empty", async () => {
  //   renderWithAuthContext();

  //   fireEvent.click(screen.getByText("Register"));

  //   expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();
  // });

  test("should show error message for invalid email", async () => {
    renderWithAuthContext();

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "Password123!" } });

    fireEvent.click(screen.getByText("Register"));

    expect(await screen.findByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  test("should show error message for short password", async () => {
    renderWithAuthContext();

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "short" } });

    fireEvent.click(screen.getByText("Register"));

    expect(await screen.findByText("Password must be at least 8 characters long.")).toBeInTheDocument();
  });
});
