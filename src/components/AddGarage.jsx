import React, { useState, useContext } from 'react';
import { createGarages } from "../services/GarageService";
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
        <div>
            <h2>Add Garage</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div>
                    <label htmlFor="name">Garage Name:</label>
                    <input type="text" id="name" name="name" value={garage.name} onChange={handleInputChange} />
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                </div>
                <div>
                    <label htmlFor="latitude">Latitude:</label>
                    <input type="text" id="latitude" name="latitude" value={garage.location.latitude} onChange={handleInputChange} />
                    {formErrors.latitude && <span className="error">{formErrors.latitude}</span>}
                </div>
                <div>
                    <label htmlFor="longitude">Longitude:</label>
                    <input type="text" id="longitude" name="longitude" value={garage.location.longitude} onChange={handleInputChange} />
                    {formErrors.longitude && <span className="error">{formErrors.longitude}</span>}
                </div>
                <div>
                    <label htmlFor="numberOfCars">Number of Cars:</label>
                    <select id="numberOfCars" name="numberOfCars" value={garage.numberOfCars} onChange={handleInputChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div>
                    {/* Add map component here for choosing location */}
                </div>
                <button type="submit">Add Garage</button>
            </form>
        </div>
    );
};

export default AddGarage;
