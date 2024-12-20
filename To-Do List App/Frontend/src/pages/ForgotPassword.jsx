import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading'
import axios from 'axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgotStatus = true;
  const navigate = useNavigate();

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/send-otp`, {email, forgotStatus})
    if(response.status == 200) {
      navigate('/login/reset/otp', {state: {forgotStatus, forgEmail: email}});
    }
    
  }

  return (
    <div className="h-screen bg-zinc-900 flex justify-center items-center">
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <div className="bg-zinc-800 p-10 w-[30vw] rounded-lg">
        <h2 className="text-2xl text-center text-white">Enter Your Email</h2>
        <p className="mb-8 text-white text-[10px] my-[2px] text-center opacity-45">
          We will sent you a OTP on your registered email.
        </p>
        <form onSubmit={handleEmailVerify}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full p-2 mb-4 bg-zinc-700 text-white rounded-lg"
          />
          <button className="bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 w-full rounded-lg">
            Verify with OTP
          </button>
        </form>
      </div>
      ) }
    </div>
  );
};

export default ForgotPassword;
