import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserContext";

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
      .get("/api/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setUser(response.data.store);
        }
      })
      .catch((error) => {
        console.error(error.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate, setUser]);

  return <>{children}</>;
};

export default UserProtectedWrapper;
