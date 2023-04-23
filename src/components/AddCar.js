import React, { useState } from 'react';

const AddCar = ({garageId, onSubmit}) => {
    const [car, setCar] = useState({make: '', model: '', year: ''});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCar(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({...car, garageId});
        setCar({make: '', model: '', year: ''});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="make">Make:</label>
                <input type="text" name="make" value={car.make} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="model">Model:</label>
                <input type="text" name="model" value={car.model} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="year">Year:</label>
                <input type="number" name="year" value={car.year} onChange={handleChange} />
            </div>
            <button type="submit">Add Car</button>
        </form>
    );
};

export default AddCar;
