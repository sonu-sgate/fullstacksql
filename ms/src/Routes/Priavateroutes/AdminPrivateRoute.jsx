import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function AdminPrivateRoute({children}) {
    axios.defaults.withCredentials=true
    const token=Cookies.get("token")
    // console.log(token,'adminstokne')
    const location=useLocation()
 if(!token){
    return <Navigate to="/adminlogin" state={location.pathname} replace/>
 }
 return children
}
