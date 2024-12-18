import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AllTasks = ({ profile, reloadTasks, setReloadTasks }) => {
  const [allTodos, setAllTodos] = useState([]);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const filterPanelRef = useRef(null);

  const alltodos = useCallback(async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/all`,
      { userid: profile._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status === 200) {
      setAllTodos(response.data);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) alltodos();
  }, [alltodos, reloadTasks]);

  const handleCompleteTask = async (todoid) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/complete`,
      { todoid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );
    if (response.status === 200) {
      setAllTodos(response.data);
      setReloadTasks(true);
    }
  };

  useGSAP(() => {
    if (filterPanelOpen) {
      gsap.to(filterPanelRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    } else {
      gsap.to(filterPanelRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    }
  }, [filterPanelOpen]);

  const todaysDate = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`;

  const [categories, setCategories] = useState(["Default"]);

  useEffect(() => {
    const uniquecategories = ["Default"];
    allTodos.forEach((todo) => {
      if (!uniquecategories.includes(todo.category)) {
        uniquecategories.push(todo.category);
      }
    });
    setCategories(uniquecategories);
  },[allTodos]);

  const handleFilterSelection = async (category) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/filter`,
      { category },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status === 200) {
      setAllTodos(response.data);
    }
  };

  return (
    <div>
      <div className="flex mt-4 items-center justify-between">
        <div className="flex items-center">
          <h2 class="text-xl inline-block mr-5">All Tasks</h2>
          <p class="text-sm inline-block opacity-60">
            {allTodos?.length || 0} Task
          </p>
        </div>
        <div className="relative">
          <i
            onClick={() => setFilterPanelOpen((prev) => !prev)}
            class="text-xl ri-filter-fill cursor-pointer"
          ></i>
          <section
            ref={filterPanelRef}
            className="absolute -left-32  min-h-10 opacity-0 w-36 px-3 py-2 bg-zinc-700 rounded-md flex flex-col gap-4 items-start justify-center"
          >
            <h4 className="text-lg font-semibold">Filter By: </h4>
            {categories?.map((category) => (
              <p
                onClick={() => handleFilterSelection(category)}
                className="text-sm cursor-pointer"
              >
                {category}
              </p>
            ))}
          </section>
        </div>
      </div>
      {allTodos.length > 0 ? (
        <div>
          {allTodos &&
            allTodos.map((todo) => (
              <div class="mt-4" key={todo._id}>
                <a
                
                  href={`/home/todo/${todo._id}`}
                  class="bg-zinc-800 px-4 block rounded-lg p-4 mt-2 w-[45vw]"
                >
                  <header class="flex justify-between gap-4 items-center">
                    <div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
                      {todo.category}
                    </div>
                    <div
                      class={`${
                        todo.priority == "Medium"
                          ? "bg-orange-500"
                          : todo.priority == "High"
                          ? "bg-red-500"
                          : todo.priority == "Low"
                          ? "bg-green-500"
                          : "bg-zinc-700"
                      } w-28 rounded-full px-4 py-[6px] text-center text-xs text-white mb-2`}
                    >
                      {todo.priority}
                    </div>
                  </header>
                  <p class="text-lg font-semibold">{todo.title}</p>
                  <p class="text-sm">{todo.date.split("T")[0]}</p>
                  <p
                    onClick={() => handleCompleteTask(todo._id)}
                    className={`mt-2 text-sm cursor-pointer ${
                      todo.date.split("T")[0] == todaysDate
                        ? "text-blue-500"
                        : "text-red-400"
                    }`}
                  >
                    {todo.date.split("T")[0] == todaysDate
                      ? "Mark as Completed"
                      : "Delete"}
                  </p>
                </a>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <h1>No To-Do Available!</h1>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
