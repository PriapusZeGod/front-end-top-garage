import React, { useState } from "react";
import useFetch from "./hooks/useFetch";
import {
  AlertDialog,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  CircularProgress,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import carImage from "./images/car-home-page.png";
import { ArrowUpIcon, EmailIcon, InfoIcon, PhoneIcon } from "@chakra-ui/icons";
import ProfileEditModal from "./components/ProfileEditModal";

export default function AddGarage() {
  return (
    <Box w={{ sm: "50%", base: "99%" }} marginLeft="1px">
      <FormControl>
        <Text as="h3" mt="5px" ml="5px">
          Garage
        </Text>
        <FormLabel ml="5px">Name</FormLabel>
        <Input type="email" />
        <FormLabel ml="5px">Capacity</FormLabel>
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text as="h3" mt="5px" ml="5px">
          Location
        </Text>
        <FormLabel ml="5px">Latitude</FormLabel>
        <NumberInput defaultValue={0} step={0.000001}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel ml="5px">Longitude</FormLabel>
        <NumberInput defaultValue={0} step={0.000001}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Box>
  );
}
