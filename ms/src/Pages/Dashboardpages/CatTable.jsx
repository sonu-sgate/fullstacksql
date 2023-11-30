// ResponsiveTable.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import CatDeletedialoge from './Catdeletemodel';

const MotionBox = chakra(motion.div);

const CatTable = ({ data }) => {
  return (
    <Box overflowX="auto">
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
            <Th>Category ID</Th>
            <Th>Category Name</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
            {/* <Th>Description</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((category) => (
            <MotionBox
              as={Tr}
              key={category.id}
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(0, 0, 0, 0.03)' }}
            >
              <Td>{category.id}</Td>
              <Td>{category.name}</Td>
              <Td><EditIcon/></Td>
              <Td>
              <Tooltip label='Delete Category' fontSize='md'>
<CatDeletedialoge/>
</Tooltip></Td>
              {/* <Td>{category.description}</Td> */}
            </MotionBox>
          ))}
        </Tbody>
      </MotionBox>
    </Box>
  );
};

export default CatTable;
