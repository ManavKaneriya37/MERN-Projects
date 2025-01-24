import axios from "axios";
import React, { useState, useRef, useContext, useEffect } from "react";
import { UserDataContext } from "../contexts/UserContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";

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
    <div className="home p-5 h-full w-full overflow-hidden overflow-y-auto relative">
      <CreateProjectModal handler={handleCreateProject}/>
      <div>
        <div className="mt-3 flex flex-col gap-3">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-neutral-100/40 hover:bg-neutral-100 ease duration-100 relative rounded-md p-2 flex items-center justify-between"
              >
                <h1 onClick={() => goToProject(project._id)} className="text-lg w-1/6 cursor-pointer">{project.name}</h1>
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
