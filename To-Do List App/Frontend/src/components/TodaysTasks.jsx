import React from 'react'

const TodaysTasks = () => {
  return (
    <div>
        <h2 class="text-xl mt-4 inline-block mr-5">Todays' Tasks</h2>
        <div>
          <div class="mt-4">
          <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
            <div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
              PERSONAL
            </div>
            <p class="text-lg font-semibold">
              Creating a new Indian Bank saving account
            </p>
            <p className='mt-2 text-sm text-blue-500'>Mark as completed</p>
          </div>

          <div class="bg-zinc-800 rounded-lg p-4 mt-2 w-[45vw]">
            <div class="bg-blue-500 w-fit rounded-full px-4 py-2 text-xs text-white mb-2">
              PERSONAL
            </div>
            <p class="text-lg font-semibold">
              Creating a new Indian Bank saving account
            </p>
            <p className='mt-2 text-sm text-blue-500'>Mark as completed</p>
          </div>

          </div>
        </div>
    </div>
  )
}

export default TodaysTasks