import axios from "axios";
import React, { useState, useRef, useContext, useEffect } from "react";
import { UserDataContext } from "../contexts/UserContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectionMenu, setSelectionMenu] = useState(null);
  const createProjectFormRef = useRef();
  const navigate = useNavigate();

  const { user } = useContext(UserDataContext);
  const panelRef = useRef(null);

  useGSAP(
    function () {
      if (selectionMenu) {
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, right: 0 },
          { opacity: 1, right: "32px", duration: 0.2, scrub: true }
        );
      }
    },
    [selectionMenu]
  );

  const handleCreateProject = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const projectData = {
      name: formData.name,
      description: formData.description,
      budget: formData.budget,
      userId: user._id,
    };
    axios
      .post("/api/projects/create", projectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          setIsModalOpen(false);
          createProjectFormRef.current.reset();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    function fetchProjects() {
      axios
        .get("/api/projects/get-all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            setProjects(res.data.store);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    fetchProjects();
  }, [projects]);

  const goToProject = (projectId) => {
    axios
      .get(`/api/projects/get/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.store);
          navigate(`/project/${projectId}`, {
            state: { project: res.data.store },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="home p-5 h-full w-full overflow-hidden relative">
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
              ref={createProjectFormRef}
              onSubmit={handleCreateProject}
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
      <div>
        <div className="mt-3 flex flex-col gap-3">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-neutral-100/40 relative rounded-md cursor-pointer p-2 flex items-center justify-between"
              >
                <h1 onClick={() => goToProject(project._id)} className="text-lg">{project.name}</h1>
                <p className="text-sm opacity-55">
                  {project.createdAt.split("T")[0]}
                </p>
                <span
                  className="p-1"
                  onClick={() =>
                    setSelectionMenu(
                      selectionMenu === project._id ? null : project._id
                    )
                  }
                >
                  <i className="ri-more-2-fill cursor-pointer"></i>
                </span>
                {selectionMenu === project._id && (
                  <div
                    ref={panelRef}
                    className="absolute opacity-0 right-8 top-3"
                  >
                    <ul className="z-10 relative bg-white rounded-md p-2">
                      <li onClick={() => goToProject(project._id)} className="hover:bg-neutral-100/60 cursor-pointer p-2 px-4 text-sm shadow-sm flex items-center gap-2">
                        <i className="ri-arrow-right-up-line"></i>
                        <p>Open</p>
                      </li>
                      <li className="hover:bg-neutral-100/60 cursor-pointer p-2 px-4 text-sm shadow-sm flex items-center gap-2 ">
                        <i className="ri-delete-bin-7-line"></i>
                        <p>Delete</p>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-lg p-2">
              <h1>No projects yet</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
