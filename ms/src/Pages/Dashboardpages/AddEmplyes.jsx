import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addemp, addempsuccess } from '../../Redux/Admin/Employee/AddEmployee/Action';
import { addcatfailure } from '../../Redux/Admin/AddCategory/Action';
import { getcat } from '../../Redux/Admin/GetCat/Action';

const MotionBox = motion(Box);

const Addemployee = ({handleempreq}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    salary: '',
    address: '',
    category_id: '',
  });
  const [image, setImage] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      salary: '',
      address: '',
      category_id: '',
    });
    setImage('');
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };
// const dispatch=useDispatch()
  const storedempdata = useSelector((state) => state.addempreducer);
  const { addempisLoading, addempisError } = storedempdata;

  const handleaddemp = (e) => {
    e.preventDefault();
    const { name, email, password, salary, address, category_id } = formData;

    if (name && email && password && salary && image && address && category_id) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('address', address);
      formData.append('salary', salary);
      formData.append('category_id', category_id);
      formData.append('image', image);

      dispatch(addemp(formData))
        .then((res) => {
          dispatch(addempsuccess());
          toast({ description: res.data.msg, status: 'success', position: 'top', duration: 3000 });
          handleCloseModal()
          handleempreq()
        })
        .catch((err) => {
          dispatch(addcatfailure());
          toast({ description: err.response.data.msg, status: 'error', position: 'top', duration: 3000 });
        });
    } else {
      toast({ description: 'Please fill in all fields', position: 'top', duration: 3000, status: 'error' });
    }
  };

  const storedcatdata = useSelector((state) => state.getcatreducer);
  const { result } = storedcatdata;

  useEffect(() => {
    dispatch(getcat);
  }, []);

  return (
    <>
      <Button onClick={handleOpenModal}>
        Add Employee
        <PlusSquareIcon />
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <form onSubmit={handleaddemp} encType="multipart/form-data">
          <ModalContent>
            <ModalHeader>Add Employee</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Box mb={4}>
                <Input placeholder="Name" value={formData.name} onChange={handlechange} name="name" />
              </Box>
              <Box mb={4}>
                <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handlechange} />
              </Box>
              <Box mb={4}>
                <Input
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={handlechange}
                />
              </Box>
              <Box mb={4}>
                <Select placeholder="Category" value={formData.category} name="category_id" onChange={handlechange}>
                  {result &&
                    result.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.categoryname}
                      </option>
                    ))}
                </Select>
              </Box>
              <Box mb={4}>
                <Input placeholder="Salary" type="number" name="salary" value={formData.salary} onChange={handlechange} />
              </Box>
              <Box mb={4}>
                <Input placeholder="Image" type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
              </Box>
              <Box mb={4}>
                <Textarea placeholder="Address" name="address" value={formData.address} onChange={handlechange} />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Add
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default Addemployee;
