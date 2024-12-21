import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      user
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("todo-token", data.token);
      navigate("/home");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-900">
      <div className="bg-zinc-800 p-10 text-white rounded-xl shadow-md xl:w-1/3 px-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-100 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-100 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-7">
            <Link
              className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800"
              to='/login/reset/email' 
            >
              Forgot Password?
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 duration-150 ease-in  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <p className="text-gray-300 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <a
              className="text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={() => navigate("/signup")}
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
