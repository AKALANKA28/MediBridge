import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../../context/drakModeContext";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import logo from "../../../assets/medibridgelogo.svg";
const Sidebar = () => {
  const { logout } = useContext(AuthContext); // Get auth and logout from context
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to the login page after logout
  };
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo" className="logo" style={{ cursor: "pointer", marginTop: "10px" }} />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="" style={{ textDecoration: "none" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>
                <QrCode2Icon className="icon" />
                <span>Health Card</span>
              </li>
            </Link>
            <Link to="/appoinment" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Appointments</span>
            </li>
            </Link>
          </Link>
          <Link to="/payment" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Payments</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          {/* Use onClick instead of Link for Logout */}
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
