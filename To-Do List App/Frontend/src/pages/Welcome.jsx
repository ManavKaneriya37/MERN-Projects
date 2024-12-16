import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {

  return (
    <div className="w-full min-h-screen overflow-hidden bg-black text-white">   
      {/* Parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 pointer-events-none"></div>

      <div className="container flex items-center justify-center h-screen mx-auto px-4 py-16">
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-3 text-center text-shadow-md animate-pulse">
            To-Do List App
          </h1>
          
          <p className="text-lg text-gray-300 mb-7 max-w-3xl mx-auto px-4 text-center">
            Get started with your daily tasks!
          </p>

         <div className='w-full flex justify-center'>
         <Link to='/login'>
            <button className='w-44 py-3 bg-red-500 hover:bg-red-600 ease-in-out duration-500 rounded-xl'>Get Started</button>
         </Link>
         </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;