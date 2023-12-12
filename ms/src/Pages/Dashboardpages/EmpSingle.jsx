'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Center,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { MdLocalShipping } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getsingleemp } from '../../Redux/Admin/Employee/GetSingle/Action'
import { useParams } from 'react-router-dom'
import { api } from '../../Redux/Api/api'
import { adminsideattendata } from '../../Redux/Admin/GetAttendence/Action'
import MapContainer from './MapContainer'

export default function EmpSingle() {
    const dispatch=useDispatch()
    const {id}=useParams()
    const storedsingle=useSelector((state)=>state.getsingleempreducer)
    
    const {getsingleempisLoading,result,getsingleempisError}=storedsingle
    const storedattendcedata = useSelector(
      (state) => state.adminsideattenddatareducer
    );
    const { attenddata } = storedattendcedata;
    // console.log(attenddata, "attendence data");
    useEffect(()=>{
        dispatch(getsingleemp(id))
        dispatch(adminsideattendata(id))
    },[])
    const locations = [
      [18.5204303, 73.8567437], // Pune, India
      [37.7749, -122.4194], // San Francisco, USA
      [-33.8688, 151.2093], // Sydney, Australia
    ];

    // console.log(getsingleempisLoading,"islong")
    // console.log("result",result)
    if(getsingleempisLoading){
        return <Center><Heading>Loading...</Heading></Center>
    }else if(getsingleempisError){
        return <Center><Heading>Something going wrong...</Heading></Center>
    }
   
  return (
    <>
      {result && result.length > 0 && (
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={`${api}/Images/` + result[0].image}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {result[0].name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  {result[0].email}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {result[0].address}
                  </Text>
                  {/* <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet
                at delectus doloribus dolorum expedita hic, ipsum maxime modi nam officiis
                porro, quae, quisquam quos reprehenderit velit? Natus, totam.
              </Text> */}
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    About
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem>Salary</ListItem>
                      <ListItem>Category</ListItem>{" "}
                      <ListItem>EmployeeId</ListItem>
                    </List>
                    <List spacing={2}>
                      <ListItem>{result[0].salary}</ListItem>
                      <ListItem>{result[0].category}</ListItem>
                      <ListItem>{result[0].id}</ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                Edit
              </Button>

              {/* <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
            </Stack>
          </SimpleGrid>
          <Center>
            <Heading>Working Details</Heading>
          </Center>
          <Table>
            <Table>
              <Thead>
                <Tr>
                  <Td>Date</Td>
                  <Td>SignIN(location)</Td>
                  <Td>SignOut(location)</Td>
                  <Td>SignIn(at)</Td>
                  <Td>SignOut(at)</Td>
                  <Td>Totalwork</Td>
                </Tr>
              </Thead>
              <Tbody>
                {attenddata.length >= 1 &&
                  attenddata.map((emp) => (
                    <Tr>
                      <Td>{emp.date}</Td>
                      <Td>{emp.signIn}</Td>
                      <Td>{emp.signOut}</Td>
                      <Td>{emp.signInat}</Td>
                      <Td>{emp.signOutat}</Td>
                      <Td>{emp.totalworktime}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Table>
          <Center>
            <Heading>Maped Locations</Heading>
          </Center>
          {attenddata.length>0&&
           <MapContainer
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCwNw-ckLyiqE_rn-IO3VY-3cTBYxPJfug&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        locations={attenddata}
      />
      }
        </Container>
      )}
    </>
  );
}