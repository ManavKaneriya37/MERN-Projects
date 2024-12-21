import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Loading from '../components/Loading'

const label = { inputProps: { "aria-label": "Priority" } };

const CreateTask = ({profile, setOpenCreateBox, onTaskCreated}) => {
  const [openPriority, setOpenPriority] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!openPriority) {
      setSelectedPriority(null);
    }
  }, [openPriority]);

  const handlePrioritySelect = (priority) => {
    setPriority(priority);
    setSelectedPriority(priority)
  }
  
  const handleCreateTask = async () => {
    const todo = {
      title,
      description,
      category,
      date,
      priority,
      user: profile._id
    }
    setIsLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/create`,todo, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('todo-token')}`
      }
    });
    if(response.status === 201) {
      setOpenCreateBox(false);
      onTaskCreated();
      navigate('/home')
    }
  }



  return (
    <div className="relative bg-zinc-900 text-white w-full z-50 p-4 flex items-center min-h-screen h-screen flex-col">
      {isLoading ? (<Loading loading={isLoading} />) : (
        <div>
          <h1 className="text-3xl">Create New Task</h1>
      <div className="mt-8">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="px-2 py-2 w-full bg-transparent border-b-2 border-b-gray-500/40 outline-none text-white"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="px-2 py-2 my-7 mb-1 w-full bg-transparent border-b-2 border-b-gray-500/40 outline-none text-white"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-zinc-900 block mt-5 border-[1px] border-gray-600 px-3 py-1 rounded-md"
        />
        <div className="flex mt-5 items-center gap-2">
          <h2 className="text-xl">Set Priority</h2>
          <Switch {...label} onClick={() => setOpenPriority((prev) => !prev)} />
        </div>
        {openPriority ? (
          <div className="flex items-center gap-10 mt-2">
            <div
              className={`border-[1px] cursor-pointer border-red-500 w-20 h-9 flex items-center justify-center rounded ${
                selectedPriority === "High" ? "bg-red-500 text-white" : ""
              }`}
              onClick={() => handlePrioritySelect("High")}
            >
              High
            </div>
            <div
              className={`border-[1px] cursor-pointer border-orange-500 w-20 h-9 flex items-center justify-center rounded ${
                selectedPriority === "Medium" ? "bg-orange-500 text-white" : ""
              }`}
              onClick={() => handlePrioritySelect("Medium")}
            >
              Medium
            </div>
            <div
              className={`border-[1px] cursor-pointer border-green-500 w-20 h-9 flex items-center justify-center rounded ${
                selectedPriority === "Low" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => handlePrioritySelect("Low")}
            >
              Low
            </div>
          </div>
        ) : null}

        <h1 className="text-xl mt-6 tracking-wide my-2">Categories</h1>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="w-[40vw] rounded-md px-2 bg-transparent border-[1px] py-2 border-gray-500/40 outline-none text-white"
        />

        <button onClick={handleCreateTask} className="block w-44 h-10 my-7 bg-blue-500 justify-self-center rounded-lg">Create Task</button>
      </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
