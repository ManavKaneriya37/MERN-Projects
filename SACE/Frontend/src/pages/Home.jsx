import React from 'react'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        axios.post('/users/logout', null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            localStorage.removeItem('token')
            navigate('/login')
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <div>
        <button onClick={handleLogout} className='px-4 py-2 bg-red-500 hover:bg-red-600 ease duration-200 rounded-md m-3 text-white'>Logout</button>
    </div>
  )
}

export default Home