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
import { useQuery, useQueryClient } from "react-query";
import { getCarsByGarageID } from "../services/CarService";
import { useContext } from "react";
import UserContext from "./UserContext";
import { getProfileById } from "../services/profileService.jsx";
import { getGaragesByUserID } from "../services/GarageService";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import carImage from "../images/car-home-page.png";
import { NavLink } from "react-bootstrap";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "garage";
export default function Navbar_Main({ currentCar, setCurrentCar }) {
  const { user } = useContext(UserContext);
  const [currentGarageName, setCurrentGarageName] = useState(
    getGarageFromStorage()?.name
  );
  const [currentGarrage, setCurrentGarrage] = useState(getGarageFromStorage());
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.getElementById("collapsable-nav-dropdown");
    if (element) {
      element.innerText = currentGarageName;
    }
  }, [currentGarageName]);

  const handleGarageSelect = (garageName, garage) => {
    // aici de facut
    // redirect to /#/App
    saveGarageToStorage(garage);
    setCurrentGarageName(garageName);
    setCurrentGarrage(garage);
    navigate("/");
  };

  function getGarageFromStorage() {
    const garage = localStorage.getItem(STORAGE_KEY);
    return garage ? JSON.parse(garage) : null;
  }

  function saveGarageToStorage(garage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(garage));
  }
  return (
    <>
      {user && (
        <Flex
          as="nav"
          p="10px"
          mb="40px"
          alignItems="center"
          bg="purple.400"
          justify="center"
          align="center"
          mt="-10px" // Add negative top margin here
        >
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
            <Nav.Link onClick={() => navigate("/")}>Top G</Nav.Link>
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

          <HStack spacing="20px" alignItems="center">
            <Hide below="md">
              <Nav.Link onClick={() => navigate("/addgarage")}>
                <Image
                  alt="AddGarage"
                  width={"50px"}
                  src={
                    "https://icon-library.com/images/garage-icon-png/garage-icon-png-16.jpg"
                  }
                />
              </Nav.Link>
              <Spacer />
              <Nav.Link onClick={() => navigate("/addcar")}>
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
              <Nav.Link onClick={() => navigate("/profile")}>
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
  const navigate = useNavigate();
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
        <Link
          onClick={() => {
            navigate("/addgarage");
          }}
        >
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
  const navigate = useNavigate();

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
          <DrawerHeader borderBottomWidth="1px">Cars in garage</DrawerHeader>
          <DrawerBody>
            <Show below="md">
              <List fontSize="1.2em" spacing={4}>
                <ListItem>
                  <Search></Search>
                </ListItem>
                <ListItem>
                  <Nav.Link
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <ListIcon as={AtSignIcon} color="gray" />
                    profile
                  </Nav.Link>
                </ListItem>
                <ListItem>
                  <Nav.Link
                    onClick={() => {
                      navigate("/addgarage");
                    }}
                  >
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
                  <Nav.Link
                    onClick={() => {
                      navigate("/addcar");
                    }}
                  >
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
