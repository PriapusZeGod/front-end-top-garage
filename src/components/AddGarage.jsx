import React, { useState } from 'react';
import {createGarage} from "../services/GarageService";

const AddGarage = () => {
    const [garage, setGarage] = useState({
        name: '',
        location: '',
        numberOfCars: 0,
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGarage((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (garage.name.trim() === '') {
            errors.name = 'Garage name is required';
        }
        if (garage.location.trim() === '') {
            errors.location = 'Garage location is required';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        createGarage(garage)
            .then((response) => {
                console.log('Garage added successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding garage:', error);
            });
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
                    <label htmlFor="location">Garage Location:</label>
                    <input type="text" id="location" name="location" value={garage.location} onChange={handleInputChange} />
                    {formErrors.location && <span className="error">{formErrors.location}</span>}
                </div>
                <div>
                    <label htmlFor="numberOfCars">Number of Cars:</label>
                    <select id="numberOfCars" name="numberOfCars" value={garage.numberOfCars} onChange={handleInputChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
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
