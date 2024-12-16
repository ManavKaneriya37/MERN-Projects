import React from 'react'

const AllTasks = () => {
  return (
    <div>
        <h2 class="text-xl mt-4 inline-block mr-5">All Tasks</h2>
        <p class="text-sm inline-block opacity-60">5/10 Task</p>
        <div>
          <div class="mt-4">
          <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
            <div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
              PERSONAL
            </div>
            <p class="text-lg font-semibold">
              Creating a new Indian Bank saving account
            </p>
            <p class="text-sm">Tue, 18 October 2023</p>
          </div>

          <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
            <div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
              PERSONAL
            </div>
            <p class="text-lg font-semibold">
              Creating a new Indian Bank saving account
            </p>
            <p class="text-sm">Tue, 18 October 2023</p>
          </div>

          </div>
        </div>
    </div>
  )
}

export default AllTasks