import React, {useContext, useState} from 'react';
import {createGarages} from "../../services/GarageService.jsx";
import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, VStack} from "@chakra-ui/react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../Profile/UserContext.jsx";
import MapViewComponent from "../Widgets/MapView.jsx";

const STORAGE_KEY = "userAuth";

const AddGarage = () => {
    const userContext = useContext(UserContext);

    const [garage, setGarage] = useState({
        name: '',
        location: {
            latitude: '',
            longitude: ''
        },
        numberOfCars: '0',
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
        if (garage.numberOfCars === '0') {
            errors.numberOfCars = 'Number of Cars is required';
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
            toast.success('Garage added successfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Error adding garage:', error);
            toast.error('Error adding garage', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Box as="h2" mb={4} fontSize="xl" fontWeight="bold">
                    Add Garage
                </Box>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!formErrors.name}>
                        <FormLabel htmlFor="name">Garage Name:</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={garage.name}
                            onChange={handleInputChange}
                            _focus={{ outline: 'none' }}
                            required
                        />
                        <FormErrorMessage>{formErrors.name}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.latitude}>
                        <FormLabel htmlFor="latitude">Latitude:</FormLabel>
                        <Input
                            type="number"
                            id="latitude"
                            name="latitude"
                            value={garage.location.latitude}
                            onChange={handleInputChange}
                            _focus={{ outline: 'none' }}
                            required
                        />
                        <FormErrorMessage>{formErrors.latitude}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.longitude}>
                        <FormLabel htmlFor="longitude">Longitude:</FormLabel>
                        <Input
                            type="number"
                            id="longitude"
                            name="longitude"
                            value={garage.location.longitude}
                            onChange={handleInputChange}
                            _focus={{ outline: 'none' }}
                            required
                        />
                        <FormErrorMessage>{formErrors.longitude}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formErrors.numberOfCars}>
                        <FormLabel htmlFor="numberOfCars">Number of Cars:</FormLabel>
                        <Select
                            id="numberOfCars"
                            name="numberOfCars"
                            value={garage.numberOfCars}
                            onChange={handleInputChange}
                            _focus={{ outline: 'none' }}
                            required
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </Select>
                        <FormErrorMessage>{formErrors.numberOfCars}</FormErrorMessage>
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        _hover={{ transform: 'scale(1.05)', transition: 'transform 0.2s' }}
                        _focus={{ outline: 'none' }}
                    >
                        Add Garage
                    </Button>
                </VStack>
                <br/>
                <MapViewComponent />
            </form>
            <ToastContainer />
        </Box>
    );
};

export default AddGarage;
