import React, { useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/api/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="p-4 homeMenuDriven h-full w-[22vw]">
      <div className="flex flex-col h-full justify-between gap-3">
        <div className=" flex flex-col gap-1">
          <div className="mb-4 profile flex items-center gap-3">
            <div className="bg-white/70 flex items-center justify-center p-1 px-2 rounded-full">
              <i className="ri-user-3-fill text-xl"></i>
            </div>
            <div>
              <p className="font-semibold"> {user?.name} </p>
              <button onClick={() => navigate('/user/edit-profile')} className="bg-white/70 text-black px-3 hover:bg-white/50 ease duration-100 py-1 rounded-md mt-1">Edit Profile</button>
            </div>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "bg-white" : "hover:bg-white/50 duration-100 ease"
              } px-2 rounded-lg flex items-center gap-2`
            }
          >
            <i className="ri-line-chart-line"></i>
            <h3 className="leading-9">Dashboard</h3>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${
                isActive ? "bg-white" : "hover:bg-white/50 duration-100 ease"
              } px-2 rounded-lg flex items-center gap-2`
            }
          >
            <i className="ri-folder-5-line"></i>
            <h3 className="leading-9">Projects</h3>
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${
                isActive ? "bg-white" : "hover:bg-white/50 duration-100 ease"
              } px-2 rounded-lg flex items-center gap-2`
            }
          >
            <i className="ri-wallet-line"></i>
            <h3 className="leading-9">View Transactions</h3>
          </NavLink>

          <NavLink
            to="/incomes"
            className={({ isActive }) =>
              `${
                isActive ? "bg-white" : "hover:bg-white/50 duration-100 ease"
              } px-2 rounded-lg flex items-center gap-2`
            }
          >
            <img className="w-5" src="../../public/income.png" alt="Incomes" />
            <h3 className="leading-9">Incomes</h3>
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `${
                isActive ? "bg-white" : "hover:bg-white/50 duration-100 ease"
              } px-2 rounded-lg flex items-center gap-2`
            }
          >
            <img
              className="w-5"
              src="../../public/spending.png"
              alt="Expenses"
            />
            <h3 className="leading-9">Expenses</h3>
          </NavLink>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="px-2 rounded-lg flex items-center gap-2 hover:bg-white/50 duration-100 ease w-full p-1"
          >
            <i className="ri-logout-box-r-line"></i>
            <h3>Logout</h3>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
