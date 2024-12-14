import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserDataContext } from '../../contexts/userContext';

const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('todo-token');
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
    },[token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 201) {
            setUser(response.data.user);
            navigate('/home')
        }
    }).catch((err) => {
        console.log(err);
        localStorage.removeItem('todo-token');
        navigate('/login');
    })

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper