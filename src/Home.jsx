import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import carImage from "./images/car-home-page.png";

function Home() {
  return (
    <Box
      height="80%"
      width="100%"
      mt="200px"
      alignItems="center"
      justifyContent="center"
    >
      <Flex height="100%" alignItems="center" justifyContent="center">
        <Center>
          <Image src={carImage} alt="user" />
        </Center>
      </Flex>
      <Text as="h5" alignSelf="center" textAlign="center">
        Choose a garage and car to start
      </Text>
    </Box>
  );
}

export default Home;
