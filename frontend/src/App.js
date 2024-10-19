import React, { useContext } from "react";
import Home from "./pages/admin/home/Home";
import Login from "./pages/auth/Login";
import Scanner from "./pages/QRScan/Scanner"; // Import Scanner component
import List from "./pages/admin/list/List";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import Treatment from "./pages/admin/treatments/Treatment";
import TreatmentTable from "./pages/admin/treatments/TreatmentTable";
import TreatmentForm from "./pages/admin/treatments/TreatmentForm";
import Lab from "./pages/admin/lab/Lab";
import AnalysisScreen from "./pages/analysis/AnalysisScreen";
import PatientRecords from './pages/Records/PatientRecords'; 

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { DarkModeContext } from "./context/drakModeContext";
import { AuthContext } from "./context/authContext";
import PatientHome from "./pages/patient/home/PatientHome";
import QRCodeScreen from "./components/home/QRCode";
import Register from "./pages/auth/Register";
import PatientDetails from "./pages/auth/PatientDetails";
import QRPage from "./pages/patient/qrPage/QRPage";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { auth } = useContext(AuthContext); // Get auth and logout from context

  const isAuthenticated = !!auth.token;

  // Render routes based on user role
  const renderRoutes = () => {
    const userRole = auth.role; // Access role from auth object
    if (!isAuthenticated)
      return (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patient-details" element={<PatientDetails />} />

          {/* Add Register route */}
        </Routes>
      );

    switch (userRole) {
      case "admin":
        return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<List />} />
            <Route path="users/:userId" element={<Single />} />
            <Route path="users/new" element={<New />} />
            <Route path="scanner" element={<Scanner />} />
            <Route path="treatment" element={<Treatment />} />{" "}
            {/* Add Scanner route for admin */}
            <Route path="treatment" element={<TreatmentTable />} />
            <Route path="/treatments/new" component={<TreatmentForm />} />
            <Route path="lab" element={<Lab />} />
            <Route path="analysis" element={<AnalysisScreen />} />
            <Route path="/patientrecords" element={<PatientRecords />} />

          </Routes>
        );
      case "doctor":
        return <Routes>{/* Add doctor-specific routes here */}</Routes>;
      case "patient":
        return (
          <Routes>
            <Route path="/" element={<PatientHome />} />
            <Route path="users" element={<List />} />
            <Route path="users/:userId" element={<Single />} />
            <Route path="users/new" element={<New />} />
            <Route path="/qr-code" element={<QRCodeScreen />} />
            <Route path="/qr" element={<QRPage />} />

          </Routes>
        );
      default:
        return <Login />; // Redirect to login if no role is set or unknown
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>{renderRoutes()}</BrowserRouter>
    </div>
  );
}

export default App;
