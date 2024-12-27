import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { UserDataContext } from "../contexts/UserContext";

const verifyOTP = () => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [OTP, setOTP] = useState("");

  const [verifiedOTP, setVerifiedOTP] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const { fullname, email, password } = location.state || {};
  const forgEmail = location.state.forgEmail;
  const forgStatus = location.state.forgotStatus;


  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleChange = (index) => (event) => {
    const value = event.target.value;
    setOTP((prev) => (prev += value));

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBack = (index) => (event) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      event.target.value = "";
      setOTP((prev) => prev.slice(0, -1));
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const verifyOTP = async () => {
    if (forgStatus) {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/verify-otp`,
        { email: forgEmail, OTP }
      );
      if (response.status === 200) {
        return navigate("/login/reset/password", {state: forgEmail});
      } else {
        setError(true);
      }
    } else {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/verify-otp`,
        { email, OTP }
      );

      if (response.status === 200) {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/signup`,
          { fullname, email, password }
        );

        if (response.status === 201) {
          const data = response.data;
          setUser(data.user);
          localStorage.setItem("todo-token", data.token);
        }

        navigate("/home");
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-zinc-900 flex justify-center items-center">
      <div className="xl:w-1/3 mx-5 text-white bg-zinc-800/70 p-5 py-10 rounded-2xl flex flex-col justify-center items-center">
        <h1 className="text-center mb-3 text-2xl">Enter OTP</h1>
        <p className="text-xs text-center mb-10 mx-10">
          The OTP is sent on your email:{" "}
          <span className="italic text-xs">
            {email ? email : "google@gmail.com"}
          </span>
          .
        </p>
        <div className="flex space-x-4">
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              type="text"
              className="p-2 w-14 bg-zinc-800 border-[1px]  h-14 border-gray-700/90 rounded-lg text-center text-2xl"
              ref={ref}
              onChange={handleChange(index)}
              onKeyDown={handleBack(index)}
              maxLength={1}
            />
          ))}
        </div>
        <button
          onClick={verifyOTP}
          className="w-52 h-10 bg-sky-700 hover:bg-sky-600 duration-150 text-white rounded mt-10"
        >
          Verify OTP
        </button>

        <h1 className="text-green-500 text-base">
          {verifiedOTP ? "Verified OTP successfully!" : null}
        </h1>
        <h1 className="text-red-500 text-sm">
          {error ? "OTP is wrong or expired" : null}
        </h1>
      </div>
    </div>
  );
};

export default verifyOTP;
