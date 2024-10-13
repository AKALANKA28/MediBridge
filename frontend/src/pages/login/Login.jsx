import "./login.scss";
import React, { useState, useContext } from "react";
import axios from "axios";
import { UserRoleContext } from "../../context/userRoleContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserRole } = useContext(UserRoleContext);
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (email, password) => {
      console.log("Login button clicked");
      try {
          const response = await axios.post("http://localhost:5000/api/user/admin-login", {
              email,
              password,
          });
  
          console.log("API Response:", response);
  
          if (response && response.data) {
              const { token, email, _id } = response.data; // Remove role if it doesn't exist
              const role = "admin"; // Set default role for admin login
  
              setUserRole(role); // Set the user role
              localStorage.setItem("token", token); // Store the token
              console.log("User role set to:", role);
  
              // Redirect to the admin home page
              navigate("/"); 
          } else {
              console.error("Response data is undefined");
          }
      } catch (error) {
          console.error("Error during login:", error);
      }
  };
  

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={() => handleLogin(email, password)}>Login</button>
        </div>
    );
};

export default Login;
