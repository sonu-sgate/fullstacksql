import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  useToast,
  Stack,
  Text,
  Heading,
  InputGroup,
  InputRightElement,
  useDisclosure
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AddIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { adminsignup,adminsignupsuccess,adminsignupfailure } from "../../Redux/Authenticaton/Admin/Signup/Action";

const initialData = {
  name: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [signupdata, setSignupdata] = useState(initialData);
   const [error, setError] = useState("");
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata((pre) => ({ ...pre, [name]: value }));
  };

  const dispatch = useDispatch();
  const storedsignupdata = useSelector((state) => state.adminsignupreducer);
  const { amdinsignupisLoading, adminsignupisError } = storedsignupdata;

  const navigate = useNavigate();
  const toast = useToast();

  const isSignupDisabled =
    !signupdata.name || !signupdata.email || !signupdata.password;

  const handleSubmit = (e) => {
    e.preventDefault();

   if(error){
    toast({
        description:"Please Enter a valid email address",
        position:"top-right",
        status:"error",
        duration:3000
    })
   }else{

    dispatch(adminsignup(signupdata))
      .then((res) => {
        dispatch(adminsignupsuccess());
        toast({
          description: res.data.msg,
          position:"top-right",
          status: "success",
          duration: 3000,
        });
  onClose()
    setSignupdata(initialData)
        // navigate("/adminlogin");
      })
      .catch((error) => {
        dispatch(adminsignupfailure());
        toast({
          description: error.response.data.msg,
          position: "top-right",
          status: "error",
          duration: 3000,
        });
      });}
  };

  const validateEmail = () => {
    const {email}=signupdata
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };


  return (
    <>
      <Button onClick={onOpen}>
        Add User
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>
                Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                name="name"
                onChange={handleChange}
                value={signupdata.name}
                placeholder={"name"}
                type="text"
              />
            </FormControl>

            <FormControl id="email" mt={4} isInvalid={error} isRequired>
              <FormLabel>
                Email address
                <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="email"
                placeholder="please enter a valid email"
                onChange={handleChange}
                value={signupdata.email}
                name="email"
                onBlur={validateEmail}
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>
                Password<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  value={signupdata.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Text mt={2} color="red.500" fontSize="sm">
              <span style={{ color: "red" }}>*</span> Indicates required field
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              isLoading={amdinsignupisLoading}
              loadingText="Submitting"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isDisabled={isSignupDisabled}
            >
              Sign up
            </Button>
            <Button
              onClick={() => {
                setSignupdata(initialData);
                onClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}