import React, { useEffect, useState, useContext } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './UserContext';
import { getCarsByCarName, deleteCar } from '../services/CarService';
import './CarList.css';

export default function Search() {
    const { user } = useContext(UserContext);
    const [cars, setCars] = useState([]);
    const [currentCar, setCurrentCar] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        fetchCarsByUser();
    }, [user.carName]);

    const fetchCarsByUser = async () => {
        try {
            if (user.carName) {
                const userCars = await getCarsByCarName(user.carName);
                setCars(userCars);
            } else {
                setCars([]);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleCarClick = (car) => {
        setCurrentCar(car);
    };

    const handleDeleteCar = async (carId) => {
        try {
            setIsDeleting(true);
            await deleteCar(carId);
            setIsDeleting(false);
            fetchCarsByUser();
            toast.success('Car deleted successfully.', { position: toast.POSITION.BOTTOM_RIGHT });
        } catch (error) {
            console.error('Error deleting car:', error);
            setIsDeleting(false);
            toast.error('Failed to delete car.', { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    const handleSearch = async () => {
        if (searchInput.trim() === '') {
            return;
        }

        try {
            const searchCars = await getCarsByCarName(searchInput);
            setCars(searchCars);
            if (searchCars.length === 0) {
                toast.info('No cars found.', { position: toast.POSITION.TOP_CENTER });
            }
        } catch (error) {
            console.error('Error searching cars:', error);
        }
    };

    const handleCloseCard = () => {
        setCurrentCar(null);
        setSearchInput('');
    };

    return (
        <Box py={4} display="flex" justifyContent="center">
            <Box>
                <Box display="flex" alignItems="center" mb={4}>
                    <Input
                        flex="1"
                        size="sm"
                        placeholder="Enter car name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button size="sm" colorScheme="teal" ml={4} onClick={handleSearch}>
                        Search
                    </Button>
                </Box>

                {cars.length === 0 && searchInput.trim() !== '' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="no-cars-found"
                    >
                        <Text>No cars found.</Text>
                    </motion.div>
                )}

                {cars.length > 0 && (
                    <Box>
                        <Box display="flex" flexWrap="wrap">
                            {cars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    className="car-item"
                                    onClick={() => handleCarClick(car)}
                                    whileHover={{ scale: 1.05 }}
                                    p={4}
                                    m={2}
                                    borderRadius="md"
                                    boxShadow="md"
                                    cursor="pointer"
                                    width="200px"
                                    background="linear-gradient(45deg, #f6d365, #fda085)"
                                    transition="box-shadow 0.3s ease"
                                >
                                    <Text fontWeight="bold" mb={2}>
                                        {car.name}
                                    </Text>
                                    {currentCar && currentCar.id === car.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="car-details"
                                        >
                                            <Button
                                                onClick={handleCloseCard}
                                                position="absolute"
                                                top="8px"
                                                right="8px"
                                                size="sm"
                                                colorScheme="gray"
                                                variant="ghost"
                                            >
                                                Close
                                            </Button>
                                            <Text color="gray.500">Description: {car.description}</Text>
                                            <Text color="gray.500">Manufacturer: {car.manufacturer}</Text>
                                            <Text color="gray.500">Model: {car.model}</Text>
                                            <Text color="gray.500">Year: {car.year}</Text>
                                            <Text color="gray.500">Engine Fuel Type: {car.engine.fuelType}</Text>
                                            <Text color="gray.500">Engine Horse Power: {car.engine.powerHP}</Text>
                                            <Text color="gray.500">Engine Torque: {car.engine.torqueNM}</Text>
                                            <Button
                                                mt={2}
                                                size="sm"
                                                colorScheme="red"
                                                disabled={isDeleting}
                                                onClick={() => handleDeleteCar(car.id)}
                                            >
                                                {isDeleting ? 'Deleting...' : 'Delete Car'}
                                            </Button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </Box>
                    </Box>
                )}
            </Box>

            <ToastContainer position="top-right" />
        </Box>
    );
}
