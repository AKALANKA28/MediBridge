import Home from "./pages/admin/home/Home";
import Login from "./pages/login/Login";
// import PatientRegister from "./pages/register/PatientRegister";
import List from "./pages/admin/list/List";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/drakModeContext";
import { UserRoleContext } from "./context/userRoleContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  // const { userRole } = useContext(UserRoleContext); // Get user role from context

  // Temporarily setting userRole to "admin" for testing purposes
    const userRole = "admin"; // Hardcoded for testing purposes




  // Render routes based on user role
  const renderRoutes = () => {
    switch (userRole) {
      case "admin":
        return (
          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="users" element={<List />} />
            <Route path="users/:userId" element={< Single />} />
            <Route path="users/new" element={<New />} />
          </Routes>
        );
      case "doctor":
        return (
          <Routes>
            {/* <Route path="/" element={<DoctorHome />} />
            <Route path="patients" element={<DoctorList />} />
            <Route path="patients/:patientId" element={<DoctorSingle />} />
            <Route path="patients/new" element={<DoctorNew />} /> */}
          </Routes>
        );
      case "patient":
        return (
          <Routes>
            {/* <Route path="/" element={<PatientHome />} />
            <Route path="appointments" element={<PatientList />} />
            <Route path="appointments/:appointmentId" element={<PatientSingle />} />
            <Route path="appointments/new" element={<PatientNew />} /> */}
          </Routes>
        );
      default:
        return <Login />; // Redirect to login if no role is set
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>{renderRoutes()}</BrowserRouter>
    </div>
  );
}

export default App;