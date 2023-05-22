
import React, { useState, useEffect } from 'react';
import { getGaragesByUserID } from "../services/GarageService";
import {}
import * as garage from "react-bootstrap/ElementChildren";
import * as garages from "react-bootstrap/ElementChildren";
import './Addcar.css';

const Addcar = () => {
    const [car, setCar] = useState({
        name: '',
        description: '',
        manufacturer: '',
        model: '',
        year: '',
        seats: '',
        engine: '',
        garage: ''
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        getGaragesByUserID()
            .then((response) => {
                console.log('Garages fetched successfully:', response);
                setCar((prevData) => ({
                    ...prevData,
                    garage: response[0]//.id
                }));
            })
            .catch((error) => {
                console.error('Error fetching garages:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCar((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleGarageSelect = (e) => {
        const selectedGarage = e.target.value;
        setCar((prevData) => ({
            ...prevData,
            garage: selectedGarage
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (car.name.trim() === '') {
            errors.name = 'Name is required';
        }
        if (car.description.trim() === '') {
            errors.description = 'Description is required';
        }
        if (car.manufacturer.trim() === '') {
            errors.manufacturer = 'Manufacturer is required';
        }
        if (car.model.trim() === '') {
            errors.model = 'Model is required';
        }
        if (car.year.trim() === '') {
            errors.year = 'Year is required';
        }
        if (car.seats.trim() === '') {
            errors.seats = 'Seats is required';
        }
        if (car.engine.trim() === '') {
            errors.engine = 'Engine is required';
        }
        if (car.garage) {//.trim() === '') {
            errors.garage = 'Garage is required';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        createCar(car)
            .then((response) => {
                console.log('Car added successfully:', response);
            })
            .catch((error) => {
                console.error('Error adding car:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Add Car</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={car.name} onChange={handleInputChange} />
                {formErrors.name && <span className="error">{formErrors.name}</span>}
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={car.description} onChange={handleInputChange}></textarea>
                {formErrors.description && <span className="error">{formErrors.description}</span>}
            </div>
            <div>
                <label htmlFor="manufacturer">Manufacturer:</label>
                <input type="text" id="manufacturer" name="manufacturer" value={car.manufacturer} onChange={handleInputChange} />
                {formErrors.manufacturer && <span className="error">{formErrors.manufacturer}</span>}
            </div>
            <div>
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" name="model" value={car.model} onChange={handleInputChange} />
                {formErrors.model && <span className="error">{formErrors.model}</span>}
            </div>
            <div>
                <label htmlFor="year">Year:</label>
                <input type="text" id="year" name="year" value={car.year} onChange={handleInputChange} />
                {formErrors.year && <span className="error">{formErrors.year}</span>}
            </div>
            <div>
                <label htmlFor="seats">Seats:</label>
                <input type="text" id="seats" name="seats" value={car.seats} onChange={handleInputChange} />
                {formErrors.seats && <span className="error">{formErrors.seats}</span>}
            </div>
            <div>
                <label htmlFor="engine">Engine:</label>
                <input type="text" id="engine" name="engine" value={car.engine} onChange={handleInputChange} />
                {formErrors.engine && <span className="error">{formErrors.engine}</span>}
            </div>
            <div>
                <label htmlFor="garage">Garage:</label>
                <select id="garage" name="garage" value={car.garage} onChange={handleGarageSelect}>
                    <option value="">Select a Garage</option>
                    {garages.map((garage) => (
                        <option key={garage.id} value={garage.id}>{garage.name}</option>
                    ))}
                </select>
                {formErrors.garage && <span className="error">{formErrors.garage}</span>}
            </div>
            <button type="submit">Add Car</button>
        </form>
    );
};

export default Addcar;
