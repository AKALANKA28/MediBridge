import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TreatmentForm from "../pages/admin/treatments/TreatmentForm"; // Adjust the import according to your file structure
import MockAdapter from "axios-mock-adapter";

// Create an instance of axios-mock-adapter
const mock = new MockAdapter(axios);

describe("TreatmentForm", () => {
    const mockPatientId = "12345";
    const initialData = {
        treatment_Id: "T001",
        treatment_Name: "Blood Test",
        doctor_Name: "Dr. Smith",
        date: "2024-10-20",
        description: "Routine blood test.",
    };

    afterEach(() => {
        mock.reset(); // Reset mock after each test
    });

    // test("renders the form with initial data", () => {
    //     render(<TreatmentForm initialData={initialData} patientId={mockPatientId} />);

    //     expect(screen.getByLabelText(/treatment id/i)).toHaveValue(initialData.treatment_Id);
    //     expect(screen.getByLabelText(/treatment name/i)).toHaveValue(initialData.treatment_Name);
    //     expect(screen.getByLabelText(/doctor name/i)).toHaveValue(initialData.doctor_Name);
    //     expect(screen.getByLabelText(/date/i)).toHaveValue(initialData.date);
    //     expect(screen.getByLabelText(/description/i)).toHaveValue(initialData.description);
    // });

    test("shows an alert when submitting without a patient ID", async () => {
        render(<TreatmentForm initialData={initialData} patientId={null} />);

        window.alert = jest.fn(); // Mock alert function

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        expect(window.alert).toHaveBeenCalledWith("Patient ID is required");
    });

    test("submits form data correctly", async () => {
        mock.onPost("http://localhost:8080/treatments/add").reply(200, { message: "Treatment added successfully" });

        render(<TreatmentForm initialData={initialData} patientId={mockPatientId} />);

        fireEvent.change(screen.getByLabelText(/treatment id/i), { target: { value: "T002" } });
        fireEvent.change(screen.getByLabelText(/treatment name/i), { target: { value: "X-Ray" } });
        fireEvent.change(screen.getByLabelText(/doctor name/i), { target: { value: "Dr. Jones" } });
        fireEvent.change(screen.getByLabelText(/date/i), { target: { value: "2024-10-21" } });
        fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Chest X-Ray." } });

        window.alert = jest.fn(); // Mock alert function

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Treatment added successfully");
        });
    });

    test("handles submission error", async () => {
        mock.onPost("http://localhost:8080/treatments/add").reply(500);

        render(<TreatmentForm initialData={initialData} patientId={mockPatientId} />);

        window.alert = jest.fn(); // Mock alert function

        fireEvent.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Failed to add treatment");
        });
    });
});
