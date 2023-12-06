import {
  Flex,
  Stack,
  SimpleGrid,
  chakra,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const EmpsideTable = ({id,name,cat}) => {

  
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const handleScrollToPersonList = () => {
    if (personListRef.current) {
      personListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        direction={{
          base: "column",
        }}
        w="full"
        bg={{
          md: bg,
        }}
        shadow="lg"
      >
        <Flex
          direction={{
            base: "row",
            md: "column",
          }}
          bg={dataColor}
          key={id}
        >
          <SimpleGrid
            spacingY={3}
            columns={{
              base: 1,
              md: 3,
            }}
            w={{
              base: 120,
              md: "full",
            }}
            textTransform="uppercase"
            bg={bg2}
            color={"gray.500"}
            py={{
              base: 1,
              md: 4,
            }}
            px={{
              base: 2,
              md: 10,
            }}
            fontSize="md"
            fontWeight="hairline"
          >
            <span>EmpId</span>
            <span>Name</span>
            <span>Category</span>
            <chakra.span
              textAlign={{
                md: "right",
              }}
            >
              Connect to:-
            </chakra.span>
          </SimpleGrid>
          <SimpleGrid
            spacingY={3}
            columns={{
              base: 1,
              md: 3,
            }}
            w="full"
            py={2}
            px={10}
            fontWeight="hairline"
          >
            <span>{id}</span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {name}
            </chakra.span>
            <chakra.span
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {cat}
            </chakra.span>
            <Flex
              justify={{
                md: "end",
              }}
            >
              <Button
                variant="solid"
                colorScheme="red"
                size="sm"
                onClick={() => handleDelete(pid)}
              >
               Click
              </Button>
            </Flex>
          </SimpleGrid>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default EmpsideTable;
