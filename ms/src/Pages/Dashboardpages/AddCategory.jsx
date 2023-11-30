// AddCategory.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Category from './Category';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addcat, addcatfailure, addcatsuccess } from '../../Redux/Admin/AddCategory/Action';

const MotionBox = motion(Box);

const AddCategory = ({refonadd}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
  };

  const toast=useToast()
  const dispatch=useDispatch()
  const storedaddcatdata=useSelector((state)=>state.addcatreducer)
  const {addcatisLoading,addcatisError}=storedaddcatdata
  const handleAddCategory = () => {
  if(categoryName){
dispatch(addcat({"name":categoryName})).then((res)=>{
    dispatch(addcatsuccess())
    toast({description:res.data.msg,status:"success",position:'top',duration:3000})
    handleCloseModal()
    refonadd()
}).catch((err)=>{
    dispatch(addcatfailure())
    toast({description:err.response.data.msg,status:"error",position:'top',duration:3000})

})
  }else{
    toast({"description":"please provide category",position:"top",duration:3000,status:"error"})
  }
  };

  return (
    <>
      <Button onClick={handleOpenModal}>Add Category<PlusSquareIcon/></Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
            
              placeholder="Category Name"
              value={categoryName.name}
              name="name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddCategory}>
              Add
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategory;
