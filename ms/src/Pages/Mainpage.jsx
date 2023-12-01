import { Box, Button, Center, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import loginas from "./Images/loginas.jpg"
import backimg from "./Images/back.jpg"
import { MdAdminPanelSettings } from 'react-icons/md'
import { BsPeople } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
export default function Mainpage() {
    const navigate=useNavigate()

  return (
    <>
      <Box  backgroundImage={backimg}
       height={"600px"} backgroundRepeat={"no-repeat"}
   backgroundSize={"cover"}   >
    <Box position={"absolute"}>
      <Center height={"100vh"} width={"100vw"}>  <Box  borderRadius={15} backgroundImage={loginas} backgroundSize={"cover"} width={["200px","300px","300px","300px","300px"]} height={["200px","300px","300px","300px","300px"]} backgroundRepeat={"no-repeat"}>
            <Heading paddingTop={[10,20,15,20,20]} color="white" textAlign={"center"}>LOGIN AS</Heading>
            <Box p={10} display={"flex"} justifyContent={"space-between"}>
                <Button onClick={()=>navigate('/adminlogin')} marginRight={1} bg='green.300'>ADMIN<MdAdminPanelSettings/></Button>
                <Button onClick={()=>navigate("/employlogin")}>Employ <BsPeople/></Button>
            </Box>
        </Box></Center>
    </Box>
    </Box>

    </>
  )
}
