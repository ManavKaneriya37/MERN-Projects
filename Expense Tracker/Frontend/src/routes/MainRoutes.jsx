import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "../pages/pages.exports.js";
import UserProtectedWrapper from "../components/UserProtectedWrapper.jsx";
import Projects from "../pages/Projects.jsx";
import Transactions from "../pages/Transactions.jsx";
import MainLayout from "../components/MainLayout.jsx";
import SingleProject from "../pages/SingleProject.jsx";

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      <Route path="/" element={<MainLayout />}>
        <Route
          path="/"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route path="/projects" element={<UserProtectedWrapper><Projects /></UserProtectedWrapper>} />
        <Route path="/project/:projectId" element={<UserProtectedWrapper><SingleProject /></UserProtectedWrapper>} />

        {/* <Route path="/project/:projectId" element={<UserProtectedWrapper><SingleProject /></UserProtectedWrapper>}> */}
        <Route path="/transactions" element={<Transactions />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
