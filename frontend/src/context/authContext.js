import { createContext, useState, useEffect, useContext } from "react";

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

  // On component mount, check if there's a token and role stored in localStorage
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
  const login = (token, role, userId, patientProfileId) => {
    // Store token, role, userId, and patientProfileId in localStorage
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
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
