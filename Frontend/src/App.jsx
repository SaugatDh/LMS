import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Home from "./pages/Home";
import Dashboard from './pages/Dashboard';
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import OtpForm from "./components/OtpForm";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<LoginForm onLogin={setUser} />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/otp" element={<OtpForm />} />
      <Route path="/home" element={<Home user={user || { email: "Guest", role: "Guest" }} />} />
      <Route path="/Home" element={<Home user={user || { email: "Guest", role: "Guest" }} />} />
      <Route path="/courses" element={<Courses user={user || { email: "Guest", role: "Guest" }}  />} /> 
      <Route path="/course/:courseId" element={<CourseDetail user={user || { email: "Guest", role: "Guest" }} />} />
      <Route 
        path="/student/dashboard" 
        element={<Dashboard user={user || { email: "Guest", role: "Guest" }} />} 
      />
      <Route path="/profile" element={<Profile user={user || { email: "Guest", role: "Guest" }} />} />
      <Route path="/settings" element={<Settings user={user || { email: "Guest", role: "Guest" }} />} />
    </Routes>
  );
};

export default App;
