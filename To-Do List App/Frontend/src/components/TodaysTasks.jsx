import React, {useCallback, useEffect} from 'react'
import axios from 'axios'


const TodaysTasks = ({profile, reloadTasks, setReloadTasks}) => {

  const [todaysTodos, setTodaysTodos] = React.useState([]);

  const fetchTodaysTodos = useCallback(async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/todo/todays`,
      { userid: profile._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("todo-token")}`,
        },
      }
    );

    if (response.status === 200) {
      setTodaysTodos(response.data);
    }
  }, [profile]);

  useEffect(() => {
    if (profile) fetchTodaysTodos();
  }, [profile, reloadTasks]);

  const handleCompleteTask = async todoid => { 
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todo/complete`, {todoid}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('todo-token')}`
      }
    })
    if (response.status === 200) {
      setTodaysTodos(response.data);
      setReloadTasks(true);
    }
  }


  return (
    <div>
        <h2 class="text-xl mt-4 inline-block mr-5">Today's Tasks</h2>
        {todaysTodos.length > 0 ? (
          <div>
          {todaysTodos && todaysTodos.map(todo => (
             <div class="mt-4">
             <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
               <div className='flex items-center justify-between'><div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
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
                </div></div>
               <p class="text-lg font-semibold">
                {todo.title}
               </p>
               <p onClick={() => handleCompleteTask(todo._id)} className='mt-2 cursor-pointer text-sm text-blue-500'>Mark as Completed</p>
             </div>
   
             </div>
          ))}
        </div>
        ) : (
          <div><h1>No To-Do for Today!</h1></div>
        )}
    </div>
  )
}

export default TodaysTasks