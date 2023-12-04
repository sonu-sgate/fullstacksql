import Cookies from 'js-cookie'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function EmpPrivateRoute({children}) {
 const token=Cookies.get("token")
 const location=useLocation()
 if(!token){
    return <Navigate to="/employlogin" state={location.pathname} replace/>
 }
 return children
}
