'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
 
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { adminsignup, adminsignupfailure, adminsignupsuccess } from '../Redux/Authenticaton/Admin/Signup/Action'


const initialData={
    "name":"",
    "email":"",
    "password":""
}
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
const [signupdata,setSignupdata]=useState(initialData)
const handleChange=(e)=>{
    const {name,value}=e.target
    setSignupdata((pre)=>({...pre,[name]:value}))
}
const dispatch=useDispatch()
const storedsignupdata=useSelector((state)=>state.adminsignupreducer)
const {amdinsignupisLoading,adminsignupisError}=storedsignupdata
const navigate=useNavigate()
const toast=useToast()
const handleSubmit=(e)=>{
    e.preventDefault()
    // console.log('singupdata',signupdata)
dispatch(adminsignup(signupdata)).then((res)=>{
    dispatch(adminsignupsuccess())
    toast({description:res.data.msg,'position':"top",status:"success",duration:3000})
    navigate("/login")
}).catch((error)=>{
    dispatch(adminsignupfailure())
    toast({description:error.response.data.msg,position:'top',status:"error",duration:3000})
})
}
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="name" isRequired>
                  <FormLabel> Name</FormLabel>
                  <Input  name="name" onChange={handleChange} value={signupdata.name} type="text" />
                </FormControl>
              </Box>
             
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleChange} value={signupdata.email} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input name="password" value={signupdata.password} onChange={handleChange} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
              
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
              type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link to="/" color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box></form>
      </Stack>
    </Flex>
  )
}