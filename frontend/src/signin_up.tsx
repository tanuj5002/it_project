// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpVerification from './otpverify';
import axios from 'axios';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted with:', { username, password });
  };

  const toggleView = () => {
    setShowLogin(!showLogin);
  };
  const navigate = useNavigate();
  const handleSendOtp = async () => {
    try {
      await axios.post('/api/user/send-otp', { email }); // Send OTP
      navigate('/verify', { state: { email } }); // Navigate with email
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl flex overflow-hidden rounded-3xl shadow-xl">
        {showLogin ? (
          <>
            {/* Login View */}
            <div className="w-2/5 bg-blue-500 text-white p-12 flex flex-col items-center justify-center relative">
              <div className="absolute top-12 left-12">
                {/* <img src="weblogo.jpeg" alt="Website Logo" className="h-8" /> */}
              </div>
              <div className="mt-20 text-center">
                <h1 className="text-4xl font-bold mb-6">Hello, Welcome!</h1>
                <p className="text-lg mb-6">Don't have an account?</p>
                <button 
                  onClick={toggleView}
                  className="border-2 border-white text-white py-2 px-8 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                  Register
                </button>
              </div>
            </div>
            <div className="w-3/5 bg-white p-12 flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-10">Login</h2>
              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                  />
                  <i className="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="relative mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                  />
                  <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="text-right mb-6">
                  <a href="#" className="text-gray-600 hover:text-blue-500 transition duration-300">
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                  Login
                </button>
                <div className="mt-8 text-center">
                  {/* <p className="text-gray-600 mb-4">or login with social platforms</p> */}
                  {/* <div className="flex justify-center space-x-4">
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-google text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-facebook-f text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-github text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-linkedin-in text-gray-700"></i>
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Registration View */}
            <div className="w-3/5 bg-white p-12 flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-10">Registration</h2>
              <form className="flex flex-col flex-1" onSubmit={(e) => e.preventDefault()}>
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <i className="fas fa-user absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="relative mb-6">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="relative mb-6">
                  <input
                    type="string"
                    placeholder="Phone"
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <i className="fas fa-envelope absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="relative mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-gray-100 px-4 py-3 pr-10 rounded-lg border-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className="fas fa-lock absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                </div>
                <button
                  onClick={handleSendOtp}
                  type="button"
                  className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                  Send OTP
                </button>
                <div className="mt-8 text-center">
                  {/* <p className="text-gray-600 mb-4">or register with social platforms</p>
                  <div className="flex justify-center space-x-4">
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-google text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-facebook-f text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-github text-gray-700"></i>
                    </button>
                    <button className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                      <i className="fab fa-linkedin-in text-gray-700"></i>
                    </button>
                  </div> */}
                </div>
              </form>
            </div>
            <div className="w-2/5 bg-blue-500 text-white p-12 flex flex-col items-center justify-center relative">
              <div className="absolute top-12 right-12">
                {/* <img src="weblogo.jpeg" alt="Website Logo" className="h-8" /> */}
              </div>
              <div className="mt-20 text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
                <p className="text-lg mb-6">Already have an account?</p>
                <button 
                  onClick={toggleView}
                  className="border-2 border-white text-white py-2 px-8 rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300 cursor-pointer whitespace-nowrap !rounded-button">
                  Login
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

