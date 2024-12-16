import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Priority" } };

const CreateTask = () => {
  const [openPriority, setOpenPriority] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const handlePrioritySelect = (priority) => {
    setSelectedPriority(priority);
  };

  useEffect(() => {
    if (!openPriority) {
      setSelectedPriority(null);
    }
  }, [openPriority]);

  return (
    <div className="bg-zinc-900 text-white w-full p-6 flex items-center flex-col">
      <h1 className="text-3xl">Create New Task</h1>
      <div className="mt-8">
        <input
          type="text"
          name="taskname"
          placeholder="Task Name"
          className="px-2 w-full bg-transparent border-b-2 border-b-gray-500/40 outline-none text-white"
        />
        <input
          type="date"
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
          placeholder="Category"
          className="w-[40vw] rounded-md px-2 bg-transparent border-[1px] py-2 border-gray-500/40 outline-none text-white"
        />

        <button className="block w-44 h-10 my-7 bg-blue-500 justify-self-center rounded-lg">Create Task</button>
      </div>
    </div>
  );
};

export default CreateTask;
