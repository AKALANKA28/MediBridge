import Home from "./pages/admin/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/admin/list/List";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/drakModeContext";
import { AuthContext } from "./context/authContext";
import PatientHome from "./pages/patient/home/PatientHome";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { auth } = useContext(AuthContext); // Get the full auth object

  // Render routes based on user role
  const renderRoutes = () => {
    const userRole = auth.role; // Access role from auth object
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
            {/* Add doctor-specific routes here */}
          </Routes>
        );
      case "patient":
        return (
          <Routes>
            <Route path="/" element={<PatientHome />} />
            <Route path="users" element={<List />} />
            <Route path="users/:userId" element={<Single />} />
            <Route path="users/new" element={<New />} />
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
