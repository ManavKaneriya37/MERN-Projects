import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="HomeContainer p-7 h-screen w-full ">
      <div className="h-full w-full flex gap-7 items-center justify-between">
      <Navbar />
      <Outlet />
    </div>
    </div>
  );
};

export default MainLayout;
