import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "../pages/pages.exports.js";
import UserProtectedWrapper from "../components/UserProtectedWrapper.jsx";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/project/:projectId" element={<Project />} /> */}
        {/* <Route path='/create-expense' element={<CreateExpense />} /> */}
        {/* <Route path='/create-income' element={<CreateIncome /> } /> */}
      </Routes>
    </>
  );
};

export default MainRoutes;
