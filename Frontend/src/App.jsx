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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm onLogin={setUser} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/otp" element={<OtpForm />} />
          <Route
            path="/pages/Home"
            element={user ? <Home user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
  
  );
};

export default App;
