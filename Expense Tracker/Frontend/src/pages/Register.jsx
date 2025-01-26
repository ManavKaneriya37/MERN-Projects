import React, { useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";

const Register = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const response = await axios.post("/api/users/register", formData);

    if (response.data.statusCode === 201) {
      localStorage.setItem("token", response.data.store.token);
      setUser(response.data.store.createdUser);
      navigate("/");
    }

    formRef.current.reset();
  };

  return (
    <>
      <div className='flex items-centerp-5 h-screen w-full bg-no-repeat bg-cover bg-[url("https://img.freepik.com/premium-vector/stock-market-investment-trading-graph-graphic-concept-suitable-financial-investment_258787-30.jpg?w=996")]'>
        <aside className="h-full w-1/2 flex items-center justify-center">
          <div className="w-2/3">
            <h1 className="registerTitle text-emerald-500 text-5xl text-center font-semibold">
              FinTrack
            </h1>
            <p className="registerP text-lg text-center my-5 leading-8">
              Join us today and take control of your financial journey by
              creating an account!
            </p>
          </div>
        </aside>

        <section className="w-1/2 flex items-center justify-center">
          <div className="h-fit w-[62%] p-4 py-12 rounded-xl bg-white shadow-lg shadow-black/50">
            <h1 className="text-center text-3xl font-semibold mb-10">
              Sign Up
            </h1>

            <form
              autoComplete="off"
              ref={formRef}
              onSubmit={handleRegister}
              className="flex flex-col gap-4 my-4 px-5"
            >
              <input
                type="text"
                name="name"
                autoComplete="off"
                placeholder="Name"
                className="w-full p-2 rounded-md outline-none border-[1px] border-black/20"
              />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                className="w-full p-2 rounded-md outline-none border-[1px] border-black/20"
              />
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                className="w-full p-2 rounded-md outline-none border-[1px] border-black/20"
              />

              <button
                type="submit"
                className="mx-5 py-2 text-white rounded-md bg-emerald-400 hover:bg-emerald-500 ease duration-75 block justify-self-end"
              >
                Create Account
              </button>
              <p className="text-center">
                Already have an Account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Login!
                </span>
              </p>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
