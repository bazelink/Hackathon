// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./authentication/login";
import Register from "./authentication/register";

function ForgotPassword() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <p className="text-gray-600 mt-2">
        This page will handle sending reset emails or OTPs.
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Routes>
        {/* Default → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Handle unknown routes */}
        <Route path="*" element={<div className="p-6">Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
