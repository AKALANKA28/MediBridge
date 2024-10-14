import React, { useContext, useState , useEffect } from "react";
import Home from "./pages/admin/home/Home";
import Login from "./pages/login/Login";
import Scanner from "./pages/QRScan/Scanner";

import List from "./pages/admin/list/List";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
// import { useContext } from "react";
import { DarkModeContext } from "./context/drakModeContext";
// import Scanner from "./pages/QRScan/Scanner";
import { UserRoleContext } from "./context/userRoleContext";
import { Html5QrcodeScanner } from "html5-qrcode";
// import { useState } from "react";



function App() {
    const { darkMode } = useContext(DarkModeContext);
    const { userRole } = useContext(UserRoleContext); // Get user role from context

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
                    </Routes>
                );
            case "doctor":
                return (
                    <Routes>
                        {/* Add routes for doctor here */}
                    </Routes>
                );
            case "patient":
                return (
                    <Routes>
                        {/* Add routes for patient here */}
                    </Routes>
                );
            default:
                return <Login />; // Redirect to login if no role is set or unknown
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
