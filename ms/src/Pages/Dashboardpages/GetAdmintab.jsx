// ResponsiveTable.js
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Box,
  Tooltip,
  Avatar,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CatDeletedialoge from "./Catdeletemodel";
import { Link, useLocation } from "react-router-dom";
import { api } from "../../Redux/Api/api";
import Adminpagination from "./adminpagination/AdminPagi";

const MotionBox = chakra(motion.div);

const AdminTable = ({ data }) => {
  const location = useLocation();

  return (
    <Box w="80%" margin="auto">
      <MotionBox
        as={Table}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Thead>
          <Tr bgColor="gray.100">
            <Th color="gray.700">Admin ID</Th>
            {/* <Th>Name</Th> */}
            <Th color="gray.700">Email</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((admin) => (
            <MotionBox
              as={Tr}
              key={admin.id}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(0, 0, 0, 0.03)",
              }}
            >
              <Td>{admin.id}</Td>
              {/* <Td>{admin.name}</Td> */}
              <Td>{admin.email}</Td>
          <Td>MORE</Td>
            </MotionBox>
          ))}
        </Tbody>
      </MotionBox>
      {/* <Adminpagination/> */}
    </Box>
  );
};

export default AdminTable;
