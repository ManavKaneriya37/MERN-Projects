import React, {
  useState,
  useRef,
  createRef,
  useEffect,
  useContext,
} from "react";
import { useLocation } from "react-router-dom";
import axios from "../../config/axios";
import { UserDataContext } from "../../contexts/UserContext";
import Markdown from "markdown-to-jsx";
import { getWebContainer } from "../../config/webContainers";

import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../../config/socket";

const Project = () => {
  const location = useLocation();
  const chatEndRef = useRef();
  const [project] = useState(location.state.project);
  const [currentProject, setCurrentProject] = useState(null);
  const [fileTree, setFileTree] = useState({});

  const [isCollabPanelOpen, setIsCollabPanelOpen] = useState(false);
  const [addColabModalOpen, setAddColabModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [openFiles, setOpenFiles] = useState([]);
  const messageBox = createRef();
  const [webContainer, setWebContainer] = useState(null);
  const [iframeUrl, setIframeUrl] = useState(null);
  const [runProcess, setRunProcess] = useState(null);

  const { user } = useContext(UserDataContext);

  useEffect(() => {
    initializeSocket(project._id);

    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started");
      });
    }

    receiveMessage("project-message", (data) => {

      if (data.sender._id == "ai") {
        const message = JSON.parse(data.message);
        webContainer?.mount(message.fileTree);

        if (message.fileTree) {
          setFileTree(message.fileTree || {});
        }
        setMessages((prevMessages) => [...prevMessages, data]);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    axios
      .get(`/projects/${project._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCurrentProject(res.data);
        setFileTree(res.data.fileTree);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const send = () => {
    sendMessage("project-message", {
      message,
      sender: user,
    });

    setMessages((prevMessages) => [...prevMessages, { sender: user, message }]);

    setMessage("");
  };

  function writeAIMessage(message) {
    const messageObj = JSON.parse(message);
    return (
      <div className="overflow-auto bg-slate-700 text-gray-300 p-2">
        <Markdown>{messageObj.text}</Markdown>
      </div>
    );
  }

  function saveFileTree(ft) {
    console.log(ft);
    axios
      .put(
        "/projects/update-file-tree",
        { projectId: project._id, fileTree: fileTree },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-white">
      <div className="flex items-center gap-1 h-full relative">
        <div className="left w-[25vw] max-h-fit h-screen relative bg-zinc-500 flex flex-col justify-between">
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
          <section ref={messageBox} className="conversation-area p-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message w-52 p-1 my-1 bg-white/80 rounded text-black text-wrap text-sm ${
                  msg.sender._id === "ai" ? "max-w-[20rem]" : "max-w-52"
                } ${msg.sender._id === user._id.toString() && "ml-auto"}`}
              >
                <small className="text-[10px] text-gray-600">
                  {msg.sender.email}
                </small>
                <p className="text-xs text-black text-wrap break-words">
                  {msg.sender._id === "ai"
                    ? writeAIMessage(msg.message)
                    : msg.message}
                </p>
              </div>
            ))}
          </section>
          <div className="input w-full p-2 flex gap-1 bg-transparent">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
              type="text"
              name="message"
              className="w-full text-sm border-[1px] border-zinc-400/50 bg-zinc-300 rounded outline-none p-[7px] text-black"
            />
            <button onClick={send}>
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
              {currentProject?.users?.map((user, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-600 duration-75 ease cursor-pointer"
                  >
                    <i className="ri-user-6-line"></i>
                    <h3>{user.email}</h3>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
        <section className="right flex flex-grow h-screen bg-zinc-700">
          <div className="explorer h-full flex-grow min-w-52 max-w-64 bg-slate-600/50">
            {Object.keys(fileTree).map((file, index) => (
              <div
                onClick={() => {
                  setCurrentFile(file);
                  setOpenFiles(
                    (prevOpenFiles) => new Set([...prevOpenFiles, file])
                  );
                }}
                key={index}
                className="tree-element cursor-pointer w-full bg-slate-600 hover:bg-zinc-500/80 duration-75 ease"
              >
                <p className="p-2 font-semibold text-sm">{file}</p>
              </div>
            ))}
          </div>
          <div className="code-editor h-full flex flex-col flex-grow bg-neutral-800 ">
            <div className="top flex items-center">
              <div className="files flex items-center w-full overflow-hidden overflow-x-auto">
                {Array.from(openFiles).map((file, index) => (
                  <div
                    onClick={() => setCurrentFile(file)}
                    key={index}
                    className={`${
                      file === currentFile ? "bg-white" : "bg-gray-400"
                    } cursor-pointer flex justify-between items-center p-1 w-fit text-black`}
                  >
                    <h1 className="p-2 text-xs font-bold">{file}</h1>
                  </div>
                ))}
              </div>
              <div className="actions flex items-center gap-1">
                <button
                  onClick={async () => {
                    await webContainer?.mount(fileTree);
                    const installProcess = await webContainer.spawn("npm", [
                      "install",
                    ]);
                    installProcess.output.pipeTo(
                      new WritableStream({
                        write(chunk) {
                          console.log(chunk);
                        },
                      })
                    );                    

                    if (runProcess) {
                      runProcess.kill();
                    }

                    let tempRunProcess = await webContainer.spawn("npm", [
                      "start",
                    ]);
                    tempRunProcess.output.pipeTo(
                      new WritableStream({
                        write(chunk) {
                          console.log(chunk);
                        },
                      })
                    );

                    setRunProcess(tempRunProcess);

                    webContainer.on("server-ready", (port, url) => {
                      console.log(port, url);
                      setIframeUrl(url);
                    });
                  }}
                  className="p-2 px-4 text-xs bg-slate-300 text-black rounded-md hover:bg-slate-400 ease duration-100"
                >
                  RUN
                </button>
                <button
                  className="save bg-slate-700 text-whit text-xs my-1 p-2 px-4 rounded-md hover:bg-slate-600 ease duration-100"
                  onClick={async () => {
                    saveFileTree(fileTree);
                    await webContainer?.mount(fileTree);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="bottom flex flex-grow bg-neutral-950 h-full text-sm">
              {fileTree[currentFile] && (
                <textarea
                  spellCheck='false'
                  value={fileTree[currentFile].file.contents}
                  onChange={(e) => {
                    const updatedContent = e.target.value;
                    const ft = {
                      ...fileTree,
                      [currentFile]: {
                        file: {
                          contents: updatedContent,
                        },
                      },
                    };

                    setFileTree(ft);
                    saveFileTree(ft);
                  }}
                  className="code bg-transparent h-full w-full overflow-y-auto p-2"
                ></textarea>
              )}
            </div>
          </div>
          {iframeUrl && webContainer && (
            <div className="flex flex-col">
              <div className="address-bar">
                <input
                  value={iframeUrl}x
                  onChange={(e) => setIframeUrl(e.target.value)}
                  className="w-full bg-slate-700 rounded p-1 px-2 text-[8px] z-[9] block relative mt-1"
                />
              </div>
              <iframe
                src={iframeUrl}
                className="bg-white w-[25vw] h-full"
              ></iframe>
            </div>
          )}
        </section>
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
