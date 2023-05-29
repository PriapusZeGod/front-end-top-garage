import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import defaultCarImage from "./images/car-home-page.png";
import { deleteCar } from "./services/CarService";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartWidget from "./components/ChartWidget";
import { useQuery, useQueryClient } from "react-query";
import { getCarImage } from "./services/CarService";
import {
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button as ChakraButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "./components/UserContext";
import { getGaragesByUserID } from "./services/GarageService";
import { useMutation } from "react-query";
import { updateCar } from "./services/CarService";

export default function Home({ currentCar }) {
  const [text, setText] = useState("Choose a garage and car to start");
  const [isCarVisible, setCarVisible] = useState(true);
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (currentCar && Object.keys(currentCar).length > 0) {
      setText(currentCar.name);
      setCarVisible(true);
      setBoxVisible(true);
    } else {
      setText("Choose a garage and car to start");
      setCarVisible(true);
      setBoxVisible(false);
    }
  }, [currentCar]);

  const handleDeleteCar = async (carId) => {
    try {
      setIsDeleting(true);
      await deleteCar(carId);
      setIsDeleting(false);
      toast.success("Car deleted successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error deleting car:", error);
      setIsDeleting(false);
      toast.error("Failed to delete car", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Flex direction={["column", "row"]} justifyContent="flex-start">
        <Box
          height="80%"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <AnimatePresence>
            {isCarVisible && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Flex height="100%" alignItems="center" justifyContent="center">
                  <Center>
                    {!currentCar.id && (
                      <Image src={defaultCarImage} alt={"user"} />
                    )}
                    {currentCar.id && <CarImage currentCar={currentCar} />}
                  </Center>
                </Flex>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Text as="h5" alignSelf="center" textAlign="center">
                {text}
              </Text>
            </motion.div>
          </AnimatePresence>
        </Box>
        <Box ml={["0", "10px"]}>
          {currentCar && Object.keys(currentCar).length > 0 && (
            <CarInfo
              currentCar={currentCar}
              onDelete={handleDeleteCar}
              isDeleting={isDeleting}
            />
          )}
        </Box>
      </Flex>
      {currentCar.id &&
        (console.log(currentCar.garage.id),
        (
          <Flex justifyContent="center" flexWrap="wrap" spacing={4}>
            <Box width={{ base: "100%", sm: "100%", md: "50%", lg: "33.33%" }}>
              <ChartWidget garageId={currentCar.garage.id} isCO2={true} />
            </Box>
            <Box width={{ base: "100%", sm: "100%", md: "50%", lg: "33.33%" }}>
              <ChartWidget
                garageId={currentCar.garage.id}
                isTemperature={true}
              />
            </Box>
            <Box width={{ base: "100%", sm: "100%", md: "50%", lg: "33.33%" }}>
              <ChartWidget garageId={currentCar.garage.id} isHumidity={true} />
            </Box>
          </Flex>
        ))}
    </>
  );
}
function CarInfo({ currentCar, onDelete, isDeleting }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    pressed: { scale: 0.9 },
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      mr={{ base: "0", md: "10px" }}
      borderRadius="md"
    >
      <Box ml="5px" p="2px">
        <Heading as="h3">Car Info</Heading>
        <Text>Car: {currentCar.name}</Text>
        <Text>Year: {currentCar.year}</Text>
        <Text>Description: {currentCar.description}</Text>
        <Text>Seats: {currentCar.seats}</Text>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="pressed"
          onClick={() => onDelete(currentCar.id)}
          disabled={isDeleting}
          style={{
            backgroundColor: isDeleting ? "gray" : "red",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </motion.button>
        <Button onClick={handleOpenModal}>Change Garage</Button>
        <CarChangeGarageModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          currentCar={currentCar}
        />
      </Box>
    </Box>
  );
}

function CarChangeGarageModal({ isOpen, onClose, currentCar }) {
  const [choice2, setChoice2] = useState("");
  const { user } = useContext(UserContext);

  const { data: garageData, status } = useQuery(["garages", user.id], () =>
    getGaragesByUserID(user.id)
  );

  const { isLoading, isError, error, data, mutate } = useMutation(
    "updateCar",
    ({ currentCarId, garageId }) => updateCar(currentCarId, garageId)
  );

  const handleConfirm = () => {
    // Perform any desired actions with the selected choices
    console.log("Choice 2: " + choice2);
    // let garageId = garageData.find((garage) => garage.name === choice2).id;
    mutate({ currentCarId: currentCar.id, garageId: choice2 });

    // Close the modal
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Current Garage</FormLabel>

            {garageData &&
              garageData.find((garage) => garage.id === currentCar.garage.id)
                .name}
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Select Garage to move car to</FormLabel>
            <Select defaultValue="" onChange={(e) => {setChoice2(e.target.value) 
            console.log(e.target.value)}}>
              <option disabled hidden value="" >
                Select Garage
              </option>
              {garageData &&
                garageData.map((garage) => (
                  <option key={garage.id} value={garage.id}>
                    {garage.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function CarImage({ currentCar }) {
  const [carImage, setCarImage] = useState(defaultCarImage);
  const queryClient = useQueryClient();
  const { data, status } = useQuery(["image", currentCar.id], () =>
    getCarImage(currentCar.id)
  );

  useEffect(() => {
    if (currentCar && Object.keys(currentCar).length > 0) {
      setCarImage(data ? URL.createObjectURL(data) : defaultCarImage);
    } else {
      setCarImage(defaultCarImage);
    }
  }, [currentCar, data]);

  useEffect(() => {
    return () => {
      if (carImage !== defaultCarImage) {
        URL.revokeObjectURL(carImage);
      }
    };
  }, [carImage]);

  return (
    <Box>
      <Image src={carImage} alt="car" w="500px" h="500px" />
    </Box>
  );
}
