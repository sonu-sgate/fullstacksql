import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import { empprofile } from '../../../Redux/Authenticaton/Employee/empProfile/Action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

const MotionBox = motion(Box);

const socket = io('http://localhost:3000'); // Replace with your server URL

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recieverId, setRecieverId] = useState(0);
  const dispatch = useDispatch();
  const profiledata = useSelector((state) => state.empprofilereducer);
  const toast = useToast();
  const { profile } = profiledata;
  // most imp. line to work with cookie...............
axios.defaults.withCredentials=true
  useEffect(() => {
    // Listen for incoming messages from the server
    dispatch(empprofile);
    socket.on('message', (message) => {
      if (message.recieverId === profile.empid) {
        toast({
          description: message.text,
          status: 'success',
          position: 'top',
          duration: 3000,
        });
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Clean up socket connection on component unmount
    return () => socket.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && recieverId !== 0) {
      const message = {
        text: newMessage,
        sender: 'user',
        userId: profile.id,
        name: profile.name,
        email: profile.email,
        recieverId,
      };

      // Send the message to the server
      socket.emit('message', message);

      // Update the local state
      setMessages([...messages, message]);

      // Clear the input field
      setNewMessage('');
    } else {
      toast({
        description: 'Please provide the required information',
        status: 'error',
        position: 'top',
        duration: 3000,
      });
    }
  };

  return (
    <ChakraProvider>
      <VStack
        height="100vh"
        justifyContent="flex-end"
        padding={4}
        backgroundImage="linear-gradient(to right, #65dfc9, #6cdbeb)"
      >
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={4} width="400px" borderRadius="md" backgroundColor="white" padding={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Chat App
            </Text>
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <HStack
                  key={index}
                  justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                >
                  {message.sender === 'bot' && <Avatar size="sm" icon={<FaUser />} />}
                  <Box
                    borderRadius="md"
                    backgroundColor={message.sender === 'user' ? 'teal.500' : 'gray.200'}
                    padding={3}
                    color={message.sender === 'user' ? 'white' : 'black'}
                  >
                    {message.text}
                  </Box>
                  {message.sender === 'user' && <Avatar size="sm" icon={<FaUser />} />}
                </HStack>
              ))}
            </VStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FaUser />} />
              <Input
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
  );
};

export default ChatApp;
