import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .post("/users/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateProject = () => {
    console.log("Project Name:", projectName);

    axios
      .post(
        "/projects/create",
        { name: projectName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        isModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setProjectName("");
  };

  const fetchProjects = async () => {
    axios
      .post("/projects/all", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, [projects]);

  return (
    <div className="h-screen bg-zinc-900 text-white">
      <div className="p-5">
        <h1 className="text-4xl font-semibold">Home</h1>
        <button
          className="w-fit px-4 py-3 flex items-center gap-3 justify-center mt-5 border-[1px] border-gray-400 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="ri-link"></i>
          <p>Create a project</p>
        </button>
      </div>
      <div className="p-2">
        {projects &&
          projects.map((project) => (
            <div key={project._id} className="p-3 w-[20vw] border-zinc-600 border-[1px] rounded-md mb-2">
              <h3 className="text-xl">{project.name}</h3>
              <section>
                
              </section>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  text-white bg-opacity-50">
          <div className="p-5 bg-zinc-800 rounded-md">
            <h2 className="text-2xl mb-4">Create Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border border-zinc-600/40 rounded-sm p-2 mb-4 w-full bg-zinc-700/70  "
            />
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 ease duration-200 rounded-md text-white"
            >
              Create
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-600 ease duration-200 rounded-md text-white ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
