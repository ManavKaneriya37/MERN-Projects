import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../config/axios";

const Project = () => {
  const location = useLocation();
  const chatEndRef = useRef();
  const [project] = useState(location.state.project);
  const [currentProject, setCurrentProject] = useState(null);

  const [isCollabPanelOpen, setIsCollabPanelOpen] = useState(false);
  const [addColabModalOpen, setAddColabModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  useEffect(() => {
    axios.get(`/projects/${project._id}`, {    
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setCurrentProject(res.data)
    }
    ).catch((err) => {
      console.log(err.response.data);
    });
  }, [])

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatEndRef]);

  const handleGetCollabs = () => {
    setAddColabModalOpen(true);
    axios
      .post("/users/get-all", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSelection = (id) => {
    setSelectedUsers((prevState) => {
      const newSet = new Set(prevState);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddCollaborator = () => {
    axios
      .put(
        "/projects/add-user",
        { projectId: project._id, users: Array.from(selectedUsers) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setCurrentProject(res.data);
        setAddColabModalOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white">
      <div className="flex justify-between h-full relative">
        <div className="w-[25vw] max-h-fit h-screen relative bg-zinc-500 flex flex-col justify-between">
          <header className="w-full bg-zinc-200 bg-opacity-80 text-black h-fit p-[6px] flex items-center justify-between px-5">
            <div className="flex justify-between w-full gap-1 items-center">
              <h1 className="uppercase font-semibold text-gray-800">
                {currentProject?.name}
              </h1>
              <div className="flex items-center gap-3">
                <i
                  onClick={() => setIsCollabPanelOpen(true)}
                  title="View Collaborators"
                  className="ri-group-fill cursor-pointer p-[5px] bg-zinc-400 hover:bg-zinc-400/50 duration-150 ease-in px-[8px] rounded-md"
                ></i>
                <button
                  onClick={handleGetCollabs}
                  title="Add as Collaborator"
                  className="bg-zinc-700/80 hover:bg-zinc-700 text-sm duration-150 ease p-[5px] px-[8px] rounded text-white tracking-wider"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
            </div>
          </header>
          <section className="conversation-area p-1">
            <div className="message w-52 p-1 my-1 bg-white/80 rounded">
              <h5 className="text-[10px] text-gray-600">test123@gmail.com</h5>
              <p className="text-sm text-black text-wrap">
                Hello, welcome to this Project!
              </p>
            </div>
            <div className="message ml-auto w-52 p-1 my-1 bg-white/80 rounded">
              <h5 className="text-[10px] text-gray-600">manavnk37@gmail.com</h5>
              <p className="text-sm text-black text-wrap">
                Thank you admin for inviting in this project.
              </p>
            </div>
            <div ref={chatEndRef}></div>
          </section>
          <div className="input w-full p-2 flex gap-1 bg-transparent">
            <input
              placeholder="Enter message"
              type="text"
              name="message"
              className="w-full text-sm border-[1px] border-zinc-400/50 bg-zinc-300 rounded outline-none p-[7px] text-black"
            />
            <button>
              <i className="ri-send-plane-fill bg-zinc-800 p-2 rounded hover:bg-zinc-900 ease-in duration-100"></i>
            </button>
          </div>
          <aside
            className={`absolute ${
              isCollabPanelOpen
                ? "duration-300 translate-x-0"
                : "-duration-300 -translate-x-full"
            } collaborators top-0 left-0 h-full w-full overflow-hidden bg-zinc-600 overflow-y-auto`}
          >
            <header className="w-full h-14 flex text-white px-2 items-center justify-between">
              <h1 className="text-lg font-semibold">Collaborators</h1>
              <i
                onClick={() => setIsCollabPanelOpen(false)}
                className="ri-arrow-left-line text-2xl font-light cursor-pointer"
              ></i>
            </header>
            <div className="text-black p-2 px-3 flex flex-col gap-2 items-center">
             {
                currentProject?.users.map((user, index) => {
                  return (
                    <div key={index} className="flex items-center gap-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-600 duration-75 ease cursor-pointer">
                <i className="ri-user-6-line"></i>
                <h3>{user.email}</h3>
                </div>
                  )})
              }
            </div>
          </aside>
        </div>
        <div className="w-fit h-full bg-zinc-700"></div>
        <div className="w-fit h-full bg-zinc-200"></div>
        <div
          className={`${
            addColabModalOpen ? "block" : "hidden"
          } fixed z-4 w-[28vw] rounded-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-3 px-2 bg-zinc-700`}
        >
          <div className="flex items-center justify-between">
            <h3>Select User</h3>
            <i
              onClick={() => setAddColabModalOpen(false)}
              className="ri-close-line text-lg cursor-pointer"
            ></i>
          </div>

          <div className="addCollabsList flex flex-col gap-2 my-2 max-h-96 overflow-hidden overflow-y-scroll">
            {allUsers.length != 0 ? (
              allUsers.map((user, index) => (
                <div key={index} className="flex flex-col gap-4 w-full p-2">
                  <div
                    onClick={() => handleSelection(user._id)}
                    className={`${
                      selectedUsers.has(user._id)
                        ? "bg-zinc-400"
                        : "bg-zinc-600"
                    } flex gap-2 items-center p-2 rounded duration-75 ease cursor-pointer`}
                  >
                    <i className="ri-user-6-line"></i>
                    <h3>{user.email}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-400">
                No users found
              </p>
            )}
          </div>
          <button
            onClick={handleAddCollaborator}
            className="block justify-self-center bg-blue-500 px-10 py-2 rounded-lg hover:bg-blue-600 duration-100 ease-in"
          >
            Add Collaborators
          </button>
        </div>
      </div>
    </div>
  );
};

export default Project;
