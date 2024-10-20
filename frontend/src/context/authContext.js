import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";


// Create AuthContext with default value
export const AuthContext = createContext({
  
  auth: {
    isAuthenticated: false,
    role: null,
    token: null,
    userId: null,
  },
  login: () => {}, // Placeholder function
  logout: () => {}, // Placeholder function
});

// Create a custom hook for using the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    token: null,
    userId: null, // Store user ID
  });

  // Set up Axios defaults whenever the token is available
  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    // Set the base URL for Axios (adjust this to your environment)
    axios.defaults.baseURL = "http://192.168.1.159:8080";
    // axios.defaults.baseURL = "http://localhost:8080";

  }, [auth.token]); // Re-run whenever the token changes

  // On component mount, check if there's a token, role, and userId stored in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedRole && storedUserId) {
      setAuth({
        isAuthenticated: true,
        role: storedRole,
        token: storedToken,
        userId: storedUserId,
      });
    }
  }, []);

  // Function to log in the user
  const login = (token, role, userId) => {
    // Store token, role, and userId in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);

    // Update the auth state
    setAuth({
      isAuthenticated: true,
      role: role,
      token: token,
      userId: userId,
    });
  };

  // Function to log out the user
  const logout = () => {
    // Clear token, role, and userId from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    // Update the auth state
    setAuth({
      isAuthenticated: false,
      role: null,
      token: null,
      userId: null,
    });
      // Redirect to logout or login page after logging out
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
