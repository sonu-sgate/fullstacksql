import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Collapse,
  useDisclosure,
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  useToast,
} from '@chakra-ui/react';

import {
    FiLogOut,
  FiMenu,
  FiSearch,
} from 'react-icons/fi';

import {
  FaRss,
  FaClipboardCheck,
  FaBell,
  FaGift as AiFillGift,
} from 'react-icons/fa';

import {
  HiCollection,
  HiCode,
} from 'react-icons/hi';

import { MdCategory, MdEmojiPeople, MdHome, MdKeyboardArrowRight } from 'react-icons/md';
import { BsGearFill } from 'react-icons/bs';
import { AiFillProfile } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Home from './Dashboardpages/Home';
import Employee from './Dashboardpages/Employee';
import Category from './Dashboardpages/Category';
import Profile from './Dashboardpages/Profile';
import EmpSingle from './Dashboardpages/EmpSingle';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adminlogout, adminlogoutfailure, adminlogoutsuccess } from '../Redux/Admin/Logout/Action';

// Assume Logo is another component you've defined elsewhere
const Logo = () => (
    // Define your Logo component here
    <div>
      {/* Your Logo JSX */}
      <Avatar src="https://api.dicebear.com/7.x/adventurer/svg?seed=Coco" alt='avatar'/>
    </div>
  );

const Dashboard = () => {
  const sidebar = useDisclosure();
  const {id}=useParams()
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
const locaton=useLocation()
const dispatch=useDispatch()
const logoutstoreddata=useSelector((state)=>state.amdinlogoutreducer)
const {adminisLoading,adminisError}=logoutstoreddata
const navigate=useNavigate()
const toast=useToast()
axios.defaults.withCredentials=true
const handlelogout=()=>{
dispatch(adminlogout).then((res)=>{
  dispatch(adminlogoutsuccess())
toast({description:"Logout Successfully",position:"top",status:"success",duration:3000})
navigate("/")
}).catch((err)=>{
  toast({description:"failed to Logout",position:"top",status:"error",duration:3000})
  dispatch(adminlogoutfailure())
})
}

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Logo />
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="semibold"
        >
          MS
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}><Link to="">Dashboard</Link></NavItem>
        <NavItem icon={MdEmojiPeople}><Link to="/dashboard/employee">Manage Employes</Link></NavItem>
        <NavItem icon={MdCategory}><Link to="/dashboard/category">Category</Link></NavItem>

        <NavItem icon={AiFillProfile}><Link to="/dashboard/profile">Profile</Link></NavItem>
      
        <NavItem onClick={handlelogout} icon={FiLogOut}>LogOut</NavItem>
      
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{
          base: 0,
          md: 60,
        }}
        transition=".3s ease"
      >
        <Flex
          as="header"
          position={"sticky"}
          zIndex={100}
          top={0}
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            w="96"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for articles..." />
          </InputGroup>

          <Flex align="center">
            <Icon color="gray.500" as={FaBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="sm"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/30869823?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {/* Add content here, remove div below  */}
        


          {/* <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" /> */}
          {location.pathname=="/dashboard"?<Home/>:location.pathname=="/dashboard/employee"?<Employee/>:
          location.pathname=="/dashboard/category"?<Category/>:location.pathname=="/dashboard/profile"?<Profile/>:
          location.pathname==`/dashboard/employee/${id}`?<EmpSingle/>:""}
          {/* <EmpSingle/>
          {location.pathname=="/dashboard/employee/:id"&&<EmpSingle/>} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
