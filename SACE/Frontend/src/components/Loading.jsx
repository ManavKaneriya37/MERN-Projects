import React from 'react'
import { MoonLoader } from 'react-spinners'

const Loading = ({loading}) => {
  return (
    <div className='h-full flex items-center justify-center'>
        <MoonLoader size={50} color='#36d7b7' loading={loading} speedMultiplier={0.6} />
    </div>
  )
}

export default Loading