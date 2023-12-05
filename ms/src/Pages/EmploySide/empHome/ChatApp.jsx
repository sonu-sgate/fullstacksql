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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

const MotionBox = motion(Box);

const socket = io('http://localhost:3000'); // Replace with your server URL

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (message) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up socket connection on component unmount
    return () => socket.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, sender: 'user' };

      // Send the message to the server
      socket.emit('message', message);

      // Update the local state
      setMessages([...messages, message]);

      // Clear the input field
      setNewMessage('');
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
          <VStack spacing={4} width="300px" borderRadius="md" backgroundColor="white" padding={4}>
            <Text fontSize="2xl" fontWeight="bold">
              Chat App
            </Text>
            <VStack spacing={4} align="stretch">
              {messages.map((message, index) => (
                <HStack key={index} justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                  {message.sender === 'bot' && (
                    <Avatar size="sm" name="Bot" src="https://bit.ly/broken-link" />
                  )}
                  <Box
                    borderRadius="md"
                    backgroundColor={message.sender === 'user' ? 'teal.500' : 'gray.200'}
                    padding={3}
                    color={message.sender === 'user' ? 'white' : 'black'}
                  >
                    {message.text}
                  </Box>
                  {message.sender === 'user' && (
                    <Avatar size="sm" name="User" src="https://bit.ly/broken-link" />
                  )}
                </HStack>
              ))}
            </VStack>
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
