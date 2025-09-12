import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/user/verify-otp', { email, otp });
      setMessage('OTP verified successfully!');
      // Navigate to next step or dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await axios.post('/api/user/send-otp', { email });
      setMessage('OTP resent successfully.');
      setError('');
    } catch (err: any) {
      setError('Failed to resend OTP.');
    }
  };

  if (!email) {
    return <p className="text-center mt-20 text-red-600">Email not found. Please register again.</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Email Verification</h2>
        <p className="text-center text-gray-600 mb-4">
          An OTP has been sent to <strong>{email}</strong>. Please enter the 4-digit code below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="text-center text-xl tracking-widest py-3 px-4 bg-gray-100 rounded-lg mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-2 text-center">{message}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Didn't receive the OTP?{' '}
            <button onClick={handleResend} className="text-blue-500 hover:underline font-medium">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
