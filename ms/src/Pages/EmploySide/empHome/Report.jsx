import React, { useEffect, useState } from 'react';
import { Flex, Box, Heading, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { AiOutlineBug } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { report, reportfailure, reportsuccess } from '../../../Redux/Authenticaton/Employee/Report/Action';
import axios from 'axios';
import { empprofile } from '../../../Redux/Authenticaton/Employee/empProfile/Action';
const initialData={
    name:"",
    email:"",
   message:""
}
const ReportForm = () => {
    const [reportdata,setReportdata]=useState(initialData)
  const toast = useToast();

  const handleChange=(e)=>{
    const {name,value}=e.target
    setReportdata((pre)=>({...pre,[name]:value}))
  }
  const dispatch=useDispatch()
  const profiledata=useSelector((state)=>state.empprofilereducer)
  const {profile}=profiledata
  // console.log(profile,"reportprofile")
  const reportstoreddata=useSelector((state)=>state.reportreducer)
  const {reportisLoading,reportisError}=reportdata
  
  axios.defaults.withCredentials=true
  
  useEffect(()=>{
    dispatch(empprofile)
    profile&&setReportdata((pre)=>({...pre,name:profile.name,email:profile.email}))
  },[])
  
  const handleSubmit = (e) => {
    e.preventDefault();
const {name,email,message}=reportdata

if(name,email,message){
    // toast({description:resizeBy.dat})
    dispatch(report(reportdata)).then((res)=>{
        // console.log(res)
        dispatch(reportsuccess())
   
        toast({description:"Reported Successfully,we will try our best",position:'top',duration:3000,status:"success"})
   
   setReportdata(initialData)
   
      }).catch((err)=>{
        dispatch(reportfailure())
        toast({describe:'Something going wrong',position:"top",status:"error",duration:3000 })
    
    })
}else{
  
    toast({description:"Please provide required details",status:"error","duration":3000,"position":"top"})
}
   
  };

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={4} textAlign="center">
          <AiOutlineBug /> Report an Issue
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <Input type="text"  name="name" onChange={handleChange} value={reportdata.name} placeholder="Your Name" />
          </Box>
          <Box mb={4}>
            <Input type="email" name="email" onChange={handleChange} value={reportdata.email} placeholder="Your Email" />
          </Box>
          <Box mb={4}>
            <Textarea placeholder="Describe the issue..."  name="message" onChange={handleChange} value={reportdata.message}resize="vertical" />
          </Box>
          <Button type="submit" bg="teal" width="full">
            Submit Report
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ReportForm;
