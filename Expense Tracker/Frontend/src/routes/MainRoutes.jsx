import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login, Register, Home } from "../pages/pages.exports.js";
import UserProtectedWrapper from "../components/UserProtectedWrapper.jsx";
import Projects from "../pages/Projects.jsx";
import Transactions from "../pages/Transactions.jsx";
import MainLayout from "../components/MainLayout.jsx";
import SingleProject from "../pages/SingleProject.jsx";
import Income from "../pages/Income.jsx";
import Expense from "../pages/Expense.jsx";

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
        <Route path="/incomes" element={<UserProtectedWrapper><Income /></UserProtectedWrapper>} />
        <Route path="/expenses" element={<Expense />} />

      </Route>
    </Routes>
  );
};

export default MainRoutes;
