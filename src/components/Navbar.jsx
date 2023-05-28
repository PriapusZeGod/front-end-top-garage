import {
  Button,
  Flex,
  HStack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Image,
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  Link,
  Toast,
  useToast,
  Heading,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  HamburgerIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import userImage from "../images/user.png";
import { Show, Hide } from "@chakra-ui/react";
import Nav from "react-bootstrap/Nav";
import useFetch from "../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import { getCarsByGarageID } from "../services/CarService";
import { useContext } from "react";
import UserContext from "./UserContext";
import { getProfileById } from "../services/profileService";
import { getGaragesByUserID } from "../services/GarageService";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import carImage from "../images/car-home-page.png";
import {NavLink} from "react-bootstrap";
import Search from "./Search";


export default function Navbar_Main({ currentCar, setCurrentCar }) {
  const { user } = useContext(UserContext);
  const [currentGarageName, setCurrentGarageName] = useState("Select Garage");
  const [currentGarrage, setCurrentGarrage] = useState({});

  useEffect(() => {
    const element = document.getElementById("collapsable-nav-dropdown");
    if (element) {
      element.innerText = currentGarageName;
    }
  }, [currentGarageName]);

  const handleGarageSelect = (garageName, garage) => {
    setCurrentGarageName(garageName);
    setCurrentGarrage(garage);
  };
  return (
    <>
      {user && (
        <Flex as="nav" p="10px" mb="40px" alignItems="center" bg="purple.400">
          <Offcanvas
            setCurrentCar={setCurrentCar}
            currentGarageName={currentGarageName}
            currentGarrage={currentGarrage}
          />
          <Heading
            ml="10px"
            fontSize="lg"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            <Nav.Link href="/">Top G</Nav.Link>
          </Heading>

          <Spacer />
          {user && (
            <GarageMenu
              userId={user.id}
              handleGarageSelect={handleGarageSelect}
              currentGarageName={currentGarageName}
            />
          )}
          <Spacer />

          <HStack spacing="20px">
            <Hide below="md">
              <Nav.Link href="/#/addgarage">
                <Image
                  alt="AddGarage"
                  width={"50px"}
                  src={
                    "https://icon-library.com/images/garage-icon-png/garage-icon-png-16.jpg"
                  }
                />
              </Nav.Link>
              <Spacer />
              <Nav.Link href="/#/addcar">
                <Image
                  alt="Addcar"
                  width={"50px"}
                  className={"das"}
                  src={
                    "https://cdn2.iconfinder.com/data/icons/flat-transport-2/32/car-add-512.png"
                  }
                />
              </Nav.Link>
              <Spacer />
              <InputGroup>
               <Search></Search>
              </InputGroup>
              <Nav.Link href="/#/profile">
                <Image borderRadius="full" src={userImage} alt="user" />
              </Nav.Link>
            </Hide>
          </HStack>
        </Flex>
      )}
    </>
  );
}

function GarageMenu({ handleGarageSelect, currentGarageName, userId }) {
  const { data, status } = useQuery(["garages", userId], () =>
    getGaragesByUserID(userId)
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data && data.length > 0 && (
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
              >
                {currentGarageName || data[0].name}
              </MenuButton>
              {data && (
                <MenuList>
                  {data.map((garage) => (
                    <MenuItem
                      href=""
                      onClick={() => handleGarageSelect(garage.name, garage)}
                      key={garage.id}
                    >
                      {garage.name}
                    </MenuItem>
                  ))}
                </MenuList>
              )}
            </>
          )}
        </Menu>
      )}
      {data && !data.length > 0 && (
        <Link href="/#/addgarage">
          <Button variant="ghost">Create Garage</Button>
        </Link>
      )}
    </>
  );
}

