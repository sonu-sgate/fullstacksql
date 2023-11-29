import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Login from '../Pages/Login'
export default function AllRoutes() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </>
  )
}
