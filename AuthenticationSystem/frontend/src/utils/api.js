// src/utils/api.js
import axios from "axios";

/**
 * Create an axios instance with a baseURL that can come from env.
 * - Vite: import.meta.env.VITE_API_URL
 * - CRA: process.env.REACT_APP_API_URL
 * - Node: process.env.API_URL
 */
const getBaseURL = () => {
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  if (typeof process !== "undefined" && process.env && process.env.API_URL) {
    return process.env.API_URL;
  }
  // fallback
  return "http://localhost:5000";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach a response interceptor (optional: useful for central error handling)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // example: if 401, you could log out user globally
    // console.error("API error:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

// Helper to set the Authorization header (useful after login)
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Named exports (handy) + default export to prevent "does not provide export named 'default'" errors
export { api as axiosInstance };
export default api;
