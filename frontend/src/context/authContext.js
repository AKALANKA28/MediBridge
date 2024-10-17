import { createContext, useState, useEffect } from "react";

// Create AuthContext with default value
export const AuthContext = createContext({
  userRole: "",
  setUserRole: () => {}, // Placeholder function
});

export const AuthProvider = ({ children }) => {
  
  const [auth, setAuth] = useState({
    isAuthenticated: false, // Indicates if the user is authenticated
    role: null, // Stores the role of the user (e.g., "admin", "doctor", "patient")
    token: null, // Stores the authentication token
  });

  // On component mount, check if there's a token and role stored in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setAuth({
        isAuthenticated: true,
        role: storedRole,
        token: storedToken,
      });
    }
  }, []);

  // Function to log in the user
  const login = (token, role) => {
    // Store token and role in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    // Update the auth state
    setAuth({
      isAuthenticated: true,
      role: role,
      token: token,
    });
  };

  // Function to log out the user
  const logout = () => {
    // Clear token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Update the auth state
    setAuth({
      isAuthenticated: false,
      role: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
