import React, { useContext } from "react";
import NavItem from "./NavItem";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// Import SVG files
// import calendarIcon from "../../assets/image-5.svg";
// import doctorIcon from "../../assets/image-2.svg";
// import homeIcon from "../../assets/home.svg";
import qrIcon from "../../assets/qr.png"; // Non-SVG example
import profile from "../../assets/profile-add.svg"; // Non-SVG example
import link from "../../assets/link.svg"; // Non-SVG example
import hospital from "../../assets/hospital.svg"; // Non-SVG example
import AppointmentCard from "./AppointmentCard";

const navItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d011545a347ec219f79fac00bea41c67e1dcaea99ab4495ddddd127f7d57638?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Home",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cd3e1e4a773777ae6e9acf3d21abb59ebe099c3db63af6367c875146fcd65e?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Search",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8161866853c96af825573b4a2e5302c547c96c890171bdc6c21ce31f95b57dc?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Favorites",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa79d41580c2bf5bba467776c62d5fd4e10f9a9696a7f49f6be92ef0d023ba38?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Profile",
    isActive: false,
  },
];

const HomeComponent = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Get auth and logout from context

  // Logout function
  const handleLogout = () => {
    // Clear user data from local storage or context
    localStorage.removeItem("userToken"); // Example: remove user token
  };

  return (
    <div className="home-container">
      <section className="welcome-section">
        <div className="header">
          <img
            src={require("../../assets/profile-avatar.png")} // Add your avatar image here
            alt="Profile Avatar"
            className="profile-avatar"
          />
          <div className="notification-icon">
            <img
              src={require("../../assets/notification-icon.png")} // Add your notification icon image
              alt="Notifications"
            />
          </div>
        </div>
        <div className="welcome-text">
          <h1>Welcome!</h1>
          <h1 className="name">Akalanka</h1>
          <p>
            Have a nice day
            <img src={require("../../assets/siren.png")} alt="Wink" />
          </p>
          <div className="urgent-care">
            <img src={require("../../assets/siren.png")} alt="Ambulance" />
            <button className="urgent-care-button">Urgent Care</button>
          </div>
        </div>
      </section>

      <section className="services-section">
        <h3>MediBridge Services</h3>
        <div className="services">
          <div className="service">
            <div className="service" onClick={() => navigate("/qr-code")}>
              <img src={qrIcon} alt="QR Code" className="qr-code-icon" />
            </div>
            <span className="service-label">QR Code</span>
          </div>

          <div className="service">
            <div className="service">
              <img src={profile} alt="Doctor" />
            </div>
            <span className="service-label">Doctor</span>
          </div>

          <div className="service">
            <div className="service">
              <img src={link} alt="Medicine" />
            </div>
            <span className="service-label">Medicine</span>
          </div>

          <div className="service">
            <div className="service">
              <img src={hospital} alt="Hospital" />
            </div>
            <span className="service-label">Hospital</span>
          </div>
        </div>
      </section>

      <section className="appointment-section">
        <div className="appointment-header">
          <h3>My Appointment</h3>
          <a href="#">See All</a>
        </div>
        <AppointmentCard />

      </section>

      {/* Logout Button */}
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      <nav className="footer">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
          />
        ))}
      </nav>

      {/* <footer className="footer">
        <div className="nav-item active">
          <img src="./assets/home.svg" alt="Home" />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <img src="./assets/vuesax-linear-calendar-2.svg" alt="Calendar" />
        </div>
        <div className="nav-item">
          <img src="./assets/vuesax-linear-message.svg" alt="Messages" />
        </div>
        <div className="nav-item">
          <img src="./assets/vuesax-linear-profile.svg" alt="Profile" />
        </div>
      </footer> */}
    </div>
  );
};

export default HomeComponent;
