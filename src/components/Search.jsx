import React, { useEffect, useState, useContext } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, FormControl, FormLabel, Select,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './UserContext';
import {getCarsByCarName, deleteCar, updateCar} from '../services/CarService';
import './Search.css';
import {useMutation, useQuery} from "react-query";
import {getGaragesByUserID} from "../services/GarageService.jsx";

export default function Search() {
    const { user } = useContext(UserContext);
    const [cars, setCars] = useState([]);
    const [currentCar, setCurrentCar] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

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
            toast.success('Car deleted successfully.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            handleCloseDeleteConfirmation();
            handleCloseCard();
        } catch (error) {
            console.error('Error deleting car:', error);
            setIsDeleting(false);
            toast.error('Failed to delete car.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                toast.info('No cars found.', { position: toast.POSITION.BOTTOM_RIGHT });
            }
            setSearchPerformed(true);
        } catch (error) {
            console.error('Error searching cars:', error);
        }
    };

    const handleCloseCard = () => {
        setCurrentCar(null);
        setSearchInput('');
        setSearchPerformed(null);
    };

    const handleConfirmDelete = (carId) => {
        handleDeleteCar(carId);
    };

    const handleCancelDelete = () => {
        handleCloseDeleteConfirmation();
    };


    const handleCloseDeleteConfirmation = () => {
        setShowDeleteConfirmation(false);
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

                {searchPerformed && cars.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="no-cars-found"
                    >
                        <Text style={{ display: 'top-right' }}>No cars found.</Text>
                    </motion.div>
                )}

                {searchPerformed && cars.length > 0 && (
                    <Box>
                        <Table className={"undo"} variant="simple">
                            <Tbody>
                                {cars.map((car) => (
                                    <Tr key={car.id} onClick={() => handleCarClick(car)} cursor="pointer">
                                        <Td>{car.name}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                )}
            </Box>

            <ToastContainer position="bottom-right" />

            {currentCar && (
                <CarDetailsModal
                    car={currentCar}
                    onClose={handleCloseCard}
                    onDelete={() => setShowDeleteConfirmation(true)}
                    isDeleting={isDeleting}
                />
            )}

            {showDeleteConfirmation && currentCar && (
                <DeleteConfirmationPopup
                    carId={currentCar.id}
                    handleConfirmDelete={handleConfirmDelete}
                    handleCancelDelete={handleCancelDelete}
                />
            )}
        </Box>
    );
}


function CarDetailsModal({ car, onClose, onDelete, isDeleting }) {
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        pressed: { scale: 0.9 },
    };
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Car Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Table variant="simple">
                        <Tbody>
                            <Tr>
                                <Td fontWeight="bold">Car Name:</Td>
                                <Td>{car.name}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Description:</Td>
                                <Td>{car.description}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Manufacturer:</Td>
                                <Td>{car.manufacturer}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Model:</Td>
                                <Td>{car.model}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Year:</Td>
                                <Td>{car.year}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Engine Fuel Type:</Td>
                                <Td>{car.engine.fuelType}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Engine Horse Power:</Td>
                                <Td>{car.engine.powerHP}</Td>
                            </Tr>
                            <Tr>
                                <Td fontWeight="bold">Engine Torque:</Td>
                                <Td>{car.engine.torqueNM}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </ModalBody>
                <ModalFooter justifyContent="center" gap="4">
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="pressed"
                        onClick={onClose}
                        style={{
                            backgroundColor: 'purple',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Close
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="pressed"
                        onClick={onDelete}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete Car'}
                    </motion.button>
                    <Button onClick={handleOpenModal}>Change Garage</Button>
                    <CarChangeGarageModal
                        isOpen={isOpen}
                        onClose={handleCloseModal}
                        currentCar={car}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

function DeleteConfirmationPopup({ carId, handleConfirmDelete, handleCancelDelete }) {
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        pressed: { scale: 0.9 },
    };

    return (
        <Modal isOpen={true} onClose={handleCancelDelete}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure you want to delete?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text textAlign="center" mb="4">
                        Are you sure you want to delete?
                    </Text>
                </ModalBody>
                <ModalFooter justifyContent="center" gap="4">
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="pressed"
                        onClick={() => handleConfirmDelete(carId)}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Yes
                    </motion.button>
                    <motion.button
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="pressed"
                        onClick={handleCancelDelete}
                        style={{
                            backgroundColor: 'gray',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        No
                    </motion.button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
function CarChangeGarageModal({ isOpen, onClose, currentCar }) {
    const [choice2, setChoice2] = useState("");
    const { user } = useContext(UserContext);

    const { data: garageData, status } = useQuery(["garages", user.id], () =>
        getGaragesByUserID(user.id)
    );

    const { isLoading, isError, error, data, mutate } = useMutation(
        "updateCar",
        ({ currentCarId, garageId }) => updateCar(currentCarId, garageId)
    );

    const handleConfirm = () => {
        // Perform any desired actions with the selected choices
        console.log("Choice 2: " + choice2);
        // let garageId = garageData.find((garage) => garage.name === choice2).id;
        mutate({ currentCarId: currentCar.id, garageId: choice2 });

        // Close the modal
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Current Garage</FormLabel>

                        {garageData &&
                            garageData.find((garage) => garage.id === currentCar.garage.id)
                                .name}
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Select Garage to move car to</FormLabel>
                        <Select
                            defaultValue=""
                            onChange={(e) => {
                                setChoice2(e.target.value);
                                console.log(e.target.value);
                            }}
                        >
                            <option disabled hidden value="">
                                Select Garage
                            </option>
                            {garageData &&
                                garageData.map((garage) => (
                                    <option key={garage.id} value={garage.id}>
                                        {garage.name}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={handleConfirm}>
                        Confirm
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
