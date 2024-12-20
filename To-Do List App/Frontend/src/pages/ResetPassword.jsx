import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const forgEmail = location.state || {};


  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === newPassword) {
      setIsPasswordMatch(true);
      setPasswordError('');
    } else {
      setIsPasswordMatch(false);
      setPasswordError('Passwords should be same');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPasswordMatch) {
      // Call API to change password
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login/change-password`, {newPassword, email: forgEmail});
      if(response.status == 200) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="bg-zinc-900 h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-zinc-800 text-white p-10 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center ">Reset Password</h2>
        <div className="mb-4 w-[25vw]">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-white bg-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none rounded w-full py-2 px-3 text-white bg-zinc-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
        </div>
        <button
          className={`${isPasswordMatch ? 'bg-blue-500' : 'bg-blue-950 pointer-events-none'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={!isPasswordMatch}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;