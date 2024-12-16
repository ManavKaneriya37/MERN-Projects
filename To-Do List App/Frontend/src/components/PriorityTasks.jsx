import React from 'react'

const PriorityTasks = () => {
  return (
    <div className='my-10'>
        <h2 class="text-xl mt-4">Priority Tasks</h2>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="bg-zinc-800 rounded-lg p-4">
          <div class="bg-blue-500 rounded-full px-4 py-2 text-xs w-fit text-white mb-2">
            PERSONAL
          </div>
          <p class="text-lg font-semibold">
            Creating a new Indian Bank saving account
          </p>
          <p class="text-sm">Tue, 18 October 2023</p>
        </div>
        <div class="bg-zinc-800 rounded-lg p-4">
          <div class="bg-violet-600 rounded-full px-4 py-2 text-xs w-fit text-white mb-2">
            Sport
          </div>
          <p class="text-lg font-semibold">
            Football semi-final in Chennai FC Tournaments
          </p>
          <p class="text-sm">Tue, 18 October 2023</p>
        </div>
        <div class="bg-zinc-800 rounded-lg p-4">
          <div class="bg-green-500 rounded-full px-4 py-2 text-xs w-fit text-white mb-2">
            UI Design
          </div>
          <p class="text-lg font-semibold">
            Creating a basic level of UI for website
          </p>
          <p class="text-sm">Tue, 18 October 2023</p>
        </div>
      </div>
    </div>
  )
}

export default PriorityTasks