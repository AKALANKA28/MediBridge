import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Register from "../pages/auth/Register";
import { AuthContext } from "../context/authContext";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import '@testing-library/jest-dom/extend-expect'; // Ensure this line is included

// Mock axios
jest.mock("axios");

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <Router>
        <AuthContext.Provider value={{ login: mockLogin }}>
          <Register />
        </AuthContext.Provider>
      </Router>
    );

    it("should render the registration form", () => {
        renderComponent();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
      });

});
