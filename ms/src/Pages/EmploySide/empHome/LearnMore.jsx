import React from 'react';
import { Flex, Box, chakra } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const LearnMorePage = () => {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        mx={{
          lg: 8,
        }}
        display={{
          lg: "flex",
        }}
        maxW={{
          lg: "5xl",
        }}
        shadow={{
          lg: "lg",
        }}
        rounded={{
          lg: "lg",
        }}
      >
        <Box
          w={{
            lg: "50%",
          }}
        >
          <Box
            h={{
              base: 64,
              lg: "full",
            }}
            rounded={{
              lg: "lg",
            }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
            }}
          ></Box>
        </Box>

        <Box
          py={12}
          px={6}
          maxW={{
            base: "xl",
            lg: "5xl",
          }}
          w={{
            lg: "50%",
          }}
        >
          <chakra.h2
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
          >
           Learn More about MS
            <chakra.span
              color="brand.600"
              _dark={{
                color: "brand.400",
              }}
            >
              's Innovative Employment Management System
            </chakra.span>
          </chakra.h2>
          <chakra.p
            mt={4}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            At MS, we are excited to introduce you to our cutting-edge employment management system. Our solution is designed to revolutionize your HR processes and elevate the efficiency of your entire organization.
          </chakra.p>

          <chakra.p
            mt={4}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            <strong>Key Features:</strong>
            <ul>
              <li>Effortless Employee Data Management: Streamline the organization and accessibility of employee information.</li>
              <li>Advanced Time and Attendance Tracking: Ensure accurate tracking of working hours for precise payroll processing.</li>
              <li>Customizable Reporting Tools: Gain insights into your workforce with tailored and detailed reports.</li>
              <li>Collaborative Work Environment: Foster team collaboration and enhance project management.</li>
            </ul>
          </chakra.p>

          <chakra.p
            mt={4}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            <strong>Benefits:</strong>
            <ul>
              <li>Increased Efficiency: Save time and reduce manual effort in HR tasks.</li>
              <li>Improved Accuracy: Minimize errors in payroll processing and attendance records.</li>
              <li>Enhanced Employee Experience: Empower your employees with user-friendly interfaces and self-service options.</li>
              <li>Scalability: Grow your business with a system that adapts to your changing needs.</li>
            </ul>
          </chakra.p>

          <Box mt={8}>
            <Link
            to="/employlogin"
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{
                bg: "gray.800",
              }}
            >
              Get Started with MS
            </Link>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default LearnMorePage;
