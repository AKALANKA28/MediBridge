import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext"; // Import the context
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Use context's login function
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const [loading, setLoading] = useState(false); // For showing loading state

  const handleLogin = async () => {
    setLoading(true); // Start loading state
    setErrorMessage(""); // Clear previous error message

    try {
      // Make a POST request to your backend login API
      const response = await axios.post(
        "/api/user/login", // Replace with your actual network IP
        {
          email,
          password,
        }
      );

      console.log("API response:", response.data); // Log the response

      if (response && response.data) {
        // Destructure the token, role, and userId (_id in your case)
        const { token, role, _id } = response.data; // Change userId to _id

        if (!token || !role || !_id) {
          throw new Error("Invalid response data");
        }


        // Use login function to set user role and token in context and localStorage
        login(token, role, _id); // Pass _id to login function

        console.log("User role:", role); // Log the user role for debugging

        // Redirect the user based on their role
        if (role === "admin") {
          navigate("/"); // Admin dashboard
        } else if (role === "patient") {
          navigate("/"); // Patient dashboard
        } else if (role === "doctor") {
          navigate("/"); // Doctor dashboard
        } else {
          navigate("/"); // Default redirection to home
        }
      } else {
        setErrorMessage("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        disabled={loading} // Disable input while loading
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        disabled={loading} // Disable input while loading
      />
      <button
        onClick={handleLogin} // Simplified, directly use handleLogin
        disabled={loading || !email || !password} // Disable button while loading or if fields are empty
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Display error message if login fails */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
