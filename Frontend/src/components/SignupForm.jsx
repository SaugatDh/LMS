import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">📝 Signup</h1>
      <input placeholder="Full Name" className="w-full border p-2 rounded" />
      <input placeholder="Email" className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
      <input type="password" placeholder="Confirm Password" className="w-full border p-2 rounded" />
      <button className="w-full bg-green-500 text-white p-2 rounded">Create Account</button>
      <div className="text-sm text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SignupForm;
