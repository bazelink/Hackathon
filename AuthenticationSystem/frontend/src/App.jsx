import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

function ForgotPassword() {
  return (
    <>
      <h1> Log in </h1>
      <Register />
    </>
  )
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
