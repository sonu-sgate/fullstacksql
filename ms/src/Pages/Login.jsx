'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { adminlogin, adminloginfailure, adminloginsuccess } from '../Redux/Authenticaton/Admin/Login/Action';
import axios from 'axios';
import { emplogin, emploginfailure, emploginsuccess } from '../Redux/Authenticaton/Employee/Login/Action';

const initialData = {
  email: '',
  password: '',
};

export default function Login() {
  const [loginData, setLoginData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // processing submit request
  const dispatch=useDispatch()
  const storedlogindata=useSelector((state)=>state.adminloginreducer)
  const {amdinlogisLoading,adminlogisError}=storedlogindata
  const toast=useToast()
  const location=useLocation()
const navigate=useNavigate()
  axios.defaults.withCredentials=true
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginData, 'loginData');
    // console.log(location.pathname,"pathname")
    // console.log(loginData)
    let newdata={...loginData,location:location.pathname}
    if(location.pathname=="/adminlogin"){
      dispatch(adminlogin(newdata)).then((res)=>{
        // console.log(res)
          dispatch(adminloginsuccess())
          toast({"title":"success",status:"success",position:"top",duration:3000,description:res.data.msg})
  // console.log(res.data.role)
    
    navigate("/dashboard")
  

 
 
          // navigate("/dashboard")
      }).catch((err)=>{
          dispatch(adminloginfailure())
          toast({"title":"error",status:"error","position":'top',duration:3000,description:err.response.data.msg})
      })
    }
    if(location.pathname=="/employlogin"){
      dispatch(emplogin(newdata)).then((res)=>{
        // console.log(res)
        // console.log(res)
          dispatch(emploginsuccess(res.data))
          toast({"title":"success",status:"success",position:"top",duration:3000,description:res.data.msg})

    navigate("/employee")
  
 
          // navigate("/dashboard")
      }).catch((err)=>{
          dispatch(emploginfailure())
          toast({"title":"error",status:"error","position":'top',duration:3000,description:err.response.data.msg})
      })
    }
  
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input name="email" onChange={handleChange} value={loginData.email} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    onChange={handleChange}
                    value={loginData.password}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
              {/* <Link to="/adminsignup">Not a Registered User? <Button>Click Here!</Button></Link> */}
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
