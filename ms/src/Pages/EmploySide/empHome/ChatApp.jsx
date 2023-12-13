import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Avatar,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  Image,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  TableContainer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { empprofile } from "../../../Redux/Authenticaton/Employee/empProfile/Action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { ChatIcon } from "@chakra-ui/icons";
import { getempside } from "../../../Redux/Authenticaton/Employee/GetEmp/Action";
import EmpsideTable from "../EmpTable";
import EmpTable from "../EmpTable";

const MotionBox = motion(Box);

const socket = io("http://localhost:4000"); // Replace with your server URL

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recieverId, setRecieverId] = useState(0);
  const dispatch = useDispatch();
  const profiledata = useSelector((state) => state.empprofilereducer);
  const toast = useToast();
  const { profile } = profiledata;
  const empdata = useSelector((state) => state.getempsidereducer);
  const { getempisLoading, getempisError, data } = empdata;
  // most imp. line to work with cookie...............
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Listen for incoming messages from the server
    dispatch(empprofile);
    dispatch(getempside);
    socket.on("message", (message) => {
      if (message.recieverId === profile.empid) {
        toast({
          description: message.text,
          status: "success",
          position: "top",
          duration: 3000,
        });
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Clean up socket connection on component unmount
    return () => socket.disconnect();
  }, []);
  // console.log(data,"dataemp")
  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && recieverId !== 0) {
      const message = {
        text: newMessage,
        sender: "user",
        userId: profile.id,
        name: profile.name,
        email: profile.email,
        recieverId,
      };

      // Send the message to the server
      socket.emit("message", message);

      // Update the local state
      setMessages([...messages, message]);

      // Clear the input field
      setNewMessage("");
    } else {
      toast({
        description: "Please provide the required information",
        status: "error",
        position: "top",
        duration: 3000,
      });
    }
  };
  const hanldechatid=(id)=>{
    setRecieverId(id)
    // console.log("id",id)
  }
  // console.log("data", data);
  return (
    <>
      {" "}
      <Box>
        <TableContainer width={"80%"} margin={"auto"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>EmployId</Th>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <EmpTable
                  id={item.empid}
                  name={item.name}
                  cat={item.categoryname}
                  hanldechatid={hanldechatid}
                />
              ))}
          </Table>
        </TableContainer>
      </Box>
      <ChakraProvider>
        <VStack
          height={"600px"}
          // justifyContent="flex-end"
          padding={4}
          // backgroundImage="linear-gradient(to right, #65dfc9, #6cdbeb)"
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack
              spacing={4}
              width="400px"
              borderRadius="md"
              backgroundColor="white"
              padding={14}
            >
              <Image src="https://img.freepik.com/premium-vector/emoji-raises-his-hands-asks-question_255498-189.jpg" />
              <Text fontSize="2xl" fontWeight="bold">
                Ask To Your Colleague
                <ChatIcon />
              </Text>
              <VStack spacing={4} align="stretch">
                {messages.map((message, index) => (
                  <HStack
                    key={index}
                    justifyContent={
                      message.sender === "user" ? "flex-end" : "flex-start"
                    }
                  >
                    {message.sender === "bot" && (
                      <Avatar size="sm" icon={<FaUser />} />
                    )}
                    <Box
                      borderRadius="md"
                      backgroundColor={
                        message.sender === "user" ? "teal.500" : "gray.200"
                      }
                      padding={3}
                      color={message.sender === "user" ? "white" : "black"}
                    >
                      {message.text}
                    </Box>
                    {message.sender === "user" && (
                      <Avatar size="sm" icon={<FaUser />} />
                    )}
                  </HStack>
                ))}
              </VStack>

              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<FaUser />} />
                <Input
                value={recieverId}
                  placeholder="Recipient ID"
                  type="number"
                  onChange={(e) => setRecieverId(e.target.value)}
                />
              </InputGroup>
              <HStack>
                <Input
                  flex="1"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleSendMessage}>
                  Send
                </Button>
              </HStack>
            </VStack>
          </MotionBox>
        </VStack>
      </ChakraProvider>
    </>
  );
};

export default ChatApp;
