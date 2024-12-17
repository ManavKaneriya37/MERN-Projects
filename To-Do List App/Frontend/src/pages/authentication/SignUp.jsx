import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatchPassword, setIsMatchPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newuser = {
      fullname: fullname,
      email: email,
      password: password,
    };

    setIsLoading(true);
    const sendOtp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/send-otp`,
      { email }
    );
    if (sendOtp.status === 200) {
      navigate("/verify-otp", { state: newuser });
    }

    setFullname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (confirmPassword === password) {
      setIsMatchPassword(true);
    } else {
      setIsMatchPassword(false);
    }
  }, [confirmPassword]);

  return (
    <div className="h-screen flex justify-center items-center bg-zinc-900">
      <div className="bg-zinc-800 text-white p-10 rounded-xl shadow-md w-[75vh] mx-10 px-10">
        {isLoading ? (
          <Loading loading={isLoading} />
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl text-center tracking-wide font-bold mb-4">
              Sign Up
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                id="fullname"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="shadow appearance-none text-white bg-neutral-800 border-[1px] border-zinc-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              <h1 className="text-red-500 text-xs">
                {!isMatchPassword ? "The password should be same" : null}
              </h1>
            </div>
            <div className="flex items-center flex-col gap-3 justify-between">
              <p className="text-sm text-gray-300">
                Already have an account?{" "}
                <a
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </p>
              <button
                className="bg-blue-500 w-56 hover:bg-blue-700 duration-150 ease-in text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
