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

export default function AddCar() {
  return (
    <Box w={{ sm: "50%", base: "99%" }} marginLeft="1px">
      <FormControl>
        <Select placeholder="Select Garage">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Text as="h3" mt="5px" ml="5px">
          Car
        </Text>
        <FormLabel ml="5px">Name</FormLabel>
        <Input type="email" />
        <FormLabel ml="5px">Description</FormLabel>
        <Input type="text" />
        <FormLabel ml="5px">Manufacturer</FormLabel>
        <Input type="text" />
        <FormLabel ml="5px">Model</FormLabel>
        <Input type="text" />
        <FormLabel ml="5px">Year</FormLabel>
        <NumberInput min={1900}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text as="h3" mt="5px" ml="5px">
          Engine
        </Text>
        <FormLabel ml="5px">Size</FormLabel>
        <NumberInput defaultValue={0} min={0} step={0.01}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel ml="5px">Fuel Type</FormLabel>
        <Input type="text" />
        <FormLabel ml="5px">power HP</FormLabel>
        <NumberInput>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormLabel ml="5px">Torque NM</FormLabel>
        <NumberInput>
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
