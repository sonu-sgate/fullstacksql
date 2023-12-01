import { Box, Divider, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Addemployee from './AddEmplyes'
import { useDispatch, useSelector } from 'react-redux'
import { getemp } from '../../Redux/Admin/Employee/GetEmployee/Action'
import EmpTable from './Getemptable'

export default function Employee() {
  const dispatch=useDispatch()
  const storedempdata=useSelector((state)=>state.getempreducer)
  const {getempisLoading,getempisError,result}=storedempdata
  const [refresh,setRefresh]=useState(false)
  const handleempreq=()=>{
    setRefresh(!refresh)
  }
// console.log(result)
  useEffect(()=>{
dispatch(getemp)
  },[refresh])
  return (
    <Box
     position={"sticky" } top={10}
    
    >
  <Heading textAlign={"center"} >Manage Employee</Heading>

  <Addemployee handleempreq={handleempreq}/>
<Divider></Divider>
{result&&<EmpTable data={result} />}
    </Box>
  )
}
 