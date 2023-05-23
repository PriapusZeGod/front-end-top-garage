import React, { useEffect, useState } from "react";
import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import carImage from "./images/car-home-page.png";

export default function Home({ currentCar }) {
  const [text, setText] = useState("Choose a garage and car to start");
  const [isCarVisible, setCarVisible] = useState(true);
  const [isBoxVisible, setBoxVisible] = useState(false);

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

  return (
    <>
      <Flex direction={["column", "row"]}>
        <Box
          height="80%"
          width="100%"
          mt={["0", "200px"]}
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
            {isBoxVisible && (
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
            )}
          </AnimatePresence>
        </Box>
        <Box flex="1" ml={["0", "10px"]}>
          <CarInfo currentCar={currentCar} />
        </Box>
      </Flex>
    </>
  );
}

function CarInfo({ currentCar }) {
  return (
    <>
      {currentCar && Object.keys(currentCar).length > 0 && (
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          h="400px"
          w={{ base: "100%", md: "400px" }}
          bg="purple.100"
          mr={{ base: "0", md: "10px" }}
          borderRadius="md"
        >
          <Box ml="5px" p="2px">
            <Heading as="h3">Car Info</Heading>
            <Text>Car: {currentCar.name}</Text>
            <Text>Year: {currentCar.year}</Text>
            <Text>Description: {currentCar.description}</Text>
            <Text>Seats: {currentCar.seats}</Text>
          </Box>
        </Box>
      )}
    </>
  );
}
