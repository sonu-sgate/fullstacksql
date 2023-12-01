// ResponsiveTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box, Tooltip,Image, Avatar } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import CatDeletedialoge from './Catdeletemodel';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../../Redux/Api/api';

const MotionBox = chakra(motion.div);

const EmpTable = ({ data }) => {
    const location=useLocation()

  return (
    <Box>
      <MotionBox
        as={Table}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Thead>
          <Tr>
            <Th>Employee ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Address</Th>
            <Th>MoreDetails</Th>
            {/* <Th>Description</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((emp) => (
            <MotionBox
              as={Tr}
              key={emp.id}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            >
              <Td>{emp.id}</Td>
              <Td>{emp.name}</Td>
              <Td>{emp.email}</Td>
              <Td>{emp.address&&emp.address.substring(0, 10)}...</Td>
              <Td><Avatar src={`${api}/Images/`+emp.image}/></Td>
              {/* <Td></Td> */}
              <Td><Link to={`${location.pathname}/${emp.id}`}>More</Link></Td>

              {/* <Td><EditIcon/></Td>
              <Td>
              <Tooltip label='Delete Category' fontSize='md'>
<CatDeletedialoge/>
</Tooltip></Td> */}
              {/* <Td>{category.description}</Td> */}
            </MotionBox>
          ))}
        </Tbody>
      </MotionBox>
    </Box>
  );
};

export default EmpTable;
