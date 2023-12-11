import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ChakraProvider, Box, Input, Button, Center, Heading, VStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { usersignin, usersigninsuccess, usersinginfailure } from '../../../Redux/Authenticaton/Employee/Attendence/SignIn/Action';
import { getattend } from '../../../Redux/Authenticaton/Employee/Attendence/Get/Action';
import { usersignout, usersignoutfailure, usersignoutsuccess } from '../../../Redux/Authenticaton/Employee/Attendence/SignOut/Action';

const MotionBox = motion(Box);
const initialdata = {
  id: "",
};
function Attendence() {
  const [employeeId, setEmployeeId] = useState('');
  const [location, setLocation] = useState('');
  const [refresh,setRefresh]=useState(false)
  const [attendencedata,setAttendencedata]=useState(initialdata)
const dispatch=useDispatch()
const userstoreddata=useSelector((state)=>state.usersigninreducer)

const storedattenddata=useSelector((state)=>state.getattendreducer)
const {data}=storedattenddata
console.log(data,"data")
axios.defaults.withCredentials=true
useEffect(()=>{
dispatch(getattend)
setAttendencedata((pre)=>({...pre,id:data.id}))
},[refresh])
const toast=useToast()

axios.defaults.withCredentials=true
  const handleSignIn = async () => {
    try {
      // Use the geolocation API to get the user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const fetchedLocation = `(${latitude}, ${longitude})`;

          // Update the state with the fetched location
          setLocation(fetchedLocation);
// console.log(fetchedLocation,"fetchedlocation")
          // Send the sign-in request to the server
          const obj={
            signIn:fetchedLocation,

          }
dispatch(usersignin(obj)).then((res)=>{
  dispatch(usersigninsuccess())
  toast({
    description:res.data.msg,position:"top",status:"success",duration:3000
  })
  setRefresh(!refresh)
}).catch((err)=>{
  dispatch(usersinginfailure())
})
         
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  axios.defaults.withCredentials=true
  const handleSignOut = async () => {
    try {
      // Use the geolocation API to get the user's location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const fetchedLocation = `(${latitude}, ${longitude})`;

          // Update the state with the fetched location
          setLocation(fetchedLocation);
// console.log("fetchedlocationsinout",fetchedLocation)
          // Send the sign-out request to the server
          
     
           dispatch(usersignout(attendencedata.id, { signOut: fetchedLocation })
          ).then((res)=>{
            dispatch(usersignoutsuccess())
            toast({
              "description":res.data.msg,
              "status":"success",
              "position":"top",
              duration:3000
            })
            setRefresh(!refresh)
          }).catch((err)=>{
            dispatch(usersignoutfailure())
            toast({
              description:err.response.data.msg,
              position:"top",
              status:"error",
              duration:3000
            })
          });
         
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <ChakraProvider>
      <Center height="100vh">
        <VStack spacing={4}>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading>Employee Attendance System</Heading>
          </MotionBox>
          <VStack spacing={4}>
            <Input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
            <Button colorScheme="teal" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button colorScheme="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </VStack>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Attendence;
