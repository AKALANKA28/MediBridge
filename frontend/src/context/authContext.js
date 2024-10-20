import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// AuthManager class responsible for managing authentication logic
class AuthManager {
  constructor() {
    this.auth = {
      isAuthenticated: false,
      role: null,
      token: null,
      userId: null,
    };
    this.listeners = []; // List of subscribers to notify on state changes
  }

  // Subscribe a listener
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Unsubscribe a listener
  unsubscribe(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Notify all subscribers of state changes
  notify() {
    this.listeners.forEach((listener) => listener(this.auth));
  }

  // Set Axios authorization header and base URL
  setAxiosAuthHeader(token) {
    axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : undefined;
    axios.defaults.baseURL = "http:// 192.168.43.29:8080"; // Adjust based on environment
  }

  // Handle login
  login(token, role, userId) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);

    this.auth = {
      isAuthenticated: true,
      role,
      token,
      userId,
    };

    this.setAxiosAuthHeader(token);
    this.notify(); // Notify subscribers
  }

  // Handle logout
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    this.auth = {
      isAuthenticated: false,
      role: null,
      token: null,
      userId: null,
    };

    this.setAxiosAuthHeader(null);
    this.notify(); // Notify subscribers
  }

  // Initialize authentication state from localStorage
  initializeAuth() {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedRole && storedUserId) {
      this.auth = {
        isAuthenticated: true,
        role: storedRole,
        token: storedToken,
        userId: storedUserId,
      };
      this.setAxiosAuthHeader(storedToken);
    }
    this.notify(); // Notify subscribers on initialization
  }

  // Return current authentication state
  getAuth() {
    return this.auth;
  }
}


// Factory function to create an instance of AuthManager
const createAuthManager = () => {
  const authManager = new AuthManager();
  authManager.initializeAuth();
  return authManager;
};

// Create singleton instance of AuthManager
const authManagerInstance = createAuthManager();

// Create AuthContext for managing authentication state
export const AuthContext = createContext({
  auth: authManagerInstance.getAuth(),
  login: () => {}, // Placeholder
  logout: () => {}, // Placeholder
});

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);





// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(authManagerInstance.getAuth());

  // Sync state whenever auth changes
  useEffect(() => {
    const handleAuthChange = (newAuth) => setAuth(newAuth);

    authManagerInstance.subscribe(handleAuthChange);

    return () => {
      authManagerInstance.unsubscribe(handleAuthChange);
    };
  }, []);

  // Function to handle login
  const login = (token, role, userId) => {
    authManagerInstance.login(token, role, userId);
    setAuth(authManagerInstance.getAuth()); // Sync state with updated auth
  };

  // Function to handle logout
  const logout = () => {
    authManagerInstance.logout();
    setAuth(authManagerInstance.getAuth()); // Sync state after logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
