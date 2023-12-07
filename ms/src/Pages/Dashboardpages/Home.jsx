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
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getadmindata } from '../../Redux/Admin/GetAdmins/Action';
import AdminFilter from './adminpagination/AdminFilter';
import Adminpagination from './adminpagination/AdminPagi';

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
   const [searchparams, setSearchParams] = useSearchParams();
  const [currentPage,setCurrentPage]=useState(searchparams.get("page")||1)
  
  const location=useLocation()
  const navigate=useNavigate()
  const storedcountdata=useSelector((state)=>state.getcountreducer)
  const {admincount,empcount,total,admins}=storedcountdata
  // console.log(admincount,"admincount")
 
  const {getadmindataisLoading,getadmindataisError,admindata,totalpages}=useSelector((state)=>state.getadmindatareducer)
  console.log(admindata,'admindata')
  const onPageChange=(page)=>{
    setCurrentPage(page)
    setSearchParams(currentPage)
    // Object.fromEntries(searchparams.entries())=
  //  setSearchParams({...Object.fromEntries(searchparams.entries()),page:currentPage})
  }
  useEffect(()=>{
dispatch(getcount)
const params={
  
}
searchparams.get("email")&&(params.email=searchparams.get("email"))
searchparams.get('page')&&(params.page=searchparams.get('page'))
dispatch(getadmindata(params))
  },[location.search])
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
      <Link to="/adminsignup">
        <Button>
          ADD ADMIN
          <AddIcon />
        </Button>
      </Link>

      <Box
        display="grid"
        gridTemplateColumns="repeat(3,1fr)"
        align="center"
        gap={10}
        p={8}
      >
        {/* Admin Count Card */}
        <Box mb={4} borderRadius="lg" bg="blue.500" color="white" p={4}>
          <Heading fontSize="lg">Admin Count</Heading>
          <Text fontSize="2xl">{admincount ? admincount : 0}</Text>
        </Box>
        <Box mb={4} borderRadius="lg" bg="teal.500" color="white" p={4}>
          <Heading fontSize="lg">Employee Count</Heading>
          <Text fontSize="2xl">{empcount ? empcount : 0}</Text>
        </Box>
        <Box mb={4} borderRadius="lg" bg="green.500" color="white" p={4}>
          <Heading fontSize="lg">Total People</Heading>
          <Text fontSize="2xl">{total ? total : 0}</Text>
        </Box>

        {/* Total People Count Card */}

        <Divider></Divider>
      </Box>
      <AdminFilter currentPage={currentPage}/>
      {admindata && admindata.length > 0 && <AdminTable data={admindata} />}
      {admindata.length > 0 && (
        <Adminpagination
          currentPage={currentPage}
           totalPages={totalpages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default Home;
