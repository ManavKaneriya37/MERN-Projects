import React from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = ({loading}) => {
  return (
    <div className='h-full flex items-center justify-center'>
        <ClipLoader color='#36d7b7' loading={loading} size={50} />
    </div>
  )
}

export default Loading