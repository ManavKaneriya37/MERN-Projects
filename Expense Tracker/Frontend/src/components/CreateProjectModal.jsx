import React, { useState, useRef } from "react";

const CreateProjectModal = ({handler, ref}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-400 text-white my-2 mx-auto p-2 px-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
      >
        <i className="ri-add-line"></i> Create Project
      </button>
      <div
        className={`${
          isModalOpen ? "" : "hidden"
        } absolute z-10 h-full w-full bg-zinc-300/60 backdrop-blur-sm top-0 left-0 flex items-center justify-center`}
      >
        <div className="bg-white rounded-lg min-w-2/6 h-fit w-[30vw] py-5 relative">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-1 cursor-pointer p-2 text-xl justify-self-end"
          >
            <i className="ri-close-line"></i>
          </div>

          <div className="">
            <h1 className="text-xl text-center p-2">Project details</h1>

            <form
              onSubmit={handler}
              className="flex flex-col gap-3 relative my-3"
            >
              <input
                autoComplete="off"
                required
                className="bg-neutral-100/60 rounded-md py-2 px-2 w-auto mx-6 relative"
                placeholder="Name"
                type="text"
                name="name"
              />
              <input
                autoComplete="off"
                className="bg-neutral-100/60 rounded-md py-2 px-2 w-auto mx-6 relative"
                placeholder="Description"
                type="text"
                name="description"
              />
              <input
                autoComplete="off"
                className="bg-neutral-100/60 rounded-md py-2 px-2 w-auto mx-6 relative"
                placeholder="Budget"
                type="number"
                name="budget"
              />
              <button
                type="submit"
                className="mt-4 bg-blue-400 w-auto mx-10 text-white py-2 rounded-md hover:bg-blue-500 ease-in duration-100"
              >
                Create Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjectModal;
