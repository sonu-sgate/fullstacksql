import React, { useEffect } from "react";
import {
  Box,
  Button,
  chakra,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

const Adminpagination = ({ currentPage, totalPages, onPageChange }) => {
    const [searchparams,setSearchParams]=useSearchParams()
//   const isLastPage = currentPage === totalPages;
//   const isFirstPage = currentPage === 1;
  console.log(currentPage,"currentpage")
// console.log(currentPage,totalPages,"hi")
// useEffect(()=>{
// // const searchParams = new URLSearchParams(window.location.search);
// const newparams={...searchparams.entries(),page:currentPage}
// // Log the complete search parameters object to the console
// setSearchParams(newparams)
// console.log(Object.fromEntries(searchparams.entries()),"paramobj");
// },[currentPage])
  return (
    <HStack
      justify="center"
      spacing={4}
      mt={6}
      color={useColorModeValue("gray.700", "gray.300")}
    >
      <Button
      isDisabled={currentPage==1?true:false}
        onClick={() => currentPage >=1 && onPageChange(+currentPage - 1)}
   
        variant="ghost"
      >
        Previous
      </Button>

      <HStack spacing={1}>
      {currentPage}
      </HStack>

      <Button
        isDisabled={+currentPage==totalPages?true:false}
        onClick={() =>
          +currentPage <= totalPages && onPageChange(+currentPage + 1)
        }

        variant="ghost"
      >
        Next
      </Button>
    </HStack>
  );
};

export default Adminpagination;
