import { Box, Input } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Home from '../Home'
import Adminpagination from './AdminPagi'

export default function AdminFilter({currentPage}) {
   
    const [searchparams,setSearchParams]=useSearchParams()
     const [email, setEmail] = useState(searchparams.get("email")||"");
useEffect(()=>{
const obj={}
email&&(obj.email=email)
currentPage&&(obj.page=currentPage)
setSearchParams(obj)
},[email,currentPage])
  return (
    <Box m={6}>
      <Input value={email}  placeholder='Search By Email..' onChange={(e)=>setEmail(e.target.value)}/>
      {/* <Home/> */}
      {/* <Adminpagination  /> */}
    </Box>
  )
}
