import React, { useEffect, useState } from "react";
import PriorityTasks from "../components/PriorityTasks";
import AllTasks from "../components/AllTasks";
import TodaysTasks from "../components/TodaysTasks";
import CreateTask from "./CreateTask";
import axios from "axios";

const Home = () => {
  const [openCreateBox, setOpenCreateBox] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [reloadTasks, setReloadTasks] = useState(false);

  const getProfile = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/profile`,
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

  return (
    <div class="container relative min-h-screen w-full p-6 bg-zinc-900 text-white">
      {openCreateBox ? (
        <div className="absolute rounded top-1 left-1/2 -translate-x-1/2 -translate-y-3/2 border-white border-[1px] ">
          <i
            className="ri-close-large-line p-3 block h-5 bg-zinc-900 w-full text-right cursor-pointer"
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
        <div className="profile p-5 rounded-full bg-white"></div>
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

      <PriorityTasks profile={userProfile} reloadTasks={reloadTasks} />

      <div className="flex gap-2 justify-between">
        <AllTasks profile={userProfile} reloadTasks={reloadTasks} />
        <TodaysTasks />
      </div>
    </div>
  );
};

export default Home;
