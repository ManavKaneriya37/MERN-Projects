import React, { useEffect, useState } from "react";
import PriorityTasks from "../components/PriorityTasks";
import AllTasks from "../components/AllTasks";
import TodaysTasks from "../components/TodaysTasks";
import CreateTask from "./CreateTask";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [openCreateBox, setOpenCreateBox] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [reloadTasks, setReloadTasks] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/profile`,{},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status == 200) {
      return response.data;
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  const handleTaskCreated = () => {
    setReloadTasks((prev) => !prev);
  };

  const handleLogout = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`,{}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
      }
    })

    if(response.status === 200) {
      navigate('/login') 
    }
  }

  return (
    <div className={`container relative min-h-screen ${openCreateBox ? 'h-screen overflow-hidden' : ''} w-full p-6 bg-zinc-900 text-white`}>
      {openCreateBox ? (
        <div className="absolute rounded top-1 left-1 min-h-screen h-screen w-full">
          <i
            className="ri-close-large-line p-3 block h-9 bg-zinc-900 w-full text-right cursor-pointer"
            onClick={() => setOpenCreateBox(!openCreateBox)}
          ></i>
          <CreateTask
            profile={userProfile}
            setOpenCreateBox={setOpenCreateBox}
            onTaskCreated={handleTaskCreated}
          />
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Welcome, {userProfile?.fullname}</h1>
        <div onClick={handleLogout} className="border-red-500 border-[1px] hover:bg-red-500 ease duration-300 cursor-pointer rounded-lg px-4 py-1">Logout</div>
      </div>
      <div className="flex justify-start my-5 rounded-md">
        <button className="bg-zinc-800 hover:bg-zinc-700 duration-200 ease text-white py-2 px-4 rounded-xl flex items-center">
        <i className="ri-add-line mr-1"></i>
          <p onClick={() => setOpenCreateBox(!openCreateBox)}>Create Task</p>
        </button>
      </div>

      <PriorityTasks profile={userProfile} setReloadTasks={setReloadTasks} reloadTasks={reloadTasks} />

      <div className="flex gap-2 justify-between">
        <AllTasks profile={userProfile} reloadTasks={reloadTasks} setReloadTasks={setReloadTasks} />
        <TodaysTasks profile={userProfile} reloadTasks={reloadTasks} setReloadTasks={setReloadTasks} />
      </div>
    </div>
  );
};

export default Home;
