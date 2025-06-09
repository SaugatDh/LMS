// src/components/LoginForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SAMPLE_USER = {
  email: "admin",
  password: "admin",
  role: "student",
};

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === SAMPLE_USER.email &&
      password === SAMPLE_USER.password &&
      role === SAMPLE_USER.role
    ) {
      onLogin({ email, role });
      navigate("/pages/Home"); // <-- update this line
    } else {
      // Update the error message to reflect the actual SAMPLE_USER credentials
      setError(`Invalid credentials. Try ${SAMPLE_USER.email} / ${SAMPLE_USER.password} / ${SAMPLE_USER.role}`);
    }
  };

  return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold text-center">🔐 MyApp Login</h1>
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
