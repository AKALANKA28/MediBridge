import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import NavItem from "./NavItem";
import "./Home.scss";

const navItemsData = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d011545a347ec219f79fac00bea41c67e1dcaea99ab4495ddddd127f7d57638?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Home",
    path: "/", // Add a path for each navigation item
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d3cd3e1e4a773777ae6e9acf3d21abb59ebe099c3db63af6367c875146fcd65e?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Appointments",
    path: "/appointments",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8161866853c96af825573b4a2e5302c547c96c890171bdc6c21ce31f95b57dc?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Favorites",
    path: "/favorites",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa79d41580c2bf5bba467776c62d5fd4e10f9a9696a7f49f6be92ef0d023ba38?placeholderIfAbsent=true&apiKey=59e835da8ea04b80ab8ace77cb34d866",
    label: "Profile",
    path: "/profile",
    isActive: false,
  },
];

const NavigationBar = () => {
  const [activeLabel, setActiveLabel] = useState(navItemsData[0].label); // Set initial active tab

  const handleNavItemClick = (label) => {
    setActiveLabel(label); // Update active tab
  };

  return (
    <nav className="footer">
      {navItemsData.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          className="nav-link"
          onClick={() => handleNavItemClick(item.label)}
        >
          {/* Use Link for navigation */}
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            isActive={activeLabel === item.label} // Check if the item is active
            onClick={() => handleNavItemClick(item.label)} // Handle click
          />
        </Link>
      ))}
    </nav>
  );
};

export default NavigationBar;
