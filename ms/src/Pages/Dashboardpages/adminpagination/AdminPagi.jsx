import React from "react";
import {
  Box,
  Button,
  chakra,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Adminpagination = ({ currentPage, totalPages, onPageChange }) => {
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  return (
    <HStack
      justify="center"
      spacing={4}
      mt={6}
      color={useColorModeValue("gray.700", "gray.300")}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        variant="ghost"
      >
        Previous
      </Button>

      <HStack spacing={1}>
        {[...Array(totalPages)].map((_, index) => (
          <chakra.div
            key={index}
            px={2}
            py={1}
            _hover={{
              cursor: "pointer",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
            onClick={() => onPageChange(index + 1)}
            borderRadius="md"
            color={index + 1 === currentPage ? "white" : undefined}
            bg={index + 1 === currentPage ? "blue.500" : undefined}
          >
            {index + 1}
          </chakra.div>
        ))}
      </HStack>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        variant="ghost"
      >
        Next
      </Button>
    </HStack>
  );
};

export default Adminpagination;
