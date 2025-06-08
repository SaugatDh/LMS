import { Link } from "react-router-dom";

const OtpForm = () => {
  return (
    
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">🔐 OTP Verification</h1>
      <input placeholder="Enter OTP" className="w-full border p-2 rounded" />
      <button className="w-full bg-indigo-500 text-white p-2 rounded">Verify OTP</button>
      <div className="text-sm text-center">
        Didn't get the code? <button className="text-blue-600 underline">Resend</button>
      </div>
    </div>
  );
};

export default OtpForm;
