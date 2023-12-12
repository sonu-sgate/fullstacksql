import React, { useEffect } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { api } from "../../Redux/Api/api";
import MapContainer from "./MapContainer";

const MotionBox = chakra(motion.div);

const EmpTable = ({ data }) => {
  const location = useLocation();
 const locations = [
   [18.5204303, 73.8567437], // Pune, India
   [37.7749, -122.4194], // San Francisco, USA
   [-33.8688, 151.2093], // Sydney, Australia
 ];
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
            <Th>Location</Th>
            <Th>MoreDetails</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((emp) => (
            <MotionBox
              as={Tr}
              key={emp.empid}
              whileHover={{
                scale: 1.03,
                backgroundColor: "rgba(0, 0, 0, 0.03)",
              }}
            >
              <Td>{emp.empid}</Td>
              <Td>{emp.name}</Td>
              <Td>{emp.email}</Td>
              <Td>{emp.address && emp.address.substring(0, 10)}...</Td>
              <Td></Td>
              <Td>
                <Avatar src={`${api}/Images/` + emp.image} />
              </Td>
              <Td>
                <Link to={`${location.pathname}/${emp.empid}`}>More</Link>
              </Td>
            </MotionBox>
          ))}
        </Tbody>
      </MotionBox>
      {/* <MapContainer
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCwNw-ckLyiqE_rn-IO3VY-3cTBYxPJfug&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
        locations={locations}
      /> */}
    </Box>
  );
};

export default EmpTable;
