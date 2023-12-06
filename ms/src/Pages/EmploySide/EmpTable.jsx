import React, { useState } from "react";
import {
  Flex,
  Stack,
  chakra,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";

const EmpTable = ({ id, name, cat,hanldechatid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPerson, setSelectedPerson] = useState(null);

  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  const handleDelete = (personIndex) => {
    setSelectedPerson(personIndex);
    onOpen();
  };

  const confirmDelete = () => {
    // Implement your delete logic here
    // For this example, I'll just close the modal
    onClose();
  };

  const scrollToBottom = (id) => {
    hanldechatid(id)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Tbody key={id}>
      <Tr>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td >{cat}</Td>
        <Td>
          <Button onClick={()=>scrollToBottom(id)}>
            Chat <ChatIcon />
          </Button>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default EmpTable;
