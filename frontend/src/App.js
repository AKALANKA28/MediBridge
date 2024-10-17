import React, { useContext } from "react";
import Home from "./pages/admin/home/Home";
import Login from "./pages/login/Login";
import Scanner from "./pages/QRScan/Scanner";  // Import Scanner component
import List from "./pages/admin/list/List";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import Treatment from "./pages/admin/treatments/Treatment"; 
import TreatmentTable from './pages/admin/treatments/TreatmentTable';
import TreatmentForm from "./pages/admin/treatments/TreatmentForm";
import Lab from "./pages/admin/lab/Lab"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { DarkModeContext } from "./context/drakModeContext";
import { UserRoleContext } from "./context/userRoleContext";

function App() {
    const { darkMode } = useContext(DarkModeContext);
    const { userRole } = useContext(UserRoleContext);


    // return (
    //     <div className="App">
    //       <TreatmentTable />
    //     </div>
    //   );
    // Render routes based on user role
    const renderRoutes = () => {
        switch (userRole) {
            case "admin":
                return (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="users" element={<List />} />
                        <Route path="users/:userId" element={<Single />} />
                        <Route path="users/new" element={<New />} />
                        <Route path="scanner" element={<Scanner />} /> 
                        <Route path="treatment" element={<Treatment />} />  {/* Add Scanner route for admin */}
                        <Route path="treatment" element={<TreatmentTable />} /> 
                        <Route path="/treatments/new" component={TreatmentForm} />
                        <Route path="lab" element={<Lab />} />
                    </Routes>
                );
            case "doctor":
                return (
                    <Routes>
                        {/* Add routes for doctor if needed */}
                    </Routes>
                );
            case "patient":
                return (
                    <Routes>
                        {/* Add routes for patient if needed */}
                    </Routes>
                );
            default:
                return <Login />;
        }
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <BrowserRouter>
                {renderRoutes()}
            </BrowserRouter>
        </div>
    );
}

export default App;
