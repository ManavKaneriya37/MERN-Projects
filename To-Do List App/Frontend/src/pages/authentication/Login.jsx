import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../../contexts/userContext';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const {setUser} = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('todo-token', data.token);
      navigate('/home');
    }

    setEmail('')
    setPassword('')

  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md w-1/3 px-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-7">
            <a
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
            <button
              className="bg-blue-500 hover:bg-blue-700 duration-150 ease-in  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Don't have an account?{' '}
            <a
              className="text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;