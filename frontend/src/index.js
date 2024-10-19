import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DarkModeContextProvider } from "./context/drakModeContext";
import { AuthProvider } from "./context/authContext"; // Import UserRoleProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

