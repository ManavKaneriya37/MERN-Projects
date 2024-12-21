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
    <div class={`container relative min-h-screen ${openCreateBox ? 'h-screen overflow-hidden' : ''} w-full p-6 bg-zinc-900 text-white`}>
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
        <h1 class="text-2xl">Welcome, {userProfile?.fullname}</h1>
        <div onClick={handleLogout} className="border-red-500 border-[1px] hover:bg-red-500 ease duration-300 cursor-pointer rounded-lg px-4 py-1">Logout</div>
      </div>
      <div class="flex justify-start my-5 rounded-md">
        <button class="bg-zinc-800 hover:bg-zinc-700 duration-200 ease text-white py-2 px-4 rounded-xl flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
