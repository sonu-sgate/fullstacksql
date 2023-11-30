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
  Select,
  Textarea,
  useToast,
  Spacer,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { addemp } from '../../Redux/Admin/Employee/AddEmployee/Action';


const MotionBox = motion(Box);

const Addemployee = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      category: '',
      salary: '',
      image: '',
      address: '',
      category_id:""
    });
  
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        password: '',
        category: '',
        salary: '',
        image: '',
        address: '',
        category_id:""
      });
    };
  
    const toast = useToast();
    const dispatch = useDispatch();
  const handlechange=(e)=>{
    const {name,value}=e.target
    setFormData((pre)=>({...pre,[name]:value}))
  }
    const handleAddCategory = () => {
      const { name, email, password, category, salary, image, address } = formData;
  
      if (name && email && password && category && salary && image && address) {
        dispatch(addemp({ name, email, password, category, salary, image, address,category_id }))
          .then((res) => {
            dispatch(addcatsuccess());
            toast({ description: res.data.msg, status: 'success', position: 'top', duration: 3000 });
            handleCloseModal();
            onAdd(); // Callback to trigger any additional action upon successful category addition
          })
          .catch((err) => {
            dispatch(addcatfailure());
            toast({ description: err.response.data.msg, status: 'error', position: 'top', duration: 3000 });
          });
      } else {
        toast({ description: 'Please fill in all fields', position: 'top', duration: 3000, status: 'error' });
      }
    };
  
    return (
      <>
        <Button onClick={handleOpenModal}>
          Add Employee
          <PlusSquareIcon />
        </Button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box mb={4}>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Select
                  placeholder="Category"
                  value={formData.category}
                  onChange={handlechange}
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Fullstack</option>
                </Select>
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="category_id"
                  type="number"
                  value={formData.category_id}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="Salary"
                  type="number"
                  value={formData.salary}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="Image URL"
                  type="file"
                  value={formData.image}
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={handlechange}
                />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleaddemp}>
                Add
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default Addemployee;