import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../../contexts/userContext';

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('todo-token');
    const navigate = useNavigate();
    const { setUser  } = useContext(UserDataContext);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return; // Exit early if there is no token
        }

        axios.post(`${import.meta.env.VITE_BASE_URL}/users/profile`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                setUser (response.data);
                navigate('/home');
            }
        }).catch((err) => {
            localStorage.removeItem('todo-token');
            navigate('/login');
        });
    }, [token, navigate, setUser ]); // Add dependencies to the useEffect

    return (
        <>
            {children}
        </>
    );
}

export default UserProtectedWrapper;