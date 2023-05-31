import React, {useContext, useEffect, useState} from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import UserContext from "../Profile/UserContext.jsx";
import {getGaragesByUserID} from "../../services/GarageService.jsx";
import {createCar} from "../../services/CarService.jsx";
import AddImage from "./AddImage.jsx";


export function GarageDropdown({ garages, handleGarageSelect }) {
  return (
    <FormControl isInvalid={!garages || garages.length === 0}>
      <FormLabel htmlFor="garage">Garage:</FormLabel>
      <Select
        id="garage"
        name="garage"
        onChange={handleGarageSelect}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select a Garage
        </option>
        {garages.map((garage) => (
          <option key={garage.id} value={garage.id}>
            {garage.name}
          </option>
        ))}
      </Select>
      {!garages || garages.length === 0 ? (
        <FormErrorMessage>No garages available</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

const AddCar = () => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const [car, setCar] = useState({
    name: "",
    description: "",
    manufacturer: "",
    model: "",
    year: "",
    seats: "",
    engine: {
      size: "",
      fuelType: "",
      powerHP: "",
      torqueNM: "",
    },
    garage: "",
  });
  const [addedCar, setAddedCar] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const userID = user.id;
    if (userID) {
      getGaragesByUserID(userID)
        .then((response) => {
          console.log("Garages fetched successfully:", response);
          setGarages(response);
          if (response.length > 0) {
            setCar((prevData) => ({
              ...prevData,
              garage: response[0].id,
            }));
          }
        })
        .catch((error) => {
          console.error("Error fetching garages:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (addedCar) {
      console.log("Car added successfully please:", JSON.stringify(addedCar));
      console.log(addedCar.id);
    }
  }, [addedCar]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEngineInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevData) => ({
      ...prevData,
      engine: {
        ...prevData.engine,
        [name]: value,
      },
    }));
  };
  const currentYear = new Date().getFullYear();
  const handleGarageSelect = (e) => {
    const selectedGarage = e.target.value;
    setCar((prevData) => ({
      ...prevData,
      garage: selectedGarage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (car.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (car.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (car.manufacturer.trim() === "") {
      errors.manufacturer = "Manufacturer is required";
    }
    if (car.model.trim() === "") {
      errors.model = "Model is required";
    }
    if (car.year.trim() === "") {
      errors.year = "Year is required";
    } else if (
      parseInt(car.year.trim()) < 1800 ||
      parseInt(car.year.trim()) > currentYear
    ) {
      errors.year = "Year must be between 1800 and current year";
    }
    if (car.seats.trim() === "") {
      errors.seats = "Seats is required";
    } else if (
      parseInt(car.seats.trim()) < 1 ||
      parseInt(car.seats.trim()) > 8
    ) {
      errors.seats = "Number of seats must be between 1 and 8";
    }
    if (car.engine.size.trim() === "") {
      errors.engineSize = "Engine Size is required";
    } else if (
      parseFloat(car.engine.size.trim()) < 0.1 ||
      parseFloat(car.engine.size.trim()) > 10
    ) {
      errors.engineSize = "The engine size must be between 0.1 and 10";
    }
    if (car.engine.fuelType.trim() === "") {
      errors.engineFuelType = "Engine Fuel Type is required";
    }
    if (car.engine.powerHP.trim() === "") {
      errors.enginePowerHP = "Engine Power (HP) is required";
    } else if (
      parseInt(car.engine.powerHP.trim()) < 1 ||
      parseInt(car.engine.powerHP.trim()) > 10000
    ) {
      errors.enginePowerHP =
        "The engine power must be between 1 and 10000 horsepower";
    }
    if (car.engine.torqueNM.trim() === "") {
      errors.engineTorqueNM = "Engine Torque (NM) is required";
    } else if (
      parseInt(car.engine.torqueNM.trim()) < 1 ||
      parseInt(car.engine.torqueNM.trim()) > 100000
    ) {
      errors.engineTorqueNM =
        "The engine torque must be between 1 and 100000 Newton meters";
    }
    if (!car.garage) {
      errors.garage = "Garage is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    createCar(
      car.name,
      car.description,
      car.manufacturer,
      car.model,
      car.year,
      car.seats,
      car.garage,
      car.engine
    )
      .then((response) => {
        console.log("Car added successfully:", response);
        setAddedCar(response);
        toast({
          title: "Car Added",
          description: "The car has been added successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCar({
          name: "",
          description: "",
          manufacturer: "",
          model: "",
          year: "",
          seats: "",
          engine: {
            size: "",
            fuelType: "",
            powerHP: "",
            torqueNM: "",
          },
          garage: "",
        });
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        toast({
          title: "Error",
          description: "Failed to add the car. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box maxWidth="400px" margin="0 auto" >
      {!addedCar && (
        <form onSubmit={handleSubmit}>
          <h2>Add Car</h2>
          <FormControl isInvalid={formErrors.name}>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={car.name}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.description}>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Textarea
              id="description"
              name="description"
              value={car.description}
              onChange={handleInputChange}
            ></Textarea>
            <FormErrorMessage>{formErrors.description}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.manufacturer}>
            <FormLabel htmlFor="manufacturer">Manufacturer:</FormLabel>
            <Input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={car.manufacturer}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.manufacturer}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.model}>
            <FormLabel htmlFor="model">Model:</FormLabel>
            <Input
              type="text"
              id="model"
              name="model"
              value={car.model}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.model}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.year}>
            <FormLabel htmlFor="year">Year:</FormLabel>
            <Input
              type="number"
              id="year"
              name="year"
              value={car.year}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.year}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.seats}>
            <FormLabel htmlFor="seats">Seats:</FormLabel>
            <Input
              type="number"
              id="seats"
              name="seats"
              value={car.seats}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.seats}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.engineSize}>
            <FormLabel htmlFor="engineSize">Engine Size:</FormLabel>
            <Input
              type="number"
              id="engineSize"
              name="size"
              value={car.engine.size}
              onChange={handleEngineInputChange}
            />
            <FormErrorMessage>{formErrors.engineSize}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.engineFuelType}>
            <FormLabel htmlFor="engineFuelType">Engine Fuel Type:</FormLabel>
            <Input
              type="text"
              id="engineFuelType"
              name="fuelType"
              value={car.engine.fuelType}
              onChange={handleEngineInputChange}
            />
            <FormErrorMessage>{formErrors.engineFuelType}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.enginePowerHP}>
            <FormLabel htmlFor="enginePowerHP">Engine Power (HP):</FormLabel>
            <Input
              type="number"
              id="enginePowerHP"
              name="powerHP"
              value={car.engine.powerHP}
              onChange={handleEngineInputChange}
            />
            <FormErrorMessage>{formErrors.enginePowerHP}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.engineTorqueNM}>
            <FormLabel htmlFor="engineTorqueNM">Engine Torque (NM):</FormLabel>
            <Input
              type="number"
              id="engineTorqueNM"
              name="torqueNM"
              value={car.engine.torqueNM}
              onChange={handleEngineInputChange}
            />
            <FormErrorMessage>{formErrors.engineTorqueNM}</FormErrorMessage>
          </FormControl>
          <GarageDropdown
            garages={garages}
            handleGarageSelect={handleGarageSelect}
          />
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isDisabled={!garages || garages.length === 0}
          >
            Add Car
          </Button>
        </form>
      )}
      {addedCar && addedCar.id && <AddImage carId={addedCar.id} />}

      {addedCar && (
        <Button mt={4} colorScheme="teal" onClick={() => setAddedCar(null)}>
          Add Another Car
        </Button>
      )}
    </Box>
  );
};

export default AddCar;
