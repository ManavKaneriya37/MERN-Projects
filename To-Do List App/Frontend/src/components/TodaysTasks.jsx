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
  }, [profile, reloadTasks, todaysTodos]);

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
        <h2 className="text-xl mt-4 inline-block mr-5">Today's Tasks</h2>
        {todaysTodos.length > 0 ? (
          <div>
          {todaysTodos && todaysTodos.map(todo => (
             <div className="mt-4">
             <div className="block bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
               <div className='xl:flex items-center justify-between'><div className="xl:bg-blue-500 border-b-[1px] border-b-blue-500 xl:w-fit w-full text-center rounded-full px-4 xl:py-2 py-1 text-xs text-white mb-2">
                 {todo.category}
               </div>
               <div
                  className={`${
                    todo.priority == "Medium"
                      ? "xl:bg-orange-500 border-[1px] border-orange-500"
                      : todo.priority == "High"
                      ? "xl:bg-red-500 border-[1px] border-red-500"
                      : todo.priority == "Low"
                      ? "xl:bg-green-500 border-[1px] border-green-500"
                      : "xl:bg-zinc-700 border-[1px] border-zinc-500"
                  } w-28 rounded-full px-4 py-[6px] text-center text-xs text-white mb-2`}
                >
                  {todo.priority}
                </div></div>
               <p className="text-lg font-semibold">
                {todo.title}
               </p>
               <div className='flex w-full items-center justify-between pr-8'>
               <p onClick={() => handleCompleteTask(todo._id)} className='mt-2 cursor-pointer xl:text-sm text-xs text-blue-500'>Mark as Completed</p>
               <a href={`/home/todo/${todo._id}`} className='mt-2 cursor-pointer text-sm text-blue-600'>View</a>
               </div>
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