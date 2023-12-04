import React from 'react';
import {
  chakra,
  useColorModeValue,
  Flex,
  HStack,
  Button,
  Box,
  useDisclosure,
  IconButton,
  VStack,
  CloseButton,
  VisuallyHidden,
  Avatar,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai'; // Import the menu icon
import { Link } from 'react-router-dom';

const Logo = () => {
  // Assuming you have a Logo component
  return <div>
    <Avatar src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco" alt='logo'/>
  </div>;
};

const EmpNavbar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const mobileNav = useDisclosure();

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a href="/" title="Choc Home Page" display="flex" alignItems="center">
              <Logo />
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
             MS
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: 'none',
                md: 'inline-flex',
              }}
            >
              <Button variant="ghost"><Link to="/employee">EmpDetails</Link></Button>
              <Button variant="ghost"><Link to="/projects">Projects</Link></Button>
              {/* <Button variant="ghost"><Link to="/blogBlog</Button> */}
              <Button variant="ghost"><Link to="/about">About</Link></Button>
              <Button variant="ghost">LogOut</Button>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box
              display={{
                base: 'inline-flex',
                md: 'none',
              }}
            >
              <IconButton
                display={{
                  base: 'flex',
                  md: 'none',
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: 'inherit',
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? 'flex' : 'none'}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />

                <Button w="full" variant="ghost">
                  Features
                </Button>
                <Button w="full" variant="ghost">
                  Pricing
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Button w="full" variant="ghost">
                  Company
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default EmpNavbar;