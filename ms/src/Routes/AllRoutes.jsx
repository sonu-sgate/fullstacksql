import React from 'react'
import { Routes,Route, useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Login from '../Pages/Login'
import SignUp from '../Pages/Signup'
import Dashboard from '../Pages/Dashboard'
import Home from '../Pages/Dashboardpages/Home'
import Employee from '../Pages/Dashboardpages/Employee'
import Category from '../Pages/Dashboardpages/Category'
import Profile from '../Pages/Dashboardpages/Profile'
export default function AllRoutes() {
    const location=useLocation()
  return (
    <>
     {location.pathname!=="/dashboard"&&location.path=="/employee"&&location.pathname=="/category"
     &&location.pathname=="/profile"&& <Navbar/>}
      <Routes>
        <Route path={"/"||"/adminlogin"} element={<Login/>}/>
        <Route path="/adminsignup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
<Route path="/dashboard/employee" element={<Dashboard/>}/>
<Route path="/dashboard/category" element={<Dashboard/>}/>
<Route path="/dashboard/profile" element={<Dashboard/>}/>
{/* <Route path="/dashboard/employee" element={<Employee/>}/>
<Route path="/dashboard/category" element={<Category/>}/>
<Route path="/dashboard/profile" element={<Profile/>}/> */}


        </Route>
      </Routes>
    </>
  )
}