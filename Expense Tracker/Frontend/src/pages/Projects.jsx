import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { UserDataContext } from "../contexts/UserContext";


const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createProjectFormRef= useRef();

  const {user} = useContext(UserDataContext);

  const handleCreateProject = e => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const projectData = {
        name: formData.name,
        description: formData.description,
        budget: formData.budget,
        userId: user._id
    }
    axios.post('/api/projects/create', projectData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => {
        if(res.data.statusCode === 201) {
            setIsModalOpen(false);
            createProjectFormRef.current.reset();
        }
    })
    .catch(err => {
        console.error(err);
    })
  }

  return (
    <div className="home p-2 h-full w-full overflow-hidden relative">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-400 text-white my-2 mx-auto p-2 px-3 rounded-lg hover:bg-blue-500 ease-in duration-100"
      > 
        <i className="ri-add-line"></i> Create Project
      </button>
      <h1 className="p-2 text-2xl font-semibold">Your Projects</h1>
      <div
        className={`${
          isModalOpen ? "" : "hidden"
        } absolute z-10 h-full w-full bg-zinc-300/60 backdrop-blur-sm top-0 left-0 flex items-center justify-center`}
      >
        <div className="bg-white rounded-lg min-w-2/6 h-fit w-[27vw] py-5 relative">
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-1 cursor-pointer p-2 text-xl justify-self-end"
          >
            <i className="ri-close-line"></i>
          </div>

          <div className="">
            <h1 className="text-xl text-center p-2">Project details</h1>

            <form ref={createProjectFormRef} onSubmit={handleCreateProject} className="flex flex-col gap-3 relative my-3">
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
      <div></div>
    </div>
  );
};

export default Projects;
