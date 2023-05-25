import React, { useState, useContext } from 'react';
import { createGarages } from "../services/GarageService";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, VStack } from "@chakra-ui/react";
import UserContext from "./UserContext";

const STORAGE_KEY = "userAuth";

const AddGarage = () => {
    const userContext = useContext(UserContext);

    const [garage, setGarage] = useState({
        name: '',
        location: {
            latitude: '',
            longitude: ''
        },
        numberOfCars: 0,
    });
    const [formErrors, setFormErrors] = useState({});

    function getUserFromStorage() {
        const userJSON = localStorage.getItem(STORAGE_KEY);
        return userJSON ? JSON.parse(userJSON) : null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'latitude' || name === 'longitude') {
            setGarage((prevData) => ({
                ...prevData,
                location: {
                    ...prevData.location,
                    [name]: value
                }
            }));
        } else {
            setGarage((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (garage.name.trim() === '') {
            errors.name = 'Garage name is required';
        }
        if (garage.location.latitude.trim() === '') {
            errors.latitude = 'Latitude is required';
        }
        if (garage.location.longitude.trim() === '') {
            errors.longitude = 'Longitude is required';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const { name, location, numberOfCars } = garage;
        const capacity = parseInt(numberOfCars);

        try {
            const user = userContext.user;
            const id = user ? user.id : null;

            const response = await createGarages(user, id, name, capacity, location);
            console.log('Garage added successfully:', response);
        } catch (error) {
            console.error('Error adding garage:', error);
        }
    };

    return (
        <Box>
            <Box as="h2" mb={4} fontSize="xl" fontWeight="bold">
                Add Garage
            </Box>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!formErrors.name}>
                        <FormLabel htmlFor="name">Garage Name:</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={garage.name}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.latitude}>
                        <FormLabel htmlFor="latitude">Latitude:</FormLabel>
                        <Input
                            type="text"
                            id="latitude"
                            name="latitude"
                            value={garage.location.latitude}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.latitude}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.longitude}>
                        <FormLabel htmlFor="longitude">Longitude:</FormLabel>
                        <Input
                            type="text"
                            id="longitude"
                            name="longitude"
                            value={garage.location.longitude}
                            onChange={handleInputChange}
                        />
                        <FormErrorMessage>{formErrors.longitude}</FormErrorMessage>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="numberOfCars">Number of Cars:</FormLabel>
                        <Select
                            id="numberOfCars"
                            name="numberOfCars"
                            value={garage.numberOfCars}
                            onChange={handleInputChange}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </Select>
                    </FormControl>
                    <Box>{/* Add map component here for choosing location */}</Box>
                    <Button type="submit" colorScheme="blue">
                        Add Garage
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default AddGarage;
