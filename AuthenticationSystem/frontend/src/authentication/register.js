// src/pages/Register.jsx
import React, { useState } from "react";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ————————————————————————————————
  // 🔍 REGEX
  // ————————————————————————————————
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(07|01)\d{8}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  const strongPassword = (pass) => {
    return {
      length: pass.length >= 8,
      upper: /[A-Z]/.test(pass),
      lower: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[@$!%*?&#]/.test(pass),
    };
  };

  // ————————————————————————————————
  // 🎯 HANDLE INPUTS
  // ————————————————————————————————
  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  // ————————————————————————————————
  // 🧪 VALIDATION BEFORE SUBMISSION
  // ————————————————————————————————
  const validate = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!usernameRegex.test(form.username)) newErrors.username = "Invalid username";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Invalid Kenyan phone number";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email address";

    const passCheck = strongPassword(form.password);
    if (!passCheck.length || !passCheck.upper || !passCheck.lower || !passCheck.number || !passCheck.special) {
      newErrors.password = "Password is not strong enough";
    }

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ————————————————————————————————
  // 🚀 SUBMIT REGISTER
  // ————————————————————————————————
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      alert("Account created successfully 🎉");
      console.log(res.data);
    } catch (err) {
      if (err.response?.data?.message) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("Something broke 😭 try again");
      }
    }
    setLoading(false);
  };

  // ————————————————————————————————
  // 🧱 UI
  // ————————————————————————————————
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Account</h1>

      <form className="space-y-4" onSubmit={handleRegister}>
        {/* First Name */}
        <input
          className="input"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

        {/* Last Name */}
        <input
          className="input"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

        {/* Username */}
        <input
          className="input"
          placeholder="Username"
          value={form.username}
          onChange={(e) => updateField("username", e.target.value)}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

        {/* Phone */}
        <input
          className="input"
          placeholder="Phone Number (07xx...)"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        {/* Email */}
        <input
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />

          <span
            className="absolute top-3 right-3 cursor-pointer text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            className="input"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
          />

          <span
            className="absolute top-3 right-3 cursor-pointer text-sm"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}

        {/* Button */}
        <button
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
