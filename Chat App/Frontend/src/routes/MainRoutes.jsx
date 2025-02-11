import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../screens/Home'
import Room from '../screens/Room'

const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/room' element={<Room />} />
    </Routes>
    </>
  )
}

export default MainRoutes