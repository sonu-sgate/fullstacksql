import React, { useState } from 'react';
import { Flex, Box, Heading, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { AiOutlineBug } from 'react-icons/ai';
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
const {name,email,message}=reportdata
if(name,email,message){
    // toast({description:resizeBy.dat})
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
