// src/pages/Login.jsx
import React, { useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email / phone / username / name
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ——————————————————————
  // Regex (email & phone)
  // ——————————————————————
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(07|01)\d{8}$/;

  const validate = () => {
    let e = {};

    if (!identifier.trim()) {
      e.identifier = "Enter your email, phone, username or name";
    }

    if (!password.trim()) {
      e.password = "Password is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ——————————————————————
  // Handle Login
  // ——————————————————————
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        identifier, // backend decides if it's email/phone/username/name
        password,
      });

      alert("Logged in successfully 🎉");
      console.log(res.data);

      // You can store token if returned:
      // localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Something went wrong 😭 Try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome Back</h1>

      <form className="space-y-4" onSubmit={handleLogin}>
        
        {/* Identifier */}
        <input
          className="input"
          placeholder="Email, Phone, Username or Name"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        {errors.identifier && (
          <p className="text-red-500 text-sm">{errors.identifier}</p>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="absolute top-3 right-3 cursor-pointer text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Links */}
      <div className="flex justify-between text-sm pt-2">
        <Link to="/forgot-password" className="text-blue-600">
          Forgot Password?
        </Link>

        <Link to="/register" className="text-blue-600">
          Create Account
        </Link>
      </div>
    </div>
  );
}
