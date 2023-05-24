import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
} from "@chakra-ui/react";
import UserContext from "./UserContext";
import { getGaragesByUserID } from "../services/GarageService";
import { createCar } from "../services/CarService";

const STORAGE_KEY = "userAuth";

export function GarageDropdown({ garages, handleGarageSelect }) {
    return (
        <FormControl>
            <FormLabel htmlFor="garage">Garage:</FormLabel>
            <Select id="garage" name="garage" onChange={handleGarageSelect}>
                <option value="">Select a Garage</option>
                {garages.map((garage) => (
                    <option key={garage.id} value={garage.id}>
                        {garage.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}

const AddCar = () => {
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
    const [formErrors, setFormErrors] = useState({});
    const [garages, setGarages] = useState([]);

    useEffect(() => {
        const userID = user.id; // Assuming user object has an 'id' property
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
        }
        if (car.seats.trim() === "") {
            errors.seats = "Seats is required";
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
            })
            .catch((error) => {
                console.error("Error adding car:", error);
            });
    };

    return (
        <Box maxWidth="400px" margin="0 auto">
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
                        type="text"
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
                        type="text"
                        id="seats"
                        name="seats"
                        value={car.seats}
                        onChange={handleInputChange}
                    />
                    <FormErrorMessage>{formErrors.seats}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="engineSize">Engine Size:</FormLabel>
                    <Input
                        type="text"
                        id="engineSize"
                        name="size"
                        value={car.engine.size}
                        onChange={handleEngineInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="engineFuelType">Engine Fuel Type:</FormLabel>
                    <Input
                        type="text"
                        id="engineFuelType"
                        name="fuelType"
                        value={car.engine.fuelType}
                        onChange={handleEngineInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="enginePowerHP">Engine Power (HP):</FormLabel>
                    <Input
                        type="text"
                        id="enginePowerHP"
                        name="powerHP"
                        value={car.engine.powerHP}
                        onChange={handleEngineInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="engineTorqueNM">Engine Torque (NM):</FormLabel>
                    <Input
                        type="text"
                        id="engineTorqueNM"
                        name="torqueNM"
                        value={car.engine.torqueNM}
                        onChange={handleEngineInputChange}
                    />
                </FormControl>
                <GarageDropdown garages={garages} handleGarageSelect={handleGarageSelect} />
                <Button type="submit" mt={4} colorScheme="blue">
                    Add Car
                </Button>
            </form>
        </Box>
    );
};

export default AddCar;
