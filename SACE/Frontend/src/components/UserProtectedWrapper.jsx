import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { UserDataContext } from "../../contexts/UserContext";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post("/users/profile", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      )
      .then((res) => {
        if(res.status === 200) {
            setUser(res.data);
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        navigate("/login");
      });
  }, [token, navigate, setUser]);

  return(
    <>
        {children}
    </>
  ) 
};

export default UserProtectedWrapper;
