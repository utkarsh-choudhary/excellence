import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      console.log(response.data);

      // Redirect to home page on successful login
      navigate('/home');
    } catch (err) {
      setErrorMessage('Invalid email or password');
      console.error(err);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const googleToken = response.credential; // Google OAuth credential
      console.log('Google Token:', googleToken);

      // Send the Google token to the backend for authentication
      const res = await axios.post('http://localhost:5001/api/auth/google-login', { token: googleToken });
      localStorage.setItem('token', res.data.token); // Save token from backend
      console.log('Google Login Successful:', res.data);

      // Redirect to home page on successful Google login
      navigate('/home');
    } catch (err) {
      setErrorMessage('Google Login failed');
      console.error(err);
    }
  };

  const handleNavigateToRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 sm:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Login</h2>
          <p className="text-gray-500 text-center text-sm sm:text-base">
            Sign in to access your account.
          </p>
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <div className="w-full border-t border-gray-300" />
          <span className="text-gray-500 mx-4">OR</span>
          <div className="w-full border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage('Google Login Failed')}
          />
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <span
              onClick={handleNavigateToRegister}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
