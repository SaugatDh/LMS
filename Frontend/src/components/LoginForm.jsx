// src/components/LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/auth.slice";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Define custom username and password for testing
  const CUSTOM_EMAIL = "admin";
  const CUSTOM_PASSWORD = "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Temporarily bypass API call and use custom credentials
    if (email === CUSTOM_EMAIL && password === CUSTOM_PASSWORD) {
      dispatch(login());
      navigate("/pages/Home");
    } else {
      setError("Invalid email or password.");
    }

    // Original API call code (commented out for now)
    /*
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(login());
        // dispatch(login({ email: data.user.email, role: data.user.role }));
        // onLogin({ email, role: data.user.role });

        navigate("/pages/Home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login API error:", err);
      setError("An error occurred during login.");
    }
    */
  };

  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center">🔐 MyApp Login</h1>
      {/* You might remove the role select if the backend determines the role */}
      <select
        className="w-full border p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="user">User</option>
        <option value="tutor">Tutor</option>
        <option value="admin">Admin</option>
      </select>
      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
      <div className="flex justify-between text-sm">
        <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
        <Link to="/signup" className="text-blue-600">New? Signup</Link>
      </div>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
