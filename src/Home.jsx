import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import carImage from "./images/car-home-page.png";
import { deleteCar } from "./services/CarService";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartWidget from "./components/ChartWidget";

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
                    <Image src={carImage} alt="user" />
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

          {currentCar.id &&
            (console.log(currentCar.garage.id),
            (
              <Flex spacing={4}>
                <ChartWidget garageId={currentCar.garage.id} />
              </Flex>
            ))}
        </Box>
      </Flex>
    </>
  );
}
function CarInfo({ currentCar, onDelete, isDeleting }) {
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
      </Box>
    </Box>
  );
}
