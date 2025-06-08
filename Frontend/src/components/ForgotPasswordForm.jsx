import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">🔁 Forgot Password</h1>
      <input placeholder="Enter your email" className="w-full border p-2 rounded" />
      <button className="w-full bg-purple-500 text-white p-2 rounded">
        Send OTP
      </button>
      <div className="text-sm text-center">
        Remembered? <Link to="/login" className="text-blue-600">Go back to Login</Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ForgotPasswordForm;
