import React from "react";
import { useLocation } from "react-router-dom";

const SingleProject = () => {
  const location = useLocation();
  const project = location.state.project;
  console.log(project);
  return (
    <div className="home p-5 h-full w-full overflow-hidden relative">
      <div className="flex items-center justify-between px-7">
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <button className="bg-zinc-600 text-white p-1 px-6 rounded-lg hover:bg-gray-500 ease-in duration-100">
          Edit
        </button>
      </div>
      <section className="w-full h-fit flex gap-3 items-center justify-between mt-3">
        <div className="relative overflow-hidden h-28 flex-grow px-4 py-3 bg-emerald-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Incomes</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-green-500">
            10,000
          </div>
        </div>
        <div className="h-28 flex-grow px-4 py-3 bg-rose-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Expenses</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-red-500">
            4,000
          </div>
        </div>
        <div className="h-28 flex-grow px-4 py-3 bg-gray-100 rounded-lg">
          <h1 className="text-xl font-semibold text-center">Balance</h1>
          <div className="h-full w-full flex items-center text-3xl justify-center relative text-gray-500">
            6,000
          </div>
        </div>
      </section>
      {project.budget && (
        <span className="flex justify-end px-5 my-2">
          Budget = {project.budget}
        </span>
      )}
      <div className="mt-6">
        <h1 className="text-lg">Recent Transactions</h1>
        <div className="flex gap-3">
          <button className="bg-neutral-800/80 my-1 text-white px-4 py-1 rounded-lg">
            Sort by:
          </button>
          <div>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
