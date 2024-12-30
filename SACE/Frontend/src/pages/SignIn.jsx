import React, { useState, useContext } from "react";
import axios from "../../config/axios";
import { UserDataContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("/users/signin", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        setIsLoading(false);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-900">
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="bg-zinc-800 text-white p-7 block rounded-md mx-5 shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              autoComplete="off"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 my-1 rounded bg-neutral-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 my-1 rounded bg-neutral-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full relative bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 duration-150 ease"
          >
            Sign In
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
