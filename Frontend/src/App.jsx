// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import OtpForm from "./components/OtpForm";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Simple redirect from root to Home */}
      <Route path="/" element={<Navigate to="/pages/Home" />} />

      <Route path="/login" element={<LoginForm onLogin={setUser} />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/otp" element={<OtpForm />} />

      {/* Home route without protection */}
      <Route path="/pages/Home" element={<Home user={user || { email: "Guest", role: "Guest" }} />} />
    </Routes>
  );
};

export default App;
