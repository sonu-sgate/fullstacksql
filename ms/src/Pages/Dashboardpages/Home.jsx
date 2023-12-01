// Import necessary libraries
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  useBreakpointValue,
  Divider,
  Button,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getcount } from '../../Redux/Admin/GetCounts/Action';
import AdminTable from './GetAdmintab';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

// Hard-coded data (replace with your actual data)
const adminCount = 0;
const employeeCount = 0;
const totalPeopleCount = 0;

// Responsive table headers

// Hard-coded table data (replace with your actual data)
const tableData = [
  { name: 'Admin 1', email: 'admin1@example.com', role: 'Admin' },
  { name: 'Admin 2', email: 'admin2@example.com', role: 'Admin' },
  // Add more rows as needed
];

const Home = () => {
  const dispatch=useDispatch()
  const storedcountdata=useSelector((state)=>state.getcountreducer)
  const {admincount,empcount,total,admins}=storedcountdata
  // console.log(admincount,"admincount")
  useEffect(()=>{
dispatch(getcount)
  },[])
  const tableHeaders = useBreakpointValue({
    base: ['Name', 'Email', 'Role'],
    sm: ['Name', 'Email', 'Role', 'Actions'],
  });
// console.log("admins",admins)
  return (
    <>

      <Heading textAlign="center" my={8}>
        Dashboard
      </Heading>
     <Link to="/adminsignup"><Button >ADD ADMIN<AddIcon/></Button></Link> 
      <Box display="grid" gridTemplateColumns="repeat(3,1fr)" align="center" gap={10} p={8}>
        {/* Admin Count Card */}
        <Box mb={4} borderRadius="lg" bg="blue.500" color="white" p={4}>
          <Heading fontSize="lg">Admin Count</Heading>
          <Text fontSize="2xl">{admincount?admincount:0}</Text>
        </Box>
        <Box mb={4} borderRadius="lg" bg="teal.500" color="white" p={4}>
          <Heading fontSize="lg">Employee Count</Heading>
          <Text fontSize="2xl">{empcount?empcount:0}</Text>
        </Box>
        <Box mb={4} borderRadius="lg" bg="green.500" color="white" p={4}>
          <Heading fontSize="lg">Total People</Heading>
          <Text fontSize="2xl">{total?total:0}</Text>
        </Box>


        {/* Total People Count Card */}
  

    <Divider></Divider>
    {admins&&admins.length>0&&<AdminTable data={admins}/>}
      </Box>
    </>
  );
};

export default Home;