function Offcanvas({ currentGarageName, currentGarrage, setCurrentCar }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [garageSelected, setGarageSelected] = useState(false);
  const toast = useToast();

  const handleOpen = () => {
    if (garageSelected) {
      onOpen();
    } else {
      toast({
        title: "Choose garage first.",
        description: "You have to choose a garage to browse/add cars.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Update the value of garageSelected based on the selection
    setGarageSelected(currentGarageName !== "Select Garage");
  }, [currentGarageName]);

  return (
    <>
      <Button colorScheme="purple" onClick={handleOpen}>
        <HamburgerIcon boxSize={6} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="purple.200">
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <Show below="md">
              <List fontSize="1.2em" spacing={4}>
                <ListItem>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1em"
                      children={<SearchIcon />}
                    />
                    <Input placeholder="Enter car name" />
                  </InputGroup>
                </ListItem>
                <ListItem>
                  <Nav.Link href="/#/profile">
                    <ListIcon as={AtSignIcon} color="gray" />
                    profile
                  </Nav.Link>
                </ListItem>
                <ListItem>
                  <Nav.Link href="/#/addgarage">
                    <Flex>
                      <Image
                        alt="AddGarage"
                        width={"40px"}
                        src={
                          "https://icon-library.com/images/garage-icon-png/garage-icon-png-16.jpg"
                        }
                        mr="5px"
                      />
                      <Text>Add Garage</Text>
                    </Flex>
                  </Nav.Link>
                </ListItem>
                <ListItem>
                  <Nav.Link href="/#/addcar">
                    <Flex>
                      <Image
                        alt="Addcar"
                        width={"40px"}
                        className={"das"}
                        src={
                          "https://cdn2.iconfinder.com/data/icons/flat-transport-2/32/car-add-512.png"
                        }
                        mr="5px"
                      />
                      <Text>Add Car</Text>
                    </Flex>
                  </Nav.Link>
                </ListItem>
              </List>
            </Show>
            {currentGarrage && (
              <CarList garage={currentGarrage} setCurrentCar={setCurrentCar} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CarList({ garage, setCurrentCar }) {
  const queryClient = useQueryClient();
  if (!garage) return null;

  const { data, status } = useQuery(["cars", garage.id], () =>
    getCarsByGarageID(garage.id)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error fetching data</div>;
  }

  const cars = data;

  return (
    <List>
      {cars.length &&
        cars.map((car) => (
          <Nav.Link href="#" key={car.id}>
            <Flex alignItems="center">
              <Avatar
                mr="2px"
                src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_directions_car_48px-512.png"
              />
              <ListItem onClick={() => setCurrentCar(car)}>{car.name}</ListItem>
            </Flex>
          </Nav.Link>
        ))}
      <br />
    </List>
  );
}

// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Offcanvas from "react-bootstrap/Offcanvas";
// import Image from "react-bootstrap/Image";
// import "./Navbar.css";
// import { Icon } from "@iconify/react";
// import Addcar from "./Addcar";
// import useFetch from "../hooks/useFetch";
// import { useState, useEffect } from "react";
// import React from "react";
// import logo from "../images/user.png";
// import { useQuery, useQueryClient } from "react-query";
// import { getCarsByGarageID } from "../services/CarService";

// function Navbar_Main() {
// const { data, isLoading, error } = useFetch("http://localhost:5055/Garages");
// const { CarsData, CarsIsLoading, CarsError } = useFetch(
//   "http://localhost:5027/Cars"
// );
// const [currentGarageName, setCurrentGarageName] = useState("Select Garage");
// const [currentGarrage, setCurrentGarrage] = useState(data?.[0]);
// const [currentCars, setCurrentCars] = useState(CarsData?.[0]);

// useEffect(() => {
//   const element = document.getElementById("collapsable-nav-dropdown");
//   if (element) {
//     element.innerText = currentGarageName;
//   }
// }, [currentGarageName]);

// useEffect(() => {
//   console.log(CarsData);
// }, [CarsData]);

// if (isLoading || CarsIsLoading) {
//   return <div>Loading...</div>;
// }

// if (error) {
//   return <div>Error: {error.message}</div>;
// }

// const handleGarageSelect = (garageName, garage) => {
//   setCurrentGarageName(garageName);
//   setCurrentGarrage(garage);
// };
//   return (
//     <>
//       {console.log(data)}
//       {console.log(CarsData)}
//       {[false].map((expand) => (
//         <Navbar
//           key={expand}
//           bg="light"
//           variant="light"
//           expand={expand}
//           className="mb-3"
//           sticky="top"
//         >
//           <Container fluid>
//             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
//             <NavDropdown
//               title={currentGarageName || data[0].name}
//               id="collapsable-nav-dropdown"
//               responsive="sm"
//             >
// {data.map((garage) => (
//   <NavDropdown.Item
//     href=""
//     onClick={() => handleGarageSelect(garage.name, garage)}
//     key={garage.id}
//   >
//     {garage.name}
//   </NavDropdown.Item>
// ))}
//             </NavDropdown>
//             <Form className="d-flex mt-2" responsive="sm">
//               <Form.Control
//                 type="search"
//                 placeholder="Search"
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-dark">Search</Button>
//             </Form>
//             <Nav.Item className="me-5 sm-12">
//               <Nav.Link href="/#/profile">
//                 <Image src={logo} rounded />
//               </Nav.Link>
//             </Nav.Item>
//             <Navbar.Offcanvas
//               id={`offcanvasNavbar-expand-${expand}`}
//               aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
//               placement="start"
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
//                   All Cars "Garage Title"
//                   {currentGarrage && <CarList garage={currentGarrage} />}{" "}
//                   {/* Conditional rendering of CarList */}
//                 </Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
// //                 <Nav className="justify-content-end flex-grow-1 pe-3">
// //                   {/* {CarsData?.map((car) =>
//                     currentGarrage?.cars?.forEach((element) => {
//                       if (car.id == element.id) {
//                         <Nav.Link href="#action1" key={car.id}>
//                           car.name
//                         </Nav.Link>;
//                       }
//                     })
//                   )} */}

//                   <div className="mt-3 d-flex">
//                     <div>
//                       <div className="mt-4 rounded-circle">
//                         <Icon icon="mdi-light:plus" />
//                       </div>
//                     </div>
//                     <div className="ms-1 row">
//                       <Button variant="light" className="col">
//                         <Nav.Link href="/#/App"></Nav.Link>
//                         add car
//                       </Button>
//                       <Button variant="light" className="col">
//                         add garage
//                       </Button>
//                     </div>
//                   </div>
//                 </Nav>
//               </Offcanvas.Body>
//             </Navbar.Offcanvas>
//           </Container>
//         </Navbar>
//       ))}
//       {console.log("works")}
//     </>
//   );
// }

// function CarList({ garage }) {
//   const queryClient = useQueryClient();
//   if (!garage) return null;
//   const { data, status } = useQuery(["cars", garage.id], () =>
//     getCarsByGarageID(garage.id)
//   );

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//   if (status === "error") {
//     return <div>Error fetching data</div>;
//   }

//   const cars = data;

//   if (!garage) {
//     return "no garage";
//   }

//   return (
//     <ul>
//       {cars.map((car) => (
//         <li key={car.id}>{car.name}</li>
//       ))}
//     </ul>
//   );
// }

// export default Navbar_Main;
