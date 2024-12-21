import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const TodoDetails = () => {
  const { todoid } = useParams();

  const [formData, setFormData] = useState({});
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchTodoData = useCallback(async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/get`,
      { todoid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status === 200) {
      setFormData(response.data);
    }
  }, [todoid]);

  useEffect(() => {
    if (todoid) fetchTodoData();
  }, [fetchTodoData]);

  console.log(formData);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [formData.description]);

  const handleInput = (event) => {
    handleInputChange(event);
    adjustHeight();
  };
  function handlePrioritySelect(priority) {
    setFormData((prevData) => ({ ...prevData, priority }));
  }

  const handleChanges = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/update`, {formData}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('todo-token')}`
        }
    })

    if(response.status === 200) {
        console.log("The data is updated successfully!");
        navigate('/home');
    }
  }

  return (
    <div>
      <div className="bg-zinc-900 text-white min-h-screen w-full">
        {formData ? (
          <div className="p-10">
            <input
              className="bg-transparent text-5xl w-full"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <div className="mt-8">
              <div className="p-4 bg-zinc-800 rounded-lg ">
                <textarea
                  className="bg-transparent w-full min-h-10"
                  ref={textareaRef}
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                />
              </div>
              <div className="bg-zinc-800 mt-7 px-5 h-14 flex items-center justify-center w-fit rounded-lg">
                <input
                  className="bg-transparent my-5"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center gap-10 my-6">
                <div
                  className={`border-[1px] cursor-pointer duration-200 ease-in-out border-red-500 w-20 h-9 flex items-center justify-center rounded ${
                    formData.priority == "High" ? "bg-red-500 text-white" : ""
                  }`}
                  onClick={() => handlePrioritySelect("High")}
                >
                  High
                </div>
                <div
                  className={`border-[1px] cursor-pointer border-orange-500 w-20 h-9 flex items-center justify-center rounded ${
                    formData.priority == "Medium"
                      ? "bg-orange-500 text-white"
                      : ""
                  }`}
                  onClick={() => handlePrioritySelect("Medium")}
                >
                  Medium
                </div>
                <div
                  className={`border-[1px] cursor-pointer border-green-500 w-20 h-9 flex items-center justify-center rounded ${
                    formData.priority == "Low" ? "bg-green-500 text-white" : ""
                  }`}
                  onClick={() => handlePrioritySelect("Low")}
                >
                  Low
                </div>
              </div>
              <div className="bg-zinc-800 mt-7 px-5 h-14 flex items-center justify-center w-fit rounded-lg">
                <input
                  className="bg-transparent my-5 outline-none"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center gap-5">
              <button onClick={handleChanges} className="px-7 py-2 bg-blue-500 rounded-md mt-7 hover:bg-blue-600 ease duration-150">Make changes</button>
              <Link to='/home' className="block px-7 py-2 border-red-500 border-[1px] rounded-md mt-7 hover:bg-red-600 ease-in duration-150">Descard Changes</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <h1 className="text-2xl">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoDetails;
