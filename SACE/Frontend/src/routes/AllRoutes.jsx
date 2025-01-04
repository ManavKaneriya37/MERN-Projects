import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import UserProtectedWrapper from "../components/UserProtectedWrapper";
import Project from "../pages/Project";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/project/:projectId"
          element={
            <UserProtectedWrapper>
              <Project />
            </UserProtectedWrapper>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
