import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useEditableState
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';

const inititaldata={
    name:"",
    email:"",
}
export default function EditAdminModel({id,name,email,image}) {
    const [editImage,setEditImage]=useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editdata,setEditdata]=useState(inititaldata)
useEffect(()=>{
    setEditdata((pre)=>({...pre,name:name}))
    
},[])

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
const handleChange=(e)=>{
    const {name,value}=e.target
    setEditdata((pre)=>({...pre,[name]:value}))
}
const handlesubmit=()=>{

}
const handleImage=(e)=>{
console.log(e.target)
}
  return (
    <>
      <Button onClick={onOpen}>
        <EditIcon />
        Edit
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel> name</FormLabel>
              <Input onChange={handleChange} value={editdata.name} placeholder="name" name="name" />
            </FormControl>
            <FormControl>
              <FormLabel> Image</FormLabel>
              <Input  type="file" onChange={handleImage} placeholder="Image" name="image" />
            </FormControl>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}