import React, { useCallback, useEffect } from "react";
import axios from "axios";

const AllTasks = ({ profile, reloadTasks }) => {
  const [allTodos, setAllTodos] = React.useState([]);

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

  return (
    <div>
      <h2 class="text-xl mt-4 inline-block mr-5">All Tasks</h2>
      <p class="text-sm inline-block opacity-60">
        {allTodos?.length || 0} Task
      </p>
      <div>
        {allTodos.map((todo) => (
          <div class="mt-4" key={todo._id}>
            <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
