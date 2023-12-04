import React, { useEffect } from 'react';
import { Flex, Box, Image, Text, HStack, Center, Heading } from '@chakra-ui/react';
import { FaSuitcase, FaMapPin, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../Redux/Api/api';
import { MdLocationCity } from 'react-icons/md';
import { empprofile } from '../../../Redux/Authenticaton/Employee/empProfile/Action';
import axios from 'axios';
import Cookies from 'js-cookie';
const ProfileCard = () => {
    const profiledata=useSelector((state)=>state.empprofilereducer)
    // console.log(profile,"userprofile")
    // const token=  Cookies.get('token');
    // console.log(token,"token")
    const dispatch=useDispatch()
    const {profile,profileisLoading,prfileisError}=profiledata
    axios.defaults.withCredentials=true
    useEffect(()=>{
dispatch(empprofile)
    },[])
    // console.log(profile,"profile")
if(profile){


  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        shadow="lg"
        rounded="lg"
        bg="#edf3f8"
        _dark={{
          bg: "gray.800",
        }}
        mb={8}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg="#edf3f8"
          _dark={{
            bg: "#3e3e3e",
          }}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          height="100%"
          width="100%"
          borderRadius="lg"
          p={8}
          display="flex"
          alignItems="left"
        >
          <Image
            src={`${api}/Images/`+profile.image}
            alt="Profile Picture"
            borderRadius="full"
            boxSize="150px"
            shadow="lg"
            border="5px solid"
            mb={-20}
            borderColor="gray.800"
            _dark={{
              borderColor: "gray.200",
            }}
          />
        </Box>
        <Box
          gridColumn="span 8"
          p={8}
          width="full"
          height="full"
          borderRadius="lg"
          textAlign="left"
          mt={10}
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "white",
            }}
          >
        {profile.name}
          </Text>
          <HStack
            spacing={3}
            color="gray.800"
            _dark={{
              color: "gray.200",
            }}
          >
            <FaSuitcase size={24} />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              _dark={{
                color: "gray.200",
              }}
            >
           {profile. categoryname}
            </Text>
          </HStack>
          {/* <HStack
            spacing={3}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <FaMapPin size={20} />
            <Text fontSize="lg">Germany</Text>
          </HStack> */}
          <HStack
            spacing={3}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <FaEnvelope size={20} />
            <Text fontSize="lg">{profile.email}</Text>
   
            {/* <Text fontSize="lg">{profile.email}</Text> */}
          </HStack>
          <HStack
            spacing={3}
            color="gray.700"
            _dark={{
              color: "gray.200",
            }}
          >
            <MdLocationCity size={20} />
            <Text fontSize="lg">{profile.address}</Text>
   
            {/* <Text fontSize="lg">{profile.email}</Text> */}
          </HStack>
        </Box>
      </Flex>
    </Flex>
  );}else{
    return <Center><Heading>No data found...!!</Heading></Center>
  }
};

export default ProfileCard;
