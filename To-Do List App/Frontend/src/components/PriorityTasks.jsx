import React, { useCallback, useEffect } from "react";
import axios from "axios";

const PriorityTasks = ({ profile, reloadTasks, setReloadTasks }) => {
  const [priorityTodos, setPriorityTodos] = React.useState([]);

  const fetchPriorityTodos = useCallback(async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/priority`,
      { userid: profile._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status === 200) {
      setPriorityTodos(response.data);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) fetchPriorityTodos();
  }, [profile, reloadTasks]);

  const handleCompleteTask = async todoid => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/complete`, {todoid}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('todo-token')}`
      }
    })
    if (response.status === 200) {
      setPriorityTodos(response.data);
      setReloadTasks(true);
    }
  }

  const todaysDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;


  return (
    <div className="my-10 w-full overflow-hidden">
      <h2 class="text-xl mt-4">Priority Tasks</h2>
      {priorityTodos.length > 0 ? (
        <div className="prioritysection w-full flex items-start overflow-x-auto gap-4">
        {priorityTodos &&
          priorityTodos.map((todo) => (
            <div class="mt-4" key={todo._id}>
              <div class="bg-zinc-800 rounded-lg h-fit p-4 mt-2 w-[15vw]">
                <header class="flex justify-between gap-4 items-center">
                  <div class="bg-blue-500 w-fit rounded-full px-3 py-1 text-xs text-white mb-2">
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
                    } w-28 rounded-full px-3 py-[4px] text-center text-xs text-white mb-2`}
                  >
                    {todo.priority}
                  </div>
                </header>
                <p class="text-base font-semibold mb-1">{todo.title}</p>
                <p class="text-xs">{todo.date.split("T")[0]}</p>
                <p onClick={() => handleCompleteTask(todo._id)} className={`mt-2 cursor-pointer text-sm ${todo.date.split("T")[0] == todaysDate ? 'text-blue-500' : 'text-red-400'}`}>{todo.date.split("T")[0] == todaysDate ? 'Mark as Completed' : 'Delete'}</p>
              </div>
            </div>
          ))}
      </div>
      ) : (
        <div>
          <h1>No Priority To-Do here!</h1>
        </div>
      )}
    </div>
  );
};

export default PriorityTasks;
